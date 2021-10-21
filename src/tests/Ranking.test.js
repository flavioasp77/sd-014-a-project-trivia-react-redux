<<<<<<< HEAD
test('', () => {});
=======
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import Ranking from '../pages/Ranking';

const mockData = [
  {
    name: 'John',
    score: 0,
    picture: 'https://www.gravatar.com/avatar/1f9d9a9efc2f523b2f09629444632b5c',
  },
  {
    name: 'Peter',
    score: 15,
    picture: 'https://www.gravatar.com/avatar/e43af6a00f69cc44461f6330aa7dc7a6',
  },
  {
    name: 'Paul',
    score: 20,
    picture: 'https://www.gravatar.com/avatar/0d1952bd15cd6b2a24f656178e392901',
  },
  {
    name: 'Mary',
    score: 10,
    picture: 'https://www.gravatar.com/avatar/b028e9ca948dbc90143f598ad3c254b6',
  },
  {
    name: 'Josette',
    score: 5,
    picture: 'https://www.gravatar.com/avatar/1696a68418ef46991954fa708428926d',
  },
];

describe('Testa a página de Ranking', () => {
  // Mockando localStorage
  // https://javascript.plainenglish.io/testing-local-storage-with-testing-library-580f74e8805b
  Object.defineProperty(window, 'localStorage', {
    value: { getItem: jest.fn(() => JSON.stringify(mockData)) },
  });

  test('Existe uma seção para a lista de ranking', () => {
    renderWithRouter(<Ranking />);
    const rankingListSection = screen.getByTestId('ranking-list-section');
    expect(rankingListSection).toBeInTheDocument();
  });

  test('Existe um botão que redireciona para a página inicial', () => {
    renderWithRouter(<Ranking />);
    const goToHomeButton = screen.getByTestId('btn-go-home');
    expect(goToHomeButton).toBeInTheDocument();
  });
});
>>>>>>> origin/main-group-1-ranking
