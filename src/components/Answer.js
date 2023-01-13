import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Answer extends Component {
  render() {
    const { text, correct, index, timeOver } = this.props;
    return (
      <button
        disabled={ timeOver }
        key={ text }
        type="button"
        data-testid={ correct ? 'correct-answer' : `wrong-answer-${index}` }
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
};

export default Answer;
