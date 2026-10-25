import crypto from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';

const JWT_SECRET =
  process.env.JWT_SECRET || 'skyline-digital-agency-jwt-hmac-secret-2026-indore-edge';

export interface AuthTokenPayload {
  sub: string;
  email: string;
  name: string;
  role: 'admin';
  exp: number;
}

export function hashPassword(password: string): string {
  const salt = 'skyline_salt_v1';
  return crypto.scryptSync(password, salt, 32).toString('hex');
}

export function verifyPassword(password: string, expectedHash: string): boolean {
  const actualHash = hashPassword(password);
  const a = Buffer.from(actualHash, 'utf8');
  const b = Buffer.from(expectedHash, 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function signToken(user: {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}): string {
  const payload: AuthTokenPayload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(encodedPayload)
    .digest('base64url');
  return `${encodedPayload}.${signature}`;
}

export function verifyToken(token: string): AuthTokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [encodedPayload, signature] = parts;
    const expectedSig = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(encodedPayload)
      .digest('base64url');
    const a = Buffer.from(signature, 'utf8');
    const b = Buffer.from(expectedSig, 'utf8');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return null;
    }
    const decoded = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8')
    ) as AuthTokenPayload;
    if (!decoded.exp || Date.now() > decoded.exp) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export interface AuthenticatedRequest extends Request {
  adminUser?: AuthTokenPayload;
}

export function requireAdminAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required. Please log in to Admin Portal.' });
    return;
  }
  const token = authHeader.slice('Bearer '.length).trim();
  const verified = verifyToken(token);
  if (!verified || verified.role !== 'admin') {
    res.status(401).json({ error: 'Invalid or expired admin session token.' });
    return;
  }
  req.adminUser = verified;
  next();
}
