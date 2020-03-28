import { combineReducers } from 'redux';
import bugs from './bugs';
import algae from './algae';
import rocks from './rocks';
import measures from './measures';
import species from './species';
import control from './control';
import tracker from './tracker';
import parameters from './parameters';

export default combineReducers({
  rocks,
  algae,
  bugs,
  measures,
  species,
  control,
  tracker,
  parameters
});
