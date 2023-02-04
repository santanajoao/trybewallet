import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableRow from './TableRow';

const tableHeadings = [
  'Descrição', 'Tag', 'Método de pagamento',
  'Valor', 'Moeda', 'Câmbio Utilizado',
  'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
];

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table className="table">
        <thead className="table-head">
          <tr className="table-headings-row">
            { tableHeadings.map((content, index) => (
              <th key={ index } className="table-heading">{ content }</th>
            )) }
          </tr>
        </thead>
        <tbody className="table-body">
          { expenses.map((expense) => (
            <TableRow
              key={ expense.id }
              expense={ expense }
            />
          )) }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);
