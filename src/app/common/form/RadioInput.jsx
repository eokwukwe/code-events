import React from 'react';
import { Form } from 'semantic-ui-react';

const RadioInput = ({ input, width, type, label }) => {
	return (
		<Form.Field>
			<div className="ui radio">
				<input id={label.toLowerCase()} type={type} {...input} />{' '}
				<label htmlFor={label.toLowerCase()}>{label}</label>
			</div>
		</Form.Field>
	);
};

export default RadioInput;
