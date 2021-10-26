import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setSettings as settingsAction } from '../redux/actions';
import SelectInput from './SelectInput';
import { categories, levels, types } from '../data';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      category: 'any',
      difficulty: 'any',
      type: 'any',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { setSettings } = this.props;
    return (
      <div className="modal fade" id="settings">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" data-testid="settings-title">Configurações</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <SelectInput
                title="Category"
                id="category"
                options={ categories }
                handler={ this.handleChange }
              />
              <SelectInput
                title="Difficulty"
                id="difficulty"
                options={ levels }
                handler={ this.handleChange }
              />
              <SelectInput
                title="Type"
                id="type"
                options={ types }
                handler={ this.handleChange }
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={ () => setSettings(this.state) }
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  setSettings: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setSettings: (settings) => dispatch(settingsAction(settings)),
});

export default connect(null, mapDispatchToProps)(Settings);
