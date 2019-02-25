import React, { Component } from 'react';
import axios from 'axios';
import SongCard from './SongCard';

const COLORS = [
	['#f2680b', '#fec400'],
	['#8e2de2', '#4a00e0'],
	['#ED213A', '#93291E'],
	['#FF512F', '#DD2476'],
	['#ffe259', '#ffa751'],
	['#1488CC', '#2B32B2'],
	['#7F00FF', '#E100FF'],
	['#00c6ff', '#0072ff'],
	['#1D976C', '#93F9B9'],
	['#DE6262', '#FFB88C'],
	// ['', ''],
]

const COLORS_LENGTH = COLORS.length

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export default class Song extends Component {

    state = {
        song: {}
    }
    
    async componentDidMount(){
        let query = this.props.match.params.name
        let response = await axios.get('/api/song/'+query)
        this.setState({song:response.data.data})
    }


    render() {
        let { song } = this.state
        return (
            <div style={{ height:'100vh', marginTop:50, padding:20, background:`linear-gradient(to right, ${COLORS[getRandomInt(0, COLORS_LENGTH-1)].join(',')})`}}>
                <h1 style={{color:'#fff', marginTop:70}}>{song.rank + '. ' +song.name + ' by ' + song.artists}</h1>
                <p style={{color:'#fff', fontSize:24}}>Duration - {millisToMinutesAndSeconds(song.duration_ms)}</p>
            </div>
        )    
    }
}