import { SET_PARAMETERS, RESET_PARAMETERS } from "../actionTypes";

// init value
const initParameters = {
  maxBugs: 250,
  breedingCost: 200,
  maxAlgae: 1500,
  algaeBreedThreshold: 100,
  sampleInterval: 100, // number of ticks before counting species and other metrics taken
  mutationRate: 10, // 1 in n chance of mutation taking place, lower the number, higher the rate
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