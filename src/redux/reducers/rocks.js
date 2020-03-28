import { SET_ROCKS } from "../actionTypes";
import { initRocks } from '../../components/Simulation/rocks';

// TODO - make init count a params
// TODO - pull width and height from props somehow
const rocks = (state = initRocks(20, 1000, 500), action) => {
  switch (action.type) {
    case SET_ROCKS:
      return action.payload.rocks;
    default:
      return state;
  }
}

export default rocks;