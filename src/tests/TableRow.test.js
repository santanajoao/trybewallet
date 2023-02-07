import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('TableRow', () => {
  it('testa o funcionamento do botão de editar', async () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByRole('textbox'), 'joao123@gmail.com');
    userEvent.type(screen.getByPlaceholderText('Senha'), '123456');
    userEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    userEvent.click(screen.getByRole('button', { name: 'Adicionar despesa' }));

    expect(screen.queryByRole('button', { name: 'Editar despesa' })).not.toBeInTheDocument();

    await screen.findByText('Dólar Americano/Real Brasileiro');
    userEvent.click(screen.getByTestId('edit-btn'));

    screen.getByRole('button', { name: 'Editar despesa' });
  });

  it('testa o funcionamento do botão de excluir', async () => {
    renderWithRouterAndRedux(<App />);
    const description = 'descrição pra teste';
    userEvent.type(screen.getByRole('textbox'), 'joao123@gmail.com');
    userEvent.type(screen.getByPlaceholderText('Senha'), '123456');
    userEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    userEvent.type(screen.getByRole('textbox', { name: 'Descrição da despesa' }), description);

    userEvent.click(screen.getByRole('button', { name: 'Adicionar despesa' }));

    await screen.findByText(description);

    userEvent.click(screen.getByTestId('delete-btn'));

    expect(screen.queryByText(description)).not.toBeInTheDocument();
  });
});
