import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import getToken from '../services/triviaAPI';
import { userLogin } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  playBtn = async () => {
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    const token = await getToken();
    localStorage.setItem('token', token.token);
    history.push('/game');
    dispatch(userLogin({ name, email }));
  };

  render() {
    const { name, email } = this.state;

    let isDisabled = true;
    if (name.length > 0 && email.length > 0) {
      isDisabled = false;
    }

    return (
      <div>
        <div>
          <h1>Login</h1>
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            placeholder="Digite seu nome"
            onChange={ this.onInputChange }
            value={ name }
          />
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            placeholder="Digite seu E-mail"
            onChange={ this.onInputChange }
            value={ email }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.playBtn }
          >
            Play
          </button>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Settings
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default connect()(Login);
