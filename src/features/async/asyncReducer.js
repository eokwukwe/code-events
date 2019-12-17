import { createReducer } from '../../app/common/util/reducerUtils';
import {
	ASYNC_ACTION_START,
	ASYNC_ACTION_FINISH,
	ASYNC_ACTION_ERROR,
} from './asyncContants';

const initialState = { loading: false, elementName: null };

const asyncActionStarted = (state, payload) => ({
	...state,
	loading: true,
	elementName: payload,
});

const asyncActionFinished = state => ({
	...state,
	loading: false,
	elementName: null,
});

const asyncActionError = state => ({
	...state,
	loading: false,
	elementName: null,
});

export default createReducer(initialState, {
	[ASYNC_ACTION_START]: asyncActionStarted,
	[ASYNC_ACTION_FINISH]: asyncActionFinished,
	[ASYNC_ACTION_ERROR]: asyncActionError,
});
