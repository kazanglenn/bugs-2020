import { ADD_SPECIES_COUNT } from "../actionTypes";

const species = (state = [], action) => {
    switch (action.type) {
      case ADD_SPECIES_COUNT:
        return state.concat(action.payload.species);
      default:
        return state;
    }
  }

  export default species;