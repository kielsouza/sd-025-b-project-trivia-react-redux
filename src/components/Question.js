import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Answer from './Answer';
import { shuffle } from '../helpers';

class Question extends Component {
  state = {
    timePlayer: '',
    intervalID: undefined,
    timeOver: false,
  };

  componentDidMount() {
    const ONE_SECOND = 1000;
    const QUESTION_DURATION = 30;
    const { answers } = this.props;

    const timer = (seconds) => {
      let remainingTime = seconds;
      const setIntervalID = setInterval(() => {
        if (remainingTime >= 0) {
          this.setState({
            timePlayer: `00:${remainingTime.toString().padStart(2, '0')}`,
          });
          remainingTime -= 1;
        } else {
          const { intervalID } = this.state;
          clearInterval(intervalID);
        }
        const { timePlayer } = this.state;
        if (timePlayer === '00:00') {
          this.setState({
            timeOver: true,
          });
        }
      }, ONE_SECOND);
      this.setState({
        intervalID: setIntervalID,
      });
    };
    timer(QUESTION_DURATION);
    shuffle(answers);
  }

  render() {
    const { timePlayer, timeOver } = this.state;
    const { category, question, answers } = this.props;

    return (
      <div>
        <h2 data-testid="question-category">
          {category}
        </h2>

        <h2 data-testid="question-text">
          {question}
        </h2>
        <h3>
          { timePlayer }
        </h3>

        <div data-testid="answer-options">
          {
            answers.map(({ text, correct, index = null }, key) => (
              <Answer
                timeOver={ timeOver }
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