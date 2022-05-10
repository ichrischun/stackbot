import React from 'react';
import { connect } from 'react-redux';
import { fetchProjects, deletedProject } from '../../redux/projects';
import { Link } from 'react-router-dom';
import AddProjectForm from '../AddProjectForm';

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.

class AllProjects_Class extends React.Component {
  componentDidMount() {
    this.props.fetchProjects();
    this.props.deletedProject();
  }
  render() {
    const projects = this.props.projects;
    return (
      <div>
        <AddProjectForm />
        <h1>All Projects:</h1>
        <div className="AllProjects">
          {projects.map((project) => (
            <div key={project.id} className="eachProject">
              <Link to={`/projects/${project.id}`}>
                <h1>{project.title}</h1>
              </Link>
              <h2>Deadline: {project.deadline}</h2>
              <h2>Priority Level (1-10): {project.priority}</h2>
              <h2>
                Current Status:{' '}
                {project.completed ? 'Completed' : 'Not Complete'}
              </h2>
              <h2>Description: {project.description}</h2>
              <button
                type="button"
                onClick={() => this.props.deletedProject(project)}
              >
                Delete
              </button>
              <button type="button">
                <Link to={`/projects/${project.id}/edit`}>Edit</Link>
              </button>
              <br />
              <br />
            </div>
          ))}
        </div>
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

export default connect(mapState, mapDispatch)(AllProjects_Class);
