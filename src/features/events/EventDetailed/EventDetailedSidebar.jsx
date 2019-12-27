import React, { Fragment } from 'react';
import { Segment, Label, List, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const EventDetailedSidebar = ({ attendees }) => {
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
				<List relaxed divided verticalAlign="middle">
					{attendees &&
						attendees.map(attendee => (
							<List.Item key={attendee.id} style={{ position: 'relative' }}>
								{attendee.host && (
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
									<List.Header as="h4">
										<Link to={`/profile/${attendee.id}`}>
											{attendee.displayName.split(' ')[0]}
										</Link>
									</List.Header>
								</List.Content>
							</List.Item>
						))}
				</List>
			</Segment>
		</Fragment>
	);
};
export default EventDetailedSidebar;
