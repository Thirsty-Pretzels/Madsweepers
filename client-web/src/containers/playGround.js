import React, { Component } from 'react';
import { connect } from 'react-redux';

import { movePlayer } from '../actions/index';
import { bindActionCreators } from 'redux';
import Player from '../components/player';

var playerId = 1;

class PlayGround extends Component {
  render() {
    return (
      <div
        className='playGround'
        id='playGround'
        tabIndex='0'
        onKeyDown={ (e) =>
          this.props.movePlayer(playerId, e.key, this.props.playerLocation, this.props.board)
        }>{

          this.props.playerLocation.map((player) =>
            <Player key={player.id} playerLocation={player} />
          )
      }</div>
    )
  }
}

var mapStateToProps = (state) => {
  return {
    board: state.board,
    playerLocation: state.playerLocation
  }
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ movePlayer: movePlayer }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayGround);

// (e) => this.props.movePlayer(e.key, this.props.playerLocation, this.props.board)