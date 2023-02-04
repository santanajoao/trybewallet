import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startEdition, deleteExpense } from '../redux/actions';
import deleteIcon from '../assets/delete-icon.svg';
import editIcon from '../assets/edit-icon.svg';
import '../styles/TableButtons.css';

class TableButtons extends Component {
  render() {
    const { dispatch, expenseID } = this.props;
    return (
      <>
        <button
          type="button"
          data-testid="edit-btn"
          onClick={ () => dispatch(startEdition(expenseID)) }
          className="table-btn"
        >
          <img src={ editIcon } className="edit-icon" alt="Ícone de editar" />
        </button>

        <button
          type="button"
          data-testid="delete-btn"
          onClick={ () => dispatch(deleteExpense(expenseID)) }
          className="table-btn"
        >
          <img
            src={ deleteIcon }
            className="delete-icon"
            alt="Ícone de deletar"
          />
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
