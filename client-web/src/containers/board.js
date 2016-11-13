import React, { Component } from 'react';
import Row from '../components/board_row';
import { connect } from 'react-redux';
import { movePlayer } from '../actions/index';
import { bindActionCreators } from 'redux';

class Board extends Component {
  render() {
    return (
      <div
        id='gameBoard'
        className='gameBoard'
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