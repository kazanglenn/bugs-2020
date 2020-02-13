import { ADD_SPECIES_COUNT, RESET_SPECIES_COUNT } from "../actionTypes";

// TODO - cap size here? pop from front if > than x

const species = (state = [], action) => {
    switch (action.type) {
      case ADD_SPECIES_COUNT:
        return state.concat(action.payload.species);
      case RESET_SPECIES_COUNT:
        return []; // reset to initial state
      default:
        return state;
    }
  }

  export default species;