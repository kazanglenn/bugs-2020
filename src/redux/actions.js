import { ADD_MEASURE, ADD_SPECIES_COUNT } from "./actionTypes";

export const addMeasure = measure => ({
  type: ADD_MEASURE,
  payload: {
    measure
  }
});

export const addSpeciesCount = species => ({
  type: ADD_SPECIES_COUNT,
  payload: {
    species
  }
});
