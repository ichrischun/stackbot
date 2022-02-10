import React from 'react';
import { connect } from 'react-redux';
import { fetchProjects, deletedProject } from '../redux/projects';
import { Link } from 'react-router-dom';
import AddProjectForm from './AddProjectForm';

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.

class AllProjects extends React.Component {
  componentDidMount() {
    this.props.fetchProjects();
  }
  render() {
    const projects = this.props.projects;
    console.log(projects);
    return (
      <div>
        <AddProjectForm />
        <h1>All Projects:</h1>
        {projects.map((project) => (
          <div key={project.id}>
            <Link to={`/projects/${project.id}`}>
              <h1>{project.title}</h1>
            </Link>
            <h2>{project.deadline}</h2>
            <button
              type="button"
              // onClick={() => console.log('i want to sleep')}
              onClick={() => this.props.deletedProject(project)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    projects: state.projects.allProjects,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProjects: () => dispatch(fetchProjects()),
    deletedProject: (project) => dispatch(deletedProject(project)),
  };
};

export default connect(mapState, mapDispatch)(AllProjects);
