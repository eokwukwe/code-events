import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import EventList from '../EventList/EventList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';
import { getEventsForDashboard } from '../eventActions';

class EventDashboard extends Component {
	state = {
		moreEvents: false,
		loadingInitial: true,
		loadedEvents: [],
	};

	async componentDidMount() {
		const next = await this.props.getEventsForDashboard();
		if (next && next.docs && next.docs.length > 1) {
			this.setState({
				moreEvents: true,
				loadingInitial: false,
			});
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.events !== this.props.events) {
			this.setState({
				loadedEvents: [...this.state.loadedEvents, ...this.props.events],
			});
		}
	}

	getNextEvents = async () => {
		const { events } = this.props;
		let lastEvent = events && events[events.length - 1];
		const next = await this.props.getEventsForDashboard(lastEvent);
		if (next && next.docs && next.docs.length <= 1) {
			this.setState({
				moreEvents: false,
			});
		}
	};

	render() {
		const { loading } = this.props;
		const { moreEvents, loadingInitial, loadedEvents } = this.state;

		if (loadingInitial) return <LoadingComponent />;

		return (
			<Grid stackable reversed="mobile" columns={2}>
				<Grid.Column width={10}>
					<EventList events={loadedEvents} />
					<Button
						onClick={this.getNextEvents}
						disabled={!moreEvents}
						loading={loading}
						content="More"
						color="green"
						floated="right"
					/>
				</Grid.Column>
				<Grid.Column width={6}>
					<EventActivity />
				</Grid.Column>
			</Grid>
		);
	}
}

const actions = { getEventsForDashboard };

const mapStateToProps = state => ({
	events: state.events,
	loading: state.async.loading,
});

export default connect(
	mapStateToProps,
	actions,
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
