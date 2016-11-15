import React, { Component } from 'react';
import Row from '../components/board_row';
import { connect } from 'react-redux';
import { getNewBoard } from '../actions/index';
import { bindActionCreators } from 'redux';

class Board extends Component {
  componentWillMount() {
    this.props.getNewBoard();
  }

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
              row={row} />
          )
        })
      }</div>
    )
  }
}

var mapStateToProps = (state) => {
  return {
    board: state.board
  }
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getNewBoard: getNewBoard }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);