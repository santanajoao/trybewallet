import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;
    return (
      <form className="WalletForm">
        <label htmlFor="value-input">
          Valor
          <input
            type="number"
            name="value"
            id="value-input"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="description-input">
          Descrição
          <input
            type="text"
            name="description"
            id="description-input"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="currency-input">
          Moeda
          <select
            name="currency"
            id="currency-input"
            data-testid="currency-input"
          >
            { currencies.map((currency, index) => (
              <option key={ index } value={ currency }>{ currency }</option>
            )) }
          </select>
        </label>

        <label htmlFor="method-input">
          Método de pagamento
          <select name="method" id="method-input" data-testid="method-input">
            { methods.map((method, index) => (
              <option key={ index } value={ method }>{ method }</option>
            )) }
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria
          <select name="tag" id="tag-input" data-testid="tag-input">
            { categories.map((category, index) => (
              <option key={ index } value={ category }>{ category }</option>
            )) }
          </select>
        </label>
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
