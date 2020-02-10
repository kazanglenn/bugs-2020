import { ADD_MEASURE } from "../actionTypes";

const measures = (state = [], action) => {
    switch (action.type) {
      case ADD_MEASURE:
        const { measure } = action.payload;
        return state.concat(measure);
      default:
        return state;
    }
  }

  export default measures;