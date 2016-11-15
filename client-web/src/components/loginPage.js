import React, { Component } from 'react';
import axios from 'axios';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  changeValue(event) {
    this.setState({
      value: event.target.value
    })
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.updateUsername(this.state.value, () => {
      this.props.redirect('gamePlay');
    });
  }

  render() {
    return (
      <div className='loginPage App-Components'>
        <h2>
          this is the loginPage
        </h2>

        <form>
          <input
            value={ this.state.value }
            placeholder='enter username'
            onChange={ this.changeValue.bind(this) } />
          <button onClick={ this.onFormSubmit.bind(this) }>Enter</button>
        </form>
      </div>
    );
  }
};