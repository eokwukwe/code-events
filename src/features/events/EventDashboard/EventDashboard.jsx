import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import EventList from '../EventList/EventList';
import { deleteEvent } from '../eventActions';

class EventDashboard extends Component {

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

const actions = { deleteEvent };

const mapStateToProps = state => ({ events: state.events });

export default connect(mapStateToProps, actions)(EventDashboard);
