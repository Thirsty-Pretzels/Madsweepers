import React, { Component } from 'react';

export default class Grid extends Component {
  renderGrid() {

    if (this.props.grid.status === 0) {

      return (<img className='grid-initial'></img>);

    } else if ( this.props.grid.status === 1 ) {

      return (<img className='grid-flag'></img>);

    } else if ( this.props.grid.status === 2 ) {

      if ( this.props.grid.val === 9 ) {

        return (<img className='grid-explosion'></img>);

      } else {

        return (<span className='grid-revealed'>{this.props.grid.val}</span>)
      }
    }
  }

  render() {
    return (<div
      className='grid'>
      { this.renderGrid() }
    </div>)
  }
}


