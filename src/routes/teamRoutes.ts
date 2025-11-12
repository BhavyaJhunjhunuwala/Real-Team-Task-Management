// import express from 'express';
// import { createTeam, inviteMember, getTeams } from '../controllers/teamController';

// const router = express.Router();

// router.post('/', createTeam);
// router.post('/invite', inviteMember);

// router.get('/', getTeams);

// export default router;



import express from 'express';
import { createTeam, inviteMember, getTeams } from '../controllers/teamController';
import { authMiddleware } from '../middleware/authMiddleware'; // if you use JWT auth

const router = express.Router();

/**
 * @swagger
 * /api/teams:
 *   post:
 *     summary: Create a new team
 *     description: Allows an admin user to create a new team. Emits a `teamCreated` socket event globally.
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Alpha Traders"
 *     responses:
 *       201:
 *         description: Team created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "6732e9eaf11d6409e6569181"
 *                 name:
 *                   type: string
 *                   example: "Alpha Traders"
 *                 members:
 *                   type: array
 *                   items:
 *                     type: string
 *       403:
 *         description: Only admin can create a team
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/', authMiddleware, createTeam);

/**
 * @swagger
 * /api/teams/invite:
 *   post:
 *     summary: Invite a member to a team
 *     description: Allows the team admin to invite a member by email. If the member does not exist, a temporary user is created.
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - teamId
 *               - email
 *             properties:
 *               teamId:
 *                 type: string
 *                 example: "6732e9eaf11d6409e6569181"
 *               email:
 *                 type: string
 *                 example: "member@team.com"
 *     responses:
 *       200:
 *         description: Member invited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Member invited"
 *                 email:
 *                   type: string
 *                   example: "member@team.com"
 *       400:
 *         description: Member already exists in the team
 *       403:
 *         description: Only admin can invite
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 */
router.post('/invite', authMiddleware, inviteMember);

/**
 * @swagger
 * /api/teams:
 *   get:
 *     summary: Get all teams of the logged-in user
 *     description: Returns all teams where the user is a member. Populates team details.
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6732e9eaf11d6409e6569181"
 *                   name:
 *                     type: string
 *                     example: "Alpha Traders"
 *                   admin:
 *                     type: string
 *                     example: "672de9eaf11d6409e6569000"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware, getTeams);

export default router;
