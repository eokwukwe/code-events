import React, { Fragment } from 'react';
import { Button, Container, Menu, Responsive } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedInMenu from '../Menus/SignedInMenu';
import SignedOutMenu from '../Menus/SignedOutMenu';

const NavbarDesktop = ({
	children,
	getWidth,
	login,
	register,
	logout,
	auth,
}) => (
	<Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
		<Menu inverted secondary fixed="top" size="small">
			<Container>
				<Menu.Item as={NavLink} exact to="/" header>
					<img src="/assets/logo128.png" alt="logo" />{' '}
					<span style={{ fontSize: '1.5rem', color: 'white' }}>CodEvents</span>
				</Menu.Item>
				<Menu.Item as={NavLink} exact to="/events" name="Events" />
				{auth.authenticated && (
					<Fragment>
						<Menu.Item as={NavLink} exact to="/people" name="People" />
						<Menu.Item>
							<Button
								as={Link}
								to="/createEvent"
								floated="right"
								inverted
								compact
								positive
								content="Create Event"
							/>
						</Menu.Item>
					</Fragment>
				)}
				{auth.authenticated ? (
					<SignedInMenu logout={logout} currentUser={auth.currentUser} />
				) : (
					<SignedOutMenu login={login} register={register} />
				)}
			</Container>
		</Menu>
		{children}
	</Responsive>
);

export default withRouter(NavbarDesktop);
