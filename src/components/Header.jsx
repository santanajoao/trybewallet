import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      <div className="Header">
        <div className="Header-expense-container">
          <p className="Header-expense">
            Total de despesas:
            &nbsp;
            <span
              data-testid="total-field"
              className="Header-expense-value"
            >
              { this.getTotalConverted() }
            </span>
            &nbsp;
            <span
              data-testid="header-currency-field"
              className="Header-expense-currency"
            >
              BRL
            </span>
          </p>
        </div>

        <div className="Header-email-container">
          <span data-testid="email-field" className="Header-email">
            { email }
          </span>
        </div>
      </div>
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
