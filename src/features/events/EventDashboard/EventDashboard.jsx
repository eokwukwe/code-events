import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import cuid from 'cuid'
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import { createEvent, updateEvent, deleteEvent } from '../eventActions';

class EventDashboard extends Component {
	state = { isOpen: false, selectedEvent: null };

	handleCreateFormOpen = () =>
		this.setState(() => ({ isOpen: true, selectedEvent: null }));

	handleCreateFormCancel = () => this.setState(() => ({ isOpen: false }));

	handleSelectEvent = event => {
		this.setState({
			selectedEvent: event,
			isOpen: true,
		});
	};

	handleCreateEvent = newEvent => {
		newEvent.id = cuid();
		newEvent.hostPhotoURL = '/assets/user.png'
		this.props.createEvent(newEvent);
		this.setState(() => ({
			isOpen: false,
		}));
	}

	handleUpdateEvent = updatedEvent => {
		this.props.updateEvent(updatedEvent);
		this.setState(({ events }) => ({
			isOpen: false,
			selectedEvent: null,
		}));
	};

	handleDeleteEvent = id => {
		this.props.deleteEvent(id);
	};

	render() {
		const { isOpen, selectedEvent } = this.state;
		const { events } = this.props;
		return (
			<Grid stackable columns={2}>
				<Grid.Column width={10}>
					<EventList
						events={events}
						selectedEvent={selectedEvent}
						selectEvent={this.handleSelectEvent}
						deleteEvent={this.handleDeleteEvent}
					/>
				</Grid.Column>
				<Grid.Column width={6}>
					<Button
						onClick={this.handleCreateFormOpen}
						positive
						content="Create Event"
					/>
					{isOpen && (
						<EventForm
							cancelFormInput={this.handleCreateFormCancel}
							updateEvent={this.handleUpdateEvent}
							createEvent={this.handleCreateEvent}
							selectedEvent={selectedEvent}
						/>
					)}
				</Grid.Column>
			</Grid>
		);
	}
}

const actions = { createEvent, updateEvent, deleteEvent };

const mapStateToProps = state => ({ events: state.events });

export default connect(mapStateToProps, actions)(EventDashboard);
