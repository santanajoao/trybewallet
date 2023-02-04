import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableButtons from './TableButtons';

class TableRow extends Component {
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
    const convertedValue = this.formatNumericValue(value * ask);
    const formatedValue = this.formatNumericValue(value);
    const formatedAsk = this.formatNumericValue(ask);

    const rowContent = [
      description, tag, method, formatedValue,
      name, formatedAsk, convertedValue, 'Real',
    ];
    return (
      <tr className="table-row">
        { rowContent.map((cellContent, index) => (
          <td key={ index }>
            { cellContent }
          </td>
        )) }
        <td className="buttons-cell">
          <TableButtons expenseID={ expense.id } />
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
    id: PropTypes.number,
  }).isRequired,
};

export default TableRow;
