import React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { closeModal } from './modalActions';
import RegisterForm from '../auth/Register/RegisterForm';

const actions = { closeModal };

const RegisterModal = ({ closeModal }) => {
	return (
		<Modal size="mini" open={true} onClose={closeModal}>
			<Modal.Header>Sign Up to CodEvents!</Modal.Header>
			<Modal.Content>
				<Modal.Description>
					<RegisterForm />
				</Modal.Description>
			</Modal.Content>
		</Modal>
	);
};

export default connect(null, actions)(RegisterModal);
