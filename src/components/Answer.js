import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { connect } from 'react-redux';

class Answer extends Component {
  render() {
    const { text, correct, index, timeOver, handleClick } = this.props;
    return (
      <div>
        <button
          disabled={ timeOver }
          key={ text }
          type="button"
          data-testid={ correct ? 'correct-answer' : `wrong-answer-${index}` }
          onClick={ handleClick }
        >
          {text}
        </button>
      </div>
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
  handleClick: PropTypes.func.isRequired,
};

export default connect()(Answer);
