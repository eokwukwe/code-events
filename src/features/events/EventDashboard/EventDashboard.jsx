import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import EventList from '../EventList/EventList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

const EventDashboard = ({ events, loading }) => {
	if (loading) return <LoadingComponent />;
	return (
		<Grid stackable reversed="mobile" columns={2}>
			<Grid.Column width={10}>
				<EventList events={events} />
			</Grid.Column>
			<Grid.Column width={6}>
				<EventActivity />
			</Grid.Column>
		</Grid>
	);
};

const mapStateToProps = state => ({
	events: state.firestore.ordered.events,
	loading: state.async.loading,
});

export default connect(mapStateToProps)(
	firestoreConnect([{ collection: 'events' }])(EventDashboard),
);
