import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';

import { addEventComment } from '../eventActions';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedSidebar from './EventDetailedSidebar';
import { goingToEvent, cancelGoingToEvent } from '../../user/userActions';
import { objectToArray, createDataTree } from '../../../app/common/util/helpers';

class EventDetailedPage extends Component {
	async componentDidMount() {
		const { firestore, match } = this.props;
		await firestore.setListener(`events/${match.params.id}`);
	}

	async componentWillUnmount() {
		const { firestore, match } = this.props;
		await firestore.unsetListener(`events/${match.params.id}`);
	}

	render() {
		const {
			event,
			auth,
			goingToEvent,
			cancelGoingToEvent,
			addEventComment,
			eventChat,
		} = this.props;
		const attendees =
			event && event.attendees && objectToArray(event.attendees);
		const isHost = event.hostUid === auth.uid;
		const isGoing = attendees && attendees.some(a => a.id === auth.uid);
		const chatTree = !isEmpty(eventChat) && createDataTree(eventChat)

		return (
			<Grid stackable reversed="mobile" columns={2}>
				<Grid.Column width={10}>
					<EventDetailedHeader
						event={event}
						isGoing={isGoing}
						isHost={isHost}
						goingToEvent={goingToEvent}
						cancelGoingToEvent={cancelGoingToEvent}
					/>
					<EventDetailedInfo event={event} />
					<EventDetailedChat
						addEventComment={addEventComment}
						eventId={event.id}
						eventChat={chatTree}
					/>
				</Grid.Column>
				<Grid.Column width={6}>
					<EventDetailedSidebar attendees={attendees} />
				</Grid.Column>
			</Grid>
		);
	}
}

const actions = { goingToEvent, cancelGoingToEvent, addEventComment };

const mapStateToProps = (state, ownProps) => {
	const eventId = ownProps.match.params.id;
	let event = {};
	if (
		state.firestore.ordered.events &&
		state.firestore.ordered.events.length > 0
	) {
		event =
			state.firestore.ordered.events.filter(event => event.id === eventId)[0] ||
			{};
	}
	return {
		event,
		auth: state.firebase.auth,
		eventChat:
			!isEmpty(state.firebase.data.event_chat) &&
			objectToArray(state.firebase.data.event_chat[eventId]),
	};
};

export default compose(
	withFirestore,
	connect(mapStateToProps, actions),
	firebaseConnect(props => [`event_chat/${props.match.params.id}`]),
)(EventDetailedPage);
