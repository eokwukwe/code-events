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
	// Path to store user images
	const path = `${user.uid}/user_images`;
	const options = {
		name: fileName,
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
			{ name: fileName, url: downloadURL },
		);
		dispatch(asyncActionFinish());
	} catch (error) {
		console.error(error);
		dispatch(asyncActionError());
	}
};
