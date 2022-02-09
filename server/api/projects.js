const express = require('express');
const projectsRouter = express.Router();

const Project = require('../db/project');
const Robot = require('../db/robot');

// GET /api/projects
projectsRouter.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.send(projects);
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/:id
projectsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const project = await Project.findByPk(id, {
      include: [{ model: Robot }],
    });
    res.send(project);
  } catch (error) {
    next(error);
  }
});

// POST /api/projects
projectsRouter.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Project.create(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = projectsRouter;
