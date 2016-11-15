import React, { Component } from 'react';

export default class Player extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    console.log(this.props.playerLocation);
  }

  render() {
    var status = 'player'
    if ( this.props.playerLocation.status === 1 ) {
      status = 'player-up';
    } else if ( this.props.playerLocation.status === 2 ) {
      status = 'player-down';
    } else if ( this.props.playerLocation.status === 3 ) {
      status = 'player-left';
    } else if ( this.props.playerLocation.status === 4 ) {
      status = 'player-right';
    }

    return (
      <div
        className={ status }
        id={ this.props.username }
        style={{
          marginLeft: this.props.playerLocation.x * 50 + 1,
          marginTop: this.props.playerLocation.y * 50 + 1,
        }}>
      </div>
    )
  }
}