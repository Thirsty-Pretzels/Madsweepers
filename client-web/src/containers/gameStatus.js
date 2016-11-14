import React, { Component } from 'react';
import { connect } from 'react-redux';

class GameStatus extends Component {
  render() {
    return (
      <div id='gameStatus'>
        <h2>Game Status</h2>
        Mines Left: {this.props.mines}
      </div>
    )
  }
}

var mapStateToProps = (state) => {
  return {
    mines: state.mines
  };
};

export default connect(mapStateToProps)(GameStatus);