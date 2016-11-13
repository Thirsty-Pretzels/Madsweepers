import React, { Component } from 'react';
import { connect } from 'react-redux';

import { movePlayer, openSpace, dropFlag } from '../actions/index';
import { bindActionCreators } from 'redux';
import Player from '../components/player';

const playerId = 1;

class PlayGround extends Component {
  keyDown(e) {
    if ( e.key.slice(0, 5) === 'Arrow'  ) {
      this.props.movePlayer(playerId, e.key, this.props.playerLocation, this.props.board);
    }

    if ( e.key === ' ' ) {
      this.props.openSpace(playerId, this.props.playerLocation[playerId]);
    }

    if ( e.key === 'f' ) {
      this.props.dropFlag(playerId, this.props.playerLocation[playerId]);
    }

  }

  render() {
    return (
      <div
        className='playGround'
        id='playGround'
        tabIndex='0'
        onKeyDown={ this.keyDown.bind(this) }>{

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
  return bindActionCreators({
    movePlayer: movePlayer,
    openSpace: openSpace,
    dropFlag: dropFlag
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayGround);

// (e) => this.props.movePlayer(e.key, this.props.playerLocation, this.props.board)