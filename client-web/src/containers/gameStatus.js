import React, { Component } from 'react';
import { connect } from 'react-redux';

class GameStatus extends Component {
  render() {
    return (
      <div id='gameStatus'>
        <h2>Game Status</h2>
        <text>  {this.props.minesInfo[0]} / {this.props.minesInfo[1]} </text>
      </div>
    )
  }
}

// Connect redux state to component props
var mapStateToProps = (state) => {
  return {
    //gameStatus is the key of the gameStatus reducer under combineReducers
    minesInfo: state.gameStatus
  };
};

// Connect component
export default connect(mapStateToProps)(GameStatus);