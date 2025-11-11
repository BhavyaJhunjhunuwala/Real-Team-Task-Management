// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { config } from '../config';

// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

//   try {
//     const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
//     (req as any).user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };





import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import User from '../models/User';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token' });

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ msg: 'Invalid token' });

    (req as any).user = { id: user._id, role: user.role };
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token invalid' });
  }
};