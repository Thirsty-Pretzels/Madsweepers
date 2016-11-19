import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { enterRoom } from '../actions/index';
import ProgressBar from '../components/progressBar';

export class RoomListEntry extends Component {
	constructor(props) {
		super(props);
	}

  enterRoom(room) {
    if (room !== this.props.userInfo.room) {
      this.props.enterRoom(this.props.room.roomName, this.props.userInfo.username, this.props.userInfo.inRoom, this.props.userInfo.room);
    }
  }

  render() {
  	return (
      <tr
        key={this.props.room.roomName}
        className='roomName'
        onClick={this.enterRoom.bind(this, this.props.room.roomName)}
        >
        <td>{this.props.room.roomName}</td>
        <td>{this.props.room.numberOfPlayer}</td>
        <td>{this.props.room.roomStatus === 'staging' ? 'staging' : <ProgressBar minesLeft={this.props.room.minesLeft} minesCount={this.props.room.minesCount} />}</td>
        {this.props.room.host ? (<td>{this.props.room.host}</td>) : null}
      </tr>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  };
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    enterRoom: enterRoom
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomListEntry);