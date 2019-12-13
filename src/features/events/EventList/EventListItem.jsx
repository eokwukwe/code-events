import React from 'react';
import { Segment, Item, Icon, Button, List } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';

const EventsListItem = ({ event, selectEvent, deleteEvent }) => {
	return (
		<Segment.Group>
			<Segment>
				<Item.Group>
					<Item>
						<Item.Image size="tiny" circular src={event.hostPhotoURL} />
						<Item.Content>
							<Item.Header>{event.title}</Item.Header>
							<Item.Description>
								Hosted by <span>{event.hostedBy}</span>
							</Item.Description>
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment>
				<span>
					<Icon name="clock" /> {event.date} |
					<Icon name="marker" /> {event.venue}
				</span>
			</Segment>
			<Segment secondary>
				<List horizontal>
					{event.attendees && event.attendees.map(attendee => (
						<EventListAttendee key={attendee.id} attendee={attendee} />
					))}
				</List>
			</Segment>
			<Segment clearing>
				<span>{event.description}</span>
				<Button
					onClick={() => deleteEvent(event.id)}
					color="red"
					size="mini"
					floated="right"
					content="Delete"
				/>
				<Button
					size="mini"
					as={Link}
					to={`/events/${event.id}`}
					color="teal"
					floated="right"
					content="View"
				/>
			</Segment>
		</Segment.Group>
	);
};

export default EventsListItem;
