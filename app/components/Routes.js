import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AllProjects from './AllProjects';
import AllRobots from './AllRobots';

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          Welcome!
          <Link to="/robots">All Robots</Link>
          <Link to="projects">All Projects</Link>
        </nav>
        <main>
          <h1>
            Welcome to StackBot Project Management: your robot employees are
            awaiting assignments!
          </h1>
          <p>This seems like a nice place to get started with some Routes!</p>
          <Switch>
            <Route exact path="/projects" component={AllProjects} />
            <Route exact path="/robots" component={AllRobots} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Routes;
