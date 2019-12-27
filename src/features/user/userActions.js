import cuid from 'cuid';
import { toastr } from 'react-redux-toastr';

import {
	asyncActionStart,
	asyncActionFinish,
	asyncActionError,
} from '../async/asyncActions';

export const updateProfile = user => async (
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

export const deletePhoto = photo => async (
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

export const setMainPhoto = photo => async (
	dispatch,
	getState,
	{ getFirebase },
) => {
	const firebase = getFirebase();
	try {
		await firebase.updateProfile({ photoURL: photo.url });
	} catch (error) {
		console.error(error);
		throw new Error('Problem setting main photo');
	}
};

export const goingToEvent = event => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore },
) => {
	const firestore = getFirestore();
	const firebase = getFirebase();
	const user = firebase.auth().currentUser;
	const profile = getState().firebase.profile;
	const attendee = {
		going: true,
		joinDate: firestore.FieldValue.serverTimestamp(),
		photoURL: profile.photoURL,
		displayName: profile.displayName,
		host: false,
	};

	try {
		await firestore.update(`events/${event.id}`, {
			[`attendees.${user.uid}`]: attendee,
		});
		await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
			eventId: event.id,
			userUid: user.uid,
			eventDate: event.date,
			host: false,
		});
		toastr.success('Success', 'You have signed up to this event');
	} catch (error) {
		console.error(error);
		toastr.error('Oops!', 'Problem signing up to this event. Please try again');
	}
};

export const cancelGoingToEvent = event => async (
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
		toastr.success('Success', 'You have remove yourself from this event');
	} catch (error) {
		console.error(error);
		toastr.error('Oops!', 'Could not cancel. Please try again');
	}
};
