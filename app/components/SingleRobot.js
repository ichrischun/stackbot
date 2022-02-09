import React from 'react';
import { connect } from 'react-redux';
import { fetchRobot } from '../redux/robots';
import { fetchProjects } from '../redux/projects';
import { Link } from 'react-router-dom';

export class SingleRobot extends React.Component {
  componentDidMount() {
    this.props.fetchRobot(this.props.match.params.id);
    this.props.fetchProjects();
  }
  render() {
    const projects = this.props.projects;
    const robot = this.props.robot;
    const grabProjectID = robot.projects.map((project) => project.id);
    const filterProjects = projects.filter((project) =>
      grabProjectID.includes(project.id)
    );

    return (
      <div>
        <h1>Name: {robot.name}</h1>
        <img src={robot.imageUrl} style={{ width: '200px', height: '200px' }} />
        <h2>Fuel Type: {robot.fuelType}</h2>
        <h2>Fuel Level: {robot.fuelLevel}</h2>
        <div>
          <h2>Projects assigned to this Robot:</h2>
          {filterProjects.length ? (
            filterProjects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <div>
                  <h1>{project.title}</h1>
                </div>
              </Link>
            ))
          ) : (
            <p>No projects assigned to this robot</p>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    robot: state.robots.robot,
    projects: state.projects.allProjects,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchRobot: (id) => dispatch(fetchRobot(id)),
    fetchProjects: () => dispatch(fetchProjects()),
  };
};

export default connect(mapState, mapDispatch)(SingleRobot);
