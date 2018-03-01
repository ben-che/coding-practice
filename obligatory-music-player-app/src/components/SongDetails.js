import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
        console.log("props provided to songDetails: ", this.props.match)

        // song details css
        let imgConstraint = {
            'maxWidth':'300px'
        }

        let textContainer = {
            'paddingLeft':'25px',
            'paddingRight':'10px'
        }
        return (
            <div>
            <Link to="/">Back</Link>
            <div className='container'>
                <div className='row'>
                <div className="col-xs-4">
                    <img src={track.img} className='img-fluid' style={imgConstraint} alt='img placeholder' />
                </div>
                <div className='col-xs-8' style={textContainer}>
                    <p>Track Name: {track.name} </p>
                    <p>Artist: {track.artist}</p>
                    <p>Album: {track.album}</p>
                    <p>Length: {track.len}</p>
                    
                    <a onClick={() => {this.props.playSong(track.id)}}>
                        {(this.props.playing && track.id === this.props.currentSong) ? <Pause /> : <Play />}
                    </a>
                </div>
                </div>
            </div>
            {/* <Route path='/:songId'render={()=><SongDetails msg={'this is how we pass props in react router'}/>}/> */}
            </div>
        )
    }
}

export default SongDetails;