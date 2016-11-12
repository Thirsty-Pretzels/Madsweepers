import React, { Component } from 'react';
import Board from '../containers/board';

export default class App extends Component {
  componentDidMount() {
    socket.emit('eventNameHere', 'testMessagehere');
  }

  render() {
    return (
      <div>
        <Board />
      </div>
    );
  }
}

