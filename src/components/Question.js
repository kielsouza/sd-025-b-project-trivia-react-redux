import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Answer from './Answer';
import { nextQuestion, userAssertions, userScore } from '../redux/actions';

class Question extends Component {
  state = {
    timePlayer: '',
    intervalID: undefined,
    timeOver: true,
    showNextBtn: false,
    timerFunc: undefined,
  };

  componentDidMount() {
    const ONE_SECOND = 1000;
    const QUESTION_DURATION = 30;
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
            showNextBtn: true,
          });
        }
        if (timePlayer === '') {
          this.setState({
            timeOver: false,
          });
        }
      }, ONE_SECOND);
      this.setState({
        intervalID: setIntervalID,
      });
    };

    timer(QUESTION_DURATION);

    this.setState({
      timerFunc: timer,
    });
  }

  scorePlayer = () => {
    const { timePlayer } = this.state;
    const { difficulty } = this.props;
    const format = timePlayer.replace(':', '');
    const NUMBER_1 = 1; const NUMBER_2 = 2; const NUMBER_3 = 3; const NUMBER_10 = 10;

    let score = 0;
    switch (difficulty) {
    case 'easy':
      score = NUMBER_10 + (Number(format) * NUMBER_1);
      break;
    case 'medium':
      score = NUMBER_10 + (Number(format) * NUMBER_2);
      break;
    case 'hard':
      score = NUMBER_10 + (Number(format) * NUMBER_3);
      break;
    default:
      return 0;
    }
    return score;
  };

  handleClick = ({ target }) => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((element) => {
      const dataTestId = element.attributes['data-testid'].value;
      return dataTestId === 'correct-answer'
        ? element.classList.add('green-button') : element.classList.add('red-button');
    });
    const { dispatch } = this.props;
    const verifyAnswer = target.attributes['data-testid'].value;
    if (verifyAnswer === 'correct-answer') {
      const score = this.scorePlayer();
      dispatch(userScore(score));
      dispatch(userAssertions(1));
    }
    this.setState({
      showNextBtn: true,
      timePlayer: '',
      timeOver: true,
    }, () => {
      const { intervalID } = this.state;
      clearInterval(intervalID);
    });
  };

  handleClickNext = () => {
    const { dispatch } = this.props;
    const { timerFunc } = this.state;
    const QUESTION_DURATION = 30;
    dispatch(nextQuestion(1));
    this.setState({
      showNextBtn: false,
      timeOver: true,
    }, () => {
      timerFunc(QUESTION_DURATION);
    });
  };

  render() {
    const { timePlayer, timeOver, showNextBtn } = this.state;
    const { category, question, answers } = this.props;

    return (
      <div>
        <h2 data-testid="question-category">
          { category }
        </h2>

        <h2 data-testid="question-text">
          { question }
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
                scorePlayer={ this.scorePlayer }
                handleClick={ this.handleClick }
              />
            ))
          }
        </div>
        {showNextBtn && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleClickNext }
          >
            Next
          </button>
        )}
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
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Question);
