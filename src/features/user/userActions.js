import { toastr } from 'react-redux-toastr';

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
