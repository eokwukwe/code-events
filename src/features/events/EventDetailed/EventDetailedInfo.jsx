import React, { useState } from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import EventDetailedMap from './EventDetailedMap';
import { format, parseISO } from 'date-fns';

export const EventDetailedInfo = ({ event }) => {
	const [isMapOpen, setIsMapOpen] = useState(false);

	const handleMapOpenToggle = () => setIsMapOpen(!isMapOpen);

	return (
		<Segment.Group>
			<Segment attached="top">
				<Grid>
					<Grid.Column width={1}>
						<Icon size="large" color="teal" name="info" />
					</Grid.Column>
					<Grid.Column width={15}>
						<p>{event.description}</p>
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment attached>
				<Grid verticalAlign="middle">
					<Grid.Column width={1}>
						<Icon name="calendar" size="large" color="teal" />
					</Grid.Column>
					<Grid.Column width={15}>
						{event.date && (
							<span>
								{format(parseISO(event.date), 'EEE, dd LLLL yyy')} at{' '}
								{format(parseISO(event.date), 'h:mm a')}
							</span>
						)}
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment attached>
				<Grid verticalAlign="middle">
					<Grid.Column width={1}>
						<Icon name="marker" size="large" color="teal" />
					</Grid.Column>
					<Grid.Column width={11}>
						<span>{event.venue}</span>
					</Grid.Column>
					<Grid.Column width={4}>
						<Button
							onClick={handleMapOpenToggle}
							color="teal"
							compact
							size="mini"
							content={isMapOpen ? 'Hide Map' : 'Show Map'}
						/>
					</Grid.Column>
				</Grid>
			</Segment>
			{isMapOpen && (
				<EventDetailedMap
					lat={event.venueLatLng.lat}
					lng={event.venueLatLng.lng}
				/>
			)}
		</Segment.Group>
	);
};
export default EventDetailedInfo;
