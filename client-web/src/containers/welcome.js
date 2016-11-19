import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginTempUser } from '../actions/index';

export class Welcome extends Component {
  onFormSubmit(e) {
    var formData = document.getElementById('loginForm').elements;

    e.preventDefault();
    this.props.loginTempUser(formData.name.value);
  }

  render() {
    return (
      <div className="row" >
        <div className='headerCentered' id='header-image'>
          <img src='../../images/header-image.png' id='header-image-container'/>
        </div>
        <form
          className='formCentered'
          id='loginForm'
          onSubmit={this.onFormSubmit.bind(this)}
          >
          <input
            maxLength={12}
            name='name'
            placeholder='Enter awesome username here'
            id='input-text'
            style={{width: '450px', marginBottom: '5px'}}
            />
          <br/>
          <button
            className="myButton col-md-6 col-centered"
            type="submit"
            id='submit-button'
          > Let me play!
            <i className="material-icons right">send</i>
           </button>
        </form>
      </div>
    )
  }
}

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginTempUser: loginTempUser
  }, dispatch)
};

export default connect(null, mapDispatchToProps)(Welcome);