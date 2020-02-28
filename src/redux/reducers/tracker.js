import { SET_TRACKER } from "../actionTypes";

// init value
const initTracker = {
  ticks: 0,
  bugs: 0,
  algae: 0,
  totalBugs: 5,
  totalSpecies: 5
}

const tracker = (state = initTracker, action) => {
  switch (action.type) {
    case SET_TRACKER:
      return Object.assign({}, action.payload.tracker);
    default:
      return state;
  }
}

export default tracker;