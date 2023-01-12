import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getQuestions from '../services/questionsAPI';

export default class Game extends Component {
  state = {
    questions: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const number3 = 3;
    try {
      const questions = await getQuestions();
      if (questions.response_code === number3) {
        localStorage.clear();
        return history.replace('/');
      }
      this.setState({
        questions: questions.results,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { questions } = this.state;

    let fourQuestions = [];
    if (questions.length > 0) {
      fourQuestions = [
        <button
          key="correct-answer"
          type="button"
          data-testid="correct-answer"
        >
          {questions[0].correct_answer}
        </button>,
        ...questions[0].incorrect_answers.map((elem, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `wrong-answer-${index}` }
          >
            {elem}
          </button>
        )),
      ];
      const number05 = 0.5;
      const shuffle = (array) => array.sort(() => Math.random() - number05);
      shuffle(fourQuestions);
    }

    return (
      <div>
        <h1>
          Trivia
        </h1>
        <div>
          {questions.length > 0
            && (
              <div>
                <h2 data-testid="question-category">
                  {questions[0].category}
                </h2>

                <h2 data-testid="question-text">
                  {questions[0].question}
                </h2>

                <div data-testid="answer-options">
                  {
                    fourQuestions.map((elem) => (
                      elem
                    ))
                  }
                </div>
              </div>
            )}
        </div>

      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.func,
}.isRequired;
