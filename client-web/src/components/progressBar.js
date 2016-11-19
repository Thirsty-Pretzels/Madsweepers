import React, { Component } from 'react';

export default class ProgressBar extends Component {
	constructor(props) {
		super(props);
	}

  classNameDecider(progress, total) {
	  if (progress / total < 0.3) {
	    return 'progress progress-striped progress-success';
	  } else if (progress / total < 0.50) {
	    return 'progress progress-striped progress-info';
	  } else if (progress / total < 0.8) {
	    return 'progress progress-striped';
	  } else if (progress / total < 0.92) {
	    return 'progress progress-striped progress-warning';
	  } else {
	    return 'progress progress-striped progress-danger';
	  }
	}

  render() {
		return (
      <progress
        className='progressBarInRoomList'
        style={{'margin-bottom': '0'}}
        className={this.classNameDecider(this.props.minesCount - this.props.minesLeft, this.props.minesCount)}
        value={this.props.minesCount - this.props.minesLeft}
        max={this.props.minesCount}
      >
      </progress>
    );
	}
}