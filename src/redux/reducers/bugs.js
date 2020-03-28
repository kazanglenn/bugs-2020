import { SET_BUGS, ADD_BUG, DELETE_BUG, UPDATE_BUG } from "../actionTypes";
import { initBugs } from '../../components/Simulation/bugs';

// TODO - make init count a param
// TODO - pull width and height from props somehow
const bugs = (state = initBugs(10, 1000, 500), action) => {
  switch (action.type) {
    case SET_BUGS:
      return action.payload.bugs; // which will be an array in this case
    case ADD_BUG:
      return [
        ...state,
        action.payload.bug
      ]
    case DELETE_BUG:
      return state.filter((value, index, arr) => {
        // false if the UUID of the bug we want to get rid of
        return value.geneology.id !== action.payload.bug.geneology.id;
      });
    case UPDATE_BUG:
      return state.map(function(item) { return item.geneology.id === action.payload.bug.geneology.id ? action.payload.bug : item; });
    default:
      return state;
  }
}

export default bugs;