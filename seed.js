const { green, red } = require('chalk');
const { db, Project, Robot } = require('./server/db');

const robots = [
  {
    name: 'Davis',
    fuelLevel: 90,
    imageUrl:
      'https://static.vecteezy.com/system/resources/previews/002/036/707/original/cute-robot-cartoon-doodle-hand-drawn-concept-design-art-kawaii-illustration-vector.jpg',
  },
  {
    name: 'Louis',
    fuelLevel: 100,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHMdyG6oihi0AR8Z9bSb3om4XdvZzCFEsDU8zIhJiEhYW2lcsbIJr7LxwvHyQrKJKTk5k&usqp=CAU',
  },
  {
    name: 'Rex',
    imageUrl: 'https://cdn9.dissolve.com/p/D2009_8_097/D2009_8_097_1200.jpg',
  },
];

const projects = [
  {
    title: 'Update Excel Spreadsheet',
    deadline: '2022-05-25',
    priority: 7,
    completed: false,
    description: 'Delete rows and format nicely',
  },
  {
    title: 'Cold call 100 clients',
    deadline: '2022-03-30',
    priority: 9,
    completed: false,
    description: 'Reach out to potential clients',
  },
  {
    title: 'Create new strategic plan',
    description: 'Plan for upcoming fiscal year',
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    // seed your database here!

    await Promise.all(
      robots.map((robot) => {
        return Robot.create(robot);
      })
    );

    await Promise.all(
      projects.map((project) => {
        return Project.create(project);
      })
    );

    const robotsList = await Robot.findAll();
    const projectsList = await Project.findAll();
    await robotsList[0].addProject(projectsList[1]);
    await robotsList[0].addProject(projectsList[2]);
    await robotsList[1].addProject(projectsList[0]);
    await robotsList[1].addProject(projectsList[1]);
    await robotsList[2].addProject(projectsList[0]);
    await robotsList[2].addProject(projectsList[2]);

    console.log(green('Seeding success!'));
    db.close();
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
