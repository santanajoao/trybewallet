import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
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
              0
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
};

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

export default connect(mapStateToProps)(Header);
