import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
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
          >
            Play
          </button>
        </div>
      </div>
    );
  }
}
