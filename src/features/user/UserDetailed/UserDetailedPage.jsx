import React from 'react';
import { Grid } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import UserDetailedBio from './UserDetailedBio';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedEvents from './UserDetailedEvents';

const UserDetailedPage = ({profile, photos, loading}) => {
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

const mapStateToProps = (state, ownProps) => ({
	userId: ownProps.match.params.id,
	profile: state.firebase.profile,
	photos: state.firestore.ordered.photos,
	loading: state.async.loading,
});

const query = ({ userId }) => [
	{
		collection: 'users',
		doc: userId,
		subcollections: [{ collection: 'photos' }],
		storeAs: 'photos',
	},
];

export default compose(
	connect(mapStateToProps),
	firestoreConnect(userId => query(userId)),
)(UserDetailedPage);
