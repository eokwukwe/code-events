import React, { Fragment } from 'react';
import EventListItem from './EventListItem';

const EventList = ({ events, deleteEvent, selectEvent }) => (
	<Fragment>
		{events &&
			events.map(event => (
				<EventListItem
					key={event.id}
					event={event}
					deleteEvent={deleteEvent}
					selectEvent={selectEvent}
				/>
			))}
	</Fragment>
);

export default EventList;
