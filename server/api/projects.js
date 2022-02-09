const express = require('express');
const projectsRouter = express.Router();

const Projects = require('../db/project');

// GET /api/projects
projectsRouter.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.findAll();
    res.send(projects);
  } catch (error) {
    next(error);
  }
});

module.exports = projectsRouter;
