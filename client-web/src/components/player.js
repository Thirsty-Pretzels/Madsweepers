import React, { Component } from 'react';

export default class Player extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
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
            marginLeft: this.props.playerLocation.x * 50 + 1,
            marginTop: (this.props.playerLocation.y) * 50 + 1
          }}
        >{this.props.username}</text>
        <div
          className={ status }
          id={ this.props.username }
          style={{
            marginLeft: this.props.playerLocation.x * 50 + 1,
            marginTop: this.props.playerLocation.y * 50 + 1,
          }}>
        </div>
      </div>
    )
  }
}