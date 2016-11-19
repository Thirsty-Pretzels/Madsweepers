import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createNewRoom, toggleCreateRoomPanel, loginTempUser, enterRoom, leaveRoom, toggleReady } from '../actions/index';
import axios from 'axios';

export class LoginPage extends Component {
  onFormSubmit(e) {
    var formData = document.getElementById('loginForm').elements;

    e.preventDefault();
    this.props.loginTempUser(formData.name.value);
  }

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
            maxLength={12}
            name='name'
            placeholder='Enter awesome username here'
            id='input-text'
            style={{width: '450px'}}
            />
          <br/>
          <button
            className="myButton col-md-6 col-centered"
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

  renderCreateRoomPanel() {
    return (
      <div>
        <form 
          className='formCentered'
          onSubmit={this.createRoom.bind(this)}
          id='createRoomForm'
          >
          <input
            type='text'
            name="roomName"
            maxLength={12}
            style={{width: '440px', 'margin-bottom': '3px'}}
            placeholder='Enter An Awesome RoomName'
          />
          <br />
          <input 
            type='number'
            name="rowNumber"
            min="12" 
            max="50"
            style={{width: '199px'}}
            placeholder='MAP ROW: 20'
          />
          <text> X </text>
          <input
            type='number'
            name="colNumber"
            min="12"
            max="50"
            style={{width: '199px'}}
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
          <button
            className="myButton"
            id='close-create-room-button'
            onClick={this.closeCreteRoomPanel.bind(this)}
            >
            Close This Tab
          </button>
        </form>

      </div>
    );
  }

  // render Room
  renderRoom() {
    return (
      <div className = "row">
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
          <table>
            { Object.keys(this.props.roomInfo.userList).length !== 0 ? this.renderUserEntry(this.props.userInfo.username) : null}
            { this.props.roomInfo.host && this.props.roomInfo.host !== this.props.userInfo.username ? this.renderUserEntry(this.props.roomInfo.host) : null}
            {
              Object.keys(this.props.roomInfo.userList).map((user) => {
                return (user !== this.props.roomInfo.host && user !== this.props.userInfo.username) ? this.renderUserEntry(user) : null
              })
            }
          </table>
      </div>
    );
  }

  renderUserEntry(user) {
    return (
      <tr>
        <td><img src={'../../images/user'+this.props.roomInfo.userList[user].userCode+'.png'} /></td>
        <td>{user}</td>
        <td>        
          <h4>
            {user}{this.props.roomInfo.userList[user].readyStatus ? ' is Ready!' : ' is messing around!'}
          </h4>
        </td>
      </tr>
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