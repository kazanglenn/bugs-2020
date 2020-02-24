import { 
  ADD_MEASURE, RESET_MEASURE, 
  ADD_SPECIES_COUNT, RESET_SPECIES_COUNT,
  SET_CONTROL,
  SET_TRACKER, 
  SET_PARAMETERS, RESET_PARAMETERS 
} from "./actionTypes";

export const addMeasure = measure => ({
  type: ADD_MEASURE,
  payload: {
    measure
  }
});

export const resetMeasure = () => ({
  type: RESET_MEASURE
});

export const addSpeciesCount = species => ({
  type: ADD_SPECIES_COUNT,
  payload: {
    species
  }
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

export const setTracker = tracker => ({
  type: SET_TRACKER,
  payload: {
    tracker
  }
});

export const setParameters = parameters => ({
  type: SET_PARAMETERS,
  payload: {
    parameters
  }
});

export const resetParameters = () => ({
  type: RESET_PARAMETERS
});
