import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/LabelAndInput.css';

export default class LabelAndInput extends Component {
  render() {
    const { name, labelText, value, type, onChange } = this.props;
    const inputID = `${name}-input`;
    return (
      <label htmlFor={ inputID } className="label-and-input-label">
        { labelText }
        <input
          value={ value }
          type={ type }
          onChange={ onChange }
          name={ name }
          id={ inputID }
          data-testid={ inputID }
          className="label-and-input-input"
        />
      </label>
    );
  }
}

LabelAndInput.propTypes = {
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
