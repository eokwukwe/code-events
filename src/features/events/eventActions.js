import {
	UPDATE_EVENT,
	DELETE_EVENT,
	FETCH_EVENTS,
} from './eventConstants';
import {
	asyncActionStart,
	asyncActionFinish,
	asyncActionError,
} from '../async/asyncActions';
import { fetchSampleData } from '../../app/data/mockApi';
import { toastr } from 'react-redux-toastr';
import { createNewEvent } from '../../app/common/util/helpers';

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

export const updateEvent = event => {
	return async dispatch => {
		try {
			dispatch({
				type: UPDATE_EVENT,
				payload: { event },
			});
			toastr.success('Success!', 'Event has been updated');
		} catch (error) {
			toastr.error('Oops', 'Something went wrong');
		}
	};
};

export const deleteEvent = eventId => ({
	type: DELETE_EVENT,
	payload: { eventId },
});

export const loadEvents = () => {
	return async dispatch => {
		try {
			dispatch(asyncActionStart());
			const events = await fetchSampleData();
			dispatch({ type: FETCH_EVENTS, payload: { events } });
			dispatch(asyncActionFinish());
		} catch (error) {
			console.error(error);
			dispatch(asyncActionError());
		}
	};
};
