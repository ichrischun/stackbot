import React from 'react';
import { connect } from 'react-redux';
import { fetchRobot, updatedRobot } from '../redux/robots';
import { Link } from 'react-router-dom';

class EditRobotForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      fuelLevel: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.fetchRobot(this.props.match.params.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.robot.id !== this.props.robot.id) {
      this.setState({
        name: this.props.robot.name || '',
        fuelLevel: this.props.robot.fuelLevel || '',
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
    this.props.updatedRobot(
      this.props.match.params.id,
      event.target.name.value,
      event.target.fuelLevel.value
    );
    this.setState({ name: '', fuelLevel: '' });
  }
  render() {
    const { name, fuelLevel } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div>
        <h2>Edit Here:</h2>
        <form onSubmit={handleSubmit}>
          <label>Robot Name:</label>
          <input
            type="text"
            placeholder="Enter Robot Name Here"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <br />
          <br />
          <label>Fuel Level:</label>
          <input
            type="text"
            placeholder="Enter Fuel Level Here"
            name="fuelLevel"
            value={fuelLevel}
            onChange={handleChange}
          />
          <br />
          <br />
          <button type="submit">Save Change</button>
          {/* <br /> */}
          {/* <Link to={`/robots/${this.props.robot.id}`}>View Updated Robot</Link> */}
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    robot: state.robots.robot,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchRobot: (id) => dispatch(fetchRobot(id)),
    updatedRobot: (id, name, fuelLevel) =>
      dispatch(updatedRobot(id, name, fuelLevel)),
  };
};

export default connect(mapState, mapDispatch)(EditRobotForm);
