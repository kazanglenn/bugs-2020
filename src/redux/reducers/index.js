import { combineReducers } from 'redux';
import measures from './measures';
import species from './species';
import control from './control';

export default combineReducers({
  measures,
  species,
  control
});
