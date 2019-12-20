import React from 'react';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';

import { login } from '../authActions';
import TextInput from '../../../app/common/form/TextInput';

const validate = combineValidators({
	email: isRequired('email'),
	password: isRequired('password'),
});

const LoginForm = ({ login, handleSubmit, error, invalid, submitting }) => {
	return (
		<Form onSubmit={handleSubmit(login)} error size="large">
			<Segment>
				<Field
					name="email"
					component={TextInput}
					type="email"
					placeholder="Email Address"
				/>
				<Field
					name="password"
					component={TextInput}
					type="password"
					placeholder="password"
				/>
				{error && (
					<Label style={{ marginBottom: '0.6rem' }} basic color="red">
						{error}
					</Label>
				)}
				<Button
					disabled={invalid || submitting}
					loading={submitting}
					fluid
					size="large"
					color="teal"
				>
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
)(reduxForm({ form: 'loginForm', validate })(LoginForm));
