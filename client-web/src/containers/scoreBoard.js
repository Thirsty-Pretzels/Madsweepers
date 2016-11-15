import React, { Component } from 'react';
import { connect } from 'react-redux';

// define the ScoreBoard Component
class ScoreBoard extends Component {
  render() {
    return (
      <div id='scoreBoard'>
        <h2>LeaderBoard</h2>
        <div>
        {
          this.props.scores.map((score) =>
          <ul>
          <li><text className='textPlayerId'>{score.id} </text></li>
          <li><text className='textScore'>Score: {score.score} </text></li>
          </ul>
          )
        }
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