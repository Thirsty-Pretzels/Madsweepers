import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleCreateRoomPanel } from '../actions/index';
import RoomListEntry from './roomListEntry';
import CreateRoomPanel from './createRoomPanel'

export class RoomList extends Component {
  showCreateRoomPanel() {
    if(!this.props.userInfo.showCreatePanel) {
      this.props.toggleCreateRoomPanel();
    }
  }

  render() {
    console.log(this.props.roomList);
    return (
      <div className="row roomList" id='roomListRender'>

        <h1>Rooms</h1>

        <table id='roomListTable'>
          <tr>
            <th>RoomName</th>
            <th>PlayerCount</th>
            <th>GameStatus</th>
            <th>Host</th>
          </tr>
        { this.props.roomList.map((room) => <RoomListEntry room={room}/>) }
        </table>

        { this.props.userInfo.showCreatePanel ?
          <CreateRoomPanel /> :
          <button
            onClick={this.showCreateRoomPanel.bind(this)}>
            Create Room
          </button>
        }
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    roomList: state.roomList
  };
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleCreateRoomPanel: toggleCreateRoomPanel
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);