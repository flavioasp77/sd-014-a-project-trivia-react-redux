import React from 'react';

class NextQstButton extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <button onClick={ () => onClick() } type="button" data-testid="btn-next">
        Próxima
      </button>
    );
  }
}

export default NextQstButton;
