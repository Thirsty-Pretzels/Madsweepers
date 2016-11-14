import React, { Component } from 'react';

export default class Grid extends Component {
  renderGrid() {

    if (this.props.grid.status === 0) {
      // status 0: initial state
      return (<img className='grid-initial'></img>);

    } else if ( this.props.grid.status === 1 ) {
      // status 1: player has put flag on a grid
      return (<img className='grid-flag'></img>);

    } else if ( this.props.grid.status === 3) {
      // status 3: player put a flag on a wrong spot
      return (<img className='wrong-flag'></img>);

    } else if ( this.props.grid.status === 2 ) {
      // status 2: the grid has been revealed
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


