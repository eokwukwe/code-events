import { LOGIN_USER, LOG_OUT_USER } from './authConstants';

export const login = credentials => ({
	type: LOGIN_USER,
	payload: { credentials },
});

export const logout = () => ({
	type: LOG_OUT_USER,
});
