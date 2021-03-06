import React, { Fragment } from 'react';
import { Segment, Image, Item, Button, Header, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const eventImageStyle = {
  filter: 'brightness(50%)',
};

const eventImageTextStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: 'auto',
  color: 'white',
};

export const EventDetailedHeader = ({
  event,
  isGoing,
  isHost,
  loading,
  goingToEvent,
  cancelGoingToEvent,
  authenticated,
  openModal,
}) => {
  const isMobile = window.innerWidth <= 767;

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  content={event.title}
                  style={{
                    color: 'white',
                    textTransform: 'capitalize',
                    fontSize: isMobile ? '1.5rem' : '2rem',
                  }}
                />
                <p>
                  {event.date &&
                    format(event.date.toDate(), 'EEE dd MMMM yyyy h:mm a')}
                </p>
                <p>
                  Hosted by{' '}
                  <strong>
                    <Link
                      to={`/profile/${event.hostUid}`}
                      style={{ color: 'white' }}
                    >
                      {event.hostedBy}
                    </Link>{' '}
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {event.cancelled && (
          <Label
            size="medium"
            color="red"
            content="This event has beend cancelled"
          />
        )}
        
        {!isHost && (
          <Fragment>
            {isGoing && !event.cancelled && (
              <Button
                onClick={() => cancelGoingToEvent(event)}
                compact
                size="mini"
              >
                Cancel My Place
              </Button>
            )}

            {!isGoing && authenticated && !event.cancelled && (
              <Button
                onClick={() => goingToEvent(event)}
                compact
                size="mini"
                color="teal"
                loading={loading}
              >
                JOIN THIS EVENT
              </Button>
            )}

            {!authenticated && !event.cancelled && (
              <Button
                onClick={() => openModal('UnauthModal')}
                compact
                size="mini"
                color="teal"
                loading={loading}
              >
                JOIN THIS EVENT
              </Button>
            )}

          </Fragment>
        )}

        {isHost && (
          <Button
            as={Link}
            to={`/editEvent/${event.id}`}
            compact
            size="mini"
            color="orange"
            floated="right"
          >
            Edit Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};
export default EventDetailedHeader;
