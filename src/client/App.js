import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import { Layout, Icon } from 'antd';
import 'antd/dist/antd.css'

import AppBar from './components/AppBar';
import TopSongs from './components/TopSongs';
import SearchSongs from './components/SearchSongs';
import AdvanceFilters from './components/AdvanceFilters';
import Song from './components/Song';

function App() {
	return (
		<Router>
			<Layout>
				<AppBar />
				<Layout>
					<Layout.Content style={{background: '#001529'}}>
						<Route path="/" exact component={TopSongs} />
						<Route path="/search/:query" exact component={SearchSongs} />
						<Route path="/search/advance" exact component={AdvanceFilters} />
						<Route path="/song/:name" exact component={Song} />
					</Layout.Content>
				</Layout>
			</Layout>
		</Router>	
	)
}

export default App