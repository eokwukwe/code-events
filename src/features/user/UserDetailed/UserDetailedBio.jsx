import React from 'react';
import { Item, Label, Segment, Button } from 'semantic-ui-react';
import { differenceInYears, format } from 'date-fns';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

const UserDetailedBio = ({
  large,
  profile,
  isCurrentUser,
  followUser,
  isFollowing,
  unfollowUser
}) => {
  const age = profile.dateOfBirth
    ? `(${differenceInYears(Date.now(), profile.dateOfBirth.toDate())} yrs)`
    : '';
  return (
    <Segment>
      <Item.Content>
        <Item.Group unstackable={large}>
          <Item>
            <LazyLoad
              height={150}
              placeholder={
                <Item.Image
                  avatar
                  size={large ? 'small' : 'tiny'}
                  src="/assets/user.png"
                />
              }
            >
              <Item.Image
                avatar
                size={large ? 'small' : 'tiny'}
                src={profile.photoURL || '/assets/user.png'}
              />
            </LazyLoad>

            <Item.Content verticalAlign={large ? 'middle' : 'top'}>
              <div>
                <strong
                  style={{
                    marginBottom: '0.5rem',
                    fontSize: '1.4rem',
                    textTransform: 'capitalize',
                  }}
                >
                  {profile.displayName}
                </strong>{' '}
                <span>{age}</span>
                {isCurrentUser && (
                  <Button
                    as={Link}
                    to="/settings"
                    floated="right"
                    compact
                    size="mini"
                    color="green"
                    content="Edit profile"
                  />
                )}
                {!isCurrentUser && !isFollowing && (
                  <Button
                    floated="right"
                    compact
                    size="mini"
                    color="teal"
                    content="Follow"
                    onClick={() => followUser(profile)}
                  />
                )}
                {!isCurrentUser && isFollowing && (
                  <Button
                    floated="right"
                    compact
                    size="mini"
                    color="orange"
                    content="Unfollow"
                    onClick={() => unfollowUser(profile)}
                  />
                )}
              </div>
              <p className="user-detail--content">
                <strong>Occupation: </strong>
                {profile.occupation || <span>Unknown</span>}
              </p>
              <p className="user-detail--content">
                <strong>Lives in: </strong>{' '}
                {profile.city || <span>Unknown</span>}
              </p>
              <p className="user-detail--content">
                <strong>Joined: </strong>{' '}
                {profile.createdAt &&
                  format(profile.createdAt.toDate(), 'dd MMMM yyy')}
              </p>
              <p className="user-detail--content">
                <strong>Description: </strong>
                {profile.about || <span>Tell us a little about yourself.</span>}
              </p>
              <div className="user-detail--content">
                <Label.Group size="mini" color="teal">
                  <strong>Interests: </strong>
                  {(profile.interests &&
                    profile.interests.map((interest) => (
                      <Label key={interest}>{interest}</Label>
                    ))) || <span>What are you interested in?</span>}
                </Label.Group>
              </div>
            </Item.Content>
          </Item>
        </Item.Group>
      </Item.Content>
    </Segment>
  );
};

export default UserDetailedBio;
