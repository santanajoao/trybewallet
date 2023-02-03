import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

it('ao editar uma expense apenas a expense de id selecionado é editada', async () => {
  const { store } = renderWithRouterAndRedux(<App />);
  userEvent.type(screen.getByRole('textbox'), 'joao123@gmail.com');
  userEvent.type(screen.getByPlaceholderText('Senha'), '123456');
  userEvent.click(screen.getByRole('button', { name: 'Entrar' }));

  const descriptionInput = screen.getByRole('textbox', { name: 'Descrição' });

  const addExpenseButton = screen.getByRole('button', { name: 'Adicionar despesa' });

  const descricao1 = 'descrição 1';
  const descricao2 = 'descrição 2';
  const descricao3 = 'descrição 3';

  userEvent.type(descriptionInput, descricao1);
  userEvent.click(addExpenseButton);

  userEvent.type(descriptionInput, descricao2);
  userEvent.click(addExpenseButton);

  await screen.findByText(descricao1);
  await screen.findByText(descricao2);

  const editButtons = await screen.findAllByRole('button', { name: 'Editar' });
  userEvent.click(editButtons[0]);

  userEvent.type(descriptionInput, descricao3);
  userEvent.click(screen.getByRole('button', { name: 'Editar despesa' }));

  await screen.findByText(descricao3);

  const { wallet } = store.getState();
  const { expenses } = wallet;
  expect(expenses[0].description).toBe(descricao3);
  expect(expenses[1].description).toBe(descricao2);
});
