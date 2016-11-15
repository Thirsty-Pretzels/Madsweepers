import React, { Component } from 'react';
import { connect } from 'react-redux';

class GameStatus extends Component {
  render() {
    return (
      <div id='gameStatus'>
        <h2>Game Status</h2>
        <ul>
        <li> Mines Left: {this.props.minesLeft} </li>
        </ul>
      </div>
    )
  }
}

// Connect redux state to component props
var mapStateToProps = (state) => {
  return {
    //gameStatus is the key of the gameStatus reducer under combineReducers
    minesLeft: state.gameStatus
  };
};

// Connect component
export default connect(mapStateToProps)(GameStatus);