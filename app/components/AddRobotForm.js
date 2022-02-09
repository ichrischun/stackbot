import React from 'react';
import { connect } from 'react-redux';
import { addedRobot } from '../redux/robots';

class AddRobotForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
    this.setState({ name: '' });
  }
  render() {
    const { name } = this.state;
    const { handleSubmit, handleChange } = this;
    console.log('state', this.state);
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>Robot Name:</label>
          <input
            type="text"
            placeholder="Enter Robot Name Here"
            name="name"
            value={name}
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
    newRobot: state.robots.newRobot,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addedRobot: (newRobot) => dispatch(addedRobot(newRobot)),
  };
};

export default connect(mapState, mapDispatch)(AddRobotForm);
