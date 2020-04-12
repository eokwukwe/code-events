import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Segment, Header, Card } from 'semantic-ui-react';

import PersonCard from './PersonCard';

const PeopleDashboard = ({ followers, followings }) => {
  return (
    <Grid>
      <Grid.Column width={16}>
        <Segment>
          <Header dividing content="People following me" />
          <Card.Group itemsPerRow={5} stackable>
            {followers &&
              followers.map((follower) => (
                <PersonCard key={follower.id} user={follower} />
              ))}
          </Card.Group>
        </Segment>
        <Segment>
          <Header dividing content="People I'm following" />
          <Card.Group itemsPerRow={5} stackable>
            {followings &&
              followings.map((following) => (
                <PersonCard key={following.id} user={following} />
              ))}
          </Card.Group>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'following' }],
      storeAs: 'following',
    },
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'followers' }],
      storeAs: 'followers',
    },
  ];
};

const mapStateToProps = (state) => ({
  followings: state.firestore.ordered.following,
  followers: state.firestore.ordered.followers,
  auth: state.firebase.auth,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => query(props)),
)(PeopleDashboard);
