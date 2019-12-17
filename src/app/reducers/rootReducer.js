import { combineReducers } from 'redux';
import {reducer as FormReducer} from 'redux-form'
import eventReducer from '../../features/events/eventReducer';
import modalReducer from '../../features/modals/modalReducer';

const rootReducer = combineReducers({
  form: FormReducer,
  events: eventReducer,
  modals: modalReducer
});

export default rootReducer;
