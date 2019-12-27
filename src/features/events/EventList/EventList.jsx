import React, { Fragment } from 'react';
import EventListItem from './EventListItem';

const EventList = ({ events }) => (
	<Fragment>
		{events &&
			events.map(event => <EventListItem key={event.id} event={event} />)}
	</Fragment>
);

export default EventList;
