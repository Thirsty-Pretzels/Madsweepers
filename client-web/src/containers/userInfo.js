import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginTempUser } from '../actions/index';

export class UserInfo extends Component {
  render() {
    return (
      <div className="row" id='userInfoRender'>
        <h1>Profile:</h1>
        <div className='col-md-8 userProfile' id='userImage'>
          <img src={'../../images/user'+this.props.userInfo.userCode+'.png'} />
        </div>
        <div>
          <ul className='col-md-8 userProfile' id='userInfo'>
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