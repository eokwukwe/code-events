import React from 'react';
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import TextInput from '../../../app/common/form/TextInput';
import RadioInput from '../../../app/common/form/RadioInput';
import { addYears } from 'date-fns';

const BasicPage = ({ pristine, submitting, handleSubmit, updateProfile }) => {
	return (
		<Segment>
			<Header dividing size="large" content="Bio Data" />
			<Form onSubmit={handleSubmit(updateProfile)}>
				<Field
					width={8}
					name="displayName"
					type="text"
					component={TextInput}
					placeholder="Known As"
				/>
				<Form.Group inline>
					<label>Gender: </label>
					<Field
						name="gender"
						type="radio"
						value="female"
						label="Female"
						component={RadioInput}
					/>
					<Field
						name="gender"
						type="radio"
						value="male"
						label="Male"
						component={RadioInput}
					/>
					<Field
						name="gender"
						type="radio"
						value="neutral"
						label="Neutral"
						component={RadioInput}
					/>
				</Form.Group>
				<Field
					width={8}
					name="dateOfBirth"
					component={DateInput}
					placeholder="Date of Birth"
					dateFormat="dd LLL yyyy"
					showYearDropdown={true}
					showMonthDropdown={true}
					dropdownMode="select"
					maxDate={addYears(new Date(), -12)}
				/>
				<Field
					name="city"
					placeholder="Home Town"
					options={{ types: ['(cities)'] }}
					label="Female"
					component={PlaceInput}
					width={8}
				/>
				<Divider />
				<Button
					disabled={pristine || submitting}
					size="medium"
					positive
					loading={submitting}
					content="Update Profile"
				/>
			</Form>
		</Segment>
	);
};

export default reduxForm({
	form: 'userProfile',
	enableReinitialize: true,
	destroyOnUnmount: false,
})(BasicPage);
