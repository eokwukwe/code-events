import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { combineValidators, isRequired } from 'revalidate';

import TextInput from '../../../app/common/form/TextInput';
import { registerUser } from '../authActions';

const validate = combineValidators({
	displayName: isRequired('displayName'),
	email: isRequired('email'),
	password: isRequired('password'),
});

const RegisterForm = ({
	handleSubmit,
	registerUser,
	error,
	invalid,
	submitting,
}) => {
	return (
		<div>
			<Form onSubmit={handleSubmit(registerUser)} size="large">
				<Segment>
					<Field
						name="displayName"
						type="text"
						component={TextInput}
						placeholder="Known As"
					/>
					<Field
						name="email"
						type="email"
						component={TextInput}
						placeholder="Email"
					/>
					<Field
						name="password"
						type="password"
						component={TextInput}
						placeholder="Password"
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
						Register
					</Button>
				</Segment>
			</Form>
		</div>
	);
};

const actions = { registerUser };

export default connect(
	null,
	actions,
)(reduxForm({ form: 'registerForm', validate })(RegisterForm));
