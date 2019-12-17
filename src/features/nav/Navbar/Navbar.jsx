import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';

import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/modalActions';

const Navbar = props => {
	const initialState = { authenticated: false };
	const [isAuth, setIsAuth] = useState(initialState);

	const handleLogin = () => props.openModal('LoginModal');
	const handleRegister = () => props.openModal('RegisterModal');

	const handleSignedOut = () => {
		setIsAuth({ authenticated: false });
		props.history.push('/');
	};

	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item as={NavLink} exact to="/" header>
					<img src="/assets/logo.png" alt="logo" /> CodEvents
				</Menu.Item>
				<Menu.Item as={NavLink} exact to="/events" name="Events" />
				<Menu.Item as={NavLink} exact to="/people" name="People" />
				<Menu.Item>
					<Button
						as={Link}
						to="/createEvent"
						floated="right"
						positive
						inverted
						compact
						content="Create Event"
					/>
				</Menu.Item>
				{isAuth.authenticated ? (
					<SignedInMenu signOut={handleSignedOut} />
				) : (
					<SignedOutMenu login={handleLogin} register={handleRegister} />
				)}
			</Container>
		</Menu>
	);
};

const actions = { openModal };

export default withRouter(connect(null, actions)(Navbar));
