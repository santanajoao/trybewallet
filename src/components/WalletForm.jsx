import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../redux/actions';
import LabelAndInput from './LabelAndInput';

const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
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

        <label htmlFor="currency-input">
          Moeda
          <select
            value={ currency }
            onChange={ this.handleChange }
            name="currency"
            id="currency-input"
            data-testid="currency-input"
          >
            { currencies.map((_currency, index) => (
              <option key={ index } value={ _currency }>{ _currency }</option>
            )) }
          </select>
        </label>

        <label htmlFor="method-input">
          Método de pagamento
          <select
            value={ method }
            onChange={ this.handleChange }
            name="method"
            id="method-input"
            data-testid="method-input"
          >
            { methods.map((_method, index) => (
              <option key={ index } value={ _method }>{ _method }</option>
            )) }
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria
          <select
            value={ tag }
            onChange={ this.handleChange }
            name="tag"
            id="tag-input"
            data-testid="tag-input"
          >
            { categories.map((category, index) => (
              <option key={ index } value={ category }>{ category }</option>
            )) }
          </select>
        </label>

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
