import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AllProjects from './AllProjects';
import AllRobots from './AllRobots';
import SingleRobot from './SingleRobot';
import SingleProject from './SingleProject';
import EditRobotForm from './EditRobotForm';
import EditProjectForm from './EditProjectForm';
import Home from './Home';
import NotFoundPage from './NotFoundPage';

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/robots">All Robots</Link>
          <Link to="/projects">All Projects</Link>
        </nav>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/robots" component={AllRobots} />
            <Route exact path="/robots/:id" component={SingleRobot} />
            <Route exact path="/robots/:id/edit" component={EditRobotForm} />
            <Route exact path="/projects" component={AllProjects} />
            <Route exact path="/projects/:id" component={SingleProject} />
            <Route
              exact
              path="/projects/:id/edit"
              component={EditProjectForm}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Routes;
