import React, { Component } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createEvent, updateEvent, deleteEvent } from '../eventActions';

class EventForm extends Component {
	state = { ...this.props.event };

	componentDidMount() {
		if (this.props.selectedEvent !== null) {
			this.setState({
				...this.props.selectedEvent,
			});
		}
	}

	handleInputChange = ({ target: { name, value } }) => {
		this.setState({
			[name]: value,
		});
	};

	handleFormSubmit = e => {
		e.preventDefault();
		if (this.state.id) {
			this.props.updateEvent(this.state);
		} else {
			this.props.createEvent(this.state);
		}
	};

	render() {
		const { title, date, city, venue, hostedBy } = this.state;
		return (
			<Grid centered>
				<Grid.Column mobile={16} tablet={10} computer={8}>
					<Segment>
						<Form onSubmit={this.handleFormSubmit}>
							<Form.Field>
								<label>Event Title</label>
								<input
									onChange={this.handleInputChange}
									value={title}
									name="title"
									placeholder="Event Title"
								/>
							</Form.Field>
							<Form.Field>
								<label>Event Date</label>
								<input
									onChange={this.handleInputChange}
									value={date}
									type="date"
									name="date"
									placeholder="Event Date"
								/>
							</Form.Field>
							<Form.Field>
								<label>City</label>
								<input
									onChange={this.handleInputChange}
									value={city}
									name="city"
									placeholder="City event is taking place"
								/>
							</Form.Field>
							<Form.Field>
								<label>Venue</label>
								<input
									onChange={this.handleInputChange}
									value={venue}
									name="venue"
									placeholder="Enter the Venue of the event"
								/>
							</Form.Field>
							<Form.Field>
								<label>Hosted By</label>
								<input
									onChange={this.handleInputChange}
									value={hostedBy}
									name="hostedBy"
									placeholder="Enter the name of person hosting"
								/>
							</Form.Field>
							<Button positive type="submit">
								Submit
							</Button>
							<Button onClick={this.props.history.goBack} type="button">
								Cancel
							</Button>
						</Form>
					</Segment>
				</Grid.Column>
			</Grid>
		);
	}
}

const actions = { createEvent, updateEvent, deleteEvent };

const mapStateToProps = (state, ownProps) => {
	const eventId = ownProps.match.params.id;
	let event = {
		title: '',
		date: '',
		city: '',
		venue: '',
		hostedBy: '',
	};
	if (eventId && state.events.length > 0) {
		event = state.events.filter(event => event.id === eventId)[0];
	}
	return { event };
};

export default connect(mapStateToProps, actions)(EventForm);
