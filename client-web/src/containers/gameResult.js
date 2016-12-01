import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { leaveRoom, endification, toggleReady } from '../actions/index';

class GameResult extends Component {

  componentWillMount() {
    this.props.toggleReady(this.props.userInfo.room, this.props.userInfo.username);
  }

  leaveRoom() {
    this.props.leaveRoom(this.props.userInfo.room, this.props.userInfo.username);
    this.props.endification(false);
    this.props.redirect('');
  }

  restart() {
    this.props.toggleReady(this.props.userInfo.room, this.props.userInfo.username);
  }

  render() {
    const sortedScores = this.props.scores.sort((a, b) => a.score < b.score);
    return (
      <div className='gameResult'>
        <button onClick={ this.leaveRoom.bind(this) }>leave room</button>
        <button onClick={ this.restart.bind(this) }>restart</button>
        { this.props.userInfo.isReady ? <p>Waiting for other player to be ready...</p> : null}
        <br />
        <h3>Game Result: </h3>
        <table className='gameResultTable'>
          { sortedScores.map(score =>
            <tr>
              <td>{score.id}: </td>
              <td>({score.score})</td>
              <td><img src='../../images/number.png' className='gameResultImage'/>x{ this.props.gameResult[score.id].OpenSpace ? this.props.gameResult[score.id].OpenSpace : 0 }</td>
              <td><img src='../../images/assets/explosion.png' className='gameResultImage'/>x{ this.props.gameResult[score.id].StepOnMine ? this.props.gameResult[score.id].StepOnMine : 0 }</td>
              <td><img src='../../images/assets/flag3Copy.png' className='gameResultImage'/>x{ this.props.gameResult[score.id].FlagRight ? this.props.gameResult[score.id].FlagRight : 0 }</td>
              <td><img src='../../images/assets/x.png' className='gameResultImage'/>x{ this.props.gameResult[score.id].FlagWrong ? this.props.gameResult[score.id].FlagWrong : 0 }</td>
              <td><img src='../../images/assets/arrowR.png' className='gameResultImage gameResultImageArrow'/>x{ this.props.gameResult[score.id].GetShot ? this.props.gameResult[score.id].GetShot : 0 }</td>
            </tr>
          )}
        </table>
      </div>
    )
  }
}

var mapStateToProps = (state) => {
  return {
    scores: state.scores,
    userInfo: state.userInfo,
    allReady: state.allReady,
    gameResult: state.gameResult
  }
}

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    leaveRoom: leaveRoom,
    toggleReady: toggleReady,
    endification: endification
  }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(GameResult);