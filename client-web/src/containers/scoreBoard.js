import React, { Component } from 'react';
import { connect } from 'react-redux';

// define the ScoreBoard Component
// change: use table, instead of ul
class ScoreBoard extends Component {
  renderScore() {
    return this.props.scores.sort((a, b) => a.score < b.score)
    .map(score => {
      if ( score.id === this.props.username ) {
        return (
          <div key={score.id} id='playerScore' className='scoreItem'>
            <div className='scoreboard-score'>{score.score} </div>
            <div className='scoreboard-id'>{score.id}</div>
          </div>
        )
      } else {
        return (
          <div key={score.id} className='scoreItem'>
            <div className='scoreboard-score'>{score.score} </div>
            <div className='scoreboard-id'>{score.id}</div>
          </div>
        )
      }
    })
  }

  render() {
    return (
      <div id='scoreBoard'>
        <h2>LeaderBoard</h2>
        <div>
          { this.renderScore() }
        </div>
      </div>
    )
  }
} // end of ScoreBoard Component definition

var mapStateToProps = (state) => {
  return {
    scores: state.scores,
    username: state.username
  };
};

export default connect(mapStateToProps)(ScoreBoard);
