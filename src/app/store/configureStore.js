import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers/rootReducer';
import firebase from '../config/firebase'

const reactReduxFirbaseConfig = {
	userProfile: 'users',
	attachAuthIsReady: true,
	useFirestoreForProfile: true,
	updateProfileOnLogin: false
};

export const configureStore = () => {
	const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
	const composeEhancer = composeWithDevTools(
		applyMiddleware(...middlewares),
		reactReduxFirebase(firebase, reactReduxFirbaseConfig),
		reduxFirestore(firebase),
	);
	const store = createStore(rootReducer, composeEhancer);
	return store;
};
