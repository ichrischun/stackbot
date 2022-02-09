import React from 'react';
import { connect } from 'react-redux';
import { fetchRobots } from '../redux/robots';

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
        <h1>All Robots:</h1>
        {this.props.robots.map((robot) => (
          <div key={robot.id}>
            <h1>{robot.name}</h1>
            <img
              src={robot.imageUrl}
              style={{ width: '200px', height: '200px' }}
            />
          </div>
        ))}
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
  };
};

export default connect(mapState, mapDispatch)(AllRobots);
