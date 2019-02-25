import React, { Component } from 'react';
import axios from 'axios';
import SongCard from './SongCard';
import FilterSearch from './FilterSearch';

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

export default class TopSongs extends Component {

    state = {
        songs: []
    }
   
    handleIncomingSongs = (songs) => {
        this.setState({songs})
    }

    render() {
        let { songs } = this.state
        return (
            <div style={{padding:40}}>
                <FilterSearch onSongs={this.handleIncomingSongs} />
                <h2 style={{color:'#fff', marginTop:20}}>Found {songs.length} songs</h2>
                <div style={{display:'flex', flex:1, flexWrap:'wrap'}}>
                    {songs.map((song, i) => <SongCard 
                        key={i}
                        background={COLORS[i%COLORS_LENGTH]}
                        song={song}
                    />)}
                </div>
            </div>
        )    
    }
}