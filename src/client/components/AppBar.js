import React, { Component } from 'react';
import { Layout, Input, Icon } from 'antd';
import _ from 'lodash';
import { withRouter, Link } from 'react-router-dom'

const Header = Layout.Header;
const Search = Input.Search;

function AppBar () {
    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', display:'flex', padding:20, height:100 }}>
            <Link to="/" style={{flex:5, textDecoration:'none'}}>
                <div style={{display:'flex', alignItems:'baseline'}}>
                    <Icon type="pause-circle" style={{ fontSize: 32, color: '#fff', marginRight:10}} theme="outlined" />
                    <h1 style={{color:'white', lineHeight:1,}}>Pause.</h1>
                </div>
                <p style={{color:'white', lineHeight:0}}>powered by coda</p>
            </Link>
            <div style={{flex:2}}>
                <Search 
                    placeholder="Search songs..."
                    onSearch={value => {
                        if(!_.isEmpty(value)) {
                            window.location.href = `/#/search/${value}`
                        } else {
                            console.log('here')
                            window.location.href = `/#/`
                        }
                    }}
                />
            </div>
            <div style={{flex:1, display:'flex', justifyContent:'center'}}>
                <Link to="/search/advance">Advanced search</Link>
            </div>
        </Header>
    )
}


export default withRouter(AppBar);