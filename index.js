const express = require('express');

const db = require('./data/hubs-model.js');

const server = express();

server.use(express.json()); //add this to make POST and PUT work

server.get('/', (req, res) => {
    res.send('hello world')
})

server.get('/now', (req, res) => {
    const now = new Date().toISOString();
    res.send(now);
})

server.get('/hubs', (req, res) => {
    db.find().then(hubs => {
        res.status(200).json(hubs);
    }).catch(error => {
        res.status(500).json({ message: 'error retrieving hubs' })
    })
})

server.post('/hubs', (req, res) => {
    //read the data for the hub
    const hubInfo = req.body;
    console.log('hubinfo: ', hubInfo)
    //add hub to our db
    db.add(hubInfo)
    .then(hub => {
        res.status(201).json(hub);
    })
    .catch(error => {
        res.status(500).json({ message: 'error posting hubs' })
    })
})

server.delete('/hubs/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id).then(deleted => {
        res.status(204).end(); //tells the client request is done
    })
    .catch(error => {
        res.status(500).json({ message: 'error deleting hubs' })
    })
})

server.listen(4000, () => {
    console.log('\n*** API up and running on port 4k ***\n')
})