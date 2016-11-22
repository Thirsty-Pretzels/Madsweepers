import React, { Component } from 'react';

/*            <li> + 1: empty grid </li>
            <li> + 10: flag mine correctly </li>
            <li> - 5: misflagging </li>
            <li> - 10: mine explodes </li>*/

export default class Instructions extends Component {
  render() {
    return (
      <div>
        <div className="row">
        <h1> How to play </h1>
          <ul>
            <li> 
              Use <i className="fa fa-keyboard-o fa-3x"></i> to move 
              <i className="fa fa-arrow-up fa-2x"></i> 
              <i className="fa fa-arrow-down fa-2x"></i> 
              <i className="fa fa-arrow-left fa-2x"></i> 
              <i className="fa fa-arrow-right fa-2x"></i>
            </li>
            <li> <span className="enhance-key"> KEY F: </span> Flag Mine </li>
            <li> <span className="enhance-key"> KEY B: </span> Fire Bullets </li>
            <li> <span className="enhance-key"> SPACEBAR: </span> Open Grid </li>
            <li> <span className="enhance-key"> SCORING: </span> +1 (empty grid), + 10 (flag correct mine), - 5 (misflag), - 10 (step on mine) </li>
          </ul>
        </div>
          <div className="row">
          </div>
      </div>
    )
  }
}
