import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from '../components/Select';
import { setNewSettings as setNewSettingsAction } from '../actions/settingsActions';
import '../styles/settings.css';

class Settings extends Component {
  constructor() {
    super();

    this.state = {
      howMuch: 5,
      category: '',
      difficulty: '',
      type: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  saveSettings() {
    const { howMuch, category, difficulty, type } = this.state;
    const { history, setNewSettings } = this.props;
    setNewSettings({ howMuch, category, difficulty, type });
    history.push('/');
  }

  render() {
    const { settings: { categories } } = this.props;

    return (
      <main className="main-containner">
        <h2 className="text-settings" data-testid="settings-title"> Settings </h2>
        <img
          className="img-engrenagem"
          src="/engrenagem.png"
          alt="imagem de engrenagem"
        />
        <form className="containner-settings-form">
          <label htmlFor="category">
            Category:
            <select
              className="category-select"
              name="category"
              id="category"
              onChange={ this.handleChange }
            >
              <option name="category" value="">Any</option>
              {categories.map((category) => (
                <option
                  key={ category.id }
                  name="category"
                  value={ category.id }
                >
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <Select handleChange={ this.handleChange } />
        </form>
        <button type="button" onClick={ this.saveSettings }>Save Settings</button>
      </main>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
  setNewSettings: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ settings }) => ({
  settings,
});

const mapDispatchToProps = (dispatch) => ({
  setNewSettings: (payload) => dispatch(setNewSettingsAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
