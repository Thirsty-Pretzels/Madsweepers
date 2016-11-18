import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { leaveRoom, endification, toggleReady } from '../actions/index';

class GameResult extends Component {

  componentWillMount() {
    console.log('GameResult component will mount');
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
      </div>
    )
  }
}

var mapStateToProps = (state) => {
  return {
    scores: state.scores,
    userInfo: state.userInfo,
    allReady: state.allReady
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