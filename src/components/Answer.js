import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { connect } from 'react-redux';
import { userScore } from '../redux/actions';

class Answer extends Component {
  handleClick = () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((element) => {
      const dataTestId = element.attributes['data-testid'].value;
      return dataTestId === 'correct-answer'
        ? element.classList.add('green-button') : element.classList.add('red-button');
    });
    const { scorePlayer, correct, dispatch } = this.props;
    if (correct) {
      const score = scorePlayer();
      dispatch(userScore(score));
    }
  };

  render() {
    const { text, correct, index, timeOver } = this.props;
    return (
      <button
        disabled={ timeOver }
        key={ text }
        type="button"
        data-testid={ correct ? 'correct-answer' : `wrong-answer-${index}` }
        onClick={ this.handleClick }
      >
        {text}
      </button>
    );
  }
}

Answer.defaultProps = {
  index: null,
};

Answer.propTypes = {
  text: PropTypes.string.isRequired,
  index: PropTypes.number,
  correct: PropTypes.bool.isRequired,
  timeOver: PropTypes.bool.isRequired,
  scorePlayer: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Answer);
