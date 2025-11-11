import express from 'express';
import { createProject } from '../controllers/projectController';
import { deleteProject, getProjects } from '../controllers/projectController';


const router = express.Router();

router.post('/', createProject);
router.post('/delete/:id', deleteProject);
router.get('/', getProjects);

export default router;

