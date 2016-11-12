import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from '../components/board_row';

import { movePlayer } from '../actions/index';
import { bindActionCreators } from 'redux';

class Board extends Component {
  // keyDown(event) {
  //   var keyPress;
  //   if ( event.key.slice(0, 5) === 'Arrow' ) {
  //     if (event.key === 'ArrowUp' && this.props.playerLocation.y > 0 ) {
  //       keyPress = 'UP';
  //     } else if (event.key === 'ArrowDown' && this.props.playerLocation.y < this.props.board.length - 1) {
  //       keyPress = 'DOWN';
  //     } else if (event.key === 'ArrowLeft' && this.props.playerLocation.x > 0) {
  //       keyPress = 'LEFT';
  //     } else if (event.key === 'ArrowRight' && this.props.playerLocation.x < this.props.board[0].length - 1) {
  //       keyPress = 'RIGHT';
  //     }

  //     if (!!keyPress) {
  //       socket.emit('movePlayer', this.props.playerLocation);
  //       socket.on('movePlayer', (data) => {
  //         this.props.movePlayer(keyPress, data);
  //       });
  //     }

  //   }
  // }

  render() {
    return (
      <div
        id='gameBoard'
        className='gameBoard'
        tabIndex='0'
        autoFocus={true}
        onKeyDown={ (e) => this.props.movePlayer(e.key, this.props.playerLocation, this.props.board) }
      >{
        this.props.board.map((row, index) => {
          return (
            <Row
              key={index}
              rowIndex={index}
              row={row}
              playerLocation={this.props.playerLocation} />
          )
        })
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

export default connect(mapStateToProps, mapDispatchToProps)(Board);