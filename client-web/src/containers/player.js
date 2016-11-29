import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { endDance } from '../actions/index.js';

class Player extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var status = 'player';
    if (this.props.playerLocation.status === 0) {
      status = 'player';
    } else if ( this.props.playerLocation.status === 1 ) {
      status = 'player-left';
    } else if ( this.props.playerLocation.status === 2 ) {
      status = 'player-right';
    } else if ( this.props.playerLocation.status === 5 ) {
      status = 'player player-dance';
      setTimeout( (() => this.props.endDance(this.props.username)), 5000)
    } else if ( this.props.playerLocation.status === 6 ) {
      status = 'player player-stun';
      setTimeout( (() => this.props.endDance(this.props.username)), 5000)
    }

    return (
      <div>
        <text
          className='player-text'
          style={{
            marginLeft: (this.props.playerLocation.x - this.props.currentBoardView[0][0][0]) * 50 + 1,
            marginTop: (this.props.playerLocation.y - this.props.currentBoardView[0][0][1]) * 50 + 1
          }}
        >{this.props.username}</text>
        <div
          className={status}
          id={ this.props.username }
          style={{
            marginLeft: (this.props.playerLocation.x - this.props.currentBoardView[0][0][0]) * 50 + 1,
            marginTop: (this.props.playerLocation.y - this.props.currentBoardView[0][0][1]) * 50 + 1
          }}>
        </div>
      </div>
    )
  }
}

var mapStateToProps = (state) => {
  return {
    currentBoardView: state.currentBoardView,
  }
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    endDance: endDance,
  }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(Player);