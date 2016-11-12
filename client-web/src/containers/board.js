import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from '../components/board_row';

class Board extends Component {
  render() {
    return (
      <div>{
        this.props.board.map(function(row) {
          return (
            <Row row={row} />
          )
        })
      }</div>
    )
  }
}

var mapStateToProps = function(state) {
  return {
    board: state.board
  }
};

export default connect(mapStateToProps)(Board);