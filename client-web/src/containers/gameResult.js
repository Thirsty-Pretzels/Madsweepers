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
    const winnerScore = this.props.scores.sort((a, b) => a.score < b.score)[0];
    return (
      <div className='gameResult'>
        <h2>We have a winner!!</h2>
        <p>{winnerScore.id} {winnerScore.score}</p>
        <button onClick={ this.leaveRoom.bind(this) }>leave room</button>
        <button onClick={ this.restart.bind(this) }>restart</button>
        { this.props.userInfo.isReady ? <p>Waiting for other player to be ready...</p> : null}
        <br />
        <br />
        <h3>Game Result</h3>
        <table className='gameResultTable'>
          { Object.keys(this.props.gameResult).map((user) => 
            <tr>
              <td>{user}</td>
              <td><img src='../../images/number.png' className='gameResultImage'/>x{ this.props.gameResult[user].OpenSpace ? this.props.gameResult[user].OpenSpace : 0 }</td>
              <td><img src='../../images/explosion.png' className='gameResultImage'/>x{ this.props.gameResult[user].StepOnMine ? this.props.gameResult[user].StepOnMine : 0 }</td>
              <td><img src='../../images/flag.png' className='gameResultImage'/>x{ this.props.gameResult[user].FlagRight ? this.props.gameResult[user].FlagRight : 0 }</td>
              <td><img src='../../images/redCross.png' className='gameResultImage'/>x{ this.props.gameResult[user].FlagWrong ? this.props.gameResult[user].FlagWrong : 0 }</td>
              <td><img src='../../images/bullet.png' className='gameResultImage'/>x{ this.props.gameResult[user].Shot ? this.props.gameResult[user].Shot : 0 }</td>
              <td><img src='../../images/death.png' className='gameResultImage'/>x{ this.props.gameResult[user].GetShot ? this.props.gameResult[user].GetShot : 0 }</td>
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