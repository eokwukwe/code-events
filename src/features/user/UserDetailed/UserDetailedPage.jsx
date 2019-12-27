import React from 'react';
import { Grid } from 'semantic-ui-react';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import UserDetailedBio from './UserDetailedBio';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedEvents from './UserDetailedEvents';
import { userDetailedQuery } from '../userQueries';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const UserDetailedPage = ({ profile, photos, auth, match, requesting }) => {
	const large = window.innerWidth > 520;
	const isCurrentUser = auth.uid === match.params.id;
	const loading = Object.values(requesting).some(a => a === true);

	if (loading) return <LoadingComponent />;

	return (
		<Grid>
			<Grid.Column width={16}>
				<UserDetailedBio
					profile={profile}
					large={large}
					isCurrentUser={isCurrentUser}
				/>
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
		requesting: state.firestore.status.requesting,
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid)),
)(UserDetailedPage);
