import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movePlayer, openSpace, dropFlag } from '../actions/index';
import { bindActionCreators } from 'redux';
import Player from './player';
import GameResult from './gameResult';

class PlayGround extends Component {

  keyDown(e) {
    // check if the game has end, if so then disable the keyDown function.
    if ( !this.props.endification ) {

      if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
      }
      if ( e.key.slice(0, 5) === 'Arrow'  ) {
        this.props.movePlayer(this.props.userInfo.username, e.key, this.props.playerLocation, this.props.board);
      }

      if ( e.key === ' ' ) {
        this.props.openSpace(this.props.userInfo.username, this.props.playerLocation[this.props.userInfo.username]);
      }

      if ( e.key === 'f' || e.key === 'F') {
        this.props.dropFlag(this.props.userInfo.username, this.props.playerLocation[this.props.userInfo.username]);
      }
    }

  }

  renderPlayers() {
    var playersArr = Object.keys(this.props.playerLocation);

    let minX = this.props.currentBoardView[0][0][0];
    let maxX = minX + 11;
    let minY = this.props.currentBoardView[0][0][1];
    let maxY = minY + 11;

    return playersArr.filter(player =>
        this.props.playerLocation[player].x <= maxX &&
        this.props.playerLocation[player].x >= minX &&
        this.props.playerLocation[player].y <= maxY &&
        this.props.playerLocation[player].y >= minY
      ).map( player =>
      <Player
        key={player}
        username={player}
        playerLocation={this.props.playerLocation[player]} />
    );
  }

  render() {
    return (
      <div>
        <div
          className='playGround'
          id='playGround'
          tabIndex='0'
          onKeyDown={ this.keyDown.bind(this) }>
            { this.renderPlayers() }
        </div>
        {
          this.props.endification ?
          <GameResult redirect={this.props.redirect} />
          : null
        }
      </div>
    )
  }
}

var mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    board: state.board,
    playerLocation: state.playerLocation,
    currentBoardView: state.currentBoardView,
    endification: state.endification
  }
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    movePlayer: movePlayer,
    openSpace: openSpace,
    dropFlag: dropFlag
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayGround);