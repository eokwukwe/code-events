import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const SignedInMenu = ({ logout, profile }) => {
	const displayName = String(profile.displayName).split(' ')[0];

	return (
		<Menu.Item position="right">
			<Image
				avatar
				spaced="right"
				src={profile.photoURL || '/assets/user.png'}
			/>
			<Dropdown
				pointing="top right"
				text={displayName !== 'undefined' ? displayName : 'Loading...'}
			>
				<Dropdown.Menu>
					<Dropdown.Item text="Create Event" icon="plus" />
					<Dropdown.Item text="My Events" icon="calendar" />
					<Dropdown.Item text="My Network" icon="users" />
					<Dropdown.Item text="My Profile" icon="user" />
					<Dropdown.Item
						as={Link}
						to="/settings"
						text="Settings"
						icon="settings"
					/>
					<Dropdown.Item onClick={logout} text="Sign Out" icon="power" />
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
	);
};

export default SignedInMenu;
