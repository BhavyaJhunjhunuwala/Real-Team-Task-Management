// import express from 'express';
// import { createTask, updateTask, getTasks } from '../controllers/tasksController';

// const router = express.Router();

// router.post('/', createTask);
// router.put('/:id', updateTask);
// router.get('/', getTasks);



// export default router;


import express from 'express';
import { createTask, updateTask, getTasks } from '../controllers/tasksController';
import { authMiddleware } from '../middleware/authMiddleware'; // if applicable

const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task under a specific project.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - projectId
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Implement login API"
 *               projectId:
 *                 type: string
 *                 example: "6712e9eaf11d6409e6569181"
 *               assignedTo:
 *                 type: string
 *                 example: "6712e9eaf11d6409e6569182"
 *               status:
 *                 type: string
 *                 example: "In Progress"
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Internal server error
 */
router.post('/', authMiddleware, createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update task details
 *     description: Updates a task by ID.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "6712e9eaf11d6409e6569181"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Implement Google Auth"
 *               status:
 *                 type: string
 *                 example: "Completed"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authMiddleware, updateTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieves all tasks under a specific project or team.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware, getTasks);

export default router;
