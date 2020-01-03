import React from 'react';
import { Segment, Item, Icon, Button, List, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import LazyLoad from 'react-lazyload';

import EventListAttendee from './EventListAttendee';
import { objectToArray } from '../../../app/common/util/helpers';

const EventsListItem = ({ event }) => {
	return (
		<Segment.Group>
			<Segment>
				<Item.Group unstackable>
					<Item>
						<LazyLoad
							height={150}
							placeholder={
								<Item.Image size="tiny" circular src="/assets/user.png" />
							}
						>
							<Item.Image size="tiny" circular src={event.hostPhotoURL} />
						</LazyLoad>
						<Item.Content verticalAlign="middle">
							<Item.Header
								as={Link}
								to={`/events/${event.id}`}
								style={{ textTransform: 'capitalize' }}
							>
								{event.title}
							</Item.Header>
							<Item.Description>
								Hosted by{' '}
								<Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
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
						objectToArray(event.attendees).map(attendee => (
							<EventListAttendee key={attendee.id} attendee={attendee} />
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
