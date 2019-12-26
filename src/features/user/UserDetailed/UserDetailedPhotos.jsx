import React from 'react';
import { Segment, Header, Image } from 'semantic-ui-react';

const UserDetailedPhotos = ({ photos }) => {
	return (
		<Segment>
			<Header icon="image" content="Photos" />
			<Image.Group size="small">
				{photos &&
					photos.map(photo => <Image key={photo.id} src={photo.url} bordered />)}
			</Image.Group>
		</Segment>
	);
};

export default UserDetailedPhotos;
