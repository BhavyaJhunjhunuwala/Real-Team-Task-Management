// import express from 'express';
// import { createProject } from '../controllers/projectController';
// import { deleteProject, getProjects } from '../controllers/projectController';


// const router = express.Router();


// router.post('/', createProject);


// router.post('/delete/:id', deleteProject);



// router.get('/', getProjects);

// export default router;



import express from 'express';
import { createProject, deleteProject, getProjects } from '../controllers/projectController';
import { authMiddleware } from '../middleware/authMiddleware'; // if you use auth

const router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     description: Creates a project within a team.
 *     tags: [Projects]
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
 *                 example: "Website Redesign"
 *               teamId:
 *                 type: string
 *                 example: "6712e9eaf11d6409e6569181"
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/', authMiddleware, createProject);

/**
 * @swagger
 * /api/projects/delete/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     description: Removes a project and its associated tasks.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "6712e9eaf11d6409e6569181"
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', authMiddleware, deleteProject);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     description: Retrieves a list of all projects for the logged-in user.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware, getProjects);

export default router;
