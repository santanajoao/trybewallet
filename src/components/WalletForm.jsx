import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, createExpense } from '../redux/actions';
import LabelAndInput from './LabelAndInput';
import LabelAndSelect from './LabelAndSelect';

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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { dispatch } = this.props;
    dispatch(createExpense(this.state));

    this.setState(({ id }) => ({ ...INITIAL_STATE, id: id + 1 }));
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form onSubmit={ this.handleSubmit } className="WalletForm">
        <LabelAndInput
          name="value"
          labelText="Valor"
          value={ value }
          type="number"
          onChange={ this.handleChange }
        />

        <LabelAndInput
          name="description"
          labelText="Descrição"
          value={ description }
          type="text"
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

        <LabelAndSelect
          name="tag"
          labelText="Categoria"
          value={ tag }
          onChange={ this.handleChange }
          options={ categories }
        />

        <button type="submit">
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
