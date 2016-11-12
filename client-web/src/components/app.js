import React, { Component } from 'react';
import Board from '../containers/board';
import PlayGround from '../containers/playGround';

export default class App extends Component {
  componentDidMount() {
    socket.emit('eventNameHere', 'testMessagehere');
  }

  render() {
    return (
      <div>
        <PlayGround />
        <Board />
      </div>
    );
  }
}

