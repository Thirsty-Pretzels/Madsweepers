import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUsername } from '../actions/index';
import axios from 'axios';

var name;
var roomName = 'roomA'; //set to roomA as default if user does not make a choice

class LoginPage extends Component {
  changeValue(event) {
    name = event.target.value
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.updateUsername(name);

    // MJ: send room name  selected in dropdown to socket
    socket.emit('SELECT-ROOM', roomName);

    this.props.redirect('gamePlay');

  }

  handleRoom(e) {
    roomName = e.target.value;
    e.preventDefault();
  }

  render() {
    return (
      <div className='loginPage App-Components'>
        <h2>
          this is the loginPage
        </h2>
        <p> Select Room: </p>
        <select onChange={this.handleRoom}>
          <option value= 'RoomA'> Room A </option>
          <option value= 'RoomB'> Room B </option>
        </select>
        <form>
          <input
            value={ name }
            placeholder='enter username'
            onChange={ this.changeValue.bind(this) } />
          <button onClick={ this.onFormSubmit.bind(this) }>Enter</button>
        </form>
      </div>
    );
  }
};

var mapStateToProps = (state) => {
  return {
    username: state.username
  }
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateUsername: updateUsername
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);