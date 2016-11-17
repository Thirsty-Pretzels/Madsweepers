import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleCreateRoomPanel, loginTempUser, enterRoom, leaveRoom, toggleReady } from '../actions/index';
import axios from 'axios';

export class LoginPage extends Component {
  onFormSubmit(e) {
    var formData = document.getElementById('loginForm').elements;
    
    e.preventDefault();
    this.props.loginTempUser(formData.name.value);
  }

  createRoom(e) {
    var formData = document.getElementById('createRoomForm').elements;
    console.log('colNumber: ', formData.colNumber.value);
    console.log('rowNumber: ', formData.rowNumber.value);
    console.log('mineDensity: ', formData.mineDensity.value);
    e.preventDefault();
    this.props.toggleCreateRoomPanel();
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

  showCreateRoomPanel() {
    this.props.toggleCreateRoomPanel();
  }

  // sub component: render welcome
  renderWelcome() {
    return (
      <div className="row" >
        <div className='headerCentered' id='header-image'>
          <img src='../../images/header-image.png' id='header-image-container'/>
        </div>
        <form 
          className='formCentered' 
          id='loginForm'
          onSubmit={this.onFormSubmit.bind(this)}
          >
          <input
            name='name'
            placeholder='Enter awesome username here'
            id='input-text'
            style={{width: '450px'}}
            />
          <br/>
          <button
            className="myButton"
            type="submit"
            id='submit-button'
          > Let me play!
            <i className="material-icons right">send</i>
           </button>
        </form>
      </div>
    )
  }

  // render UserInfo
  renderUserInfo() {
    return (
      <div className="row">
        <div className='userProfile' id='userImage'>
          <img src={'../../images/user'+this.props.userInfo.userCode+'.png'} />
        </div>
        <div>
          <h4>{this.props.userInfo.username}'s profile</h4>
          <ul className='userProfile' id='userInfo'>
            <li> Username: {this.props.userInfo.username}</li>
            <li> TempId:   {this.props.userInfo.tempUniqUserId}</li>
          </ul>
        </div>
      </div>
    );
  }

  // render roomList
  renderRoomList() {
    return (
      <div className="row roomList">
        <button
          onClick={this.showCreateRoomPanel.bind(this)}>
          New Room  
        </button>
        { this.props.userInfo.showCreatePanel ? this.renderCreateRoomPanel() : null}
        <h3>Rooms Available</h3>
        <table>
          <tr>
            <th>RoomName</th>
            <th>PlayerCount</th>
          </tr>
        {
          this.props.roomList.map((room) =>
            <tr className='roomName' onClick={this.enterRoom.bind(this, room.roomName, this.props.userInfo.username)}><td>{room.roomName}</td><td>{room.numberOfPlayer}</td></tr>
          )
        }
        </table>
      </div>
    );
  }

  renderCreateRoomPanel() {
    return (
      <div>
        <form 
          className='formCentered'
          onSubmit={this.createRoom.bind(this)}
          id='createRoomForm'
          >
          <input 
            type='number'
            name="rowNumber"
            min="12" 
            max="50"
            style={{width: '175px'}}
            placeholder='MAP ROW: 20'
          />
          <text> X </text>
          <input
            type='number'
            name="colNumber"
            min="12"
            max="50"
            style={{width: '175px'}}
            placeholder='MAP COL: 20'
          />
          <br />
          <select name='mineDensity'>
            <option value={0.2}> -- select mine density -- </option>
            <option value={0.2}>Killing Spree</option>
            <option value={0.25}>Dominating</option>
            <option value={0.3}>Mega Kill</option>
            <option value={0.35}>Unstoppable</option>
            <option value={0.4}>Wicked Sick</option>
            <option value={0.45}>Monster kill</option>
            <option value={0.5}>Godlike</option>
            <option value={0.6}>Holy Shit</option>
          </select>
          <br/>
          <button
            className="myButton"
            type="submit"
            id='create-room-button'>
            Make A New Room
          </button>
        </form>

      </div>
    );
  }

  // render Room
  renderRoom() {
    return (
      <div className = "row">
        <text>{this.props.userInfo.username} am in {this.props.userInfo.room}</text>
        <button
          onClick={this.toggleReady.bind(this)}>
           {this.props.userInfo.isReady ? 'I need more time!' : 'I am Ready!'}
        </button>
        <button
          onClick={this.leaveRoom.bind(this)}>
            Exit This Room
        </button>
      </div>
    );
  }

  // sub component: render lobby
  renderLobby() {
    return(
      <div>
        {this.renderUserInfo()}
        {this.renderRoomList()}
        { !this.props.userInfo.inRoom ? null : this.renderRoom() }
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
    toggleCreateRoomPanel: toggleCreateRoomPanel, 
    loginTempUser: loginTempUser,
    enterRoom: enterRoom,
    leaveRoom: leaveRoom,
    toggleReady: toggleReady
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);