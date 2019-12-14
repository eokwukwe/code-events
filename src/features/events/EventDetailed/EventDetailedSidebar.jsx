import React, { Fragment } from 'react';
import { Segment, Label, List, Image } from 'semantic-ui-react';

export const EventDetailedSidebar = ({ attendees }) => {
	const isHost = false;
	return (
		<Fragment>
			<Segment
				textAlign="center"
				style={{ border: 'none' }}
				attached="top"
				secondary
				inverted
				color="teal"
			>
				{attendees && attendees.length}{' '}
				{attendees && attendees.length === 1 ? 'Person' : 'People'} Going
			</Segment>
			<Segment attached>
				<List relaxed divided verticalAlign='middle'>
					{attendees &&
						attendees.map(attendee => (
							<List.Item key={attendee.id} style={{ position: 'relative' }}>
								{isHost && (
									<Label
										style={{ position: 'absolute' }}
										color="orange"
										ribbon="right"
									>
										Host
									</Label>
								)}
								<Image size="mini" circular src={attendee.photoURL} />
								<List.Content>
									<List.Header as="h4">{attendee.name}</List.Header>
								</List.Content>
							</List.Item>
						))}
				</List>
			</Segment>
		</Fragment>
	);
};
export default EventDetailedSidebar;
