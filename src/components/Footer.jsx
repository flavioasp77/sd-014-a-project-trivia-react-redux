import React from 'react';

export default class Footer extends React.Component {
  render() {
    const members = [
      { name: 'Augusto Raminelli', user: 'augutoraminelli' },
      { name: 'Daniel Custódio', user: 'DanielSCustodio' },
      { name: 'Gustavo Dias', user: 'unamednada' },
      { name: 'Marcello Alves', user: 'Atharr' },
      { name: 'Victor Varges', user: 'VictorVarges' },
    ];
    return (
      <footer>
        <p>
          Projeto&nbsp;
          <strong>Trivia React Redux</strong>
          , Grupo 5, Turma 14-A
        </p>
        <p>
          { members.map(({ name, user }, index) => (
            <span key={ index }>
              <a href={ `"https://github.com/${user}"` }>
                { name }
              </a>
              { index === members.length - 1 ? '' : ', ' }
            </span>
          )) }
        </p>
      </footer>
    );
  }
}
