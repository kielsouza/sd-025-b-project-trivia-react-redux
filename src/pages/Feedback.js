import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { resetScore } from '../redux/actions';

class Feedback extends Component {
  render() {
    const { assertions, score, dispatch } = this.props;
    const minimumScore = 3;
    const feedback = assertions >= minimumScore ? 'Well Done!' : 'Could be better...';

    return (
      <div>
        <h1>Feedback</h1>
        <Header />
        <h2 data-testid="feedback-text">{ feedback }</h2>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <Link to="/">
          <button
            onClick={ () => dispatch(resetScore(0)) }
            type="button"
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            onClick={ () => dispatch(resetScore(0)) }
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
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
