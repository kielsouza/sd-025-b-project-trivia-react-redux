import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Score</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((player, index) => (
              <tr key={ index }>
                <td data-testid={ `player-name-${index}` }>{player.name}</td>
                <td data-testid={ `player-score-${index}` }>{player.score}</td>
                <td>
                  <img
                    src={ player.picture }
                    alt="Foto de perfil"
                    data-testid={ `player-picture-${index}` }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Home
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
