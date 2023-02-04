import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { deleteExpense, startEdition } from '../redux/actions';
import Button from './Button';

class TableRow extends Component {
  formatNumericValue = (value) => {
    const numberValue = Number(value);
    return numberValue.toFixed(2);
  };

  render() {
    const { expense } = this.props;
    const {
      exchangeRates, currency, value, description, tag, method, id,
    } = expense;

    const { ask, name } = exchangeRates[currency];
    const convertedValue = this.formatNumericValue(value * ask);
    const formatedValue = this.formatNumericValue(value);
    const formatedAsk = this.formatNumericValue(ask);

    const rowData = [
      description, tag, method, formatedValue,
      name, formatedAsk, convertedValue, 'Real',
    ];
    return (
      <tr>
        { rowData.map((data, index) => (
          <td key={ index } className="table-row-data">
            { data }
          </td>
        )) }
        <td>
          <Button testid="edit-btn" actionCreator={ () => startEdition(id) }>
            Editar
          </Button>

          <Button testid="delete-btn" actionCreator={ () => deleteExpense(id) }>
            Excluir
          </Button>
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
