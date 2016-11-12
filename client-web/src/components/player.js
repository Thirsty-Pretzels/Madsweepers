import React, { Component } from 'react';

var Player;
export default Player = ({playerLocation}) => (
  <div
    id='player'
    style={{
      marginLeft: playerLocation.x * 50 + 1,
      marginTop: playerLocation.y * 50 + 1,
    }}>
  </div>
)