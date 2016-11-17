import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var status = 'player'
    if ( this.props.playerLocation.status === 1 ) {
      status = 'player-left';
    } else if ( this.props.playerLocation.status === 2 ) {
      status = 'player-right';
    }

    return (
      <div>
        <text
          className='player-text'
          style={{
            marginLeft: (this.props.playerLocation.x - this.props.currentBoardView[0][0][0]) * 52 + 1,
            marginTop: (this.props.playerLocation.y - this.props.currentBoardView[0][0][1]) * 52 + 1
          }}
        >{this.props.username}</text>
        <div
          className={ status }
          id={ this.props.username }
          style={{
            marginLeft: (this.props.playerLocation.x - this.props.currentBoardView[0][0][0]) * 52 + 1,
            marginTop: (this.props.playerLocation.y - this.props.currentBoardView[0][0][1]) * 52 + 1
          }}>
        </div>
      </div>
    )
  }
}

var mapStateToProps = (state) => {
  return {
    currentBoardView: state.currentBoardView
  }
};

export default connect(mapStateToProps)(Player);