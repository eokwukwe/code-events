import cuid from 'cuid';
import { toastr } from 'react-redux-toastr';

import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/asyncActions';
import firebase from '../../app/config/firebase';
import { FETCH_USER_EVENTS } from '../events/eventConstants';

export const updateProfile = (user) => async (
  dispatch,
  getState,
  { getFirebase },
) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updatedUser } = user;
  try {
    // Update profile in firestore database
    await firebase.updateProfile(updatedUser);
    toastr.success('Success', 'Update updated');
  } catch (error) {
    console.error(error);
  }
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const imageName = cuid();
  // Path to store user images
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName,
  };

  try {
    dispatch(asyncActionStart());
    // upload file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    // get the url of image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
    // get user doc from firestore
    let userDoc = await firestore.get(`users/${user.uid}`);
    // check if user has photo, if not update profile
    if (!userDoc.data().photoURL) {
      // update profile in firestore
      await firebase.updateProfile({
        photoURL: downloadURL,
      });
      // update auth section in firebase
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }
    // create a new subcollection inside users collection to serve as the
    // storage area for user photos.
    await firestore.add(
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [
          {
            collection: 'photos',
          },
        ],
      },
      { name: imageName, url: downloadURL },
    );
    dispatch(asyncActionFinish());
  } catch (error) {
    console.error(error);
    dispatch(asyncActionError());
  }
};

export const deletePhoto = (photo) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore },
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    // delete file from firebase storage
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    // delete file from firestore
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'photos', doc: photo.id }],
    });
  } catch (error) {
    console.error(error);
    throw new Error('Problem deleting the photo');
  }
};

export const setMainPhoto = (photo) => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;
  const today = new Date();
  const userDocRef = firestore.collection('users').doc(user.uid);
  const eventAttendeeRef = firestore.collection('event_attendee');
  // Batch update of photos
  dispatch(asyncActionStart());
  try {
    const batch = firestore.batch();
    batch.update(userDocRef, { photoURL: photo.url });

    const eventQuery = await eventAttendeeRef
      .where('userUid', '==', user.uid)
      .where('eventDate', '>=', today);

    const eventQuerySnap = await eventQuery.get();

    for (let i = 0; i < eventQuerySnap.docs.length; i++) {
      let eventDocRef = await firestore
        .collection('events')
        .doc(eventQuerySnap.docs[i].data().eventId);

      let event = await eventDocRef.get();

      if (event.data().hostUid === user.uid) {
        batch.update(eventDocRef, {
          hostPhotoURL: photo.url,
          [`attendees.${user.uid}.photoURL`]: photo.url,
        });
      } else {
        batch.update(eventDocRef, {
          [`attendees.${user.uid}.photoURL`]: photo.url,
        });
      }
    }
    await batch.commit();
    dispatch(asyncActionFinish());
  } catch (error) {
    console.error(error);
    dispatch(asyncActionError());
    throw new Error('Problem setting main photo');
  }
};

export const goingToEvent = (event) => async (dispatch, getState) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;
  const profile = getState().firebase.profile;
  const attendee = {
    going: true,
    joinDate: new Date(),
    photoURL: profile.photoURL || '/assets/user.png',
    displayName: profile.displayName,
    host: false,
  };

  try {
    const eventDocRef = firestore.collection('events').doc(event.id);
    const eventAttendeeDocRef = firestore
      .collection('event_attendee')
      .doc(`${event.id}_${user.uid}`);

    // Transaction
    await firestore.runTransaction(async (transaction) => {
      await transaction.get(eventDocRef);
      await transaction.update(eventDocRef, {
        [`attendees.${user.uid}`]: attendee,
      });
      await transaction.set(eventAttendeeDocRef, {
        eventId: event.id,
        userUid: user.uid,
        eventDate: event.date,
        host: false,
      });
    });

    dispatch(asyncActionFinish());
    toastr.success('Success', 'You have signed up to this event');
  } catch (error) {
    console.error(error);
    dispatch(asyncActionError());
    toastr.error('Oops!', 'Problem signing up to this event. Please try again');
  }
};

export const cancelGoingToEvent = (event) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore },
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete(),
    });
    await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
    toastr.warning('Success', 'You have remove yourself from this event');
  } catch (error) {
    console.error(error);
    toastr.error('Oops!', 'Could not cancel. Please try again');
  }
};

export const getUserEvents = (userUid, activeTab) => async (
  dispatch,
  getState,
) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  const today = new Date(Date.now());
  const eventsRef = firestore.collection('event_attendee');
  let query;

  switch (activeTab) {
    case 1: // past evebts
      query = eventsRef
        .where('userUid', '==', userUid)
        .where('eventDate', '<=', today)
        .orderBy('eventDate', 'desc');
      break;
    case 2: // future events
      query = eventsRef
        .where('userUid', '==', userUid)
        .where('eventDate', '>=', today)
        .orderBy('eventDate');
      break;
    case 3: // hosted events
      query = eventsRef
        .where('userUid', '==', userUid)
        .where('host', '==', true)
        .orderBy('eventDate', 'desc');
      break;
    default:
      query = eventsRef
        .where('userUid', '==', userUid)
        .orderBy('eventDate', 'desc');
  }

  try {
    const querySnapshot = await query.get();
    let events = [];
    for (let i = 0; i < querySnapshot.docs.length; i++) {
      const event = await firestore
        .collection('events')
        .doc(querySnapshot.docs[i].data().eventId)
        .get();

      events.push({ ...event.data(), id: event.id });
    }

    dispatch({ type: FETCH_USER_EVENTS, payload: { events } });
    dispatch(asyncActionFinish());
  } catch (error) {
    console.error(error);
    dispatch(asyncActionError());
  }
};

export const followUser = (userToFollow) => async (
  dispatch,
  getState,
  { getFirestore },
) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;
  const following = {
    photoURL: userToFollow.photoURL || '/assets/user.png',
    city: userToFollow.city || 'Unknown City',
    displayName: userToFollow.displayName,
  };
  try {
    await firestore.set(
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'following', doc: userToFollow.id }],
      },
      following,
    );
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = (userToUnfollow) => async (
  dispatch,
  getState,
  { getFirestore },
) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;
  try {
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{ collection: 'following', doc: userToUnfollow.id }],
    });
  } catch (error) {
    console.error(error);
  }
};
