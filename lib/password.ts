import crypto from 'crypto';

const SCRYPT_KEYLEN = 64;

export function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

export function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, SCRYPT_KEYLEN).toString('hex');
}

export function verifyPassword(password: string, salt: string, hash: string): boolean {
  const computedHash = hashPassword(password, salt);
  const computedBuffer = Buffer.from(computedHash, 'hex');
  const savedBuffer = Buffer.from(hash, 'hex');

  if (computedBuffer.length !== savedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(computedBuffer, savedBuffer);
}

export function validatePasswordStrength(password: string): string | null {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must include at least one uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must include at least one lowercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must include at least one number';
  }
  return null;
}
