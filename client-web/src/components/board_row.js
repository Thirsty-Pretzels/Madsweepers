import React, { Component } from 'react';
import Grid from './board_grid';
import GridOverview from './boardOverview_grid';

var Row;
export default Row = ({ row, overView }) =>(
  overView ?
  <div className='rowOverview'>{
    row.map((grid, index) =>
      <GridOverview
        key={index}
        grid={grid} />
    )
  }</div>
  :
  <div>{
    row.map((grid, index) =>
      <Grid
        key={index}
        grid={grid} />
    )
  }</div>
)


