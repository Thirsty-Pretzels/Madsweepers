import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Board from '../containers/board';
import PlayGround from '../containers/playGround';
import ScoreBoard from '../containers/scoreBoard';
import GameStatus from '../containers/gameStatus';


export default class App extends Component {
  // this is the router on the App component
  redirect(pageTo) {
    browserHistory.push('/' + pageTo);
  }

  render() {
    return (
      <div className="container">
        <h1>Super Sweeper</h1>
        <div>
          {this.props.children && React.cloneElement(this.props.children, {
            // this is where to pass props to all children components
            redirect: this.redirect,
          })}
        </div>
      </div>
    );
  }
}