import { Request, Response, NextFunction } from 'express';
import Project, { IProject } from '../models/project';

// Get all projects
export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await Project.find().sort({ startDate: -1 });
    res.render('projects', { title: 'My Projects', projects });
  } catch (error) {
    next(error);
  }
};

// Get project by ID
export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).render('error', { message: 'Project not found' });
    }
    res.render('projectDetail', { title: project.title, project });
  } catch (error) {
    next(error);
  }
};

// Create new project
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      technologies: req.body.technologies,
      projectUrl: req.body.projectUrl
    });

    await project.save();
    res.status(201).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

// Update project
export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        technologies: req.body.technologies,
        projectUrl: req.body.projectUrl
      },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

// Delete project
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};
