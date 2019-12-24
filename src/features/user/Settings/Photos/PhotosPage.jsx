import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import {
	Image,
	Segment,
	Header,
	Divider,
	Grid,
	Button,
	Card,
} from 'semantic-ui-react';
import { toastr } from 'react-redux-toastr';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import DropzoneInput from './DropzoneInput';
import CropperInput from './CropperInput';
import { uploadProfileImage } from '../../userActions';
import UserPhotos from './UserPhotos';

const PhotosPage = ({ uploadProfileImage, profile, photos }) => {
	const [files, setFiles] = useState([]);
	const [image, setImage] = useState(null);

	useEffect(() => {
		// Cleanup the object URL created in memory
		return () => {
			files.forEach(file => URL.revokeObjectURL(file.preview));
		};
	}, [files]);

	const handleUploadImage = async () => {
		try {
			await uploadProfileImage(image, files[0].name);
			handleCancelCrop();
			toastr.success('Success', 'Photo uploaded');
		} catch (error) {
			console.error(error);
			toastr.error('Oops!', 'Something went wrong');
		}
	};

	const handleCancelCrop = () => {
		setFiles([]);
		setImage(null);
	};

	return (
		<Segment>
			<Header dividing size="large" content="Your Photos" />
			<Grid>
				<Grid.Row />
				<Grid.Column width={4}>
					<Header color="teal" sub content="Step 1 - Add Photo" />
					<DropzoneInput setFiles={setFiles} />
				</Grid.Column>
				<Grid.Column width={1} />
				<Grid.Column width={4}>
					<Header sub color="teal" content="Step 2 - Resize image" />
					{files.length > 0 && (
						<CropperInput setImage={setImage} imagePreview={files[0].preview} />
					)}
				</Grid.Column>
				<Grid.Column width={1} />
				<Grid.Column width={4}>
					<Header sub color="teal" content="Step 3 - Preview & Upload" />
					{files.length > 0 && (
						<Fragment>
							<div
								className="img-preview"
								style={{
									minHeight: '200px',
									minWidth: '200px',
									overflow: 'hidden',
								}}
							/>
							<Button.Group>
								<Button
									onClick={handleUploadImage}
									positive
									icon="check"
									style={{ width: '100px' }}
								/>
								<Button
									onClick={handleCancelCrop}
									icon="close"
									style={{ width: '100px' }}
								/>
							</Button.Group>
						</Fragment>
					)}
				</Grid.Column>
			</Grid>

			<Divider />
			{photos && <UserPhotos profile={profile} photos={photos} />}
		</Segment>
	);
};

const actions = {
	uploadProfileImage,
};

const mapStateToProps = state => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile,
	photos: state.firestore.ordered.photos,
});

const query = ({ auth }) => [
	{
		collection: 'users',
		doc: auth.uid,
		subcollections: [{ collection: 'photos' }],
		storeAs: 'photos',
	},
];

export default compose(
	connect(mapStateToProps, actions),
	firestoreConnect(auth => query(auth)),
)(PhotosPage);
