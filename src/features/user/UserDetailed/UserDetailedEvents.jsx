import React from 'react';
import { Card, Header, Image, Menu, Segment } from 'semantic-ui-react';

const UserDetailedEvents = () => {
	return (
		<Segment>
			<Header icon="calendar" content="Events" />
			<Menu secondary pointing>
				<Menu.Item name="All" active />
				<Menu.Item name="Past" />
				<Menu.Item name="Future" />
				<Menu.Item name="Hosted" />
			</Menu>

			<Card.Group itemsPerRow={5}>
				<Card>
					<Image src={'/assets/categoryImages/drinks.jpg'} />
					<Card.Content>
						<Card.Header textAlign="center">Event Title</Card.Header>
						<Card.Meta textAlign="center">
							28th March 2018 at 10:00 PM
						</Card.Meta>
					</Card.Content>
				</Card>

				<Card>
					<Image src={'/assets/categoryImages/drinks.jpg'} />
					<Card.Content>
						<Card.Header textAlign="center">Event Title</Card.Header>
						<Card.Meta textAlign="center">
							28th March 2018 at 10:00 PM
						</Card.Meta>
					</Card.Content>
				</Card>
			</Card.Group>
		</Segment>
	);
};

export default UserDetailedEvents;
