import { toastr } from 'react-redux-toastr';

import firebase from '../../app/config/firebase';
import { createNewEvent } from '../../app/common/util/helpers';
import { FETCH_EVENTS } from './eventConstants';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/asyncActions';

export const createEvent = (event) => async (
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
    dispatch(asyncActionStart());
    let createdEvent = await firestore.add('events', newEvent);
    // create a lookup table for events
    await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
      eventId: createdEvent.id,
      userUid: user.uid,
      eventDate: event.date,
      host: true,
    });
    toastr.success('Success!', 'Event has been created');
    dispatch(asyncActionFinish());
    return createdEvent;
  } catch (error) {
    dispatch(asyncActionError());
    toastr.error('Oops', 'Something went wrong');
  }
};

export const updateEvent = (event) => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  try {
    dispatch(asyncActionStart());
    const eventDocRef = firestore.collection('events').doc(event.id);
    const dateEqual = getState().firestore.ordered.events[0].date.isEqual(
      event.date,
    );
    if (!dateEqual) {
      const batch = firestore.batch();
      batch.update(eventDocRef, event);

      const eventAttendeeRef = firestore.collection('event_attendee');
      const eventAttendeeQuery = await eventAttendeeRef.where(
        'eventId',
        '==',
        event.id,
      );

      const eventAttendeeSnap = await eventAttendeeQuery.get();
      for (let i = 0; i < eventAttendeeSnap.docs.length; i++) {
        const eventAttendeeDocRef = firestore
          .collection('event_attendee')
          .doc(eventAttendeeSnap.docs[i].id);

        batch.update(eventAttendeeDocRef, { eventDate: event.date });
      }

      await batch.commit();
    } else {
      await eventDocRef.update(event);
    }
    // await firestore.update(`events/${event.id}`, event);
    dispatch(asyncActionFinish());
    toastr.success('Success!', 'Event has been updated');
  } catch (error) {
    dispatch(asyncActionError());
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

export const getEventsForDashboard = (lastEvent) => async (
  dispatch,
  getState,
) => {
  const today = new Date();
  const firestore = firebase.firestore();
  const eventsRef = firestore.collection('events');
  try {
    dispatch(asyncActionStart());
    const startAfter =
      lastEvent &&
      (await firestore.collection('events').doc(lastEvent.id).get());

    const query = lastEvent
      ? eventsRef
          .where('date', '>=', today)
          .orderBy('date')
          .startAfter(startAfter)
          .limit(3)
      : eventsRef.where('date', '>=', today).orderBy('date').limit(3);

    const querySnapshots = await query.get();
    if (querySnapshots.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnapshots;
    }

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
    return querySnapshots;
  } catch (error) {
    console.error(error);
    dispatch(asyncActionError());
  }
};

export const addEventComment = (eventId, values, parentId) => async (
  dispatch,
  getState,
  { getFirebase },
) => {
  const firebase = getFirebase();
  const profile = getState().firebase.profile;
  const user = firebase.auth().currentUser;
  let newComment = {
    parentId,
    displayName: profile.displayName,
    photoURL: profile.photoURL || '/assets/user.png',
    uid: user.uid,
    text: values.comment,
    date: Date.now(),
  };
  try {
    await firebase.push(`event_chat/${eventId}`, newComment);
  } catch (error) {
    console.error(error);
    toastr.error('Oops!', 'Problem adding comment');
  }
};
