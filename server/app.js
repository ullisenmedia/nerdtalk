
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    hbs = require('handlerbars'),
    cons = require('consolidate'),
    middleware = require('./lib/middleware'),

    // Application Modules
    common = require('./modules/common'),
    posts = require('./modules/posts');


// Configuration properties

app = express(common);

var port = process.env.PORT || 3000;
var viewsDir =  path.join(__dirname, '/views');
var appDir = path.join(__dirname, '../client');


// Configure Modules

app.use(common);
app.use(posts);

// Express app configurations

app.engine('handlers', cons.handlerbars);

app.configure(function () {
    app.set('port', port);
    app.set('views', viewsDir);
    app.set('view engine', 'hbs');

    app.use(express.compress());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(middleware.queryFilter());
    app.use(middleware.cors());

    app.use(express.static(appDir));
    app.use(app.router);
    app.use(middleware.notFound());
});

// Listen on server application
http.createServer(app).listen(port, function() {
    console.log('Cool CNN Tweet server listening on port ' + port);
});
