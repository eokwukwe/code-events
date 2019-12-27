import React from 'react';
import { Grid } from 'semantic-ui-react';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import UserDetailedBio from './UserDetailedBio';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedEvents from './UserDetailedEvents';
import { userDetailedQuery } from '../userQueries';

const UserDetailedPage = ({ profile, photos, loading }) => {
	const large = window.innerWidth > 520;
	return (
		<Grid>
			<Grid.Column width={16}>
				<UserDetailedBio profile={profile} large={large} />
			</Grid.Column>

			<Grid.Column width={16}>
				<UserDetailedPhotos photos={photos} />
			</Grid.Column>

			<Grid.Column width={16}>
				<UserDetailedEvents />
			</Grid.Column>
		</Grid>
	);
};

const mapStateToProps = (state, ownProps) => {
	let userUid = null;
	let profile = {};

	if (ownProps.match.params.id === state.firebase.auth.uid) {
		profile = state.firebase.profile;
	} else {
		profile =
			!isEmpty(state.firestore.ordered.profile) &&
			state.firestore.ordered.profile[0];
		userUid = ownProps.match.params.id;
	}
	return {
		profile,
		userUid,
		auth: state.firebase.auth,
		photos: state.firestore.ordered.photos,
		loading: state.async.loading,
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid)),
)(UserDetailedPage);
