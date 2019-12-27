import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import EventList from '../EventList/EventList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

const EventDashboard = ({ events, requesting }) => {
	if (!isLoaded(events)) return <LoadingComponent />;
	return (
		<Grid stackable reversed="mobile" columns={2}>
			<Grid.Column width={10}>
				<EventList events={events} requesting={requesting} />
			</Grid.Column>
			<Grid.Column width={6}>
				<EventActivity />
			</Grid.Column>
		</Grid>
	);
};

const mapStateToProps = state => ({
	events: state.firestore.ordered.events,
});

export default connect(mapStateToProps)(
	firestoreConnect([{ collection: 'events' }])(EventDashboard),
);
