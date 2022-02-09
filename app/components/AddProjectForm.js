import React from 'react';
import { connect } from 'react-redux';
import { addedProject } from '../redux/projects';

class AddProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.addedProject({ ...this.state });
    this.setState({ title: '' });
  }
  render() {
    const { title } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>Project Title:</label>
          <input
            type="text"
            placeholder="Enter Project Title Here"
            name="title"
            value={title}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    newProject: state.projects.newProject,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addedProject: (newProject) => dispatch(addedProject(newProject)),
  };
};

export default connect(mapState, mapDispatch)(AddProjectForm);
