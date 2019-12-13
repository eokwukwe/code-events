import React, { useState } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

const Navbar = props => {
	const initialState = { authenticated: false };
	const [isAuth, setIsAuth] = useState(initialState);

	console.log('navbarrrrrr', props);


	const handleLogin = () => setIsAuth({ authenticated: true });
	const handleSignedOut = () => {
		setIsAuth({ authenticated: false });
		props.history.push('/');
	};

	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item as={NavLink} exact to="/" header>
					<img src="assets/logo.png" alt="logo" /> CodEvents
				</Menu.Item>
				<Menu.Item as={NavLink} to="/events" name="Events" />
				<Menu.Item as={NavLink} to="/people" name="People" />
				<Menu.Item>
					<Button
						as={Link}
						to="/createEvent"
						floated="right"
						positive
						inverted
						content="Create Event"
					/>
				</Menu.Item>
				{isAuth.authenticated ? (
					<SignedInMenu signOut={handleSignedOut} />
				) : (
					<SignedOutMenu login={handleLogin} />
				)}
			</Container>
		</Menu>
	);
};
export default withRouter(Navbar);
