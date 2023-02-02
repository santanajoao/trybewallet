import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TableRow extends Component {
  formatNumericValue = (value) => {
    const numberValue = Number(value);
    return numberValue.toFixed(2);
  };

  render() {
    const { expense } = this.props;
    const {
      exchangeRates, currency, value, description, tag, method,
    } = expense;

    const { ask, name } = exchangeRates[currency];
    const convertedValue = value * ask;
    return (
      <tr>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ this.formatNumericValue(value) }</td>
        <td>{ name }</td>
        <td>{ this.formatNumericValue(ask) }</td>
        <td>{ this.formatNumericValue(convertedValue) }</td>
        <td>Real</td>
        <td>
          <button type="button" data-testid="delete-btn">Excluir</button>
        </td>
      </tr>
    );
  }
}

TableRow.propTypes = {
  expense: PropTypes.shape({
    exchangeRates: PropTypes.objectOf(
      PropTypes.shape({
        ask: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
    currency: PropTypes.string,
    value: PropTypes.string,
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
  }).isRequired,
};
