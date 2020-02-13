import { ADD_MEASURE, RESET_MEASURE } from "../actionTypes";

// TODO - cap size here? pop from front if > than x

const measures = (state = [], action) => {
    switch (action.type) {
      case ADD_MEASURE:
        const { measure } = action.payload;        
        return [
          ...state.slice(Math.max(state.length - 100, 0)), // trim to last 100
          measure
        ]   
      case RESET_MEASURE:
        return []; // reset to initial state
      default:
        return state;
    }
  }

  export default measures;