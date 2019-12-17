import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import EventList from '../EventList/EventList';
import { deleteEvent } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

class EventDashboard extends Component {
	handleDeleteEvent = id => {
		this.props.deleteEvent(id);
	};

	render() {
		const { events, loading } = this.props;

		if (loading) return <LoadingComponent />
		return (
			<Grid stackable reversed="mobile" columns={2}>
				<Grid.Column width={10}>
					<EventList events={events} deleteEvent={this.handleDeleteEvent} />
				</Grid.Column>
				<Grid.Column width={6}>
					<EventActivity />
				</Grid.Column>
			</Grid>
		);
	}
}

const actions = { deleteEvent };

const mapStateToProps = state => ({
	events: state.events,
	loading: state.async.loading,
});

export default connect(mapStateToProps, actions)(EventDashboard);
