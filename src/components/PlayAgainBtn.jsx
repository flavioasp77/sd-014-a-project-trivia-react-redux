import React from 'react';
import { Link } from 'react-router-dom';

class PlayAgainBtn extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
            className="btn btn-dark text-white mt-3 mb-2"
          >
            Jogar novamente

          </button>
        </Link>
      </div>
    );
  }
}

export default PlayAgainBtn;
