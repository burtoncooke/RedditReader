var browserify = require('browserify-middleware');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var session = require('cookie-session');

var _ = require('lodash')


var assetFolder = path.join(__dirname, '..', 'client','public');

// Serve Static Assets

app.use(express.static(assetFolder));

app.use( require('body-parser').json() );

app.use(cookieParser());

// Serve JS Assets
app.get('/app-bundle.js',
 browserify('./client/index.js', {
    transform: [ [ require('babelify'), { presets: ['es2015', 'react'] } ] ]
  })
);

app.use(session({
  name: 'my-app:session',
  secret: process.env.SESSION_SECRET || 'development',
  secure: (!! process.env.SESSION_SECRET),
  signed: true
}));


// Wild card route for client side routing.
app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' );
})

var port = process.env.PORT || 4000;

server.listen(port);
console.log('Listening on localhost:' + port);
module.exports = server
