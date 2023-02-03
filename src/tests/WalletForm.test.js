import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('WalletForm', () => {
  it('é possível editar uma despesa', async () => {
    renderWithRouterAndRedux(<App />);
    userEvent.type(screen.getByRole('textbox'), 'joao123@gmail.com');
    userEvent.type(screen.getByPlaceholderText('Senha'), '123456');
    userEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    const descriptionInput = screen.getByRole('textbox', { name: 'Descrição' });

    const firstDescription = 'descrição 1';
    userEvent.type(descriptionInput, firstDescription);
    userEvent.click(screen.getByRole('button', { name: 'Adicionar despesa' }));
    await screen.findByText(firstDescription);

    userEvent.click(screen.getByRole('button', { name: 'Editar' }));

    const secondDescription = 'descrição 2';
    userEvent.type(descriptionInput, secondDescription);
    userEvent.click(screen.getByRole('button', { name: 'Editar despesa' }));

    expect(screen.queryByText(firstDescription)).not.toBeInTheDocument();
    screen.getByText(secondDescription);
  });
});
