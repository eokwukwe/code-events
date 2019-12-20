import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';

import { login, socialLogin } from '../authActions';
import TextInput from '../../../app/common/form/TextInput';
import SocialLogin from '../SocialLogin/SocialLogin';

const validate = combineValidators({
	email: isRequired('email'),
	password: isRequired('password'),
});

const LoginForm = ({
	login,
	handleSubmit,
	error,
	invalid,
	submitting,
	socialLogin,
}) => {
	return (
		<Form onSubmit={handleSubmit(login)} error size="large">
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
				size="medium"
				color="teal"
			>
				Login
			</Button>
			<Divider horizontal>OR</Divider>
			<SocialLogin socialLogin={socialLogin} />
		</Form>
	);
};

const actions = { login, socialLogin };

export default connect(
	null,
	actions,
)(reduxForm({ form: 'loginForm', validate })(LoginForm));
