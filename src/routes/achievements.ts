import { Router } from 'express';
import * as achievementController from '../controllers/achievementController';

const router = Router();

// GET all achievements
router.get('/', achievementController.getAllAchievements);

// GET achievement by ID
router.get('/:id', achievementController.getAchievementById);

// POST create new achievement
router.post('/', achievementController.createAchievement);

// PUT update achievement
router.put('/:id', achievementController.updateAchievement);

// DELETE achievement
router.delete('/:id', achievementController.deleteAchievement);

export default router;
