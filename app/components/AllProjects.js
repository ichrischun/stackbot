import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, deletedProject } from '../redux/projects';
import { Link } from 'react-router-dom';
import AddProjectForm from './AddProjectForm';
import { Card } from 'react-bootstrap';

const AllProjects = () => {
  const { projects } = useSelector((state) => {
    return {
      projects: state.projects.allProjects,
    };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjects());
    //dispatch(deletedProject(project));
  }, []);
  return (
    <div>
      <AddProjectForm />
      <h1>All Projects:</h1>
      <div className="AllProjects card">
        {projects.map((project) => (
          <Card key={project.id} className="eachProject">
            <Card.Body>
              <Card.Title>
                <Link to={`/projects/${project.id}`}>
                  <h1>{project.title}</h1>
                </Link>
              </Card.Title>
              <Card.Text>Deadline: {project.deadline}</Card.Text>
              <Card.Text>Priority Level (1-10): {project.priority}</Card.Text>
              <Card.Text>
                Current Status:{' '}
                {project.completed ? 'Completed' : 'Not Complete'}
              </Card.Text>
              <Card.Text>Description: {project.description}</Card.Text>
              {/* <button
              type="button"
              onClick={() => this.props.deletedProject(project)}
            >
              Delete
            </button> */}
              <Card.Link href={`/projects/${project.id}/edit`}>
                Edit
                {/* <Link to={`/projects/${project.id}/edit`}>Edit</Link> */}
              </Card.Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
