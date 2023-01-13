import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Answer from './Answer';
import { shuffle } from '../helpers';

class Question extends Component {
  render() {
    const { category, question, answers } = this.props;
    shuffle(answers);

    return (
      <div>
        <h2 data-testid="question-category">
          {category}
        </h2>

        <h2 data-testid="question-text">
          {question}
        </h2>

        <div data-testid="answer-options">
          {
            answers.map(({ text, correct, index = null }, key) => (
              <Answer
                key={ key }
                text={ text }
                correct={ correct }
                index={ index }
              />
            ))
          }
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  category: PropTypes.string,
  question: PropTypes.string,
  type: PropTypes.string,
  difficulty: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    correct: PropTypes.bool,
    index: PropTypes.number,
  })),
}.isRequired;

export default Question;
