import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Play from 'react-icons/lib/fa/play';
import Pause from 'react-icons/lib/fa/pause';

class SongsList extends Component {
    
    render() {
        // song list styles
        let songListContainer = {
            'margin':'0px 20px',
            'padding':'15px',
            'borderTop':'1px solid #ddd'
        }

        let oneSong = {
            'boxShadow':'2px 2px 2px 2px #ddd',
            'backgroundColor':'#fff',
            'margin':'5px 0px',
            'padding':'2px'
        }

        let oneSongText = {
            'padding':'3px 3px',
            'textAlign':'center',
            'textDecoration':'none',
            'marginBottom':'0'
        }

        // map song array into jsx array for rendering:
        let songs = this.props.songs;
        let songsJSX = songs.map((element, index) => {
            return <div className='col-xs-12 col-s-12 col-m-6 col-lg-3 col-xl-3' style={oneSong}>
                        <Link to={'/'+ element.id}>
                            <div id={element.id} key={element.id}>
                                <img src={element.img} className='img-fluid' alt='img here'/>
                            </div>
                        </Link>
                        <p style={oneSongText}>{element.name} - {element.artist}</p>
                        <p style={oneSongText} onClick={() => {this.props.playSong(element.id)}}>
                            {(this.props.playing && element.id === this.props.currentSong) ? <Pause /> : <Play />}
                        </p>
                    </div>
        });

        console.log(this.props)
        return (
            <div style={songListContainer}>
                <div className='row'>
                    {songsJSX}
                </div>
            </div>
        )
    }
}

export default SongsList;