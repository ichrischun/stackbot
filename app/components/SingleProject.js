import React from 'react';
import { connect } from 'react-redux';
import {
  fetchProject,
  unassignedProject,
  markedComplete,
} from '../redux/projects';
import { fetchRobots } from '../redux/robots';
import { Link } from 'react-router-dom';

export class SingleProject extends React.Component {
  componentDidMount() {
    this.props.fetchProject(this.props.match.params.id);
    this.props.fetchRobots();
  }
  render() {
    const robots = this.props.robots;
    const project = this.props.project;
    const grabRobotID = project.robots.map((robot) => robot.id);
    const filterRobots = robots.filter((robot) =>
      grabRobotID.includes(robot.id)
    );
    console.log(project);
    return (
      <div>
        <h1>Title: {project.title}</h1>
        <h2>Description: {project.description}</h2>
        <h2> Deadline: {project.deadline}</h2>
        <h2>Priority (1-10): {project.priority}</h2>
        <button
          type="button"
          onClick={() => this.props.markedComplete(project.id)}
        >
          Complete
        </button>
        <h3>Status: {project.completed ? 'Completed' : 'Not Completed'}</h3>
        <br />
        <br />
        <div>
          <h2>Robots assigned to this Project:</h2>
          {filterRobots.length ? (
            filterRobots.map((robot) => (
              // <Link to={`/robots/${robot.id}`} key={robot.id}>
              <div key={robot.id}>
                <Link to={`/robots/${robot.id}`}>
                  <h1>{robot.name}</h1>
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    this.props.unassignedProject(
                      this.props.match.params.id,
                      robot.id
                    )
                  }
                >
                  Unassign
                </button>
              </div>
              // </Link>
            ))
          ) : (
            <p>No robots assigned to this project</p>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    project: state.projects.project,
    robots: state.robots.allRobots,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProject: (id) => dispatch(fetchProject(id)),
    fetchRobots: () => dispatch(fetchRobots()),
    unassignedProject: (projectId, robotId) =>
      dispatch(unassignedProject(projectId, robotId)),
    markedComplete: (id) => dispatch(markedComplete(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProject);
