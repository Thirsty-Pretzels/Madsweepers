import React, { Component } from 'react';

export default class GridOverview extends Component {
  constructor(props) {
    super(props);
  }

  renderGrid() {
    if (this.props.grid.status === 10) {
      return (<img className='grid-overview-10'></img>);
    } else if (this.props.grid.status === 11) {
      // status 0: initial state
      return (<img className='grid-overview-11'></img>);

    } else if (this.props.grid.status === 0) {
      // status 0: initial state
      return (<img className='grid-overview-0'></img>);

    } else {
      // status 2: the grid has been revealed
      return (<img className='grid-overview-1'></img>);

    }
  }

  render() {
    return (<div
      className='grid-overview'>
      { this.renderGrid() }
    </div>)
  }
}

// rowIndex={rowIndex}
// colIndex={index}
// playerLocation={playerLocation}
// grid={grid}


