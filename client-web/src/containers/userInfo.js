import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginTempUser } from '../actions/index';

export class UserInfo extends Component {
  render() {
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
}

var mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  };
};

export default connect(mapStateToProps)(UserInfo);