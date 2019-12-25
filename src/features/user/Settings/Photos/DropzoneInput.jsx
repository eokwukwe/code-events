import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon, Header } from 'semantic-ui-react';

const DropzoneInput = ({ setFiles }) => {
	const onDrop = useCallback(
		acceptedFiles => {
			setFiles(
				acceptedFiles.map(file =>
					Object.assign(file, { preview: URL.createObjectURL(file) }),
				),
			);
		},
		[setFiles],
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: false,
		accept: 'image/*',
	});

	return (
		<div
			{...getRootProps()}
			className={'dropzone ' + (isDragActive && 'dropzone--isActive')}
		>
			<input {...getInputProps()} />
			<div>
				{' '}
				<Icon name="upload" size="big" />
				<Header as="h5" content="Drop image here or click to select files" />
			</div>
		</div>
	);
};

export default DropzoneInput;
