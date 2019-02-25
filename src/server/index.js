const express = require('express');
const database = require('./db/database')
const {responseHanlder, asyncMiddleware} = require('./middlewares')

const app = express();

app.use(express.static('dist'));

let api = {
    getSongsByNameOrArtist: async(req, res) => {
        const {query} = req.params;
        let nameMatches = await database.freeSearch({name:query})
        let artistMatches = await database.freeSearch({artists:query})    
        return {
            nameMatches,
            artistMatches
        }
    },
    getSongByName: async(req, res) => {
        const {name} = req.params;
        let nameMatches = await database.freeSearch({name})
        return nameMatches[0]
    },
    getAllSongs: async(req, res) => {
        return await database.freeSearch()    
    },
    getTopSongs: async(req, res) => {
        return await database.topSongs()    
    },
    getFiltersSongs: async(req, res) => {
        return await database.filterSearch(req.query)   
    },
}

app.get('/api/songs/search/:query', asyncMiddleware(api.getSongsByNameOrArtist));
app.get('/api/songs/filters', asyncMiddleware(api.getFiltersSongs));
app.get('/api/songs', asyncMiddleware(api.getAllSongs));
app.get('/api/songs/top', asyncMiddleware(api.getTopSongs));
app.get('/api/song/:name', asyncMiddleware(api.getSongByName));

app.use(responseHanlder)

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));