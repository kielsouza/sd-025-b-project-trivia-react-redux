import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { score, totalScore, totalQuestions } = this.props;
    const minimumScore = 3;
    const feedback = score >= minimumScore ? 'Well Done!' : 'Could be better...';
    return (
      <div>
        <h1>Feedback</h1>
        <Header />
        <h2 data-testid="feedback-text">{ feedback }</h2>
        <p data-testid="feedback-total-score">{ totalScore }</p>
        <p data-testid="feedback-total-question">{ totalQuestions }</p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}
Feedback.propTypes = {
  score: PropTypes.number,
}.isRequired;

export default Feedback;
