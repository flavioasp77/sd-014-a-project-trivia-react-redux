import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class Feedback extends React.Component {
  render() {
    return (
      <main id="feedback-text">
        <Header />
        <h1 data-testid="feedback-text">Feedback</h1>
        <Footer />
      </main>
    );
  }
}
