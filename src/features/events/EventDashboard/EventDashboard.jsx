import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import { Grid, Loader } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';

import EventList from '../EventList/EventList';
import { getEventsForDashboard } from '../eventActions';
import EventActivity from '../EventActivity/EventActivity';
import LoadingComponent from '../../../app/layout/LoadingComponent';

class EventDashboard extends Component {
  contextRef = createRef();

  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: [],
  };

  async componentDidMount() {
    const next = await this.props.getEventsForDashboard();
    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.events !== this.props.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...this.props.events],
      });
    }
  }

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1];
    const next = await this.props.getEventsForDashboard(lastEvent);
    if (next && next.docs && next.docs.length <= 2) {
      this.setState({
        moreEvents: false,
      });
    }
  };

  render() {
    const { loading, activities } = this.props;
    const { moreEvents, loadingInitial, loadedEvents } = this.state;

    if (loadingInitial) return <LoadingComponent />;

    return (
      <Fragment>
        <Grid stackable reversed="mobile" columns={2}>
          <Grid.Column width={10}>
            <div ref={this.contextRef}>
              <EventList
                loading={loading}
                events={loadedEvents}
                moreEvents={moreEvents}
                getNextEvents={this.getNextEvents}
              />
            </div>
          </Grid.Column>
          <Grid.Column width={6}>
            <div
              style={{
                marginBottom: `${window.innerWidth <= 690}` ? '1rem' : '',
              }}
            >
              <EventActivity
                activities={activities}
                contextRef={this.contextRef}
              />
            </div>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column mobile={16} tablet={10} computer={10}>
            <Loader active={loading} />
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

const actions = { getEventsForDashboard };

const query = [
  {
    collection: 'activity',
    orderBy: ['timestamp', 'desc'],
    limit: 5,
  },
];

const mapStateToProps = state => ({
  events: state.events.events,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity,
});

export default connect(
  mapStateToProps,
  actions,
)(firestoreConnect(query)(EventDashboard));
