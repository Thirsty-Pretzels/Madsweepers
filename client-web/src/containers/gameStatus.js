import React, { Component } from 'react';
//import { connect } from 'react-redux';

export default class GameStatus extends Component {
  render() {
    return (
      <div id='gameStatus'>
        <h2>Game Status</h2>
      </div>
    )
  }
}

// var mapStateToProps = (state) => {
//   return {
//     mines: state.mines
//   };
// };

//export default connect(mapStateToProps)(GameStatus);