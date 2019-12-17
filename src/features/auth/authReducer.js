import { createReducer } from '../../app/common/util/reducerUtils';
import { LOGIN_USER, LOG_OUT_USER } from './authConstants';

const initialState = {
	authenticated: false,
	currentUser: null,
};

const loginUser = (state, payload) => ({
	authenticated: true,
	currentUser: payload.credentials.email,
});

const logoutUser = () => ({
	authenticated: false,
	currentUser: null,
});

export default createReducer(initialState, {
	[LOGIN_USER]: loginUser,
	[LOG_OUT_USER]: logoutUser,
});
