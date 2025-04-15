import { Request, Response, NextFunction } from 'express';
import Achievement, { IAchievement } from '../models/achievement';

// Get all achievements
export const getAllAchievements = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const achievements = await Achievement.find().sort({ dateAchieved: -1 });
    res.render('achievements', { title: 'My Achievements', achievements });
  } catch (error) {
    next(error);
  }
};

// Get achievement by ID
export const getAchievementById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).render('error', { message: 'Achievement not found' });
    }
    res.render('achievementDetail', { title: achievement.title, achievement });
  } catch (error) {
    next(error);
  }
};

// Create new achievement
export const createAchievement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const achievement = new Achievement({
      title: req.body.title,
      description: req.body.description,
      dateAchieved: req.body.dateAchieved,
      timeOfAchievement: req.body.timeOfAchievement
    });

    await achievement.save();
    res.status(201).json({ success: true, achievement });
  } catch (error) {
    next(error);
  }
};

// Update achievement
export const updateAchievement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        dateAchieved: req.body.dateAchieved,
        timeOfAchievement: req.body.timeOfAchievement
      },
      { new: true }
    );

    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }

    res.status(200).json({ success: true, achievement });
  } catch (error) {
    next(error);
  }
};

// Delete achievement
export const deleteAchievement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);

    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }

    res.status(200).json({ success: true, message: 'Achievement deleted successfully' });
  } catch (error) {
    next(error);
  }
};
