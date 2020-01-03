import React, { Fragment } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import EventListItem from './EventListItem';

const EventList = ({ events, getNextEvents, loading, moreEvents }) => (
	<Fragment>
		{events && events.length !== 0 && (
			<InfiniteScroll
				pageStart={0}
				initialLoad={false}
				loadMore={getNextEvents}
				hasMore={!loading && moreEvents}
			>
				{events &&
					events.map(event => <EventListItem key={event.id} event={event} />)}
			</InfiniteScroll>
		)}
	</Fragment>
);

export default EventList;
