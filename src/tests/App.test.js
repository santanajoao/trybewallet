import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('App', () => {
  it('a página inicial renderiza um formulário de login', () => {
    renderWithRouterAndRedux(<App />);

    screen.getByRole('textbox');
    screen.getByPlaceholderText('Senha');
    screen.getByRole('button', { name: 'Entrar' });
  });

  it('o botão deve iniciar desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();
  });

  it('é possível digitar nos inputs', () => {
    renderWithRouterAndRedux(<App />);
    const email = 'alguem123@alguem123.com';
    const password = 'a1@._#AbC@';

    const emailInputElement = screen.getByRole('textbox');
    expect(emailInputElement).toHaveValue('');

    userEvent.type(emailInputElement, email);
    expect(emailInputElement).toHaveValue(email);

    const passwordInputElement = screen.getByPlaceholderText('Senha');
    expect(passwordInputElement).toHaveValue('');

    userEvent.type(passwordInputElement, password);
    expect(passwordInputElement).toHaveValue(password);
  });

  it('ao digitar um email válido e uma senha de 6 dígitos o botão é habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const validEmail = 'alguem@alguem.com';
    const validPassword = '123456';

    const loginButtonElement = screen.getByRole('button', { name: 'Entrar' });
    expect(loginButtonElement).toBeDisabled();

    const emailInputElement = screen.getByRole('textbox');
    userEvent.type(emailInputElement, validEmail);
    expect(loginButtonElement).toBeDisabled();

    const passwordInputElement = screen.getByPlaceholderText('Senha');
    userEvent.type(passwordInputElement, validPassword);
    expect(loginButtonElement).toBeEnabled();
  });

  it('ao clicar no botão de login o usuário é redirecionado para "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const validEmail = 'alguem@alguem.com';
    const validPassword = '123456';

    const emailInputElement = screen.getByRole('textbox');
    userEvent.type(emailInputElement, validEmail);

    const passwordInputElement = screen.getByPlaceholderText('Senha');
    userEvent.type(passwordInputElement, validPassword);

    userEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
