import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Extend Express Request type to carry authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
      };
    }
  }
}

// Ensure JWT secret is resiliently configured
const JWT_SECRET = process.env.JWT_SECRET || 'smartlearn-super-secret-jwt-key-2026-secure-baseline';

if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  console.warn('[SECURITY WARNING] JWT_SECRET is not set in environment variables! Using default fallback.');
}

/**
 * Hash password securely with bcrypt (10 salt rounds)
 */
export async function hashPassword(plainText: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainText, salt);
}

/**
 * Compare plain text password against stored bcrypt hash
 */
export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}

/**
 * Generate signed JWT token with 7-day expiration
 */
export function generateToken(payload: { id: string; email: string; name: string; role: string }): string {
  return jwt.sign(
    {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role || 'student'
    },
    JWT_SECRET,
    {
      expiresIn: '7d',
      algorithm: 'HS256'
    }
  );
}

/**
 * Verify JWT token string
 */
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
  } catch (err) {
    return null;
  }
}

/**
 * Mandatory Authentication Middleware
 */
export function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || req.headers['x-access-token'];
  let token = '';

  if (typeof authHeader === 'string') {
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else {
      token = authHeader.trim();
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Authentication token required.'
    });
  }

  const decoded = verifyToken(token);
  if (!decoded || !decoded.id) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication session. Please sign in again.'
    });
  }

  req.user = {
    id: decoded.id,
    email: decoded.email,
    name: decoded.name,
    role: decoded.role || 'student'
  };

  next();
}

/**
 * Optional Authentication Middleware
 * Populates req.user if valid token present, allows continuation if guest
 */
export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || req.headers['x-access-token'];
  let token = '';

  if (typeof authHeader === 'string') {
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else {
      token = authHeader.trim();
    }
  }

  if (token) {
    const decoded = verifyToken(token);
    if (decoded && decoded.id) {
      req.user = {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role || 'student'
      };
    }
  }

  next();
}

/**
 * Authorization Middleware: Ensures student can only access/modify their own resource
 */
export function authorizeResourceOwner(paramName: string = 'id') {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const targetUserId = req.params[paramName] || req.body.userId;

    // Admin can access any profile, students can only access their own
    if (req.user.role !== 'admin' && targetUserId && req.user.id !== targetUserId) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You are not authorized to view or modify another student\'s records.'
      });
    }

    next();
  };
}

/**
 * Role-Based Access Control (RBAC) Middleware: Restricts access to specific user roles
 */
export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Insufficient role permissions to access this endpoint.'
      });
    }
    next();
  };
}
