import React from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
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
    this.setState({ title: '', deadline: '', priority: '', description: '' });
  }
  render() {
    const { title, deadline, priority, description } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div className="newForm">
        <h1>Add New Project Below:</h1>
        <form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Project Title: </InputGroup.Text>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              type="text"
              placeholder="Project Title Here"
              name="title"
              value={title}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Project Deadline: </InputGroup.Text>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              type="text"
              placeholder="(YYYY-MM-DD)"
              name="deadline"
              value={deadline}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Project Priority: </InputGroup.Text>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              type="text"
              placeholder="Project Priority (1-10)"
              name="priority"
              value={priority}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Project Description: </InputGroup.Text>
            <FormControl
              type="text"
              placeholder="Project Description"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </InputGroup>
          <Button type="submit" variant="outline-primary">
            Submit
          </Button>
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
