import React from 'react';
import { Segment, Header, Image, Placeholder } from 'semantic-ui-react';
import LazyLoad from 'react-lazyload';
import PlaceholderComponent from '../../../app/layout/PlaceholderComponent';

const UserDetailedPhotos = ({ photos }) => {
	return (
		<Segment>
			<Header icon="image" content="Photos" />
			<Image.Group size="small">
				{photos &&
					photos.map(photo => (
						<LazyLoad
							key={photo.id}
							height={150}
							placeholder={<Image src="/assets/user.png" />}
						>
							<Image src={photo.url} bordered />
						</LazyLoad>
					))}
			</Image.Group>
		</Segment>
	);
};

export default UserDetailedPhotos;
