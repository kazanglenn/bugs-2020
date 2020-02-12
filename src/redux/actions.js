import { ADD_MEASURE, ADD_SPECIES_COUNT, RESET_MEASURE, RESET_SPECIES_COUNT, SET_CONTROL } from "./actionTypes";

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

export const resetMeasure = () => ({
  type: RESET_MEASURE
});

export const resetSpeciesCount = () => ({
  type: RESET_SPECIES_COUNT
});

export const setControl = control => ({
  type: SET_CONTROL,
  payload: {
    control
  }
});
