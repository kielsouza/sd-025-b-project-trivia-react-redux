import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    const hash = md5(email).toString().toLowerCase();
    return (
      <div>
        <img src={ `https://www.gravatar.com/avatar/${hash}` } alt="Foto de perfil" data-testid="header-profile-picture" />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h2 data-testid="header-score">{ score }</h2>
      </div>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
