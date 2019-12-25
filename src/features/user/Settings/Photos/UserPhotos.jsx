import React, { Fragment } from 'react';
import { Header, Card, Image, Button } from 'semantic-ui-react';

const UserPhotos = ({
	profile,
	photos,
	deletePhoto,
	setMainPhoto,
}) => {
	let filterPhotos;
	if (photos) {
		filterPhotos = photos.filter(photo => photo.url !== profile.photoURL);
	}

	return (
		<Fragment>
			<Header sub color="teal" content="All Photos" />
			<Card.Group itemsPerRow={5}>
				<Card>
					<Image src={profile.photoURL || '/assets/user.png'} />
					<Button positive>Main Photo</Button>
				</Card>

				{photos.length > 0 &&
					filterPhotos.map(photo => (
						<Card key={photo.id}>
							<Image src={photo.url} />
							<Button.Group>
								<Button
									onClick={() => setMainPhoto(photo)}
									size="mini"
									positive
									icon="check"
								/>
								<Button.Or />
								<Button
									onClick={() => deletePhoto(photo)}
									size="mini"
									negative
									icon="trash"
								/>
							</Button.Group>
						</Card>
					))}
			</Card.Group>
		</Fragment>
	);
};

export default UserPhotos;
