import { Request, Response, NextFunction } from 'express';
import Achievement, { IAchievement } from '../models/achievement';

// Helper function to check if request is from Postman or API client
const isApiRequest = (req: Request): boolean => {
  // Check if request is from Postman
  if (req.headers['user-agent'] && req.headers['user-agent'].includes('Postman')) {
    return true;
  }

  // Check if request explicitly wants JSON
  if (req.headers['accept'] === 'application/json') {
    return true;
  }

  // Check for typical API-style requests
  if (req.xhr) {
    return true;
  }

  return false;
};

// Get all achievements
export const getAllAchievements = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const achievements = await Achievement.find().sort({ dateAchieved: -1 });

    // If request is from Postman or API client, return JSON
    if (isApiRequest(req)) {
      return res.json({ success: true, achievements });
    }

    // For browser requests, render the HTML page
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
      if (isApiRequest(req)) {
        return res.status(404).json({ success: false, message: 'Achievement not found' });
      }
      return res.status(404).render('error', { message: 'Achievement not found' });
    }

    // If request is from Postman or API client, return JSON
    if (isApiRequest(req)) {
      return res.json({ success: true, achievement });
    }

    // For browser requests, render the HTML page
    res.render('achievementDetail', { title: achievement.title, achievement });
  } catch (error) {
    next(error);
  }
};

// Create new achievement
export const createAchievement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Request body for creating achievement:', req.body);

    const achievement = new Achievement({
      title: req.body.title,
      description: req.body.description,
      dateAchieved: req.body.dateAchieved,
      timeOfAchievement: req.body.timeOfAchievement
    });

    const savedAchievement = await achievement.save();
    console.log('Achievement saved:', savedAchievement);

    res.status(201).json({ success: true, achievement: savedAchievement });
  } catch (error) {
    console.error('Error creating achievement:', error);
    next(error);
  }
};

// Update achievement
export const updateAchievement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Update achievement - ID:', req.params.id);
    console.log('Update achievement - Body:', req.body);

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      dateAchieved: req.body.dateAchieved,
      timeOfAchievement: req.body.timeOfAchievement
    };

    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }

    res.status(200).json({ success: true, achievement });
  } catch (error) {
    console.error('Error updating achievement:', error);
    next(error);
  }
};

// Delete achievement
export const deleteAchievement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Delete achievement - ID:', req.params.id);

    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }

    await Achievement.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Achievement deleted successfully',
      achievement: achievement
    });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    next(error);
  }
};
