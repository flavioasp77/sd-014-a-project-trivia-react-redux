import React from 'react';
import Header from '../components/Header';

class Score extends React.Component {
  constructor(props) {
    super(props);
    this.getGravatar = this.getGravatar.bind(this);
  }

  getGravatar() {
    return null;
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default Score;
