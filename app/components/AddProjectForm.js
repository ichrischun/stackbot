import React from 'react';
import { connect } from 'react-redux';
import { addedProject } from '../redux/projects';

class AddProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      deadline: '',
      priority: '',
      description: '',
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
    this.setState({ title: '', deadline: '', priority: '' });
  }
  render() {
    const { title, deadline, priority, description } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div>
        <h1>Add New Project Below:</h1>
        <form onSubmit={handleSubmit}>
          <label>Project Title: </label>
          <input
            type="text"
            placeholder="Project Title Here"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label>Project Deadline: </label>
          <input
            type="text"
            placeholder="(YYYY-MM-DD)"
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
          <br />
          <br />
          <label>Project Priority: </label>
          <input
            type="text"
            placeholder="Project Priority (1-10)"
            name="priority"
            value={priority}
            onChange={handleChange}
          />
          <br />
          <br />
          <label>Project Description: </label>
          <input
            type="text"
            placeholder="Project Description"
            name="description"
            value={description}
            onChange={handleChange}
          />
          <br />
          <br />
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
