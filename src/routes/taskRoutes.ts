import express from 'express';
import { createTask, updateTask, getTasks } from '../controllers/tasksController';

const router = express.Router();

router.post('/', createTask);
router.put('/:id', updateTask);
router.get('/', getTasks);



export default router;