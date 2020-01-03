import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Card, Header, Image, Menu, Segment, Tab } from 'semantic-ui-react';

const panes = [
	{ menuItem: 'All', pane: { key: 'allEvents' } },
	{ menuItem: 'Past', pane: { key: 'pastEvents' } },
	{ menuItem: 'Future', pane: { key: 'futureEvents' } },
	{ menuItem: 'Hosting', pane: { key: 'hostedEvents' } },
];

const UserDetailedEvents = ({ events, eventsLoading, changeTab }) => {
	const xtraSmall = window.innerWidth <= 520;
	const small = window.innerWidth > 520 && window.innerWidth <= 991;

	return (
		<Segment loading={eventsLoading}>
			<Header icon="calendar" content="Events" />
			<Tab
				onTabChange={(e, data) => changeTab(e, data)}
				panes={panes}
				menu={{  pointing: true }}
			/>
			<br />
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
