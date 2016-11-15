import React, { Component } from 'react';
import Board from '../containers/board';
import PlayGround from '../containers/playGround';
import ScoreBoard from '../containers/scoreBoard';

export default class GamePlay extends Component {
// added a second section for scoreboard. can someone please help me with CSS?
  componentDidMount() {
    document.getElementById('playGround').focus();
  }

  render() {
    return (
      <div className='App-Components'>
        <div id='section1'>
          <PlayGround />
          <Board />
        </div>
        <div id='section2'>
          <ScoreBoard />
        </div>
      </div>
    );
  }
}

