import { SET_TRACKER } from "../actionTypes";

// init value
const initTracker = {
  ticks: 0,
  bugs: 0,
  algae: 0,
  totalBugs: 10,
  totalSpecies: 10
}

const tracker = (state = initTracker, action) => {
  switch (action.type) {
    case SET_TRACKER:
      return action.payload.tracker;
    default:
      return state;
  }
}

export default tracker;