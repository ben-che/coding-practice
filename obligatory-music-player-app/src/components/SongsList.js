import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Play from 'react-icons/lib/fa/play';
import Pause from 'react-icons/lib/fa/pause';

class SongsList extends Component {
    
    render() {
    

        // map song array into jsx array for rendering:
        let songs = this.props.songs;
        let songsJSX = songs.map((element, index) => {
            return <div>
                        <Link to={'/'+ element.id}>
                            <div id={element.id} key={element.id}>
                                <p>{element.name}</p>
                                <img src={element.img} alt='img here'/>
                            </div>
                        </Link>
                        <button onClick={() => {this.props.playSong(element.id)}}>
                            {(this.props.playing && element.id === this.props.currentSong) ? <Pause /> : <Play />}
                        </button>
                    </div>
        });

        console.log(this.props)
        return (
            <div><h1>song list</h1>
            {songsJSX}
            </div>
        )
    }
}

export default SongsList;