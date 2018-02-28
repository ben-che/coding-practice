import React, { Component } from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';
import AudioPlayer from './components/AudioPlayer';

class App extends Component {

  // state constructor:
  constructor() {
    super();
    this.state = {
      song: [
        {
          name: 'test song',
          img: 'placeholder img',
          source: '/music/olympian.mp3',
          id:0
        },
        {
          name: 'test song2',
          img: 'placeholder img2',
          source: '/music/upstep.mp3',
          id:1
        },
        {
          name: 'test song3',
          img: 'placeholder img3',
          source: '/music/transmission.mp3',
          id:2
        },
      ],
      currentSong : 0,

      // a state to keep track of whether media is playing or not
      playing: false
    }
  }
  
  // methods

  /* ===================================================== */
  /* methods for audio player various controls start here */

  // playToggle() method changes the state of playing to its boolean opposite, and allows
  //  a re-rendering of the component, triggering the componentDidUpdate function, and
  //  either playing or pausing the media
  playToggle = () => {
    console.log('play/pause button has been clicked');
    this.setState({
      playing: !this.state.playing
    })
  }
  
  // changeSong allows user to switch to the previous and next songs
  changeSong = (currentSong, direction) => {
    // we need to get the index of the last track
    let lastTrack = this.state.song.length - 1;
    // if the next button is pressed, play the next track in the array, unless it is the 
    //    last track. if it is the last track, start over from position 0 in the array
    if (direction==='next') {
      if (currentSong === lastTrack) {
        console.log('playing first track beginning');
        this.setState({
          currentSong : 0,
        })
      }
      else {
        console.log('playing next track');
        this.setState({
          currentSong: currentSong + 1,
        })
      }
    }

    // if the previous button is pressed, play the previous track in the array, unless it
    //  is the first track. if it is the first, play the last track up next
    else if (direction==='prev') {
      if (currentSong === 0) {
        console.log('playing last track');
        this.setState({
          currentSong : lastTrack
        })
      }
      else {
        console.log('playing previous track');
        this.setState({
          currentSong : currentSong - 1
        })
      }
    }
  }

  // ================ //
  // defunct methods:
  // ================ //

  //replaced with playToggle() :
  // // play() method accesses the audio player on the DOM and plays the media
  // play = () => {
  //   console.log('play button has been clicked');
  //   this.setState({
  //     playing: true
  //   })
  // }
  
  // pause method access the audio player on the DOM and pauses the media
  // pause = () => {
  //   console.log('pause button has been clicked');
  //   this.setState({
  //     playing: false
  //   })
  // }

  /* methods for audio player end here */
  /* ===================================================== */

  /* ===================================================== */
  /* songsList component methods start here */

  // playSong allows user to play a song directly from the songList component when they click the play button
  playSong = (songId) => {
    // if the song id does not match the one currently playing, play the new song
    if (songId !== this.state.currentSong) {
      this.setState({
        currentSong : songId,
        playing: true
      })
    }
    // else, it means that that song id does match the song currently playing, and the playback should be toggled between
    //    paused and unpaused states
    else {
    this.setState({
      currentSong : songId,
      playing: !this.state.playing
      })
    }
  }

  /* methods for songsList component end here */
  /* ===================================================== */

  /* ===================================================== */
  /* component life cycle methods start here */
  
  // every time the component updates, check to see if the song should be playing or not
  // this is triggered every time a button on the audio player is clicked
  componentDidUpdate(prevProp, prevState) {
    // this checks for song changes
    // if the song changes, and the current state.playing is true, get the audio element on the DOM and play the media
    if (prevState.currentSong !== this.state.currentSong && this.state.playing) {
      // console.log('song change');
      document.getElementById('audio-player').play();
    }
    // this checks for play/pause changes
    // if the play/pause button is toggled, get the audio element on the DOM and either play or pause it
    if (prevState.playing !== this.state.playing) {
      // console.log('hit the 2nd if statement');
      let toggle = this.state.playing ? "play" : "pause"
      document.getElementById('audio-player')[toggle]();
    }
  }

  /* component life cycle methods end here
  /* ===================================================== */

  render() {
    return (
      <div className="App">
        <nav>
          <Link to='/'>home component</Link>
          <Link to='/songID'>songid</Link>
        </nav>
        <h1>home component</h1>
        <Switch>
          <Route exact path="/" render={()=><SongsList playing={this.state.playing} 
                                                       currentSong={this.state.currentSong} 
                                                       songs={this.state.song} 
                                                       playSong={this.playSong} />}
                                                       />
          <Route exact path="/:songID" render={(props)=><SongDetails songs={this.state.song} 
                                                                     match={props.match} 
                                                                     playing={this.state.playing} 
                                                                     currentSong={this.state.currentSong} 
                                                                     playSong={this.playSong} />} 
                                                                     />
        </Switch>

        <AudioPlayer changeSong={this.changeSong}
                     playing={this.state.playing} 
                     play={this.playToggle} 
                     song={this.state.song[this.state.currentSong]} 
                     currentSong={this.state.currentSong}
                     />
      </div>
    );
  }
}



export default App;
