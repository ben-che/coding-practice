import React, {Component} from 'react';
import Play from 'react-icons/lib/fa/play';
import Pause from 'react-icons/lib/fa/pause';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';

class AudioPlayer extends Component {

    render() {

        console.log(this.props)
        return (
            <div>
            
            <audio id='audio-player' src={this.props.song.source}/>
            {/* Audio controls */}
            {/* Toggling play and pause - if song is playing, run pause() fn on click, and vice versa */}
            <span onClick={this.props.play} >
                {this.props.playing ? <Pause /> : <Play />}
            </span>
            
            {/* Toggling next and previous songs */}
            <FaChevronLeft onClick={() => {this.props.changeSong(this.props.currentSong, 'prev')} } />
            <FaChevronRight onClick={() => {this.props.changeSong(this.props.currentSong, 'next')} }/>

            {/* Song Display Information */}
            <p>{this.props.song.name}</p>
            </div>
        )
    }
}

export default AudioPlayer;