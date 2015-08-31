var express = require('express');
var config = require('./config/default');

var server = express();

server.use(express.static(config.buildDir));

// return index.html for all uris. Routes are handled
// by react-router.
server.use('/*', function(req, res) {
    res.sendFile('index.html', {root: config.srcDir});
});

server.listen(config.serverPort);