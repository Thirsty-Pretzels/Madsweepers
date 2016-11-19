import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Welcome from './welcome';
import UserInfo from './userInfo';
import RoomList from './roomList';
import Room from './room';

export class LoginPage extends Component {
  componentDidUpdate() {
    if(this.props.allReady) {
      this.props.redirect('gamePlay');
    }
  }

  renderLobby() {
    return(
      <div>
        <UserInfo />
        <RoomList />
        { !this.props.userInfo.inRoom ? null : <Room /> }
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
    allReady: state.allReady
  };
};

export default connect(mapStateToProps)(LoginPage);

// export { LoginPage, ConnectedApp };