import axios from 'axios';

// ACTION TYPES
const GOT_ALL_ROBOTS = 'GOT_ALL_ROBOTS';
const GOT_ROBOT = 'GOT_ROBOT';
const ADD_ROBOT = 'ADD_ROBOT';
const DELETE_ROBOT = 'DELETE_ROBOT';
const UPDATE_ROBOT = 'UPDATE_ROBOT';
const UNASSIGN_ROBOT = 'UNASSIGN_ROBOT';

// ACTION CREATORS
const gotAllRobots = (robots) => {
  return {
    type: GOT_ALL_ROBOTS,
    robots,
  };
};
const gotRobot = (robot) => {
  return {
    type: GOT_ROBOT,
    robot,
  };
};
const addRobot = (newRobot) => {
  return {
    type: ADD_ROBOT,
    newRobot,
  };
};
const deleteRobot = (robot) => {
  return {
    type: DELETE_ROBOT,
    robot,
  };
};
const updateRobot = (robot) => {
  return {
    type: UPDATE_ROBOT,
    robot,
  };
};
const unassignRobot = (robot) => {
  return {
    type: UNASSIGN_ROBOT,
    robot,
  };
};

// THUNK CREATORS
export const fetchRobots = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/robots');
      dispatch(gotAllRobots(data));
    } catch (error) {
      console.log('fetchRobots thunk error: ', error);
    }
  };
};

export const fetchRobot = (robotId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/robots/${robotId}`);
      dispatch(gotRobot(data));
    } catch (error) {
      console.log('fetchRobot thunk error: ', error);
    }
  };
};

export const addedRobot = (newRobot) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/robots', newRobot);
      dispatch(addRobot(data));
    } catch (error) {
      console.log('addedRobot thunk error: ', error);
    }
  };
};

export const deletedRobot = (robot) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/robots/${robot.id}`, robot);
      dispatch(deleteRobot(robot));
    } catch (error) {
      console.log('deletedRobot thunk error: ', error);
    }
  };
};

export const updatedRobot = (id, name, fuelLevel) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/robots/${id}`, {
        id,
        name,
        fuelLevel,
      });
      dispatch(updateRobot(data));
    } catch (error) {
      console.log('updatedRobot thunk error: ', error);
    }
  };
};

export const unassignedRobot = (robotId, projectId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/robots/${robotId}/${projectId}`);
      dispatch(unassignRobot(data));
    } catch (error) {
      console.log('unassignedRobot thunk error: ', error);
    }
  };
};

// export const setRobots = () => {};

const initialState = {
  allRobots: [],
  robot: {
    projects: [],
  },
  newRobot: [],
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function robotsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_ROBOTS:
      return { ...state, allRobots: action.robots };
    case GOT_ROBOT:
      return { ...state, robot: action.robot };
    case ADD_ROBOT:
      return {
        ...state,
        allRobots: [...state.allRobots, action.newRobot],
        newRobot: [action.newRobot],
      };
    case DELETE_ROBOT:
      return {
        ...state,
        allRobots: [
          state.allRobots.filter((robot) => robot.id !== action.robot.id),
        ],
        robot: action.robot,
      };
    case UPDATE_ROBOT:
      return {
        ...state,
        robot: action.robot,
      };
    case UNASSIGN_ROBOT:
      return {
        ...state,
        robot: action.robot,
      };
    default:
      return state;
  }
}
