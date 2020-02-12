import { SET_CONTROL } from "../actionTypes";

// set initial state
const control = (state = "PLAY", action) => {
    switch (action.type) {
      case SET_CONTROL:
        return action.payload.control;
      default:
        return state;
    }
  }

  export default control;