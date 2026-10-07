import crypto from 'crypto';

export interface AuditLogEvent {
  action: string;
  userId?: string;
  ip?: string;
  status: 'SUCCESS' | 'FAILURE' | 'BLOCKED';
  resource?: string;
  details?: string;
}

/**
 * Security & Audit Logger
 * Strictly prohibits logging passwords, plain-text OTPs, or API secrets.
 */
export function auditLog(event: AuditLogEvent) {
  const timestamp = new Date().toISOString();
  const safeLog = {
    timestamp,
    action: event.action,
    userId: event.userId || 'anonymous',
    ip: event.ip || 'unknown',
    status: event.status,
    resource: event.resource || 'api',
    details: event.details ? event.details.slice(0, 200) : undefined
  };

  if (process.env.NODE_ENV === 'production') {
    console.log(JSON.stringify(safeLog));
  } else {
    console.log(`[AUDIT ${safeLog.status}] ${safeLog.action} | User: ${safeLog.userId} | IP: ${safeLog.ip} ${safeLog.details ? `| ${safeLog.details}` : ''}`);
  }
}

/**
 * AI Gateway Usage Quotas
 * Enforces per-user daily request budgets to prevent API depletion.
 */
interface AiQuotaEntry {
  count: number;
  lastResetDay: string;
}

const userAiQuotas = new Map<string, AiQuotaEntry>();

const MAX_STUDENT_DAILY_QUOTA = 60;
const MAX_GUEST_DAILY_QUOTA = 15;

export function checkAndIncrementAiQuota(userId: string, isGuest: boolean): { allowed: boolean; remaining: number; max: number } {
  const today = new Date().toISOString().split('T')[0];
  const quotaLimit = isGuest ? MAX_GUEST_DAILY_QUOTA : MAX_STUDENT_DAILY_QUOTA;

  let entry = userAiQuotas.get(userId);
  if (!entry || entry.lastResetDay !== today) {
    entry = { count: 0, lastResetDay: today };
    userAiQuotas.set(userId, entry);
  }

  if (entry.count >= quotaLimit) {
    return {
      allowed: false,
      remaining: 0,
      max: quotaLimit
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: quotaLimit - entry.count,
    max: quotaLimit
  };
}

/**
 * Password Reset Token Management
 * Cryptographic random tokens with 15-minute expiration and single-use invalidation.
 */
interface PasswordResetEntry {
  tokenHash: string;
  userId: string;
  email: string;
  expiresAt: number;
  used: boolean;
}

const resetTokens = new Map<string, PasswordResetEntry>();

export function generatePasswordResetToken(userId: string, email: string): string {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

  resetTokens.set(tokenHash, {
    tokenHash,
    userId,
    email: email.toLowerCase(),
    expiresAt: Date.now() + 15 * 60 * 1000, // 15 mins
    used: false
  });

  return rawToken;
}

export function verifyAndConsumeResetToken(rawToken: string): { valid: boolean; userId?: string; email?: string } {
  const tokenHash = crypto.createHash('sha256').update(rawToken.trim()).digest('hex');
  const entry = resetTokens.get(tokenHash);

  if (!entry) {
    return { valid: false };
  }

  if (entry.used || Date.now() > entry.expiresAt) {
    resetTokens.delete(tokenHash);
    return { valid: false };
  }

  // Mark as used
  entry.used = true;
  resetTokens.delete(tokenHash);

  return {
    valid: true,
    userId: entry.userId,
    email: entry.email
  };
}

/**
 * Enhanced OTP Management with attempt limits & 60s cooldown
 */
interface EnhancedOtpEntry {
  codeHash: string;
  expiresAt: number;
  lastSentAt: number;
  failedAttempts: number;
  name: string;
  age: number;
}

const otpStore = new Map<string, EnhancedOtpEntry>();

export function issueOtp(mobile: string, name: string, age: number): { success: boolean; remainingCooldown?: number; rawOtp?: string } {
  const cleanMobile = mobile.replace(/[^\d+]/g, '');
  const now = Date.now();
  const existing = otpStore.get(cleanMobile);

  // 60-second cooldown
  if (existing && now - existing.lastSentAt < 60000) {
    const remainingSeconds = Math.ceil((60000 - (now - existing.lastSentAt)) / 1000);
    return { success: false, remainingCooldown: remainingSeconds };
  }

  const rawOtp = crypto.randomInt(100000, 1000000).toString();
  const codeHash = crypto.createHash('sha256').update(rawOtp).digest('hex');

  otpStore.set(cleanMobile, {
    codeHash,
    expiresAt: now + 5 * 60 * 1000, // 5 minutes
    lastSentAt: now,
    failedAttempts: 0,
    name: name.trim(),
    age
  });

  return { success: true, rawOtp };
}

export function verifyOtpCode(mobile: string, inputOtp: string): { 
  valid: boolean; 
  reason?: 'EXPIRED' | 'MAX_ATTEMPTS' | 'INVALID' | 'NOT_FOUND';
  record?: EnhancedOtpEntry;
} {
  const cleanMobile = mobile.replace(/[^\d+]/g, '');
  const record = otpStore.get(cleanMobile);
  const now = Date.now();

  if (!record) {
    return { valid: false, reason: 'NOT_FOUND' };
  }

  if (now > record.expiresAt) {
    otpStore.delete(cleanMobile);
    return { valid: false, reason: 'EXPIRED' };
  }

  if (record.failedAttempts >= 5) {
    otpStore.delete(cleanMobile);
    return { valid: false, reason: 'MAX_ATTEMPTS' };
  }

  const inputHash = crypto.createHash('sha256').update(inputOtp.trim()).digest('hex');
  if (record.codeHash !== inputHash) {
    record.failedAttempts += 1;
    if (record.failedAttempts >= 5) {
      otpStore.delete(cleanMobile);
      return { valid: false, reason: 'MAX_ATTEMPTS' };
    }
    return { valid: false, reason: 'INVALID' };
  }

  // Successfully verified - remove OTP to prevent replay
  otpStore.delete(cleanMobile);
  return { valid: true, record };
}
