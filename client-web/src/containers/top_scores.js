import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TopScores extends Component {

  saveHighScore() {
    var finalScores = this.props.scores; //finalScores: [ { id: 'mj', score: -15 } ]
    // finalScores.forEach(({id, score}) => {
    //   saveHighScoreToDB(id, score);
    // });
  }

  getHighScore() {
    // go to redis db and retrieve top scores
  }
  
  renderScore() {

    console.log(this.highScores);
    // return this.props.scores.map((player) => {
    //   console.log(player.name);
    //   return (
    //     <tr> 
    //       <td> {player.name} </td>
    //       <td> {player.score} </td>
    //     </tr> 
    //   )
    // }) 
  }

  render() {
    if (this.props.endification) {
      this.saveHighScore();
    }
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
    scores: state.scores,
    //scores: state.topScores,
    endification: state.endification
  }
};

// var mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     saveHighScoreToDB: saveHighScoreToDB,
//   }, dispatch)
// };

export default connect(mapStateToProps)(TopScores);
