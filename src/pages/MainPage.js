import React from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

class MainPage extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <div>
          Comece a Jogar:
          <Questions />
        </div>
      </main>
    );
  }
}

export default MainPage;
