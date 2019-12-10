import React, { Component, Fragment } from 'react';

import Navbar from '../../features/nav/Navbar/Navbar';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
import { Container } from 'semantic-ui-react';

class App extends Component {
	render() {
		return (
			<Fragment>
				<Navbar />
				<Container className="main">
					<EventDashboard />
				</Container>
			</Fragment>
		);
	}
}

export default App;
