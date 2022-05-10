## Getting started

1. Fork and clone this repo.
2. `npm install`.
3. Create `final_project` and `final_project_test` databases.
4. Start the build process and your application with: `npm run start-dev`. If you're using Windows, you may need to execute `npm run start-server` and `npm run build-watch` separately (in their own terminal tabs).
5. If you navigate to [localhost:1337](http://localhost:1337), you should see some UI already :) [We've provided some code to get you started]
6. Check out the starting seed file in `seed.js` - you can run it by executing `npm run seed`. You will need to seed the database once you've set up the Sequelize models.

## Details

### The Premise

You run StackBot Inc., a business staffed entirely by robots. Each robot may be assigned to several projects at a time. Create a RESTful web platform that allows you to manage your robots and projects. Before getting started, please carefully review the expectations as outlined below.

### The tools

For this project, you must use Express to handle HTTP requests and Sequelize to interface with your database. Likewise, you must use React, Redux and React-Redux on the front-end. This means that all important state (i.e. robots and projects) must be managed by the Redux store (form data may be managed by stateful React components). Components that display robot/project data should therefore be connected to the Redux store. If you perform side-effects (like AJAX requests), you should encapsulate them in thunks.
