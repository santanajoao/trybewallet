import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import trybeWalletLogo from '../assets/logo-trybewallet.svg';
import coinsIcon from '../assets/coins-icon.svg';
import profileIcon from '../assets/profile-icon.svg';
import '../styles/Header.css';

class Header extends Component {
  getTotalConverted = () => {
    const { expenses } = this.props;

    const totalConverted = expenses.reduce((total, expense) => {
      const { value, currency, exchangeRates } = expense;
      const exchangeRate = exchangeRates[currency].ask;
      const convertedExpense = value * exchangeRate;
      return total + convertedExpense;
    }, 0);

    return totalConverted.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header className="header">
        <img
          src={ trybeWalletLogo }
          className="header-trybewallet-logo"
          alt="Ícone da TrybeWallet"
        />

        <div className="header-expense-wrapper">
          <img
            src={ coinsIcon }
            className="header-expense-icon"
            alt="Ícone de moedas"
          />

          <p className="header-expense-text">
            Total de despesas:

            &nbsp;
            <span
              data-testid="total-field"
              className="header-expense-value"
            >
              { this.getTotalConverted() }
            </span>

            &nbsp;
            <span
              data-testid="header-currency-field"
              className="header-expense-currency"
            >
              BRL
            </span>
          </p>
        </div>

        <div className="header-email-wrapper">
          <img
            src={ profileIcon }
            className="header-email-icon"
            alt="Ícone de perfil"
          />
          <span data-testid="email-field" className="header-email">
            { email }
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      exchangeRates: PropTypes.objectOf(
        PropTypes.shape({
          ask: PropTypes.string,
        }),
      ),
      currency: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Header);
