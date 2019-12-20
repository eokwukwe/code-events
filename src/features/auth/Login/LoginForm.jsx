import React from 'react';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { login } from '../authActions';
import TextInput from '../../../app/common/form/TextInput';

const LoginForm = ({ login, handleSubmit, error }) => {
	return (
		<Form onSubmit={handleSubmit(login)} error size="large">
			<Segment>
				<Field
					name="email"
					component={TextInput}
					type="text"
					placeholder="Email Address"
				/>
				<Field
					name="password"
					component={TextInput}
					type="password"
					placeholder="password"
				/>
				{error && (
					<Label style={{marginBottom: '0.6rem'}} basic color="red">
						{error}
					</Label>
				)}
				<Button fluid size="large" color="teal">
					Login
				</Button>
			</Segment>
		</Form>
	);
};

const actions = { login };

export default connect(
	null,
	actions,
)(reduxForm({ form: 'loginForm' })(LoginForm));
