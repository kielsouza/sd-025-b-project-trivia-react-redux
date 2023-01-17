import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../services/triviaAPI';
import Header from '../components/Header';
import Question from '../components/Question';
import { shuffle } from '../helpers';
import { resetIndex } from '../redux/actions';

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
      const shuffleQuestions = questions.map(({ answers, ...rest }) => ({
        ...rest,
        answers: shuffle(answers),
      }));

      this.setState({
        questions: shuffleQuestions,
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

    if (currentIndex > MaxQuestions) {
      const { history, score, name, picture, dispatch } = this.props;
      const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
      const newRanking = [...ranking, { name, score, picture }];
      newRanking.sort((a, b) => b.score - a.score);
      localStorage.setItem('ranking', JSON.stringify(newRanking));
      history.push('/feedback');
      dispatch(resetIndex(0));
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
  score: state.player.score,
  picture: state.player.picture,
  name: state.player.name,
});

export default connect(mapStateToProps)(Game);
