import React, { Component } from 'react';
import { connect } from 'react-redux';

class GameStatus extends Component {
  render() {
    return (
      <div id='gameStatus'>
        <h2>Game Status</h2>
        Mines Left: {this.props.minesLeft}
      </div>
    )
  }
}

var mapStateToProps = (state) => {
  return {
    minesLeft: state.minesLeft
  };
};

export default connect(mapStateToProps)(GameStatus);