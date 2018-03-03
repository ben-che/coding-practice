import React, {Component} from 'react';
import Play from 'react-icons/lib/fa/play';
import Pause from 'react-icons/lib/fa/pause';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';

class AudioPlayer extends Component {
    
    constructor() {
        super();
        this.state = {
            timeElapsed : 0
        }
    }


    render() {
        
        let audioContainer = {
            'paddingLeft':'15vw',
            'paddingRight':'15vw',
            'paddingTop':'15px'
            
        }
        let iconColor = {
            'color':'#eee'
        }

        let audioControls = {
            'marginRight':'5px',
            'display':'inline-block'
        }

        let progressBarContainer = {
            'width':'100%',
            'margin' : 'auto',
            'marginBottom' : '10px'
        }

        let progressBackground = {
            "position": "relative",
            "width": "100%",
            "height": "10px",
            "backgroundColor": "#ddd"
        }

        let progressBarForeground = {
            'position:':'absolute',
            'width':'5%',
            'height':'10px',
            'backgroundColor':'#888'
        }

        let songDisplay = {
            'color':'#ddd',
            'fontSize':'13px',
            'marginBottom':'0',
            'float':'right',
            'display':'inline-block'
        }

        console.log(this.props)
        return (

            <div style={audioContainer}>
            
            <audio id='audio-player' src={this.props.song.source}  />
            {/* Audio controls */}
            {/* Toggling play and pause - if song is playing, run pause() fn on click, and vice versa */}

            <div style={progressBarContainer}>
                <div style={progressBackground} id="progressBackground">  
                    <div style={progressBarForeground} id='progressBarForeground'></div> 
                </div>
                
            </div>

            <div style={audioControls}>

                <span style={iconColor} onClick={this.props.play} >
                    {this.props.playing ? <Pause /> : <Play />}
                </span>
                
                {/* Toggling next and previous songs */}
                <FaChevronLeft style={iconColor} onClick={() => {this.props.changeSong(this.props.currentSong, 'prev')} } />
                <FaChevronRight style={iconColor} onClick={() => {this.props.changeSong(this.props.currentSong, 'next')} }/>

            </div>

            {/* Song Display Information */}
            <p style={songDisplay}>
            
            <i> {this.props.currentProgress}/ </i>{this.props.song.len} <i> </i>
            {this.props.song.name}</p>
            </div>


        )
    }
}

export default AudioPlayer;