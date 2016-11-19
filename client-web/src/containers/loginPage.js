import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createNewRoom, toggleCreateRoomPanel, loginTempUser, enterRoom, leaveRoom, toggleReady } from '../actions/index';
import axios from 'axios';

import Welcome from './welcome';
import UserInfo from './userInfo';
import CreateRoomPanel from './createRoomPanel'

export class LoginPage extends Component {
  createRoom(e) {
    var formData = document.getElementById('createRoomForm').elements;

    e.preventDefault();
    this.props.createNewRoom(formData.roomName.value, formData.rowNumber.value || 20, formData.colNumber.value || 20, formData.mineDensity.value);
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

  showCreateRoomPanel() {
    if(!this.props.userInfo.showCreatePanel) {
      this.props.toggleCreateRoomPanel();
    }
  }

  closeCreteRoomPanel(e) {
    e.preventDefault();
    this.props.toggleCreateRoomPanel();
  }

  componentDidUpdate() {
    if(this.props.allReady) {
      this.props.redirect('gamePlay');
    }
  }

  // render UserInfo
  renderUserInfo() {
    return (
      <div className="row" id='userInfoRender'>
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
      <div className="row roomList" id='roomListRender'>
        <button
          onClick={this.showCreateRoomPanel.bind(this)}>
          New Room
        </button>
        { this.props.userInfo.showCreatePanel ? <CreateRoomPanel /> : null}
        <h3>Awesome Rooms Available</h3>
        <table id='roomListTable'>
          <tr>
            <th>RoomName</th>
            <th>PlayerCount</th>
            <th>GameStatus</th>
            <th>Host</th>
          </tr>
        { this.props.roomList.map((room) => this.renderRoomListEntry(room)) }
        </table>
      </div>
    );
  }

  renderProgressBar(minesLeft, minesCount) {
    var classNameDecider = function(progress, total) {
      if (progress / total < 0.3) {
        return 'progress progress-striped progress-success';
      } else if (progress / total < 0.50) {
        return 'progress progress-striped progress-info';
      } else if (progress / total < 0.8) {
        return 'progress progress-striped';
      } else if (progress / total < 0.92) {
        return 'progress progress-striped progress-warning';
      } else {
        return 'progress progress-striped progress-danger';
      }
    }

    return (
      <progress
        className='progressBarInRoomList'
        style={{'margin-bottom': '0'}}
        className={classNameDecider(minesCount - minesLeft, minesCount)}
        value={minesCount - minesLeft}
        max={minesCount}
      >
      </progress>
    );
  }

  renderRoomListEntry(room) {
    return (
      <tr
        key={room.roomName}
        className='roomName'
        onClick={this.enterRoom.bind(this, room.roomName, this.props.userInfo.username)}
        >
        <td>{room.roomName}</td>
        <td>{room.numberOfPlayer}</td>
        <td>{room.roomStatus === 'staging' ? 'staging' : this.renderProgressBar(room.minesLeft , room.minesCount) }</td>
        {room.host ? (<td>{room.host}</td>) : null}
      </tr>
    );
  }

  // render Room
  renderRoom() {
    return (
      <div className='row' id='roomInfoRender'>
        <h3>{this.props.userInfo.room}</h3>
        <br />
        <button
          onClick={this.toggleReady.bind(this)}>
           {this.props.userInfo.isReady ? 'I need more time!' : 'I am Ready!'}
        </button>
        <button
          onClick={this.leaveRoom.bind(this)}>
            Exit This Room
        </button>
        <br />
        { Object.keys(this.props.roomInfo.userList).length !== 0 ? this.renderUserEntry(this.props.userInfo.username) : null}
        { this.props.roomInfo.host && this.props.roomInfo.host !== this.props.userInfo.username ? this.renderUserEntry(this.props.roomInfo.host) : null}
        {
          Object.keys(this.props.roomInfo.userList).map((user) => {
            return (user !== this.props.roomInfo.host && user !== this.props.userInfo.username) ? this.renderUserEntry(user) : null
          })
        }
      </div>
    );
  }

  renderUserEntry(user) {
    return (
      <div style={{margin: '10px 0 5px 0'}}>
        <img src={'../../images/user'+this.props.roomInfo.userList[user].userCode+'.png'} style={{display: 'inline-block', marginRight: '20px'}}/>
        <h2 style={{display: 'inline-block', marginRight: '10px'}}>{user}</h2>
        <h4 style={{display: 'inline-block'}}>{this.props.roomInfo.userList[user].readyStatus ? ' is Ready!' : ' is messing around!'}</h4>
      </div>
    );
  }

  // sub component: render lobby
  renderLobby() {
    return(
      <div>
        <UserInfo />
        {this.renderRoomList()}
        { !this.props.userInfo.inRoom ? null : this.renderRoom() }
      </div>
    )
  }

  render() {
    return (
        <div>
          { !this.props.userInfo.status ? <Welcome /> : this.renderLobby() }
      </div>
    );
  }
};

var mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    roomList: state.roomList,
    roomInfo: state.roomInfo,
    allReady: state.allReady
  };
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleCreateRoomPanel: toggleCreateRoomPanel,
    loginTempUser: loginTempUser,
    enterRoom: enterRoom,
    leaveRoom: leaveRoom,
    toggleReady: toggleReady,
    createNewRoom: createNewRoom
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);