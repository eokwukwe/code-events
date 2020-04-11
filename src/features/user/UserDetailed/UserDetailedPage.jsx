import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';

import { getUserEvents, followUser } from '../userActions';
import UserDetailedBio from './UserDetailedBio';
import { userDetailedQuery } from '../userQueries';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedEvents from './UserDetailedEvents';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const UserDetailedPage = ({
  profile,
  photos,
  auth,
  match,
  events,
  eventsLoading,
  userUid,
  requesting,
  getUserEvents,
  followUser
}) => {
  const large = window.innerWidth > 520;
  const isCurrentUser = auth.uid === match.params.id;
  const loading = Object.values(requesting).some((a) => a === true);
  useEffect(() => {
    const getEvents = async () => {
      await getUserEvents(userUid);
    };
    getEvents();
  }, [getUserEvents, userUid]);

  const changeTab = (e, data) => {
    getUserEvents(userUid, data.activeIndex);
  };

  if (loading) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <UserDetailedBio
          profile={profile}
          large={large}
          isCurrentUser={isCurrentUser}
          followUser={followUser}
        />
      </Grid.Column>

      <Grid.Column width={16}>
        <UserDetailedPhotos photos={photos} />
      </Grid.Column>

      <Grid.Column width={16}>
        <UserDetailedEvents
          events={events}
          eventsLoading={eventsLoading}
          changeTab={changeTab}
        />
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  let profile = {};

  if (ownProps.match.params.id === state.firebase.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
  }
  return {
    profile,
    events: state.events.userEvents,
    eventsLoading: state.async.loading,
    userUid: ownProps.match.params.id,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting,
  };
};

const actions = { getUserEvents, followUser };

export default compose(
  connect(mapStateToProps, actions),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid)),
)(UserDetailedPage);
