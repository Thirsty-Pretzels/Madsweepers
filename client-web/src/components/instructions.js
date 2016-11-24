import React, { Component } from 'react';

export default class Instructions extends Component {
  render() {
    return (
      <div>
        <div className="row">
        <h1> How to play: </h1>
          <ul>
            <li className='col-md-9'>
              Use <i className="fa fa-keyboard-o fa-3x"> </i> to move
              <i className="fa fa-arrow-up fa-2x"> </i>
              <i className="fa fa-arrow-down fa-2x"> </i>
              <i className="fa fa-arrow-left fa-2x"> </i>
              <i className="fa fa-arrow-right fa-2x"></i>
            </li>
            <li className='col-md-9'> <span className="enhance-key"> KEY F: </span> Flag Mine </li>
            <li className='col-md-9'> <span className="enhance-key"> KEY D: </span> Fire Bullets </li>
            <li className='col-md-9'> <span className="enhance-key"> KEY S: </span> Bananas </li>
            <li className='col-md-9'> <span className="enhance-key"> SPACEBAR: </span> Open Grid </li>
            <li className='col-md-9'> <span className="enhance-key"> SCORING: </span> +1 (empty grid), + 10 (flag correct mine), - 5 (misflag), - 10 (step on mine) </li>
          </ul>
        </div>
      </div>
    )
  }
}
