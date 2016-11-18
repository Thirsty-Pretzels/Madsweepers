import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { leaveRoom, toggleReady } from '../actions/index';

class GameResult extends Component {

  leaveRoom() {
    // this.props.toggleReady(this.props.userInfo.room, this.props.userInfo.username);
    this.props.leaveRoom(this.props.userInfo.room, this.props.userInfo.username);
    this.props.redirect('');
  }

  render() {
    const winnerScore = this.props.scores.sort((a, b) => a.score < b.score)[0];

    return (
      <div className='gameResult'>
        <h2>We have a winner!!</h2>
        <p>{winnerScore.id} {winnerScore.score}</p>
        <button onClick={ this.leaveRoom.bind(this) }>leave room</button>
        <button>restart</button>
      </div>
    )
  }
}

var mapStateToProps = (state) => {
  return {
    scores: state.scores,
    userInfo: state.userInfo
  }
}

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    leaveRoom: leaveRoom,
    toggleReady:toggleReady
  }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(GameResult);