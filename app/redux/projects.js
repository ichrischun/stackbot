import axios from 'axios';

// ACTION TYPES
const GOT_ALL_PROJECTS = 'GOT_ALL_PROJECTS';
const GOT_PROJECT = 'GOT_PROJECT';
const ADD_PROJECT = 'ADD_PROJECT';
const DELETE_PROJECT = 'DELETE_PROJECT';
const UPDATE_PROJECT = 'UPDATE_PROJECT';

// ACTION CREATORS
const gotAllProjects = (projects) => {
  return {
    type: GOT_ALL_PROJECTS,
    projects,
  };
};
const gotProject = (project) => {
  return {
    type: GOT_PROJECT,
    project,
  };
};
const addProject = (newProject) => {
  return {
    type: ADD_PROJECT,
    newProject,
  };
};
const deleteProject = (project) => {
  return {
    type: DELETE_PROJECT,
    project,
  };
};
const updateProject = (project) => {
  return {
    type: UPDATE_PROJECT,
    project,
  };
};

// THUNK CREATORS
export const fetchProjects = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/projects');
      dispatch(gotAllProjects(data));
    } catch (error) {
      console.log('fetchProjects thunk error: ', error);
    }
  };
};

export const fetchProject = (projectId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/projects/${projectId}`);
      dispatch(gotProject(data));
    } catch (error) {
      console.log('fetchProject thunk error: ', error);
    }
  };
};

export const addedProject = (newProject) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/projects', newProject);
      dispatch(addProject(data));
    } catch (error) {
      console.log('addProject thunk error: ', error);
    }
  };
};

export const deletedProject = (project) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/projects/${project.id}`, project);
      dispatch(deleteProject(project));
    } catch (error) {
      console.log('deletdProject thunk error: ', error);
    }
  };
};

export const updatedProject = (id, title, completed) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/projects/${id}`, {
        id,
        title,
        completed,
      });
      dispatch(updateProject(data));
    } catch (error) {
      console.log('updatedProject thunk error: ', error);
    }
  };
};

// export const setProjects = () => {};

const initialState = {
  allProjects: [],
  project: {
    robots: [],
  },
  newProject: [],
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_PROJECTS:
      return { ...state, allProjects: action.projects };
    case GOT_PROJECT:
      return { ...state, project: action.project };
    case ADD_PROJECT:
      return {
        ...state,
        allProjects: [...state.allProjects, action.newProject],
        newProject: [action.newProject],
      };
    case DELETE_PROJECT:
      return {
        ...state,
        allProjects: [
          state.allProjects.filter(
            (project) => project.id !== action.project.id
          ),
        ],
        project: action.project,
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        project: action.project,
      };
    default:
      return state;
  }
}
