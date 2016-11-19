import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { leaveRoom, toggleReady } from '../actions/index';
import UserEntry from './userEntry';

export class RoomList extends Component {
	leaveRoom() {
    if(this.props.userInfo.inRoom) {
      this.props.leaveRoom(this.props.userInfo.room, this.props.userInfo.username);
    }
  }

  toggleReady() {
    console.log('toggleing ready');
    this.props.toggleReady(this.props.userInfo.room, this.props.userInfo.username);
  }

  render() {
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
        { Object.keys(this.props.roomInfo.userList).length !== 0 ? <UserEntry user={this.props.userInfo.username} /> : null}
        { this.props.roomInfo.host && this.props.roomInfo.host !== this.props.userInfo.username ? <UserEntry user={this.props.roomInfo.host} /> : null}
        {
          Object.keys(this.props.roomInfo.userList).map((user) => {
            return (user !== this.props.roomInfo.host && user !== this.props.userInfo.username) ? <UserEntry user={user} /> : null
          })
        }
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
  	userInfo: state.userInfo,
    roomInfo: state.roomInfo
  };
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    leaveRoom: leaveRoom,
    toggleReady: toggleReady
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);