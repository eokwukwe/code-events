import React from 'react';
import { Segment, Image, Item, Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const eventImageStyle = {
	filter: 'brightness(50%)',
};

const eventImageTextStyle = {
	position: 'absolute',
	bottom: '5%',
	left: '5%',
	width: '100%',
	height: 'auto',
	color: 'white',
};

export const EventDetailedHeader = ({ event }) => {
	return (
		<Segment.Group>
			<Segment basic attached="top" style={{ padding: '0' }}>
				<Image
					src={`/assets/categoryImages/${event.category}.jpg`}
					fluid
					style={eventImageStyle}
				/>

				<Segment basic style={eventImageTextStyle}>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header
									size="huge"
									content={event.title}
									style={{ color: 'white', textTransform: 'capitalize' }}
								/>
								<p>
									{event.date && format(new Date(event.date), 'EEE dd MMMM yyyy h:mm a')}
								</p>
								<p>
									Hosted by <strong>{event.hostedBy}</strong>
								</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>

			<Segment attached="bottom">
				<Button compact size="mini">
					Cancel My Place
				</Button>
				<Button compact size="mini" color="teal">
					JOIN THIS EVENT
				</Button>
				<Button
					as={Link}
					to={`/editEvent/${event.id}`}
					compact
					size="mini"
					color="orange"
					floated="right"
				>
					Edit Event
				</Button>
			</Segment>
		</Segment.Group>
	);
};
export default EventDetailedHeader;
