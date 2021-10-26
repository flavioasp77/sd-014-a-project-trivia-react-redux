import React from 'react';
import '../css/Loading.css';
import Footer from './Footer';

class Loading extends React.Component {
  render() {
    return (
      <>
        <div className="loading">Loading...</div>
        <Footer />
      </>
    );
  }
}

export default Loading;
