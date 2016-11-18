import React, { Component } from 'react';
import Board from '../containers/board';
import PlayGround from '../containers/playGround';
import ScoreBoard from '../containers/scoreBoard';
import GameStatus from '../containers/gameStatus';
import BoardOverview from '../containers/boardOverview';
import TopScores from '../containers/top_scores';
import { connect } from 'react-redux';

class GamePlay extends Component {

  componentDidMount() {
    document.getElementById('playGround').focus();
  }

  reFocus() {
    document.getElementById('playGround').focus();
  }

  render() {
    return (
      this.props.userStatus ?
      <div className='App-Components' onClick={ this.reFocus }>
        <div id='section1'>
          <PlayGround redirect={this.props.redirect}/>
          <Board />
        </div>
        <div id='section2'>
          <BoardOverview />
          <ScoreBoard />
          <GameStatus />
          <TopScores />
        </div>
      </div>
      :
      <div>{ this.props.redirect('') }</div>
    );
  }
}


var mapStateToProps = (state) => {
  return {
    userStatus: state.userInfo.status
  }
}

export default connect(mapStateToProps)(GamePlay);




