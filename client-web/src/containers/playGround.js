import React, { Component } from 'react';
import { connect } from 'react-redux';

import { movePlayer } from '../actions/index';
import { bindActionCreators } from 'redux';
import Player from '../components/player';

class PlayGround extends Component {
  render() {
    return (
      <div
        className='playGround'
        id='playGround'
        tabIndex='0'
        onKeyDown={ (e) =>
          this.props.movePlayer(e.key, this.props.playerLocation, this.props.board)
        }>
        <Player playerLocation={this.props.playerLocation} />
      </div>
    )
  }
}

var mapStateToProps = (state) => {
  return {
    board: state.board,
    playerLocation: state.playerLocation
  }
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ movePlayer: movePlayer }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayGround);

// (e) => this.props.movePlayer(e.key, this.props.playerLocation, this.props.board)