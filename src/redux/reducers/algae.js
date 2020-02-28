import { SET_ALGAE, ADD_ALGAE, DELETE_ALGAE } from "../actionTypes";
import { initAlgae } from '../../components/Simulation/algae';

// TODO - make init count a params
const algae = (state = initAlgae(500), action) => {
  switch (action.type) {
    case SET_ALGAE:
      return action.payload.algae;
    case ADD_ALGAE:
      return [
        ...state,
        action.payload.algae
      ]
    case DELETE_ALGAE:
      return state.filter((value, index, arr) => {
        // false if the UUID is item we want to remove
        return value.id !== action.payload.algae.id;
      });
    default:
      return state;
  }
}

export default algae;