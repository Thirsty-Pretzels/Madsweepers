import React, { Component } from 'react';
import { connect } from 'react-redux';

// define the ScoreBoard Component
class ScoreBoard extends Component {
  render() {
    return (
      <div id='scoreBoard'>
        <h2>LeaderBoard</h2>
        <ul>
        {
          this.props.scores.map((score) =>
            <li><text className='textPlayerId'>{score.id}      </text><text className='textScore'>{score.score}</text></li>)
        }
        </ul>
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