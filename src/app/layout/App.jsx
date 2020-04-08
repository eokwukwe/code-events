import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch, withRouter } from 'react-router-dom';

import HomePage from '../../features/home/HomePage';
import EventForm from '../../features/events/EventForm/EventForm';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import ModalManager from '../../features/modals/ModalManager';
import NavbarContainer from '../../features/nav/Navbar/NavbarContainer';
import { UserIsAuthenticated } from '../../features/auth/authWrapper';
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager />
        <Route exact path="/" component={HomePage} />
        <Route
          path="/(.+)"
          render={() => (
            <NavbarContainer>
              <Container className="main">
                <Switch key={this.props.location.key}>
                  <Route exact path="/events" component={EventDashboard} />
                  <Route path="/events/:id" component={EventDetailedPage} />
                  <Route
                    path="/people"
                    component={UserIsAuthenticated(PeopleDashboard)}
                  />
                  <Route
                    path="/profile/:id"
                    component={UserIsAuthenticated(UserDetailedPage)}
                  />
                  <Route
                    path="/settings"
                    component={UserIsAuthenticated(SettingsDashboard)}
                  />
                  <Route
                    path={['/createEvent', '/editEvent/:id']}
                    component={UserIsAuthenticated(EventForm)}
                  />
                  <Route
                    component={NotFound}
                  />
                </Switch>
              </Container>
            </NavbarContainer>
          )}
        />
        {/* <Route
					path="/(.+)"
					render={() => (
						<Fragment>
							<Navbar />
							<Container className="main">
								<Switch key={this.props.location.key}>
									<Route exact path="/events" component={EventDashboard} />
									<Route path="/events/:id" component={EventDetailedPage} />
									<Route path="/people" component={PeopleDashboard} />
									<Route path="/profile/:id" component={UserDetailedPage} />
									<Route path="/settings" component={SettingsDashboard} />
									<Route
										path={['/createEvent', '/editEvent/:id']}
										component={EventForm}
									/>
								</Switch>
							</Container>
						</Fragment>
					)}
				/> */}
      </Fragment>
    );
  }
}

export default withRouter(App);
