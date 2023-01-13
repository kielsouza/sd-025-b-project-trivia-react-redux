import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getQuestions } from '../services/triviaAPI';
import Header from '../components/Header';
import Question from '../components/Question';

const responseCodes = {
  Success: 0,
  NoResults: 1,
  InvalidParameter: 2,
  TokenNotFound: 3,
  TokenEmpty: 4,
};
export default class Game extends Component {
  state = {
    questions: [],
    currentIndex: 0,
  };

  async componentDidMount() {
    const { history } = this.props;
    try {
      const { code, questions } = await getQuestions();
      if (code === responseCodes.TokenNotFound) {
        localStorage.clear();
        return history.replace('/');
      }

      this.setState({
        questions,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { questions, currentIndex } = this.state;
    const question = questions[currentIndex];

    return (
      <div>
        <Header />
        <h1>
          Trivia
        </h1>
        <div>
          {question && <Question { ...question } />}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.func,
}.isRequired;
