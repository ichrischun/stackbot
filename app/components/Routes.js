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
import { Nav } from 'react-bootstrap';

const Routes = () => {
  return (
    <Router>
      <div>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/robots">All Robots</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/projects">All Projects</Nav.Link>
          </Nav.Item>
        </Nav>
        <main>
          <Switch>
            <Route exact path="/home" component={Home} />
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
