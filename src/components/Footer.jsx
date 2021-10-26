import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="footer__container">
          <p>
            { 'Desenvolvido por Grupo 16 - Turma 14 - Tribo A - Trybe '
            + '| Amanda Zotelli | Dandara Dias | Flávio Pires | '
            + ' Maurício Leite | Riquelme Bandeira'
            + '| © Copywrite 2021 - Todos os direitos disponíveis' }
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
