import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { directToMainPage } from '../actions/index';
import { bindActionCreators } from 'redux';

var count = 0;

export class App extends Component {
  redirect(pageTo) {
    browserHistory.push('/' + pageTo);
  }

  componentWillReceiveProps(nextProps) {
    // to prevent server crashing on actions from non-existing users
    // on every socket 'connection' reload the page,
    // so after server restart, clients will automatically restart as well
    if (count > 0 && nextProps.shouldReload) {
      location.reload(true);
    }
    count++;
  }

  render() {
    return (
      <div className="container">
        <div className="row center-block">
          <div className="text-center" id='header-text'>
            {
              this.props.userInfo.inRoom && this.props.broadcast.refresh ?
              this.props.broadcast.message :
              <div><image id='MadIcon'/> Mad Sweepers</div>
            }
          </div>
        </div>
          {this.props.children && React.cloneElement(this.props.children, {
            // this is where to pass props to all children components
            redirect: this.redirect,
          })}
      </div>
    );
  }
}

var mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    broadcast: state.broadcast,
    shouldReload: state.directToMainPage
  }
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ directToMainPage: directToMainPage }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);