import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

class EventDashboard extends Component {
	state = {
		isOpen: false,
	};

	handleIsOpenToggle = () => {
		this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
	};

	render() {
		const { isOpen } = this.state;
		const { events } = this.props;
		return (
			<Grid stackable columns={2}>
				<Grid.Column width={10}>
					<EventList events={events} />
				</Grid.Column>
				<Grid.Column width={6}>
					<Button
						onClick={this.handleIsOpenToggle}
						positive
						content="Create Event"
					/>
					{isOpen && <EventForm cancelFormInput={this.handleIsOpenToggle} />}
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = state => ({
	events: state.events,
});

export default connect(mapStateToProps)(EventDashboard);
