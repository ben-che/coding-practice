import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';
import AudioPlayer from './components/AudioPlayer';
import axios from 'axios';
import { setInterval } from 'timers';

// initialize variables so JS will let us refer to them before we actually need them
let selectedSong, progressBarForeground;

// helper function that takes in a number, and converts it into minutes and seconds
let secToMin = (n) => {
  let seconds = n % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  let minutes = Math.floor(n / 60);
  return (minutes + ":" + seconds);
}
class App extends Component {

  // state constructor:
  constructor() {
    super();
    this.state = {
      song:[{}],
      // a state to keep track of what the current song id is 
      currentSong : 0,
      // a state to keep track of the current typestamp of the song
      currentProgress : 0,
      // a state to keep track of the song's progress bar
      percentComplete : 0,
      // a state to keep track of whether media is playing or not
      playing: false
    }
  }
  
  // methods

  /* ===================================================== */
  /* methods for audio player controls start here */

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
  
  // primarily responsible for updating the state of the song progress bar as well as its duration
  //    in single second increments
  timeElapsed = () => {
    setInterval(() => {
      // console.log(selectedSong);
      // update the current states every 1000 milliseconds so the time and progress bar reflect the song
      //    completion state
      this.setState({
        currentProgress : secToMin(Math.ceil(selectedSong.currentTime)),
        percentComplete: selectedSong.currentTime / selectedSong.duration * 100
      })
      progressBarForeground.style.width = this.state.percentComplete + '%'
      console.log(this.state.percentComplete);
      console.log(progressBarForeground.style.width)
    }, 1000)
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

  // use axios to get list of songs from 'database'
  componentDidMount() {
    axios.get('http://localhost:8080/songdatabase').then((songs) => {
      console.log(songs.data);
      this.setState({
        song:songs.data
      })
    }).catch((error) => {
      console.log(error);
    })
    // store the audio item in variable after component mounts - cannot do it before because
    //    there will be no element to reference

    // these variables will be used in methods built for the AudioPlayer Component
    selectedSong = document.getElementById('audio-player');
    progressBarForeground = document.getElementById('progressBarForeground');

    // calls the timeElapsed function every time the component updates (so we can update every second)
    this.timeElapsed();
  }

  /* component life cycle methods end here
  /* ===================================================== */

  render() {
    // Top level styles
    let appWrapper = {
      'padding':'0 15vw',
      'backgroundColor':'#ddd'
    }
    let headerContainer = {
      'height':'20vh',
      'width':'100%',
      'backgroundColor' : '#333',
      'verticalAlign':'bottom',
      'backgroundImage':'url(img/bg.jpeg)',
      'backgroundPosition':'center',
      'backgroundSize':'cover',
      'backgroundRepeat':'no-repeat',
      'paddingRight':'15px',
      'paddingTop':'17vh',
      'textAlign':'right'
    }

    let headerText = {
      'fontSize':'30px',
      'color':'#fff',
      'fontFamily':'Verdana, Geneva, sans-serif'
    }

    let detailsContainer = {
      'height':'75vh',
      'backgroundColor':'#fff'
    }

    let detailsHeader = {
      'paddingLeft': '57px',
      'paddingTop':'13px',
      'textAlign':'left',
      'backgroundColor':'#fff',
    }

    let audioWrapper = {
      'height': '80px',
      'backgroundColor':'#333',
      'bottom':'0',
      'position':'fixed',
      'width':'100%'
    }

    return (
      <div>
        <div className='h-100 w-100' style={appWrapper}>

          <div style={headerContainer}>
            <h1 style={headerText}>issa vibe</h1>
          </div>

          <div style={detailsContainer}>
            <div style={detailsHeader}>
              <p className='text-muted'> tracks</p>
            </div>
            
            <div className='container'>
          
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
            
            </div>

          </div>
        </div>
          <div style={audioWrapper}>
            <AudioPlayer changeSong={this.changeSong}
                          playing={this.state.playing} 
                          play={this.playToggle} 
                          currentProgress={this.state.currentProgress} 
                          song={this.state.song[this.state.currentSong]} 
                          currentSong={this.state.currentSong}
                          />
          </div>
      </div>
    );
  }
}



export default App;
