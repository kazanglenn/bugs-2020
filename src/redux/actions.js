import { ADD_MEASURE } from "./actionTypes";

export const addMeasure = measure => ({
  type: ADD_MEASURE,
  payload: {
    measure
  }
});
  