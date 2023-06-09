import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/LabelAndSelect.css';

export default class LabelAndSelect extends Component {
  render() {
    const { name, labelText, value, onChange, options } = this.props;
    const inputID = `${name}-input`;
    return (
      <label htmlFor={ inputID } className="label-and-select-label">
        { labelText }
        <select
          value={ value }
          onChange={ onChange }
          name={ name }
          id={ inputID }
          data-testid={ inputID }
          className="label-and-select-select"
        >
          { options.map((content, index) => (
            <option key={ index } value={ content }>{ content }</option>
          )) }
        </select>
      </label>
    );
  }
}

LabelAndSelect.propTypes = {
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};
