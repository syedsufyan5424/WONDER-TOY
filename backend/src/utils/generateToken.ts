import jwt from 'jsonwebtoken';

export const generateToken = (id: string, role: string): string => {
  const secret = process.env.JWT_SECRET || 'toyverse_super_secret_jwt_key_2026_secure';
  return jwt.sign({ id, role }, secret, {
    expiresIn: '30d',
  });
};
