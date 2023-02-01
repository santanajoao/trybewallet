import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
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
    const { dispatch } = this.props;
    return (
      <div className="Login">
        <form onSubmit={ this.handleSubmit } className="Login__form">
          <input
            value={ email }
            type="email"
            placeholder="E-mail"
            onChange={ this.handleChange }
            name="email"
            data-testid="email-input"
          />
          <input
            value={ password }
            type="password"
            placeholder="Senha"
            onChange={ this.handleChange }
            name="password"
            data-testid="password-input"
          />
          <button
            type="submit"
            onClick={ () => dispatch(login(email)) }
            disabled={ this.areFieldsInvalid() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
