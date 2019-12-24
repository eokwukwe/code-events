import React, { Component } from 'react';
import {
	Image,
	Segment,
	Header,
	Divider,
	Grid,
	Button,
	Card,
} from 'semantic-ui-react';

const PhotosPage = () => {
	return (
		<Segment>
			<Header dividing size="large" content="Your Photos" />
			<Grid>
				<Grid.Row />
				<Grid.Column width={4}>
					<Header color="teal" sub content="Step 1 - Add Photo" />
				</Grid.Column>
				<Grid.Column width={1} />
				<Grid.Column width={4}>
					<Header sub color="teal" content="Step 2 - Resize image" />
				</Grid.Column>
				<Grid.Column width={1} />
				<Grid.Column width={4}>
					<Header sub color="teal" content="Step 3 - Preview and Upload" />
				</Grid.Column>
			</Grid>

			<Divider />
			<Header sub color="teal" content="All Photos" />

			<Card.Group itemsPerRow={5}>
				<Card>
					<Image src="https://randomuser.me/api/portraits/men/20.jpg" />
					<Button positive>
						Main Photo
					</Button>
				</Card>

				<Card>
					<Image src="https://randomuser.me/api/portraits/men/20.jpg" />
					<Button.Group>
						<Button size="mini" positive icon="world" />
						<Button.Or />
						<Button size="mini" negative icon="trash" />
					</Button.Group>
				</Card>
			</Card.Group>
		</Segment>
	);
};

export default PhotosPage;
