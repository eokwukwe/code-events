import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';

import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/modalActions';
import { logout } from '../../auth/authActions';

const Navbar = ({openModal, auth, logout, history}) => {
	
	const handleLogin = () => openModal('LoginModal');
	const handleRegister = () => openModal('RegisterModal');

	const handleSignedOut = () => {
		logout()
		history.push('/');
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
				{auth.authenticated ? (
					<SignedInMenu
						logout={handleSignedOut}
						currentUser={auth.currentUser}
					/>
				) : (
					<SignedOutMenu login={handleLogin} register={handleRegister} />
				)}
			</Container>
		</Menu>
	);
};

const actions = { openModal, logout };

const mapStateToProps = state => ({
	auth: state.auth,
});

export default withRouter(connect(mapStateToProps, actions)(Navbar));
