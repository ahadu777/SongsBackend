import { combineReducers } from 'redux';
import songReducer from './songSlice';

const rootReducer = combineReducers({
  songs: songReducer,
});

export default rootReducer;
