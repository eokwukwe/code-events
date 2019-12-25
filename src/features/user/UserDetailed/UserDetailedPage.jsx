import React from 'react';
import { Grid } from 'semantic-ui-react';
import UserDetailedBio from './UserDetailedBio';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedEvents from './UserDetailedEvents';

const UserDetailedPage = () => {
	const large = window.innerWidth > 520;
	return (
		<Grid>
			<Grid.Column width={16}>
				<UserDetailedBio large={large} />
			</Grid.Column>

			<Grid.Column width={16}>
				<UserDetailedPhotos />
			</Grid.Column>

			<Grid.Column width={16}>
				<UserDetailedEvents />
			</Grid.Column>
		</Grid>
	);
};

export default UserDetailedPage;
