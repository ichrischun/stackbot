import React from 'react';
import { FormControl, InputGroup, Form, Button } from 'react-bootstrap';
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
      <div className="newForm">
        <h1>Add New Robot Below:</h1>
        <form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Robot Name: </InputGroup.Text>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              type="text"
              placeholder="Robot Name Here"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <Form.Select name="fuelType" value={fuelType} onChange={handleChange}>
            <option value="-">Select Fuel Type</option>
            <option value="gas">Gas</option>
            <option value="diesel">Diesel</option>
            <option value="electric">Electric</option>
          </Form.Select>
          <InputGroup className="mb-3">
            <InputGroup.Text>Fuel Level:</InputGroup.Text>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              type="text"
              placeholder="Fuel Level Here"
              name="fuelLevel"
              value={fuelLevel}
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
    newRobot: state.robots.newRobot,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addedRobot: (newRobot) => dispatch(addedRobot(newRobot)),
  };
};

export default connect(mapState, mapDispatch)(AddRobotForm);
