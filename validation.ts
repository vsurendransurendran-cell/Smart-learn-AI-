import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// --- AUTH SCHEMAS ---

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80, 'Name cannot exceed 80 characters'),
  email: z.string().trim().email('Invalid email address format').max(120, 'Email cannot exceed 120 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100, 'Password cannot exceed 100 characters')
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Password must contain at least one letter and one number'),
  age: z.coerce.number().min(5).max(120).optional().default(20),
  mobileNumber: z.string().max(30).optional(),
  role: z.enum(['student', 'educator', 'admin']).optional().default('student'),
  avatar: z.string().url().max(500).optional(),
  targetExam: z.string().max(200).optional(),
  targetJobRole: z.string().max(100).optional(),
  dailyGoalMinutes: z.coerce.number().min(5).max(480).optional().default(30),
  preferredLanguage: z.string().max(10).optional().default('en')
});

export const loginSchema = z.object({
  email: z.string().trim().min(3, 'Email or username is required').max(120, 'Identifier is too long'),
  password: z.string().min(1, 'Password is required').max(100, 'Password is too long')
});

export const sendOtpSchema = z.object({
  name: z.string().trim().min(2, 'Valid name (min 2 characters) is required').max(80),
  age: z.coerce.number().min(5, 'Age must be at least 5').max(120, 'Age must be under 120'),
  mobileNumber: z.string().trim().min(10, 'Mobile phone number must have at least 10 digits').max(30)
});

export const verifyOtpSchema = z.object({
  mobileNumber: z.string().trim().min(10).max(30),
  otp: z.string().trim().length(6, 'Verification code must be exactly 6 digits').regex(/^\d{6}$/, 'OTP must be 6 numeric digits'),
  name: z.string().max(80).optional(),
  age: z.coerce.number().min(5).max(120).optional()
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email('Invalid email address format').max(120)
});

export const resetPasswordSchema = z.object({
  token: z.string().trim().min(20, 'Invalid or expired reset token').max(200),
  newPassword: z.string().min(8, 'Password must be at least 8 characters').max(100)
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Password must contain at least one letter and one number')
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required').max(100),
  newPassword: z.string().min(8, 'New password must be at least 8 characters').max(100)
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, 'Password must contain at least one letter and one number')
});

// --- AI TUTOR & GEMINI SCHEMAS ---

export const aiTutorSchema = z.object({
  message: z.string().trim().min(1, 'Message is required').max(2000, 'Query message cannot exceed 2000 characters'),
  mode: z.enum(['detailed', 'simple', 'example']).optional().default('detailed'),
  relatedTopic: z.string().trim().max(150).optional()
});

export const aiChatSchema = z.object({
  message: z.string().trim().max(4000, 'Message cannot exceed 4000 characters').optional().default(''),
  history: z.array(z.object({
    sender: z.enum(['user', 'ai', 'system', 'model', 'tutor']),
    text: z.string().max(4000)
  })).max(50, 'Chat history limit exceeded').optional().default([]),
  role: z.enum(['coach', 'architect', 'exam_prep', 'academic', 'general']).optional().default('coach'),
  modelPreference: z.enum([
    'gemini-3.8-flash',
    'gemini-3.1-pro-preview',
    'gemini-3.1-flash-lite',
    'gemini-flash-latest',
    'gemini-3.5-flash',
    'fast',
    'complex'
  ]).optional().default('gemini-3.8-flash'),
  attachment: z.object({
    type: z.enum(['image', 'file']),
    name: z.string().max(150).optional(),
    mimeType: z.string().max(100).optional(),
    base64Data: z.string().max(15 * 1024 * 1024, 'Attachment exceeds 15MB size limit').optional(),
    textContent: z.string().max(20000, 'File text exceeds 20,000 characters').optional()
  }).optional()
}).refine(data => data.message.length > 0 || data.attachment !== undefined, {
  message: 'Either message or attachment must be provided.'
});

export const aiFileAnalyzeSchema = z.object({
  fileData: z.object({
    type: z.enum(['image', 'file']).optional(),
    name: z.string().max(150).optional(),
    mimeType: z.string().max(100).optional(),
    base64Data: z.string().max(15 * 1024 * 1024).optional(),
    textContent: z.string().max(20000).optional()
  }),
  query: z.string().trim().max(1000).optional().default(''),
  role: z.enum(['architect', 'coach', 'exam_prep', 'academic']).optional().default('architect')
});

export const searchGroundedSchema = z.object({
  query: z.string().trim().min(2, 'Search query must be at least 2 characters').max(500, 'Query cannot exceed 500 characters')
});

export const transcribeSchema = z.object({
  audioBase64: z.string().min(10, 'Audio data is required').max(20 * 1024 * 1024, 'Audio payload cannot exceed 20MB'),
  mimeType: z.string().max(100).optional().default('audio/webm')
});

export const voiceDialogueSchema = z.object({
  message: z.string().max(1000).optional().default(''),
  audioBase64: z.string().max(20 * 1024 * 1024).optional(),
  mimeType: z.string().max(100).optional().default('audio/webm'),
  voice: z.string().max(50).optional().default('Zephyr')
});

export const explainMistakeSchema = z.object({
  questionText: z.string().min(1).max(2000),
  selectedOption: z.string().min(1).max(1000),
  correctOption: z.string().min(1).max(1000),
  explanation: z.string().max(3000).optional().default('')
});

// --- ASSESSMENTS & CURRICULUM SCHEMAS ---

export const assessmentStartSchema = z.object({
  subjectId: z.string().max(100).optional(),
  topicId: z.string().max(100).optional(),
  type: z.string().max(50).optional().default('diagnostic'),
  count: z.coerce.number().min(1).max(50).optional().default(5)
});

export const adaptiveQuizGenerateSchema = z.object({
  targetSubjectId: z.string().max(100).optional()
});

export const assessmentSubmitSchema = z.object({
  assessmentId: z.string().max(100),
  title: z.string().max(200).optional(),
  type: z.string().max(50).optional(),
  questions: z.array(z.any()).min(1, 'Questions array cannot be empty').max(100),
  studentAnswers: z.record(z.string(), z.any()),
  timeSpentSeconds: z.coerce.number().min(0).max(86400).optional().default(120)
});

export const libraryReadPageSchema = z.object({
  bookId: z.string().trim().min(1, 'bookId is required').max(100),
  pageNumber: z.coerce.number().int().min(1, 'pageNumber must be at least 1').max(2000)
});

export const learningPathStepSchema = z.object({
  stepId: z.string().trim().min(1, 'stepId is required').max(100)
});

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  age: z.coerce.number().min(5).max(120).optional(),
  targetExam: z.string().max(200).optional(),
  targetJobRole: z.string().max(100).optional(),
  dailyGoalMinutes: z.coerce.number().min(5).max(480).optional(),
  preferredLanguage: z.string().max(10).optional(),
  avatar: z.string().url().max(500).optional()
});

// --- VALIDATION MIDDLEWARE FACTORY ---

export function validateBody<T>(schema: z.ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const issues = result.error.issues.map(i => ({
        field: i.path.join('.'),
        message: i.message
      }));
      return res.status(400).json({
        success: false,
        message: issues[0]?.message || 'Input validation failed',
        errors: issues
      });
    }
    req.body = result.data;
    next();
  };
}

export function validateQuery<T>(schema: z.ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid query parameters'
      });
    }
    req.query = result.data as any;
    next();
  };
}
