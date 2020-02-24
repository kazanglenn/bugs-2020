import { SET_PARAMETERS, RESET_PARAMETERS } from "../actionTypes";

// init value
const initParameters = {
  maxBugs: 200,
  breedingCost: 100,
  maxAlgae: 800,
  algaeBreedThreshold: 100,
  sampleInterval: 100 // number of ticks before counting species
}

const parameters = (state = initParameters, action) => {
  switch (action.type) {
    case SET_PARAMETERS:
      return Object.assign({}, action.payload.parameters);
    case RESET_PARAMETERS:
      return Object.assign({}, initParameters);
    default:
      return state;
  }
}

export default parameters;