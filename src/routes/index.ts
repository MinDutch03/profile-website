import { Router } from 'express';
import Project from '../models/project';
import Achievement from '../models/achievement';

const router = Router();

// Landing page
router.get('/', async (req, res) => {
  try {
    // Get the most recent projects and achievements
    const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(3);
    const recentAchievements = await Achievement.find().sort({ dateAchieved: -1 }).limit(3);

    res.render('index', {
      title: 'My Profile Website',
      projects: recentProjects,
      achievements: recentAchievements
    });
  } catch (error) {
    res.status(500).render('error', { message: 'Server error' });
  }
});

export default router;
