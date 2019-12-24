import { toastr } from 'react-redux-toastr';

export const updateProfile = user => async (
	dispatch,
	getState,
	{ getFirebase },
) => {
	const firebase = getFirebase();
	try {
    // Update profile in firestore database
		await firebase.updateProfile(user);
		toastr.success('Success', 'Update updated');
	} catch (error) {
		console.error(error);
	}
};
