import React from 'react';
import { Segment, Item, Icon, Button, List, Label } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const EventsListItem = ({ event }) => {
	return (
		<Segment.Group>
			<Segment>
				<Item.Group unstackable>
					<Item>
						<Item.Image size="tiny" circular src={event.hostPhotoURL} />
						<Item.Content verticalAlign="middle">
							<Item.Header style={{ textTransform: 'capitalize' }}>
								{event.title}
							</Item.Header>
							<Item.Description>
								Hosted by <span>{event.hostedBy}</span>
							</Item.Description>
							{event.cancelled && (
								<Label
									style={{ top: '-40px' }}
									ribbon="right"
									color="red"
									content="Cancelled event"
								/>
							)}
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment>
				<span>
					<Icon name="clock" />
					{format(event.date.toDate(), 'EEE dd MMMM yyy')} at{' '}
					{format(event.date.toDate(), 'h:mm a')} |
					<Icon name="marker" /> {event.venue}
				</span>
			</Segment>
			<Segment secondary>
				<List horizontal>
					{event.attendees &&
						Object.values(event.attendees).map((attendee, index) => (
							<EventListAttendee key={index} attendee={attendee} />
						))}
				</List>
			</Segment>
			<Segment clearing>
				<div>{event.description}</div>
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
