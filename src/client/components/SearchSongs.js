import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
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


async function searchSongs(query) {
    query = query || ''
    let response = await axios.get('/api/songs/search/'+query)
    let {artistMatches, nameMatches} = response.data.data
    return {artistMatches, nameMatches}
}

export default class SearchSongs extends Component {

    state = {
        artistMatches: [],
        nameMatches: []
    }
    
    async componentDidMount(){
        let query = this.props.match.params.query
        let {artistMatches, nameMatches} = await searchSongs(query)
        this.setState({artistMatches, nameMatches})
    }

    async componentWillReceiveProps(newProps){
        let query = newProps.match.params.query
        let {artistMatches, nameMatches} = await searchSongs(query)
        this.setState({artistMatches, nameMatches})
    }
    
    render() {
        let { artistMatches, nameMatches } = this.state
        let isArtistMatch = artistMatches.length > 0;
        let isSongsMatch = nameMatches.length > 0;

        if(!isArtistMatch && !isSongsMatch) {
            return (
                <div style={{padding:40, marginTop:90, fontSize:24, color:'#fff'}}>No songs.</div>
            )
        }

        return (
            <div style={{padding:40, marginTop:90}}>
                {isSongsMatch && 
                <div>
                    <h2 style={{color:'#fff', marginTop:60}}>Songs</h2>
                    <div style={{display:'flex', flex:1, flexWrap:'wrap'}}>
                        {nameMatches.map((song, i) => <SongCard 
                            key={i}
                            background={COLORS[i%COLORS_LENGTH]}
                            song={song}
                        />)}
                    </div>
                </div>}
                {isArtistMatch && 
                <div>
                    <h2 style={{color:'#fff', marginTop:60}}>Artist</h2>
                    <div style={{display:'flex', flex:1, flexWrap:'wrap'}}>
                        {artistMatches.map((song, i) => <SongCard 
                            key={i}
                            background={COLORS[i%COLORS_LENGTH]}
                            song={song}
                        />)}
                    </div>
                </div>}
            </div>
        )    
    }
}