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
        <div className='center-block'>
          <img src='../../images/header-image.png' className='center-block'/>
        </div>
        <form
          className='form-centered center-block'
          id='loginForm'
          onSubmit={this.onFormSubmit.bind(this)}
          >
          <input
            className="col-md-6 center-block"
            maxLength={12}
            name='name'
            placeholder='Enter awesome username here'
            id='input-text'
            style={{'font-size': '30px', marginTop: '10px'}}
            />
          <br/>
          <button
            className="myButton col-md-6 center-block"
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