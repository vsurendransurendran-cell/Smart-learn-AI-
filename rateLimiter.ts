import rateLimit from 'express-rate-limit';

/**
 * Standard safe JSON response on rate limit exceeded
 */
const rateLimitHandler = (message: string) => (req: any, res: any) => {
  res.status(429).json({
    success: false,
    message
  });
};

/**
 * Strict Rate Limiter for Authentication & OTP endpoints
 * 15 requests per 15 minutes per IP
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  validate: false,
  handler: rateLimitHandler('Too many authentication attempts. Please try again after 15 minutes.')
});

/**
 * High-Sensitivity Rate Limiter for Gemini AI API endpoints
 * 35 requests per 1 minute per IP to protect Gemini API quota
 */
export const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 35,
  standardHeaders: true,
  legacyHeaders: false,
  validate: false,
  handler: rateLimitHandler('AI Tutor request quota reached. Please wait a moment before sending more queries.')
});

/**
 * Assessment & Quiz submission limiter
 * 60 submissions per 15 minutes
 */
export const assessmentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  validate: false,
  handler: rateLimitHandler('Assessment submission limit reached. Please try again later.')
});

/**
 * Global API rate limiter
 * 400 requests per 15 minutes per IP
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 400,
  standardHeaders: true,
  legacyHeaders: false,
  validate: false,
  handler: rateLimitHandler('Too many requests. Please slow down.')
});
