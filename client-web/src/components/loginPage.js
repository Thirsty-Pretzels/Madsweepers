import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginTempUser, enterRoom, leaveRoom, toggleReady } from '../actions/index';
import axios from 'axios';

var name;

export class LoginPage extends Component {
  changeValue(event) {
    name = event.target.value
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.loginTempUser(name);
  }

  enterRoom(room, user) {
    if (room !== this.props.userInfo.room) {
      this.props.enterRoom(room, user, this.props.userInfo.inRoom, this.props.userInfo.room);
    }
  }

  leaveRoom() {
    if(this.props.userInfo.inRoom) {
      this.props.leaveRoom(this.props.userInfo.room, this.props.userInfo.username);
    }
  }

  toggleReady() {
    this.props.toggleReady(this.props.userInfo.room, this.props.userInfo.username);
  }

  componentDidUpdate() {
    if(this.props.allReady) {
      this.props.redirect('gamePlay');
    }
  }

  renderWelcome() {
    return (
      <div className="row" >
        <form>
          <input
            value={ name }
            placeholder='Enter awesome username here'
            onChange={ this.changeValue.bind(this) } 
            />
          <button 
            className="btn btn-success"
            type="submit" 
            name="action"
            onClick={this.onFormSubmit.bind(this)}
          > Let me play!
            <i className="material-icons right">send</i>
           </button>
        </form>
      </div> 
    )
  } 

  renderLobby() {
    return(
      <div>
        <div className="row">
          <h3>Your details</h3>
          <ul>
            <li> Username: {this.props.userInfo.username}</li> 
            <li> TempId:   {this.props.userInfo.tempUniqUserId}</li>
          </ul>
        </div>

        <div className="row">
          <h3>Rooms Available</h3>
          <table>
            <tr>
              <th>RoomName</th>
              <th>PlayerCount</th>
            </tr>
          {
            this.props.roomList.map((room) => 
              <tr onClick={this.enterRoom.bind(this, room.roomName, this.props.userInfo.username)}><td>{room.roomName}</td><td>{room.numberOfPlayer}</td></tr>
            )
          }
          </table>
        </div>

        {
          !this.props.userInfo.inRoom ? null : 

          <div className = "row">
            <text>{this.props.userInfo.username} am in {this.props.userInfo.room}</text>
            <button 
              onClick={this.toggleReady.bind(this)}> 
               {this.props.userInfo.isReady ? 'I need more time!' : 'I am Ready!'}
            </button>
            <button 
              onClick={this.leaveRoom.bind(this)}>Exit This Room</button>
          </div>
        }
      </div>
    )
  }

  render() {
    return (
        <div>
          { !this.props.userInfo.status ? this.renderWelcome() : this.renderLobby() }
      </div>
    );
  }
};

var mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    roomList: state.roomList,
    allReady: state.allReady
  };
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginTempUser: loginTempUser,
    enterRoom: enterRoom,
    leaveRoom: leaveRoom,
    toggleReady: toggleReady
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);