import React, { Component } from 'react';
import { connect } from 'react-redux';

class GameStatus extends Component {
  render() {
    return (
      <div id='gameStatus'>
        <h4>Mines Left</h4>
        <progress
          className={classNameDecider(this.props.minesInfo[1] - this.props.minesInfo[0], this.props.minesInfo[1])}
          value={this.props.minesInfo[1] - this.props.minesInfo[0]}
          max={this.props.minesInfo[1]}
        >
        </progress>
      </div>
    )
  }
}

var classNameDecider = function(progress, total) {
  if (progress / total < 0.3) {
    return 'progress progress-striped progress-success';
  } else if (progress / total < 0.50) {
    return 'progress progress-striped progress-info';
  } else if (progress / total < 0.8) {
    return 'progress progress-striped';
  } else if (progress / total < 0.92) {
    return 'progress progress-striped progress-warning';
  } else {
    return 'progress progress-striped progress-danger';
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