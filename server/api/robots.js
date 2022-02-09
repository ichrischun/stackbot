const express = require('express');
const robotsRouter = express.Router();

const Robots = require('../db/robot');

// GET /api/projects
robotsRouter.get('/', async (req, res, next) => {
  try {
    const robots = await Robots.findAll();
    res.send(robots);
  } catch (error) {
    next(error);
  }
});

module.exports = robotsRouter;
