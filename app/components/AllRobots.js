import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRobots, deletedRobot } from '../redux/robots';
import { Link } from 'react-router-dom';
import AddRobotForm from './AddRobotForm';
import { Card, Button } from 'react-bootstrap';

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
          <Card
            key={robot.id}
            className="eachRobot col"
            style={{ width: '18rem' }}
          >
            <Card.Img
              variant="top"
              src={robot.imageUrl}
              style={{ width: '200px', height: '200px' }}
            />
            <Card.Body>
              <Card.Title>
                <Link to={`/robots/${robot.id}`}>
                  <h1 className="card-title">{robot.name}</h1>
                </Link>
              </Card.Title>
              <Card.Text>Fuel Type: {robot.fuelType}</Card.Text>
              <Card.Text>Fuel Level: {robot.fuelLevel}</Card.Text>
              {/* <button type="button" onClick={() => deletedRobot(robot)}>
              Delete
            </button> */}
              <Button variant="outline-primary">
                <Link to={`/robots/${robot.id}/edit`}>Edit</Link>
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllRobots;
