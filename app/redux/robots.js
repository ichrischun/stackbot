import axios from 'axios';

// ACTION TYPES
const GOT_ALL_ROBOTS = 'GOT_ALL_ROBOTS';

// ACTION CREATORS
const gotAllRobots = (robots) => {
  return {
    type: GOT_ALL_ROBOTS,
    robots,
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

export const setRobots = () => {};

const initialState = {
  allRobots: [],
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function robotsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_ROBOTS:
      return { ...state, allRobots: action.robots };
    default:
      return state;
  }
}
