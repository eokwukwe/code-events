import React from 'react';
import { Feed } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

const EventActivityItem = ({ activity }) => {
  const renderSummary = activity => {
    switch (activity.type) {
      case 'newEvent':
        return (
          <div>
            <span style={{ color: 'green' }}>New Event! </span>
            <Feed.User
              as={Link}
              to={{ pathname: '/profile/' + activity.hostUid }}
            >
              {activity.hostedBy}
            </Feed.User>{' '}
            is hosting{' '}
            <Link
              style={{ textTransform: 'capitalize' }}
              to={{ pathname: '/events/' + activity.eventId }}
            >
              {activity.title}
            </Link>
          </div>
        );
      case 'cancelledEvent':
        return (
          <div>
            <span style={{ color: 'red' }}>Event Cancelled! </span>
            <Feed.User
              as={Link}
              to={{ pathname: '/profile/' + activity.hostUid }}
            >
              {activity.hostedBy}
            </Feed.User>{' '}
            has cancelled{' '}
            <Link
              style={{ textTransform: 'capitalize' }}
              to={{ pathname: '/events/' + activity.eventId }}
            >
              {activity.title}
            </Link>
          </div>
        );
      default:
        return;
    }
  };

  return (
    <Feed.Event>
      <Feed.Label>
        <img src={activity.photoURL || '/assets/user.png'} alt="" />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>{renderSummary(activity)}</Feed.Summary>
        <Feed.Meta>
          <Feed.Date>
            {formatDistance(
              activity.timestamp && activity.timestamp.toDate(),
              Date.now(),
            )}{' '}
            ago
          </Feed.Date>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

export default EventActivityItem;
