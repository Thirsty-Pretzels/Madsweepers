import React, { Component } from 'react';

export default class LoginPage extends Component {
  componentWillUnmount() {
    console.log(this);
  }

  render() {
    return (
      <div className='App-Components'>
        <h2
          onClick={ () => this.props.redirect('gamePlay') }>
          this is the loginPage
        </h2>
      </div>
    );
  }
};