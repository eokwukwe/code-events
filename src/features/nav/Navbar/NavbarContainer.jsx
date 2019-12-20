import React from 'react';
import { connect } from 'react-redux';
import { Responsive } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';

import NavbarMobile from './NavbarMobile';
import NavbarDesktop from './NavbarDesktop';
import { openModal } from '../../modals/modalActions';
import { logout } from '../../auth/authActions';

const NavbarContainer = ({
	children,
	openModal,
	auth,
	logout,
	history,
	firebase,
}) => {
	const handleLogin = () => openModal('LoginModal');
	const handleRegister = () => openModal('RegisterModal');
	// const authenticated = auth.isLoaded && !auth.isEmpty;

	const handleSignedOut = () => {
		firebase.logout();
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
	auth: state.firebase.auth,
});

export default withRouter(
	withFirebase(connect(mapStateToProps, actions)(NavbarContainer)),
);
