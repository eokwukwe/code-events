import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Card, Header, Image, Menu, Segment } from 'semantic-ui-react';

const UserDetailedEvents = ({ events, eventsLoading }) => {
	const xtraSmall = window.innerWidth <= 520;
	const small = window.innerWidth > 520 && window.innerWidth <= 991;

	return (
		<Segment loading={eventsLoading}>
			<Header icon="calendar" content="Events" />
			<Menu secondary pointing>
				<Menu.Item name="All" active />
				<Menu.Item name="Past" />
				<Menu.Item name="Future" />
				<Menu.Item name="Hosted" />
			</Menu>

			<Card.Group itemsPerRow={xtraSmall ? 2 : small ? 3 : 4}>
				{events &&
					events.map(event => (
						<Card as={Link} to={`/events/${event.id}`} key={event.id}>
							<Image src={`/assets/categoryImages/${event.category}.jpg`} />
							<Card.Content>
								<Card.Header textAlign="center">{event.title}</Card.Header>
								<Card.Meta textAlign="center">
									<div>
										{event.date && format(event.date.toDate(), 'dd MMM yyyy')}
									</div>
									<div>
										{event.date && format(event.date.toDate(), 'h:mm a')}
									</div>
								</Card.Meta>
							</Card.Content>
						</Card>
					))}
			</Card.Group>
		</Segment>
	);
};

export default UserDetailedEvents;
