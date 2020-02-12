import { ADD_MEASURE, RESET_MEASURE } from "../actionTypes";

const measures = (state = [], action) => {
    switch (action.type) {
      case ADD_MEASURE:
        const { measure } = action.payload;
        return state.concat(measure);        
      case RESET_MEASURE:
        return []; // reset to initial state
      default:
        return state;
    }
  }

  export default measures;