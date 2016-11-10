import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import YouTubePlayer from './YouTubeVideoPlayer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CurrentTime: 0,
      playerState: true
    }
  }

  onStateChange(event) {
    var playerState = event.target.getPlayerState();

  }

  updateCurrentTime(timeText) {
    const currentTime = Number(timeText);
    console.log('updateCurrentTime:' );
  }


  render() {
    return (
      <div className="App">
        <button onClick={() => this.setState({playerState: !this.state.playerState})}>click here</button>
        <input
          onChange={(e) => this.updateCurrentTime(e.target.value)}>
        </input>

        <YouTubePlayer
          YTid='a-Zt_oGTm4I'
          currentTime={this.state.CurrentTime}
          playerState={this.state.playerState}
          onStateChange={this.onStateChange.bind(this)} />
        <YouTubePlayer
          YTid='a-Zt_oGTm4I'
          currentTime={this.state.CurrentTime}
          playerState={this.state.playerState}
          onStateChange={this.onStateChange.bind(this)} />
        <div>{this.state.playerState}: {this.state.CurrentTime}</div>
      </div>
    );
  }
}

export default App;
