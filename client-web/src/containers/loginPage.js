import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Welcome from './welcome';
import UserInfo from './userInfo';
import RoomList from './roomList';
import Room from './room';
import Instructions from '../components/instructions';
import TopScores from './top_scores';

export class LoginPage extends Component {
  componentDidUpdate() {
    if(this.props.allReady) {
      this.props.redirect('gamePlay');
    }
  }

  renderLobby() {
    return(
      <div>
        <div className="row">
          <div className="col-md-8 roomList App-Components"> <RoomList/> </div>
          <div className="col-md-3 App-Components"> <UserInfo /> </div>
        </div>
        <div className="row instructions">
          <div className="col-md-8 App-Components"> <Instructions /> </div>
          <div className="col-md-3 App-Components"> <TopScores /> </div>
        </div>
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