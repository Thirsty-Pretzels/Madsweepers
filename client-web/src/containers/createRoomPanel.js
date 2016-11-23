import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createNewRoom, toggleCreateRoomPanel } from '../actions/index';

export class CreateRoomPanel extends Component {
  createRoom(e) {
    var formData = document.getElementById('createRoomForm').elements;

    e.preventDefault();
    this.props.createNewRoom(formData.roomName.value, formData.rowNumber.value || 20, formData.colNumber.value || 20, formData.mineDensity.value);
    this.props.toggleCreateRoomPanel();
  }

  closeCreteRoomPanel(e) {
    e.preventDefault();
    this.props.toggleCreateRoomPanel();
  }

  render() {
    return (
      <div>
        <form
          className='formCentered'
          onSubmit={this.createRoom.bind(this)}
          id='createRoomForm'
          >
          <input
            type='text'
            name="roomName"
            maxLength={20}
            style={{width: '440px', 'margin-bottom': '3px'}}
            placeholder='Enter An Awesome RoomName'
          />
          <br />
          <input
            type='number'
            name="rowNumber"
            min="12"
            max="50"
            style={{width: '199px'}}
            placeholder='MAP ROW: 20'
          />
          <text> X </text>
          <input
            type='number'
            name="colNumber"
            min="12"
            max="50"
            style={{width: '199px'}}
            placeholder='MAP COL: 20'
          />
          <br />
          <select name='mineDensity'>
            <option value={0.2}> -- select mine density -- </option>
            <option value={0.2}>Killing Spree</option>
            <option value={0.25}>Dominating</option>
            <option value={0.3}>Mega Kill</option>
            <option value={0.35}>Unstoppable</option>
            <option value={0.4}>Wicked Sick</option>
            <option value={0.45}>Monster kill</option>
            <option value={0.5}>Godlike</option>
            <option value={0.6}>Holy Shit</option>
          </select>
          <br/>
          <button
            className="myButton"
            type="submit"
            id='create-room-button'>
            Create
          </button>
          <button
            className="myButton"
            id='close-create-room-button'
            onClick={this.closeCreteRoomPanel.bind(this)}
            >
            Close
          </button>
        </form>
      </div>
    );
  }
}

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createNewRoom: createNewRoom,
    toggleCreateRoomPanel: toggleCreateRoomPanel
  }, dispatch)
};

export default connect(null, mapDispatchToProps)(CreateRoomPanel);