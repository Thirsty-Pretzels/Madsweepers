import React, { Component, PropTypes } from 'react'

let loadYT

export default class YouTube extends Component {
  componentDidMount () {
    if (!loadYT) {
      loadYT = new Promise((resolve) => {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
        window.onYouTubeIframeAPIReady = () => resolve(window.YT)
      })
    }
    loadYT.then((YT) => {
      this.player = new YT.Player(this.youtubePlayerAnchor, {
        height: this.props.height || 390,
        width: this.props.width || 640,
        videoId: this.props.YTid,
        events: {
          onStateChange: this.onPlayerStateChange,
          onReady: this.onPlayerReady
        }
      })
    })

  }


  componentWillReceiveProps(NextProps) {
    console.log('received new props', NextProps.currentTime);
    if (NextProps.currentTime > 1) {
      this.player.seekTo(NextProps.currentTime, true);
      // this.player.pauseVideo();

    }
    if (NextProps.playerState) {
      this.player.playVideo();
    } else {
      this.player.pauseVideo();
    }
  }

  onPlayerStateChange = (e) => {
    // if (typeof this.props.onStateChange === 'function') {
    //   this.props.onStateChange(e)
    // }

    // this.player.seekTo(this.props.currentTime, true);
  }

  onPlayerReady = (e) => {
    e.target.playVideo();
  }

  render () {
    return (
      <section className='youtubeComponent-wrapper'>
        <div ref={(r) => { this.youtubePlayerAnchor = r }}></div>
        <div>{this.props.currentTime}</div>
      </section>
    )
  }
}

YouTube.propTypes = {
  YTid: PropTypes.string.required,
  width: PropTypes.number,
  height: PropTypes.number,
  onStateChange: PropTypes.func
}

