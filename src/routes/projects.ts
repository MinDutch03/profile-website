import { Router } from 'express';
import * as projectController from '../controllers/projectController';

const router = Router();

// GET all projects
router.get('/', projectController.getAllProjects);

// GET project by ID
router.get('/:id', projectController.getProjectById);

// POST create new project
router.post('/', projectController.createProject);

// PUT update project
router.put('/:id', projectController.updateProject);

// DELETE project
router.delete('/:id', projectController.deleteProject);

export default router;
