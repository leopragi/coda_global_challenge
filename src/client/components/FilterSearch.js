import React, { Component } from 'react';
import Filter from './Filter';
import { Row, Col, Button } from 'antd'
import queryString from 'query-string'
import axios from 'axios';

class FilterSearch extends Component {

    state = {
        danceability: [0, 1],
        tempo: [0, 200],
        liveness: [0, 1],
        energy: [0, 1],
        key: [0, 12],
        loudness: [-12, 0],
        speechiness: [0, 1],
        acousticness: [0, 1],
        instrumentalness: [0, 0.5],
        valence: [0, 1],
    }

    onChange = (key) => (value) => {
        this.setState({[key]:value})
    }

    onClear = (key) => {
        this.setState({[key]:[]})
    }

    handleSubmit = async() => {
        let query = queryString.stringify(this.state)
        let response = await axios.get('/api/songs/filters?'+query)
        this.props.onSongs(response.data.data)
    }

    render(){
        let {danceability, tempo, liveness, energy, key, loudness, speechiness, acousticness, instrumentalness, valence} = this.state
        return (
            <Row>
                <Col span={2}>
                    <Filter 
                        display="Danceability" 
                        name="danceability" 
                        value={danceability} 
                        onChange={this.onChange} 
                        onClear={this.onClear} 
                        min={0}
                        max={1}
                        step={0.1}
                    />
                </Col>
                <Col span={2}>
                    <Filter 
                        display="Tempo" 
                        name="tempo" 
                        value={tempo} 
                        onChange={this.onChange} 
                        onClear={this.onClear} 
                        min={0}
                        max={200}
                        step={20}
                    />                
                </Col>
                <Col span={2}>
                    <Filter 
                        display="Liveness" 
                        name="liveness" 
                        value={liveness} 
                        onChange={this.onChange} 
                        onClear={this.onClear} 
                        min={0}
                        max={1}
                        step={0.1}
                    />
                </Col>
                <Col span={2}>
                    <Filter 
                        display="Enery" 
                        name="energy" 
                        value={energy} 
                        onChange={this.onChange} 
                        onClear={this.onClear} 
                        min={0}
                        max={1}
                        step={0.1}
                    />
                </Col>
                <Col span={2}>
                    <Filter 
                        display="Key" 
                        name="key" 
                        value={key} 
                        onChange={this.onChange} 
                        onClear={this.onClear} 
                        min={0}
                        max={12}
                        step={1}
                    />
                </Col>
                <Col span={2}>
                    <Filter 
                        display="Loudness" 
                        name="loudness" 
                        value={loudness} 
                        onChange={this.onChange} 
                        onClear={this.onClear} 
                        min={-10}
                        max={0}
                        step={-1}
                    />
                </Col>
                <Col span={2}>
                    <Filter 
                        display="Speechiness" 
                        name="speechiness" 
                        value={speechiness} 
                        onChange={this.onChange} 
                        onClear={this.onClear} 
                        min={0}
                        max={1}
                        step={0.1}
                    />
                </Col>
                <Col span={2}>
                    <Filter 
                        display="Acousticness" 
                        name="acousticness" 
                        value={acousticness} 
                        onChange={this.onChange} 
                        onClear={this.onClear} 
                        min={0}
                        max={1}
                        step={0.1}
                    />
                </Col>
                <Col span={2}>
                    <Filter 
                        display="Instrumentalness" 
                        name="instrumentalness" 
                        value={instrumentalness} 
                        onChange={this.onChange} 
                        onClear={this.onClear} 
                        min={0}
                        max={0.5}
                        step={0.01}
                    />
                </Col>
                <Col span={2}>
                    <Filter 
                        display="Valence" 
                        name="valence" 
                        value={valence} 
                        onChange={this.onChange} 
                        onClear={this.onClear} 
                        min={0}
                        max={1}
                        step={0.1}
                    />
                </Col>
                <Col span={4}>
                    <Button onClick={this.handleSubmit} type="primary">Search</Button>
                </Col>
            </Row>
        )
    }
}

export default FilterSearch;