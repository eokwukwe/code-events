import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Card, Header, Image, Segment, Tab } from 'semantic-ui-react';


const UserDetailedEvents = ({ events, eventsLoading, changeTab }) => {
	const xtraSmall = window.innerWidth <= 520;
	const small = window.innerWidth > 520 && window.innerWidth <= 991;

	const panes = [
		{
			menuItem: 'All',
			render: () => (
				<Tab.Pane className="tab-content" loading={eventsLoading}>
					<TabContent />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Past',
			render: () => (
				<Tab.Pane className="tab-content" loading={eventsLoading}>
					<TabContent />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Future',
			render: () => (
				<Tab.Pane className="tab-content" loading={eventsLoading}>
					<TabContent />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Hosting',
			render: () => (
				<Tab.Pane className="tab-content" loading={eventsLoading}>
					<TabContent />
				</Tab.Pane>
			),
		},
	];

	const TabContent = () => (
		<Card.Group itemsPerRow={xtraSmall ? 2 : small ? 3 : 4}>
			{events &&
				events.map(event => (
					<Card as={Link} to={`/events/${event.id}`} key={event.id}>
						<Image src={`/assets/categoryImages/${event.category}.jpg`} />
						<Card.Content>
							<Card.Header
								style={{ fontSize: xtraSmall ? '1rem' : '1.3rem' }}
								textAlign="center"
							>
								{event.title}
							</Card.Header>
							<Card.Meta textAlign="center">
								<div style={{ fontSize: '0.8rem' }}>
									{event.date && format(event.date.toDate(), 'dd MMM yyyy')}
								</div>
								<div style={{ fontSize: '0.8rem' }}>
									{event.date && format(event.date.toDate(), 'h:mm a')}
								</div>
							</Card.Meta>
						</Card.Content>
					</Card>
				))}
		</Card.Group>
	);

	return (
		<Segment>
			<Header icon="calendar" content="Events" />
			<Tab
				onTabChange={(e, data) => changeTab(e, data)}
				panes={panes}
				menu={{ secondary: true, pointing: true }}
			/>
		</Segment>
	);
};

export default UserDetailedEvents;
