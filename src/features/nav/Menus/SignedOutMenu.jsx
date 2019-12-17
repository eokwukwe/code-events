import React from 'react';
import { Button, Menu } from 'semantic-ui-react';

const SignedOutMenu = ({ login, register }) => {
	return (
		<Menu.Item position="right">
			<Button compact onClick={login} basic inverted content="Login" />
			<Button
				onClick={register}
				basic
				inverted
				compact
				content="Register"
				style={{ marginLeft: '0.5em' }}
			/>
		</Menu.Item>
	);
};

export default SignedOutMenu;
