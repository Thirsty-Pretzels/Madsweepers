import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUsername } from '../actions/index';
import axios from 'axios';

var name;

class LoginPage extends Component {
  changeValue(event) {
    name = event.target.value
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.updateUsername(name);
    this.props.redirect('gamePlay');
  }

  render() {
    return (
      <div className='loginPage App-Components'>
        <h2>
          this is the loginPage
        </h2>

        <form>
          <input
            value={ name }
            placeholder='enter username'
            onChange={ this.changeValue.bind(this) } />
          <button onClick={ this.onFormSubmit.bind(this) }>Enter</button>
        </form>
      </div>
    );
  }
};

var mapStateToProps = (state) => {
  return {
    username: state.username
  }
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateUsername: updateUsername
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);