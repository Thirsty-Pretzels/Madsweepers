import React, { Component } from 'react';
import Grid from './board_grid';

var Row;
export default Row = ({ row }) =>(
  <div>{
    row.map((grid, index) =>
      <Grid
        key={index}
        grid={grid} />
    )
  }</div>
)
