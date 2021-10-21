import React from 'react';
import { render, screen } from '@testing-library/react';
import Feedback from '../pages/Feedback';
import getGravatar from '../helpers/getGravatar';

// Mockando localStorage
// https://javascript.plainenglish.io/testing-local-storage-with-testing-library-580f74e8805b

const mockData = {
  player: {
    name: 'Jonathan',
    score: 0,
    gravatarEmail: 'www.j0n4t@gmail.com',
  },
};

const gravatarURL = getGravatar(mockData.player.gravatarEmail);

Object.defineProperty(window, 'localStorage', {
  value: { getItem: jest.fn(() => JSON.stringify(mockData)) },
});

describe('Testa o Header da página de Feedback', () => {
  test('O header contém o nome do jogador', async () => {
    render(<Feedback />);
    const playerNameElement = screen.getByTestId('header-player-name');
    expect(playerNameElement).toHaveTextContent(mockData.player.name);
  });

  test('O header contém a pontuação do jogador', () => {
    render(<Feedback />);
    const playerScoreElement = screen.getByTestId('header-score');
    expect(playerScoreElement).toHaveTextContent(mockData.player.score);
  });
  test('O header contém o gravatar do jogador', () => {
    render(<Feedback />);
    const playerPictureElement = screen.getByTestId('header-profile-picture');
    expect(playerPictureElement).toHaveAttribute('src', gravatarURL);
  });
});

describe('Testa o resultado "Podia ser melhor..." da tela de feedback', () => {
  test('verifica pontuação no score', () => {
    mockData.player.score = 2;
    render(<Feedback />);
    const score = screen.getByTestId('feedback-text');
    expect(score).toHaveTextContent('Podia ser melhor...');
  });
  test('Testa o resultado "Mandou bem" da tela de feedback', () => {
    mockData.player.score = 5;
    render(<Feedback />);
    const score2 = screen.getByTestId('feedback-text');
    expect(score2).toHaveTextContent('Mandou bem!');
  });
});
