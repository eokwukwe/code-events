/*global google*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { withFirestore } from 'react-redux-firebase';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan,
} from 'revalidate';

import { createEvent, updateEvent, cancelToggle } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' },
];

const validate = combineValidators({
  title: isRequired({ message: 'Event title is require' }),
  category: isRequired({ message: 'Event category is require' }),
  description: composeValidators(
    isRequired({ message: 'Event description is required' }),
    hasLengthGreaterThan(4)({
      message: 'Event description needs to be at least 5 characters',
    }),
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date'),
});

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
  };

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  onFormSubmit = async values => {
    values.venueLatLng = this.state.venueLatLng;
    try {
      if (this.props.initialValues.id) {
        if (Object.keys(values.venueLatLng).length === 0) {
          values.venueLatLng = this.props.event.venueLatLng;
        }
        await this.props.updateEvent(values);
        this.props.history.push(`/events/${this.props.initialValues.id}`);
      } else {
        const createdEvent = await this.props.createEvent(values);
        this.props.history.push(`/events/${createdEvent.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => this.setState({ cityLatLng: latlng }))
      .then(() => this.props.change('city', selectedCity));
  };

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => this.setState({ venueLatLng: latlng }))
      .then(() => this.props.change('venue', selectedVenue));
  };

  render() {
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine,
      event,
			cancelToggle,
			loading
    } = this.props;

    return (
      <Grid centered>
        <Grid.Column mobile={16} tablet={10} computer={8}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                component={TextInput}
                placeholder="Event title"
              />
              <Field
                name="category"
                component={SelectInput}
                options={category}
                placeholder="Select event category"
              />
              <Field
                name="description"
                component={TextArea}
                rows={3}
                placeholder="Event description"
              />
              <Header sub color="teal" content="Event Location Details" />
              <Field
                name="city"
                component={PlaceInput}
                options={{ types: ['(cities)'] }}
                onSelect={this.handleCitySelect}
                placeholder="Event city"
              />
              <Field
                name="venue"
                component={PlaceInput}
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types: ['establishment'],
                }}
                onSelect={this.handleVenueSelect}
                placeholder="Event venue"
              />
              <Field
                name="date"
                component={DateInput}
                dateFormat="dd LLL yyyy h:mm a"
                showTimeSelect
                timeFormat="HH:mm"
                placeholder="Event date"
              />
              <Button
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
								loading={loading}

              >
                Submit
              </Button>
              <Button
                onClick={
                  initialValues.id
                    ? () => history.push(`/events/${initialValues.id}`)
                    : () => history.push('/events')
                }
								type="button"
								disabled={loading}
              >
                Cancel
              </Button>
              {Object.keys(initialValues).length !== 0 && (
                <Button
                  type="button"
                  color={event.cancelled ? 'green' : 'red'}
                  floated="right"
                  content={event.cancelled ? 'Reactivate' : 'Cancel Event'}
                  onClick={() => cancelToggle(!event.cancelled, event.id)}
                />
              )}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const actions = { createEvent, updateEvent, cancelToggle };

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};

  if (
    state.firestore.ordered.events &&
    state.firestore.ordered.events.length > 0
  ) {
    event =
      state.firestore.ordered.events.filter(event => event.id === eventId)[0] ||
      {};
  }

  return { initialValues: event, event, loading: state.async.loading };
};

export default withFirestore(
  connect(
    mapStateToProps,
    actions,
  )(
    reduxForm({ form: 'eventForm', validate, enableReinitialize: true })(
      EventForm,
    ),
  ),
);
