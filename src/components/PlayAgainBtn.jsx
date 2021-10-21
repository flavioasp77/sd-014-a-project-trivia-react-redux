import React from 'react';
import { Link } from 'react-router-dom';

class PlayAgain extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <button type="button">Jogar novamente</button>
        </Link>
      </div>
    );
  }
}

export default PlayAgain;
