import React from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../redux/projects';

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.

class AllProjects extends React.Component {
  componentDidMount() {
    this.props.fetchProjects();
  }
  render() {
    return (
      <div>
        <h1>All Projects:</h1>
        {this.props.projects.map((project) => (
          <div key={project.id}>
            <h1>{project.title}</h1>
            <h2>{project.deadline}</h2>
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
  };
};

export default connect(mapState, mapDispatch)(AllProjects);
