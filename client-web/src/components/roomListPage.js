import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class RoomListPage extends Component {

};

var mapStateToProps = (state) => {
  // return {
  //   username: state.username,
  //   roomName: state.roomName
  // }
};

var mapDispatchToProps = (dispatch) => {
  // return bindActionCreators({
  //   updateUsername: updateUsername,
  //   updateRoomName: updateRoomName
  // }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);