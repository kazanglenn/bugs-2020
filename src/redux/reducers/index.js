import { combineReducers } from 'redux';
import measures from './measures';
import species from './species';

export default combineReducers({
  measures,
  species
});
