import React from 'react';
import { Link } from 'react-router-dom';

class PlayAgainBtn extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
      </div>
    );
  }
}

export default PlayAgainBtn;
