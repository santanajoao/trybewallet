import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('Header', () => {
  const validEmail = 'joao123@gmail.com';
  it('o email digitado ao logar aparece no header', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByRole('textbox'), validEmail);
    userEvent.type(screen.getByPlaceholderText('Senha'), '123456');
    userEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    screen.getByText(validEmail);
  });

  it('o total inicia com 0', () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByRole('textbox'), validEmail);
    userEvent.type(screen.getByPlaceholderText('Senha'), '123456');
    userEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    expect(screen.getByTestId('total-field')).toHaveTextContent('0.00');
  });

  it('ao adicionar uma despesa o total é atualizado', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByRole('textbox'), validEmail);
    userEvent.type(screen.getByPlaceholderText('Senha'), '123456');
    userEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    userEvent.type(screen.getByRole('spinbutton', { name: 'Valor' }), '1');

    act(() => {
      userEvent.click(screen.getByRole('button', { name: 'Adicionar despesa' }));
    });

    await waitFor(() => {
      expect(screen.getByTestId('total-field')).toHaveTextContent('4.75');
    });
  });
});
