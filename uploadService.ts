import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import multer from 'multer';
import { Request, Response } from 'express';
import { auditLog } from './securityService.js';

const UPLOAD_DIR = path.resolve(process.cwd(), 'uploads');

// Ensure upload directory exists with restricted access
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true, mode: 0o750 });
}

export interface StoredFileRecord {
  id: string;
  originalName: string;
  sanitizedFilename: string;
  mimeType: string;
  sizeBytes: number;
  uploaderId: string;
  createdAt: string;
}

// In-memory file registry (or DB backed)
const fileRegistry = new Map<string, StoredFileRecord>();

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'text/plain',
  'text/markdown',
  'text/x-python',
  'text/javascript',
  'application/json',
  'text/x-java-source',
  'text/x-c',
  'text/x-c++',
  'application/sql'
]);

const ALLOWED_EXTENSIONS = new Set([
  '.pdf', '.png', '.jpg', '.jpeg', '.webp',
  '.txt', '.md', '.py', '.js', '.ts', '.json',
  '.java', '.c', '.cpp', '.sql'
]);

// Configure multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeExt = ALLOWED_EXTENSIONS.has(ext) ? ext : '.bin';
    const uniqueId = `file-${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;
    cb(null, `${uniqueId}${safeExt}`);
  }
});

export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB maximum
    files: 1
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext) && !ALLOWED_MIME_TYPES.has(file.mimetype)) {
      return cb(new Error('Invalid file type. Allowed formats: PDF, Images (PNG/JPG/WEBP), Code files (PY, JS, TS, JAVA, CPP, SQL), and Text.'));
    }
    cb(null, true);
  }
});

/**
 * Register file upload metadata
 */
export function registerUploadedFile(file: Express.Multer.File, uploaderId: string): StoredFileRecord {
  const id = path.parse(file.filename).name;
  const record: StoredFileRecord = {
    id,
    originalName: path.basename(file.originalname).replace(/[^a-zA-Z0-9._-]/g, '_'),
    sanitizedFilename: file.filename,
    mimeType: file.mimetype,
    sizeBytes: file.size,
    uploaderId,
    createdAt: new Date().toISOString()
  };

  fileRegistry.set(id, record);

  auditLog({
    action: 'FILE_UPLOAD',
    userId: uploaderId,
    status: 'SUCCESS',
    resource: id,
    details: `Uploaded ${record.originalName} (${record.sizeBytes} bytes)`
  });

  return record;
}

/**
 * Handle secure file download / view with strict ownership authorization
 */
export function serveUserFile(req: Request, res: Response) {
  const { fileId } = req.params;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ success: false, message: 'Authentication required to access private files.' });
  }

  const record = fileRegistry.get(fileId);
  if (!record) {
    return res.status(404).json({ success: false, message: 'File not found or has been removed.' });
  }

  // Authorization check: User must own the file or be an admin
  if (user.role !== 'admin' && record.uploaderId !== user.id) {
    auditLog({
      action: 'UNAUTHORIZED_FILE_ACCESS',
      userId: user.id,
      ip: req.ip,
      status: 'BLOCKED',
      resource: fileId,
      details: `User attempted to access file owned by ${record.uploaderId}`
    });

    return res.status(403).json({
      success: false,
      message: 'Access forbidden. You do not have permission to access this file.'
    });
  }

  const filePath = path.join(UPLOAD_DIR, record.sanitizedFilename);

  // Prevent directory traversal
  if (!filePath.startsWith(UPLOAD_DIR)) {
    return res.status(400).json({ success: false, message: 'Invalid file reference.' });
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: 'File asset does not exist on disk.' });
  }

  res.setHeader('Content-Type', record.mimeType);
  res.setHeader('Content-Disposition', `inline; filename="${record.originalName}"`);
  res.setHeader('X-Content-Type-Options', 'nosniff');

  fs.createReadStream(filePath).pipe(res);
}
