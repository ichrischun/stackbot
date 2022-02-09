import axios from 'axios';

// ACTION TYPES
const GOT_ALL_PROJECTS = 'GOT_ALL_PROJECTS';
const GOT_PROJECT = 'GOT_PROJECT';

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

// export const setProjects = () => {};

const initialState = {
  allProjects: [],
  project: {
    robots: [],
  },
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_PROJECTS:
      return { ...state, allProjects: action.projects };
    case GOT_PROJECT:
      return { ...state, project: action.project };
    default:
      return state;
  }
}
