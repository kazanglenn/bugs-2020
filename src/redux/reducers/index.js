import { combineReducers } from 'redux';
import measures from './measures';
import species from './species';
import control from './control';
import tracker from './tracker';

export default combineReducers({
  measures,
  species,
  control,
  tracker
});
