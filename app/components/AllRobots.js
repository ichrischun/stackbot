import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRobots, deletedRobot } from '../redux/robots';
import { Link } from 'react-router-dom';
import AddRobotForm from './AddRobotForm';

const AllRobots = () => {
  const { robots } = useSelector((state) => {
    return {
      robots: state.robots.allRobots,
    };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRobots());
    // dispatch(deletedRobot(robot));
  }, []);

  return (
    <div>
      <AddRobotForm />
      <h1>All Robots:</h1>
      <div className="AllRobots">
        {robots.map((robot) => (
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
            {/* <button type="button" onClick={() => deletedRobot(robot)}>
              Delete
            </button> */}
            <button type="button">
              <Link to={`/robots/${robot.id}/edit`}>Edit</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRobots;
