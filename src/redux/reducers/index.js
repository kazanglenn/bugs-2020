import { combineReducers } from 'redux';
import bugs from './bugs';
import algae from './algae';
import measures from './measures';
import species from './species';
import control from './control';
import tracker from './tracker';
import parameters from './parameters';

export default combineReducers({
  bugs,
  algae,
  measures,
  species,
  control,
  tracker,
  parameters
});
