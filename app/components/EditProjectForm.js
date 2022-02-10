import React from 'react';
import { connect } from 'react-redux';
import { fetchProject, updatedProject } from '../redux/projects';

class EditProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      completed: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.fetchProject(this.props.match.params.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.project.id !== this.props.project.id) {
      this.setState({
        title: this.props.project.title || '',
        completed: this.props.project.completed || '',
      });
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.updatedProject(
      this.props.match.params.id,
      event.target.title.value,
      event.target.completed.value
    );
    this.setState({ title: '', completed: '' });
  }
  render() {
    const { title, completed } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>Project Title:</label>
          <input
            type="text"
            placeholder="Enter New Title Here"
            name="title"
            value={title}
            onChange={handleChange}
          />
          <label>Completed?</label>
          <select name="completed" value={completed} onChange={handleChange}>
            <option value="-">-</option>
            <option value="TRUE">COMPLETED</option>
            <option value="FALSE">NOT COMPLETED</option>
          </select>
          <button type="submit">Save Change</button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    project: state.projects.project,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProject: (id) => dispatch(fetchProject(id)),
    updatedProject: (id, title, completed) =>
      dispatch(updatedProject(id, title, completed)),
  };
};

export default connect(mapState, mapDispatch)(EditProjectForm);
