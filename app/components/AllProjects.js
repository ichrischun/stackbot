import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, deletedProject } from '../redux/projects';
import { Link } from 'react-router-dom';
import AddProjectForm from './AddProjectForm';

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
      <div className="AllProjects">
        {projects.map((project) => (
          <div key={project.id} className="eachProject">
            <Link to={`/projects/${project.id}`}>
              <h1>{project.title}</h1>
            </Link>
            <h2>Deadline: {project.deadline}</h2>
            <h2>Priority Level (1-10): {project.priority}</h2>
            <h2>
              Current Status: {project.completed ? 'Completed' : 'Not Complete'}
            </h2>
            <h2>Description: {project.description}</h2>
            {/* <button
              type="button"
              onClick={() => this.props.deletedProject(project)}
            >
              Delete
            </button> */}
            <button type="button">
              <Link to={`/projects/${project.id}/edit`}>Edit</Link>
            </button>
            <br />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
