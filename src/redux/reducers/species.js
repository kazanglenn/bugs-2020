import { ADD_SPECIES_COUNT, RESET_SPECIES_COUNT } from "../actionTypes";

const species = (state = [], action) => {
    switch (action.type) {
      case ADD_SPECIES_COUNT:
        return [
          // cap size here, pop from front if > than x
          ...state.slice(Math.max(state.length - 100, 0)),
          action.payload.species
        ]
      case RESET_SPECIES_COUNT:
        return []; // reset to initial state
      default:
        return state;
    }
  }

  export default species;