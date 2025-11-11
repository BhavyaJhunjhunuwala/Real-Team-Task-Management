import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import User, { IUser } from '../models/User';
import { config } from '../config';
import { RegisterDto, LoginDto } from '../dto/auth.dto';



// class RegisterDTO {
//   email!: string;
//   password!: string;
//   role?: 'Admin' | 'Member';
// }

// class LoginDTO {
//   email!: string;
//   password!: string;
// }








// export const register = async (req: Request, res: Response) => {
//   const dto = plainToInstance(RegisterDto, req.body);
//   const errors = await validate(dto);
//   if (errors.length > 0) return res.status(400).json(errors);

//   const { email, password, role } = dto;
//   try {
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ msg: 'User already exists' });

//     user = new User({ email, password, role });
//     await user.save();

//     const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err: any) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   const dto = plainToInstance(LoginDto, req.body);
//   const errors = await validate(dto);
//   if (errors.length > 0) return res.status(400).json(errors);

//   const { email, password } = dto;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

//     const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '1h' });
//     res.json({ token, userId: user.id });
//   } catch (err: any) {
//     res.status(500).json({ msg: err.message });
//   }
// };




import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import User from '../models/User';
// import { config } from '../config';

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   try {
//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Email and password required' });
//     }

//     const user = await User.findOne({ email: email.toLowerCase() });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       config.jwtSecret,
//       { expiresIn: '7d' }
//     );

//     console.log('Login success:', { email, userId: user._id }); // DEBUG

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err: any) {
//     console.error('Login error:', err); // ← SEE THIS IN TERMINAL
//     res.status(500).json({ msg: 'Server error', error: err.message });
//   }
// };

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password); // ← USE METHOD
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};







// // export const register = async (req: Request, res: Response) => {
// //   const { email, password, role } = req.body;

// //   try {
// //     if (!email || !password) {
// //       return res.status(400).json({ msg: 'Email and password required' });
// //     }

// //     let user = await User.findOne({ email: email.toLowerCase() });
// //     if (user) {
// //       return res.status(400).json({ msg: 'User already exists' });
// //     }

// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     user = new User({
// //       email: email.toLowerCase(),
// //       password: hashedPassword,
// //       role: role || 'Member',
// //     });

// //     await user.save();

// //     const token = jwt.sign(
// //       { id: user._id, role: user.role },
// //       config.jwtSecret,
// //       { expiresIn: '7d' }
// //     );

// //     res.status(201).json({
// //       token,
// //       user: {
// //         id: user._id,
// //         email: user.email,
// //         role: user.role,
// //       },
// //     });
// //   } catch (err: any) {
// //     console.error('Register error:', err);
// //     res.status(500).json({ msg: 'Server error', error: err.message });
// //   }
// // };





export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // LET MONGOOSE HASH IT
    const user = new User({
      email: email.toLowerCase(),
      password, // ← RAW PASSWORD
      role: role || 'Member',
    });

    await user.save(); // ← pre('save') hashes it

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    console.error('Register error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};