import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeSettings } from '../redux/actions';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: props.settings,
      categories: [],
      difficulties: {
        easy: 'Fácil',
        medium: 'Médio',
        hard: 'Difícil',
      },
      types: {
        multiple: 'Multipla Escolha',
        boolean: 'Verdadeiro ou Falso',
      },
    };

    this.fetchCategories = this.fetchCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);

    document.title = 'Trivia-Settings';
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    const response = await fetch('https://opentdb.com/api_category.php');
    const json = await response.json();
    this.setState({
      categories: json.trivia_categories,
    });
  }

  handleChange({ target: { id, value } }) {
    this.setState((prevState) => ({
      settings: { ...prevState.settings, [id]: value },
    }));
  }

  render() {
    const { settings, categories, difficulties, types } = this.state;
    const { category, difficulty, type } = settings;
    const { dispatchSettings } = this.props;
    return (
      <>
        <h1 data-testid="settings-title">Configurações</h1>
        <label htmlFor="category">
          Categoria
          <select id="category" value={ category } onChange={ this.handleChange }>
            <option key="" value="">Aleatória</option>
            { categories.map(({ id, name }) => (
              <option key={ id } value={ id }>{ name }</option>
            ))}
          </select>
        </label>
        <label htmlFor="difficulty">
          Dificuldade
          <select id="difficulty" value={ difficulty } onChange={ this.handleChange }>
            <option key="" value="">Aleatória</option>
            { Object.entries(difficulties).map(([key, value]) => (
              <option key={ key } value={ key }>{ value }</option>
            )) }
          </select>
        </label>
        <label htmlFor="type">
          Tipo
          <select id="type" value={ type } onChange={ this.handleChange }>
            <option key="" value="">Aleatório</option>
            { Object.entries(types).map(([key, value]) => (
              <option key={ key } value={ key }>{ value }</option>
            )) }
          </select>
        </label>
        <Link to="/">
          <button type="button" onClick={ () => dispatchSettings(settings) }>
            Voltar para tela inicial
          </button>
        </Link>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchSettings: (state) => dispatch(changeSettings(state)),
  };
}

Settings.propTypes = {
  settings: PropTypes.objectOf(PropTypes.string).isRequired,
  dispatchSettings: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
