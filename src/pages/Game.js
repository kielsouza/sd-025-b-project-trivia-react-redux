import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../services/triviaAPI';
import Header from '../components/Header';
import Question from '../components/Question';
import { shuffle } from '../helpers';

const responseCodes = {
  Success: 0,
  NoResults: 1,
  InvalidParameter: 2,
  TokenNotFound: 3,
  TokenEmpty: 4,
};
class Game extends Component {
  state = {
    questions: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    try {
      const { code, questions } = await getQuestions();
      if (code === responseCodes.TokenNotFound) {
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
    const { questions } = this.state;
    const { currentIndex } = this.props;
    const question = questions[currentIndex];
    const MaxQuestions = 4;

    if (question !== undefined) {
      shuffle(question.answers);
    }

    if (currentIndex > MaxQuestions) {
      const { history } = this.props;
      history.push('/feedback');
    }

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
  dispatch: PropTypes.func,
  currentIndex: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  currentIndex: state.game.currentIndex,
});

export default connect(mapStateToProps)(Game);
