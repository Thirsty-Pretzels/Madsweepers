import React, { Component } from 'react';
import { connect } from 'react-redux';

// define the ScoreBoard Component
// change: use table, instead of ul
class ScoreBoard extends Component {
  render() {
    return (
      <div id='scoreBoard'>
        <h2>LeaderBoard</h2>
        <div>
          <table>
            <tr>
              <td>Player</td><td>Score</td>
            </tr>
            {
              this.props.scores.sort(function(a, b) {return a.score < b.score}).map((score) =>
                <tr>
                  <td>{score.id}</td>
                  <td>{score.score}</td>
                </tr>
            )
          }
          </table>
        </div>
      </div>
    )
  }
} // end of ScoreBoard Component definition

var mapStateToProps = (state) => {
  return {
    scores: state.scores
  };
};

export default connect(mapStateToProps)(ScoreBoard);