import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Board from '../containers/board';
import PlayGround from '../containers/playGround';
import ScoreBoard from '../containers/scoreBoard';
import GameStatus from '../containers/gameStatus';

export class App extends Component {
  // this is the router on the App component
  redirect(pageTo) {
    browserHistory.push('/' + pageTo);
  }

  render() {
    return (
      <div className="container">
        { this.props.directToMainPage ? this.redirect('') : null }
        <div className="row center-block">
          <div className="text-center" id='header-text'>
            {
              this.props.userInfo.inRoom && this.props.broadcast.refresh ?
              this.props.broadcast.message :
              <div><image id='MadIcon'/> Mad Sweepers</div>
            }
          </div>
        </div>
          {this.props.children && React.cloneElement(this.props.children, {
            // this is where to pass props to all children components
            redirect: this.redirect,
          })}
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    broadcast: state.broadcast,
    directToMainPage: directToMainPage
  }
};

export default connect(mapStateToProps)(App);