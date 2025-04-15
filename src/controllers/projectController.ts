import { Request, Response, NextFunction } from 'express';
import Project, { IProject } from '../models/project';

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

// Get all projects
export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await Project.find().sort({ startDate: -1 });

    // If request is from Postman or API client, return JSON
    if (isApiRequest(req)) {
      return res.json({ success: true, projects });
    }

    // For browser requests, render the HTML page
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
      if (isApiRequest(req)) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.status(404).render('error', { message: 'Project not found' });
    }

    // If request is from Postman or API client, return JSON
    if (isApiRequest(req)) {
      return res.json({ success: true, project });
    }

    // For browser requests, render the HTML page
    res.render('projectDetail', { title: project.title, project });
  } catch (error) {
    next(error);
  }
};

// Create new project
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Request body:', req.body);

    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      technologies: Array.isArray(req.body.technologies)
        ? req.body.technologies
        : (req.body.technologies ? req.body.technologies.split(',').map((t: string) => t.trim()) : []),
      projectUrl: req.body.projectUrl
    });

    const savedProject = await project.save();
    console.log('Project saved:', savedProject);

    res.status(201).json({ success: true, project: savedProject });
  } catch (error) {
    console.error('Error creating project:', error);
    next(error);
  }
};

// Update project
export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Update project - ID:', req.params.id);
    console.log('Update project - Body:', req.body);

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      technologies: Array.isArray(req.body.technologies)
        ? req.body.technologies
        : (req.body.technologies ? req.body.technologies.split(',').map((t: string) => t.trim()) : []),
      projectUrl: req.body.projectUrl
    };

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error('Error updating project:', error);
    next(error);
  }
};

// Delete project
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Delete project - ID:', req.params.id);

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      project: project
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    next(error);
  }
};
