import { Request, Response, NextFunction } from 'express';
import Project, { IProject } from '../models/project';
import { isApiRequest, asyncHandler } from '../middleware/util';

// Get all projects
export const getAllProjects = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const projects = await Project.find().sort({ startDate: -1 });

  // If request is from Postman or API client, return JSON
  if (isApiRequest(req)) {
    return res.json({ success: true, projects });
  }

  // For browser requests, render the HTML page
  res.render('projects', { title: 'My Projects', projects });
});

// Get project by ID
export const getProjectById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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
});

// Create new project
export const createProject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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
});

// Update project
export const updateProject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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
});

// Delete project
export const deleteProject = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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
});
