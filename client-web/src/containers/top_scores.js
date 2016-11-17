import React, { Component } from 'react';
import { connect } from 'react-redux';

class TopScores extends Component {
  
  renderScore() {
    return this.props.scores.map((player) => {
      console.log(player.name);
      return (
        <tr> 
          <td> {player.name} </td>
          <td> {player.score} </td>
        </tr> 
      )
    }) 
  }

  render() {
    return (
      <div id='topScores'>
        <h2>Top Scores</h2>
          <table>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
            { this.renderScore() }
          </table>
      </div>
    )
  }
} // end of ScoreBoard Component definition

var mapStateToProps = (state) => {
  return {
    //scores: state.scores
    scores: state.topScores
  };
};

export default connect(mapStateToProps)(TopScores);
