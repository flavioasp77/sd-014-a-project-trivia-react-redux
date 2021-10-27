import React from 'react';
import PropTypes from 'prop-types';

class Perguntas extends React.Component {
  render() {
    const { indice, perguntas } = this.props;
    return (
      <section className="perguntas">
        <p data-testid="question-category" className="categoria">
          { decodeURIComponent(perguntas[indice].category) }
        </p>
        <p data-testid="question-text">
          { decodeURIComponent(perguntas[indice].question) }
        </p>
        <p className="indice">
          { `Pergunta: ${indice + 1} / ${perguntas.length}`}
        </p>
      </section>
    );
  }
}
Perguntas.propTypes = {
  indice: PropTypes.number.isRequired,
  perguntas: PropTypes.arrayOf.isRequired,
};
export default Perguntas;
