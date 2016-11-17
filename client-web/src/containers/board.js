import React, { Component } from 'react';
import Row from '../components/board_row';
import { connect } from 'react-redux';
import { getNewBoard } from '../actions/index';
import { bindActionCreators } from 'redux';

class Board extends Component {
  componentWillMount() {
    this.props.getNewBoard();
  }

  renderCurrentView() {
    const currentBoard = this.props.currentBoardView.map(row =>
      row.map(index =>
        this.props.board[index[1]][index[0]]
      )
    );

    return currentBoard.map((row, index) =>
      <Row key={index} row={row} />
    );
  }

  render() {
    return (
      <div
        id='gameBoard'
        className='gameBoard'
      >{
        this.renderCurrentView()
      }</div>
    )
  }
}

var mapStateToProps = (state) => {
  return {
    board: state.board,
    currentBoardView: state.currentBoardView
  }
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getNewBoard: getNewBoard }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);