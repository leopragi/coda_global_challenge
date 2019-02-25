import React, { Component } from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

let StyledCard = styled(Card)`
    width: 180px;
    height: 180px;
    margin: 20px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    &:hover {
        transition: all .2s ease-in-out;    
        transform: scale(1.1);
    }
`


export default function SongCard(props) {
    let {background=[], song, rankMode=false} = props;
    let {name, artists, rank} = song;
    return (
        <Link to={"/song/"+name} style={{textDecoration:'none'}}>
            <StyledCard
                bordered={false}
                style={{ 
                    background: `linear-gradient(to right, ${background.join(',')})`
                }}
            >
                {rankMode && <div>{rank}</div>}
                <div style={{height: 80, display:'block', lineClamp:2, boxOrient:'vertical', fontSize:24, overflow:'hidden', textOverflow:'ellipsis'}}>{name}</div>
                <div style={{position:'absolute', bottom:0, left:0, padding:25}}>{artists}</div>
            </StyledCard>  
        </Link>
    )
}