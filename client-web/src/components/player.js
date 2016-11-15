import React, { Component } from 'react';

export default class Player extends Component {
  constructor(props) {
    super(props)


  }

  render() {
    var status = this.props.status ? 'player' : 'player player-moving';

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