import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa a página de Login', () => {
  const playerName = 'Jogador 1';
  test('Contém campo para adicionar o nome do jogador', async () => {
    renderWithRouter(<App />);
    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    userEvent.type(nameInput, playerName);
    expect(nameInput).toHaveValue(playerName);
  });
});
