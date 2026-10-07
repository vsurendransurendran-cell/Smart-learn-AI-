import assert from 'assert';
import { hashPassword, verifyPassword, generateToken, verifyToken } from '../src/server/auth.js';
import { 
  issueOtp, 
  verifyOtpCode, 
  generatePasswordResetToken, 
  verifyAndConsumeResetToken, 
  checkAndIncrementAiQuota 
} from '../src/server/securityService.js';
import { repo } from '../src/server/repo.js';

async function runSecurityTestSuite() {
  console.log('====================================================');
  console.log('RUNNING SMARTLEARN BACKEND SECURITY AUTOMATED TESTS');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function test(name: string, fn: () => void | Promise<void>) {
    return Promise.resolve()
      .then(() => fn())
      .then(() => {
        console.log(`  ✓ [PASS] ${name}`);
        passed++;
      })
      .catch((err) => {
        console.error(`  ✕ [FAIL] ${name}:`, err.message);
        failed++;
      });
  }

  // 1. Password Hashing & Timing Attack Mitigation
  await test('Password Hashing: bcrypt generates salt and correctly verifies match', async () => {
    const raw = 'SecurePass2026!';
    const hash = await hashPassword(raw);
    assert(hash !== raw, 'Hash should not equal plain text');
    assert(hash.startsWith('$2'), 'Hash should be a bcrypt format');
    const isMatch = await verifyPassword(raw, hash);
    assert.strictEqual(isMatch, true, 'Original password should verify');
    const isWrongMatch = await verifyPassword('WrongPassword123', hash);
    assert.strictEqual(isWrongMatch, false, 'Wrong password should fail verification');
  });

  // 2. JWT Signing & Role Isolation
  await test('JWT Token: Signs user payload with role and resists tampering', () => {
    const payload = { id: 'std-101', email: 'alex@example.com', name: 'Alex Rivera', role: 'student' };
    const token = generateToken(payload);
    assert(typeof token === 'string' && token.length > 20, 'Token must be a valid JWT string');
    
    const decoded = verifyToken(token);
    assert.strictEqual(decoded.id, 'std-101');
    assert.strictEqual(decoded.role, 'student');

    // Tampered token check
    const tampered = token.slice(0, -5) + 'xxxxx';
    const tamperedResult = verifyToken(tampered);
    assert.strictEqual(tamperedResult, null, 'Tampered token must be rejected');
  });

  // 3. Password Reset Flow: Expiration & Single-Use
  await test('Password Reset: Generates cryptographic token, consumes once, and rejects replay', () => {
    const userId = 'user-test-456';
    const email = 'scholar@smartlearn.ai';
    const rawToken = generatePasswordResetToken(userId, email);
    assert(rawToken.length >= 32, 'Reset token must be high-entropy');

    // First consumption succeeds
    const firstAttempt = verifyAndConsumeResetToken(rawToken);
    assert.strictEqual(firstAttempt.valid, true);
    assert.strictEqual(firstAttempt.userId, userId);

    // Replay attempt fails immediately
    const replayAttempt = verifyAndConsumeResetToken(rawToken);
    assert.strictEqual(replayAttempt.valid, false, 'Token must not be reusable');
  });

  // 4. OTP Hardening: 60s Cooldown & Max 5 Failed Attempts Limit
  await test('OTP Gateway: Enforces 60s resend cooldown and invalidates after 5 failed attempts', () => {
    const mobile = '+919876543210';
    
    // Issue initial OTP
    const firstIssue = issueOtp(mobile, 'Priya', 21);
    assert.strictEqual(firstIssue.success, true);
    assert(firstIssue.rawOtp && firstIssue.rawOtp.length === 6, 'Must generate 6-digit OTP');

    // Immediate re-request must be blocked by cooldown
    const secondIssue = issueOtp(mobile, 'Priya', 21);
    assert.strictEqual(secondIssue.success, false, 'Immediate re-request must fail');
    assert(secondIssue.remainingCooldown! > 0, 'Must report remaining cooldown seconds');

    // 5 Failed attempts must invalidate OTP
    for (let i = 1; i <= 4; i++) {
      const wrong = verifyOtpCode(mobile, '000000');
      assert.strictEqual(wrong.valid, false);
      assert.strictEqual(wrong.reason, 'INVALID');
    }

    // 5th failed attempt invalidates
    const fifthWrong = verifyOtpCode(mobile, '000000');
    assert.strictEqual(fifthWrong.valid, false);
    assert.strictEqual(fifthWrong.reason, 'MAX_ATTEMPTS');

    // Even correct code is now blocked because max attempts were exceeded
    const tryCorrect = verifyOtpCode(mobile, firstIssue.rawOtp);
    assert.strictEqual(tryCorrect.valid, false, 'Should be revoked after 5 failed attempts');
  });

  // 5. Backend AI Gateway Quotas
  await test('AI Gateway Quota: Enforces daily request limits to protect API keys', () => {
    const guestUser = 'guest-test-ip-127-0-0-1';
    
    // Guest gets max 15 queries per day
    let allowedCount = 0;
    for (let i = 0; i < 20; i++) {
      const res = checkAndIncrementAiQuota(guestUser, true);
      if (res.allowed) allowedCount++;
    }
    assert.strictEqual(allowedCount, 15, 'Guest quota must be strictly capped at 15 daily requests');

    // Registered student gets 60 queries
    const studentUser = 'std-quota-user-999';
    let studentAllowedCount = 0;
    for (let i = 0; i < 70; i++) {
      const res = checkAndIncrementAiQuota(studentUser, false);
      if (res.allowed) studentAllowedCount++;
    }
    assert.strictEqual(studentAllowedCount, 60, 'Student quota must be capped at 60 daily requests');
  });

  // 6. User Data Isolation: Repositories isolate student records
  await test('Data Isolation: User A and User B records do not leak or overwrite across IDs', async () => {
    const userA = {
      id: 'student-A-' + Date.now(),
      name: 'User Alpha',
      email: `alpha-${Date.now()}@example.com`,
      password_hash: await hashPassword('PassAlpha123!'),
      age: 22,
      role: 'student',
      daily_goal_minutes: 30,
      preferred_language: 'en'
    };

    const userB = {
      id: 'student-B-' + Date.now(),
      name: 'User Beta',
      email: `beta-${Date.now()}@example.com`,
      password_hash: await hashPassword('PassBeta123!'),
      age: 23,
      role: 'student',
      daily_goal_minutes: 45,
      preferred_language: 'en'
    };

    await repo.createUser(userA);
    await repo.createUser(userB);

    // Record assessment for User A
    await repo.saveAssessment(userA.id, {
      id: 'asm-A-1',
      title: 'OS Quiz',
      type: 'quiz',
      subjectName: 'Operating Systems',
      questions: [],
      studentAnswers: {},
      score: 5,
      totalQuestions: 5,
      percentage: 100,
      status: 'Strong'
    });

    // Check User B assessments
    const userBAssessments = await repo.getAssessments(userB.id);
    assert.strictEqual(userBAssessments.length, 0, 'User B must not see User A assessments');

    const userAAssessments = await repo.getAssessments(userA.id);
    assert.strictEqual(userAAssessments.length, 1, 'User A should only see their own assessments');
  });

  // 7. Input Validation & Request Sanitization (Zod Schemas)
  await test('Input Validation: Rejects malformed auth payloads, unsafe inputs, and bad schemas', async () => {
    const { registerSchema, loginSchema, forgotPasswordSchema } = await import('../src/server/validation.js');

    // Invalid email
    const badEmail = registerSchema.safeParse({
      name: 'John Doe',
      email: 'invalid-email-address',
      password: 'ValidPassword123!',
      age: 20
    });
    assert.strictEqual(badEmail.success, false, 'Invalid email format must be rejected');

    // Short password (< 8 chars)
    const shortPass = registerSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'short',
      age: 20
    });
    assert.strictEqual(shortPass.success, false, 'Passwords under 8 chars must fail validation');

    // Missing required fields
    const missingField = loginSchema.safeParse({ email: 'john@example.com' });
    assert.strictEqual(missingField.success, false, 'Missing password in login must fail');

    // Valid registration passes
    const valid = registerSchema.safeParse({
      name: 'Valid Student',
      email: 'valid.student@smartlearn.ai',
      password: 'StrongPassword2026!',
      age: 22
    });
    assert.strictEqual(valid.success, true, 'Valid payload must succeed');
  });

  // 8. Role-Based Authorization (RBAC)
  await test('Role Authorization: Enforces role permissions and blocks unauthorized roles', async () => {
    const { requireRole } = await import('../src/server/auth.js');

    const adminMiddleware = requireRole('admin');
    
    // Simulate student request attempting to access admin route
    let studentStatus = 200;
    let studentMessage = '';
    const mockStudentReq: any = {
      user: { id: 'std-1', email: 's@test.com', name: 'Student', role: 'student' }
    };
    const mockRes: any = {
      status: (code: number) => {
        studentStatus = code;
        return {
          json: (data: any) => { studentMessage = data.message; }
        };
      }
    };
    let studentNextCalled = false;
    adminMiddleware(mockStudentReq, mockRes, () => { studentNextCalled = true; });

    assert.strictEqual(studentNextCalled, false, 'Next must not be called for non-admin');
    assert.strictEqual(studentStatus, 403, 'Must return 403 Forbidden for unauthorized role');

    // Simulate admin request
    let adminNextCalled = false;
    const mockAdminReq: any = {
      user: { id: 'adm-1', email: 'admin@smartlearn.ai', name: 'Admin', role: 'admin' }
    };
    adminMiddleware(mockAdminReq, mockRes, () => { adminNextCalled = true; });
    assert.strictEqual(adminNextCalled, true, 'Next must be called when role matches');
  });

  // 9. File Upload Security & Ownership Isolation
  await test('File Storage Security: Isolates user uploads and forbids cross-user access', async () => {
    const { registerUploadedFile, serveUserFile } = await import('../src/server/uploadService.js');

    const mockFile: any = {
      fieldname: 'file',
      originalname: 'cs_exam_notes.pdf',
      encoding: '7bit',
      mimetype: 'application/pdf',
      destination: '/uploads',
      filename: 'file-test-sample-12345.pdf',
      path: '/uploads/file-test-sample-12345.pdf',
      size: 1024 * 50
    };

    const record = registerUploadedFile(mockFile, 'user-alpha');
    assert.strictEqual(record.uploaderId, 'user-alpha');
    assert.strictEqual(record.originalName, 'cs_exam_notes.pdf');

    // Attempt access by User Beta
    let betaStatus = 200;
    let betaMessage = '';
    const mockBetaReq: any = {
      params: { fileId: record.id },
      user: { id: 'user-beta', role: 'student' },
      ip: '127.0.0.1'
    };
    const mockBetaRes: any = {
      status: (code: number) => {
        betaStatus = code;
        return {
          json: (body: any) => { betaMessage = body.message; }
        };
      }
    };

    serveUserFile(mockBetaReq, mockBetaRes);
    assert.strictEqual(betaStatus, 403, 'Cross-user file access must be blocked with 403 Forbidden');
    assert(betaMessage.includes('forbidden') || betaMessage.includes('permission'), 'Error message must state permission denial');
  });

  console.log('\n====================================================');
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runSecurityTestSuite().catch((e) => {
  console.error('Test suite uncaught error:', e);
  process.exit(1);
});
