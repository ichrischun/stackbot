const express = require('express');
const robotsRouter = express.Router();

const Robot = require('../db/robot');
const Project = require('../db/project');

// GET /api/robots
robotsRouter.get('/', async (req, res, next) => {
  try {
    const robots = await Robot.findAll();
    res.send(robots);
  } catch (error) {
    next(error);
  }
});

// GET /api/robots/:id
robotsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const robot = await Robot.findByPk(id, {
      include: [{ model: Project }],
    });
    res.send(robot);
  } catch (error) {
    next(error);
  }
});

// POST /api/robots
robotsRouter.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Robot.create(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = robotsRouter;
