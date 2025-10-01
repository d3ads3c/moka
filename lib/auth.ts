import crypto from "crypto";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, originalHash] = stored.split(":");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(originalHash));
}

export function signJwt(payload: object, expiresIn: string = "7d") {
  return jwt.sign(payload as any, JWT_SECRET, { expiresIn });
}

export function verifyJwt<T = any>(token: string) {
  try { return jwt.verify(token, JWT_SECRET) as T; } catch { return null; }
}


