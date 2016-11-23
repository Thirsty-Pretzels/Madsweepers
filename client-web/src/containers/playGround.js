import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  movePlayer,
  openSpace,
  dropFlag,
  updateBulletLocation,
  fireBullet,
  beingStun,
  bananaOut,
  updateBanana
} from '../actions/index';
import { bindActionCreators } from 'redux';
import Player from './player';
import GameResult from './gameResult';

var func;
var moving = false;

class PlayGround extends Component {

  animateBullet() {
    if ( !moving ) {
      moving = true;
      const boardSize = {x: this.props.board[0].length, y: this.props.board.length - 1};


      func = setInterval( () => {
        this.props.updateBulletLocation(this.props.bulletLocation, boardSize);

        for (var i = 0; i < this.props.bulletLocation.length; i++) {
          if ( this.props.bulletLocation[i].x === this.props.playerLocation[this.props.userInfo.username].x && this.props.bulletLocation[i].y === this.props.playerLocation[this.props.userInfo.username].y ) {
            this.props.beingStun();
          }
        }

      } , 100);
    }
  }

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

      if ( e.key === 'd' ) {
        const direction = this.props.playerLocation[this.props.userInfo.username].status;
        const x = this.props.playerLocation[this.props.userInfo.username].x;
        const y = this.props.playerLocation[this.props.userInfo.username].y;
        this.props.fireBullet( {direction, x, y} );
      }

      if ( e.key ==='s' ) {
        const x = this.props.playerLocation[this.props.userInfo.username].x;
        const y = this.props.playerLocation[this.props.userInfo.username].y;
        this.props.bananaOut( {x, y} );
        this.props.updateBanana( {type: 'ADD-BANANA', location: {x, y}} )
      }
      
      if (e.key === 'a' || e.key ==='A') {
        socket.emit('danceParty', )
      }
    }

  }

  renderPlayers() {
    var playersArr = Object.keys(this.props.playerLocation); //usernames
    // console.log(this.props.playerLocation, 'playersArr')

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
        allLocation = {this.props.playerLocation}
        playerLocation={this.props.playerLocation[player]} />
    );
  }

  renderBullets() {
    if ( this.props.bulletLocation.length ) {
      this.animateBullet();

      let minX = this.props.currentBoardView[0][0][0];
      let maxX = minX + 11;
      let minY = this.props.currentBoardView[0][0][1];
      let maxY = minY + 11;

      return this.props.bulletLocation.filter(bullet =>
          bullet.x <= maxX &&
          bullet.x >= minX &&
          bullet.y <= maxY &&
          bullet.y >= minY
        ).map((bullet) => {
          let className;
          let style;
          switch(bullet.direction) {
            case 1:
              className = 'bullet bulletL';
              break;
            case 2:
              className = 'bullet bulletR';
              break;
            case 3:
              className = 'bullet bulletU';
              break;
            case 4:
              className = 'bullet bulletD';
              break;
            default:
              className = 'bullet bulletL';
              break;
          }
          return (
            <div
              key={ bullet.id }
              className={className}
              style={{
                marginLeft: (bullet.x - this.props.currentBoardView[0][0][0]) * 50 + 1,
                marginTop: (bullet.y - this.props.currentBoardView[0][0][1]) * 50 + 1
              }}>
            </div>
          );
        }
      )
    } else {
      clearInterval(func);
      moving = false;
    }
  }

  renderBananas() {
    let minX = this.props.currentBoardView[0][0][0];
    let maxX = minX + 11;
    let minY = this.props.currentBoardView[0][0][1];
    let maxY = minY + 11;

    return this.props.bananaLocation.filter(banana =>
          banana.x <= maxX &&
          banana.x >= minX &&
          banana.y <= maxY &&
          banana.y >= minY
        ).map(banana =>
      <div
        key={ banana.x + Math.random() }
        className='banana'
        style={{
          marginLeft: (banana.x - this.props.currentBoardView[0][0][0]) * 50 + 1,
          marginTop: (banana.y - this.props.currentBoardView[0][0][1]) * 50 + 1
        }}>
      </div>
    )
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
            { this.renderBullets() }
            { this.renderBananas() }
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
    endification: state.endification,
    bulletLocation: state.bulletLocation,
    bananaLocation: state.bananaLocation
  }
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    movePlayer: movePlayer,
    openSpace: openSpace,
    dropFlag: dropFlag,
    updateBulletLocation: updateBulletLocation,
    fireBullet: fireBullet,
    beingStun: beingStun,
    bananaOut: bananaOut,
    updateBanana: updateBanana
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayGround);