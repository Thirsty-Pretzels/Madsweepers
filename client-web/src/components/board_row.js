import React, { Component } from 'react';
import Grid from './board_grid';

var Row;
export default Row = ({row}) =>(
  <div>row: {
    row.map(grid =>
      <Grid grid={grid} />
    )
  }</div>
)
