import dotenv from 'dotenv';
dotenv.config();

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY!;

interface JwtPayload {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
  
}


declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return void res.status(401).json({ message: 'No token found' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return void res.status(403).json({ message: 'expired token' });
  }
};
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return void res.status(403).json({ message: 'Access denied. Admins only.' });
  }
}

module.exports = { authenticateToken, isAdmin };