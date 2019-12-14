import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import EventList from '../EventList/EventList';
import { createEvent, updateEvent, deleteEvent } from '../eventActions';

class EventDashboard extends Component {
	handleCreateEvent = newEvent => {
		newEvent.id = cuid();
		newEvent.hostPhotoURL = '/assets/user.png';
		this.props.createEvent(newEvent);
	};

	handleUpdateEvent = updatedEvent => {
		this.props.updateEvent(updatedEvent);
	};

	handleDeleteEvent = id => {
		this.props.deleteEvent(id);
	};

	render() {
		const { events } = this.props;
		return (
			<Grid stackable columns={2}>
				<Grid.Column width={10}>
					<EventList events={events} deleteEvent={this.handleDeleteEvent} />
				</Grid.Column>
				<Grid.Column width={6}>
					<h2>Activities Feed</h2>
				</Grid.Column>
			</Grid>
		);
	}
}

const actions = { createEvent, updateEvent, deleteEvent };

const mapStateToProps = state => ({ events: state.events });

export default connect(mapStateToProps, actions)(EventDashboard);
