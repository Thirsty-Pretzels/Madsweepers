import React, { Component } from 'react';

// var LoginPage
export default class LoginPage extends Component {
  render() {
    return (
      <div className='App-Components'>
        <h2
          onClick={ () => this.props.redirect('gamePlay') }>
          this is the loginPage
        </h2>
      </div>
    )
  }
};