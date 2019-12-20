import React from 'react';
import { connect } from 'react-redux';
import { Responsive } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';

import NavbarMobile from './NavbarMobile';
import NavbarDesktop from './NavbarDesktop';
import { openModal } from '../../modals/modalActions';

const NavbarContainer = ({
	children,
	openModal,
	auth,
	profile,
	history,
	firebase,
}) => {
	const handleLogin = () => openModal('LoginModal');
	const handleRegister = () => openModal('RegisterModal');

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
				profile={profile}
			>
				{children}
			</NavbarDesktop>
			<NavbarMobile
				login={handleLogin}
				register={handleRegister}
				getWidth={getWidth}
				auth={auth}
				logout={handleSignedOut}
				profile={profile}
			>
				{children}
			</NavbarMobile>
		</div>
	);
};

const actions = { openModal };

const mapStateToProps = state => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile
});

export default withRouter(
	withFirebase(connect(mapStateToProps, actions)(NavbarContainer)),
);
