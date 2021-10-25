import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/GoHomeButton.css';

export default function GoHomeButton({ testId }) {
  return (
    <Link className="btn-go-home" data-testid={ testId } to="/">
      JOGAR NOVAMENTE
    </Link>
  );
}

GoHomeButton.propTypes = {
  testId: PropTypes.string.isRequired,
};
