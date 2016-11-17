import React, { Component } from 'react';
import Board from '../containers/board';
import PlayGround from '../containers/playGround';
import ScoreBoard from '../containers/scoreBoard';
import GameStatus from '../containers/gameStatus';
import BoardOverview from '../containers/boardOverview';
import TopScores from '../containers/top_scores';
//MJ: KIV. Not in use for now
//import AddComputerPlayer from '../containers/addComputerPlayer';

export default class GamePlay extends Component {
// added a second section for scoreboard. can someone please help me with CSS?
  componentDidMount() {
    document.getElementById('playGround').focus();
  }

  reFocus() {
    document.getElementById('playGround').focus();
  }

  render() {
    return (
      <div className='App-Components' onClick={ this.reFocus }>
        <div id='section1'>
          <PlayGround />
          <Board />
        </div>
        <div id='section2'>
          <BoardOverview />
          <ScoreBoard />
          <GameStatus />
          <TopScores />
        </div>
      </div>
    );
  }
}

