import axios from 'axios';

// ACTION TYPES
const GOT_ALL_ROBOTS = 'GOT_ALL_ROBOTS';
const GOT_ROBOT = 'GOT_ROBOT';

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

// export const setRobots = () => {};

const initialState = {
  allRobots: [],
  robot: {
    projects: [],
  },
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function robotsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_ROBOTS:
      return { ...state, allRobots: action.robots };
    case GOT_ROBOT:
      return { ...state, robot: action.robot };
    default:
      return state;
  }
}
