import React, { Component } from 'react';

const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  render() {
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
            {/* // implementar */}
          </select>
        </label>

        <label htmlFor="method-input">
          Método de pagamento
          <select name="method" id="method-input">
            { methods.map((method, index) => (
              <option key={ index } value={ method }>{ method }</option>
            )) }
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria
          <select name="tag" id="tag-input">
            { categories.map((category, index) => (
              <option key={ index } value={ category }>{ category }</option>
            )) }
          </select>
        </label>
      </form>
    );
  }
}

export default WalletForm;
