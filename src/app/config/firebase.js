import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDeuWQWXjxKYDN3NFV1m7-rQjnzt-Q1xVU',
	authDomain: 'codevents-8f00b.firebaseapp.com',
	databaseURL: 'https://codevents-8f00b.firebaseio.com',
	projectId: 'codevents-8f00b',
	storageBucket: 'codevents-8f00b.appspot.com',
	messagingSenderId: '810429825291',
	appId: '1:810429825291:web:ba05c48aaf3250f3d4e20e',
	measurementId: 'G-QNM7VT3RS6',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
