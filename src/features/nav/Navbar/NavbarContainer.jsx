import React from 'react';
import { connect } from 'react-redux';
import { Responsive } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import NavbarMobile from './NavbarMobile';
import NavbarDesktop from './NavbarDesktop';
import { openModal } from '../../modals/modalActions';
import { logout } from '../../auth/authActions';

const NavbarContainer = ({ children, openModal, auth, logout, history }) => {
	const handleLogin = () => openModal('LoginModal');
	const handleRegister = () => openModal('RegisterModal');

	const handleSignedOut = () => {
		logout();
		history.push('/events');
	};
	const getWidth = () => {
		const isSSR = typeof window === 'undefined';
		return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
	};
	return (
		<div>
			<NavbarDesktop
				login={handleLogin}
				register={handleRegister}
				getWidth={getWidth}
				auth={auth}
				logout={handleSignedOut}
			>
				{children}
			</NavbarDesktop>
			<NavbarMobile
				login={handleLogin}
				register={handleRegister}
				getWidth={getWidth}
				auth={auth}
				logout={handleSignedOut}
			>
				{children}
			</NavbarMobile>
		</div>
	);
};

const actions = { openModal, logout };

const mapStateToProps = state => ({
	auth: state.auth,
});

export default withRouter(connect(mapStateToProps, actions)(NavbarContainer));
