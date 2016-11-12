import React, { Component } from 'react';
import Grid from './board_grid';

var Row;
export default Row = ({row, rowIndex,playerLocation}) =>(
  <div>{
    row.map((grid, index) =>
      <Grid
        key={index}
        rowIndex={rowIndex}
        colIndex={index}
        playerLocation={playerLocation}
        grid={grid} />
    )
  }</div>
)
