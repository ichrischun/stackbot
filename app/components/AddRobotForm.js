import React from 'react';
import { connect } from 'react-redux';
import { addedRobot } from '../redux/robots';

class AddRobotForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      fuelType: '',
      fuelLevel: '',
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
    this.props.addedRobot({ ...this.state });
    this.setState({ name: '', fuelType: '', fuelLevel: '' });
  }
  render() {
    const { name, fuelType, fuelLevel } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div>
        <h1>Add New Robot Below:</h1>
        <form onSubmit={handleSubmit}>
          <label>Robot Name: </label>
          <input
            type="text"
            placeholder="Robot Name Here"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label>Fuel Type: </label>
          <select name="fuelType" value={fuelType} onChange={handleChange}>
            <option value="-">-</option>
            <option value="gas">Gas</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
          </select>
          <br />
          <br />
          <label>Fuel Level:</label>
          <input
            type="text"
            placeholder="Fuel Level Here"
            name="fuelLevel"
            value={fuelLevel}
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
    newRobot: state.robots.newRobot,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addedRobot: (newRobot) => dispatch(addedRobot(newRobot)),
  };
};

export default connect(mapState, mapDispatch)(AddRobotForm);
