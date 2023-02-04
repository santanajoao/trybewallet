import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions';
import trybeWalletLogo from '../assets/logo-trybewallet.svg';
import '../styles/Login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  loginWithEmail = (email) => {
    const { dispatch } = this.props;
    dispatch(login(email));
  };

  handleLogin = (event) => {
    event.preventDefault();

    const { history } = this.props;
    const { email } = this.state;
    this.loginWithEmail(email);

    history.push('/carteira');
  };

  areFieldsInvalid = () => {
    const { email, password } = this.state;
    const passwordMinLength = 6;

    const invalidEmail = !/[\w\d]+@[\w\d]+\.com/.test(email);
    const invalidPassword = password.length < passwordMinLength;
    return invalidEmail || invalidPassword;
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-page">
        <div className="login-form-and-logo-wrapper">
          <img
            src={ trybeWalletLogo }
            className="login-logo"
            alt="TrybeWallet logo"
          />
          <form onSubmit={ this.handleLogin } className="login-form">
            <input
              value={ email }
              type="email"
              placeholder="E-mail"
              onChange={ this.handleInputChange }
              name="email"
              data-testid="email-input"
              className="login-input"
            />
            <input
              value={ password }
              type="password"
              placeholder="Senha"
              onChange={ this.handleInputChange }
              name="password"
              data-testid="password-input"
              className="login-input"
            />
            <button
              type="submit"
              disabled={ this.areFieldsInvalid() }
              className="login-button"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
