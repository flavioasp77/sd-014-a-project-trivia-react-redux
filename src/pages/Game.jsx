import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

export default class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="flex flex-col justify-center items-center h-screen border-2 border-gray-500 rounded-md">
          <Questions />
        </div>
      </>
    );
  }
}
