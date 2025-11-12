import express from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with an email, password, and optional role (Admin or Member).
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *               role:
 *                 type: string
 *                 enum: [Admin, Member]
 *                 example: "Member"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64e1f0c7e29d8a4f89d9a7b1"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     role:
 *                       type: string
 *                       example: "Member"
 *       400:
 *         description: Email or password missing, or user already exists
 *         content:
 *           application/json:
 *             example:
 *               msg: "User already exists"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               msg: "Server error"
 *               error: "Detailed error message"
 */

router.post('/register', register);



/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates a user using email and password, returns JWT token and user details.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64e1f0c7e29d8a4f89d9a7b1"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     role:
 *                       type: string
 *                       example: "Admin"
 *       400:
 *         description: Invalid credentials or missing fields
 *         content:
 *           application/json:
 *             example:
 *               msg: "Invalid credentials"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               msg: "Server error"
 *               error: "Detailed error message"
 */


router.post('/login', login);

export default router;

