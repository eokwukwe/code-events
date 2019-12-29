import { toastr } from 'react-redux-toastr';

import firebase from '../../app/config/firebase';
import { createNewEvent } from '../../app/common/util/helpers';
import { FETCH_EVENTS } from './eventConstants';
import {
	asyncActionStart,
	asyncActionFinish,
	asyncActionError,
} from '../async/asyncActions';

export const createEvent = event => async (
	dispatch,
	getState,
	{ getFirestore, getFirebase },
) => {
	const firestore = getFirestore();
	const firebase = getFirebase();
	const user = firebase.auth().currentUser;
	// get user profile photo
	const photoURL = getState().firebase.profile.photoURL;
	const newEvent = createNewEvent(user, photoURL, event);
	try {
		let createdEvent = await firestore.add('events', newEvent);
		// create a lookup table for events
		await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
			eventId: createdEvent.id,
			userUid: user.uid,
			eventDate: event.date,
			host: true,
		});
		toastr.success('Success!', 'Event has been created');
		return createdEvent;
	} catch (error) {
		console.error(error);
		toastr.error('Oops', 'Something went wrong');
	}
};

export const updateEvent = event => async (
	dispatch,
	getState,
	{ getFirestore },
) => {
	const firestore = getFirestore();
	try {
		await firestore.update(`events/${event.id}`, event);
		toastr.success('Success!', 'Event has been updated');
	} catch (error) {
		toastr.error('Oops', 'Something went wrong');
	}
};

export const cancelToggle = (cancelled, eventId) => async (
	dispatch,
	getState,
	{ getFirestore },
) => {
	const firestore = getFirestore();
	const message = cancelled
		? 'Are you sure you want to cancel this event?'
		: 'This will reactivate this event. Are you sure?';
	try {
		toastr.confirm(message, {
			onOk: async () => {
				await firestore.update(`events/${eventId}`, {
					cancelled: cancelled,
				});
				return cancelled
					? toastr.success('Success', 'Event cancelled')
					: toastr.success('Success', 'Event Reactivated');
			},
		});
	} catch (error) {
		console.error(error);
	}
};

export const getEventsForDashboard = () => async (dispatch, getState) => {
	let today = new Date();
	const firestore = firebase.firestore();
	const eventsQuery = firestore.collection('events').where('date', '>=', today);
	try {
		dispatch(asyncActionStart());
		let querySnapshots = await eventsQuery.get();
		let events = [];
		for (let i = 0; i < querySnapshots.docs.length; i++) {
			let event = {
				...querySnapshots.docs[i].data(),
				id: querySnapshots.docs[i].id,
			};
			events.push(event);
		}
		dispatch({ type: FETCH_EVENTS, payload: { events } });
		dispatch(asyncActionFinish());
	} catch (error) {
		console.error(error);
		dispatch(asyncActionError());
	}
};
