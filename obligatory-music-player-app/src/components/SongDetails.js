import React, {Component} from 'react';
import Play from 'react-icons/lib/fa/play';
import Pause from 'react-icons/lib/fa/pause';

class SongDetails extends Component {
    render() {
        // findSongDetails finds the song in the song list array that corresponds with the given url
        let findSongDetails = this.props.songs.filter(element => {
            return element.id === Number(this.props.match.url.substring(1));
        })
        
        // because filter returns an array, and we only want the first element (as there should be no more
        //  than one id match), we can simplify the variable (less keystrokes ftw)
        let track = findSongDetails[0];

        console.log(findSongDetails);

        console.log("props provided to songDetails: ", this.props.match)
        return (
            <div><h1>song details</h1>
            <p>songID: {track.id}</p>
            <p>song name: {track.name} </p>
            <button onClick={() => {this.props.playSong(track.id)}}>
                {(this.props.playing && track.id === this.props.currentSong) ? <Pause /> : <Play />}
            </button>

            {/* <Route path='/:songId'render={()=><SongDetails msg={'this is how we pass props in react router'}/>}/> */}
            </div>
        )
    }
}

export default SongDetails;