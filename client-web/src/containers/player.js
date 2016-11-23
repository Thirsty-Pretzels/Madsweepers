import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.dance, 'dance');
    var status = 'player';
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
            marginLeft: (this.props.playerLocation.x - this.props.currentBoardView[0][0][0]) * 50 + 1,
            marginTop: (this.props.playerLocation.y - this.props.currentBoardView[0][0][1]) * 50 + 1
          }}
        >{this.props.username}</text>
        <div
          className={ status + ' ' + this.props.dance}
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
    dance: state.dance
  }
};


export default connect(mapStateToProps)(Player);