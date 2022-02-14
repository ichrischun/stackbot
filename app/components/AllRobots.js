import React from 'react';
import { connect } from 'react-redux';
import { fetchRobots, deletedRobot } from '../redux/robots';
import { Link } from 'react-router-dom';
import AddRobotForm from './AddRobotForm';

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.

export class AllRobots extends React.Component {
  componentDidMount() {
    this.props.fetchRobots();
  }
  render() {
    return (
      <div>
        <AddRobotForm />
        <h1>All Robots:</h1>
        <div className="AllRobots">
          {this.props.robots.map((robot) => (
            <div key={robot.id} className="eachRobot">
              <Link to={`/robots/${robot.id}`}>
                <h1>{robot.name}</h1>
              </Link>
              <h2>Fuel Type: {robot.fuelType}</h2>
              <h2>Fuel Level: {robot.fuelLevel}</h2>
              <img
                src={robot.imageUrl}
                style={{ width: '200px', height: '200px' }}
              />
              <br />
              <br />
              <button
                type="button"
                onClick={() => this.props.deletedRobot(robot)}
              >
                Delete
              </button>
              <button type="button">
                <Link to={`/robots/${robot.id}/edit`}>Edit</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    robots: state.robots.allRobots,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchRobots: () => dispatch(fetchRobots()),
    deletedRobot: (robot) => dispatch(deletedRobot(robot)),
  };
};

export default connect(mapState, mapDispatch)(AllRobots);
