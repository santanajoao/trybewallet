import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startEdition, deleteExpense } from '../redux/actions';

class TableButtons extends Component {
  render() {
    const { dispatch, expenseID } = this.props;
    return (
      <>
        <button
          type="button"
          data-testid="edit-btn"
          onClick={ () => dispatch(startEdition(expenseID)) }
        >
          Editar
        </button>

        <button
          type="button"
          data-testid="delete-btn"
          onClick={ () => dispatch(deleteExpense(expenseID)) }
        >
          Excluir
        </button>
      </>
    );
  }
}

TableButtons.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenseID: PropTypes.number.isRequired,
};

export default connect()(TableButtons);
