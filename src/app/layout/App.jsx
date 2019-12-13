import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';

import Navbar from '../../features/nav/Navbar/Navbar';
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/events/EventForm/EventForm';

class App extends Component {
	render() {
		return (
			<Fragment>
				<Route exact path="/" component={HomePage} />
				<Route
					path="/(.+)"
					render={() => (
						<Fragment>
							<Navbar />
							<Container className="main">
									<Route exact path="/events" component={EventDashboard} />
									<Route path="/events/:id" component={EventDetailedPage} />
									<Route path="/people" component={PeopleDashboard} />
									<Route path="/profile/:id" component={UserDetailedPage} />
									<Route path="/settings" component={SettingsDashboard} />
									<Route path="/createEvent" component={EventForm} />
							</Container>
						</Fragment>
					)}
				/>
			</Fragment>
		);
	}
}

export default App;
