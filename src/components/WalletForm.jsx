import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, createExpense, editExpense } from '../redux/actions';
import LabelAndInput from './LabelAndInput';
import LabelAndSelect from './LabelAndSelect';
import '../styles/WalletForm.css';

const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class WalletForm extends Component {
  state = {
    ...INITIAL_STATE,
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  componentDidUpdate({ editor: prevEditor, idToEdit: prevIdToEdit }) {
    const { editor, idToEdit } = this.props;

    if ((!prevEditor && editor) || (idToEdit !== prevIdToEdit)) {
      this.fillFormWithEditingData();
    } else if (prevEditor && !editor) {
      this.setState(INITIAL_STATE);
    }
  }

  fillFormWithEditingData = () => {
    const { expenses, idToEdit } = this.props;
    const targetExpense = expenses.find(({ id }) => id === idToEdit);
    const expenseCopy = { ...targetExpense };
    delete expenseCopy.exchangeRates;
    delete expenseCopy.id;
    this.setState(expenseCopy);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { dispatch, editor } = this.props;

    if (editor) {
      dispatch(editExpense(this.state));
      this.setState(INITIAL_STATE);
    } else {
      dispatch(createExpense(this.state));
      this.setState(({ id }) => ({ ...INITIAL_STATE, id: id + 1 }));
    }
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form onSubmit={ this.handleSubmit } className="wallet-form">
        <div className="wallet-form-inputs">
          <div className="first-inputs-line-wrapper">
            <LabelAndInput
              name="description"
              labelText="Descrição da despesa"
              value={ description }
              type="text"
              onChange={ this.handleChange }
            />

            <LabelAndSelect
              name="tag"
              labelText="Categoria da despesa"
              value={ tag }
              onChange={ this.handleChange }
              options={ categories }
            />
          </div>
          <div className="second-inputs-line-wrapper">
            <LabelAndInput
              name="value"
              labelText="Valor"
              value={ value }
              type="number"
              onChange={ this.handleChange }
            />

            <LabelAndSelect
              name="currency"
              labelText="Moeda"
              value={ currency }
              onChange={ this.handleChange }
              options={ currencies }
            />

            <LabelAndSelect
              name="method"
              labelText="Método de pagamento"
              value={ method }
              onChange={ this.handleChange }
              options={ methods }
            />
          </div>
        </div>

        <div className="wallet-form-button-wrapper">
          <button type="submit" className="wallet-form-button">
            { editor ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </div>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  editor: wallet.editor,
  idToEdit: wallet.idToEdit,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
