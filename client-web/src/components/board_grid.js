import React, { Component } from 'react';

var Grid;
export default Grid = ({grid, rowIndex, colIndex, playerLocation}) => (
  <div
    className='grid'>
    { (playerLocation.x === colIndex && playerLocation.y === rowIndex) ? 'player' : grid.val }
  </div>
)


