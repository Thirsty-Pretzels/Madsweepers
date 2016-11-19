import React, { Component } from 'react';
import Row from '../components/board_row';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class BoardOverview extends Component {

  render() {
    const playersArr = Object.keys(this.props.playerLocation);
    var boardOverview = this.props.board.map(row=> row.map(grid=>{return {status: grid.status, val: grid.val}}));
    playersArr.forEach(player =>
      boardOverview[this.props.playerLocation[player].y][this.props.playerLocation[player].x].status = 10
    );

    boardOverview[this.props.playerLocation[this.props.username].y][this.props.playerLocation[this.props.username].x].status = 11;

    return (
      <div className='gameBoard'>
        <p>{ Math.floor((Date.now() - this.props.gameTime) / 1000) }/60 seconds
        </p>{
        boardOverview.map( (row, index) =>
          <Row
            key={index}
            row={row}
            overView={true} />
        )
      }</div>
    )
  }
}

var mapStateToProps = (state) => {
  return {
    board: state.board,
    currentBoardView: state.currentBoardView,
    playerLocation: state.playerLocation,
    username: state.userInfo.username,
    gameTime: state.gameTime
  }
};


export default connect(mapStateToProps)(BoardOverview);