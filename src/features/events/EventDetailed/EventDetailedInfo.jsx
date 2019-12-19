import React, { useState } from 'react';
import { Segment, Icon, Button, List } from 'semantic-ui-react';
import EventDetailedMap from './EventDetailedMap';
import { format } from 'date-fns';

export const EventDetailedInfo = ({ event }) => {
	const [isMapOpen, setIsMapOpen] = useState(false);
	const handleMapOpenToggle = () => setIsMapOpen(!isMapOpen);

	return (
		<Segment.Group>
			<Segment attached="top">
				<List divided verticalAlign="middle">
					<List.Item style={{ padding: '1rem 0' }}>
						<Icon size="large" color="teal" name="info" />
						<List.Content>
							<List.Description>
								<p>{event.description}</p>
							</List.Description>
						</List.Content>
					</List.Item>

					<List.Item style={{ padding: '1rem 0' }}>
						<Icon size="large" color="teal" name="calendar" />
						<List.Content>
							<List.Description>
								<span>
									{event.date &&
										format(new Date(event.date), 'EEE dd MMMM yyy')}{' '}
									at {event.date && format(new Date(event.date), 'h:mm a')}
								</span>
							</List.Description>
						</List.Content>
					</List.Item>

					<List.Item style={{ padding: '1rem 0' }}>
						<List.Content floated="right">
							<Button
								onClick={handleMapOpenToggle}
								color="teal"
								compact
								size="mini"
								content={isMapOpen ? 'Hide Map' : 'Show Map'}
							/>
						</List.Content>
						<Icon size="large" color="teal" name="marker" />
						<List.Content>
							<List.Description>
								<span>{event.venue}</span>
							</List.Description>
						</List.Content>
					</List.Item>
				</List>
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
