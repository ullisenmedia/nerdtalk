'use strict'

/**
 * Module dependencies.
 */

var express = require('express'),
    util = require('util'),
    http = require('http'),
    path = require('path'),
    _ = require('underscore'),
    hbs = require('handlerbars'),
    cons = require('consolidate'),
    middleware = require('./lib/middleware');

var MESSAGE_LISTENER = '%s Application Listening on port %s';

var Application = function (params) {

    this.initialize(params);
};

Application.prototype = {

    name: null,
    app: null,
    port: 3000,
    viewsDir: null,
    appDir: null,

    initialize: function (params) {

        this.app = express();
        this.name = params.name;
        this.port = process.env.PORT || this.port;
        this.viewsDir =  params.viewDir;
        this.appDir = params.appDir;

        this.configure();
        this.addServerListeners();
    },

    addMdoule: function(module) {

        this.app.use(module);
    },

    configure: function() {

        this.app.engine('handlers', cons.handlerbars);

        this.app.configure(function () {

            this.app.set('port', this.port);
            this.app.set('views', this.viewsDir);
            this.app.set('view engine', 'hbs');

            this.app.use(express.compress());
            this.app.use(express.logger('dev'));
            this.app.use(express.bodyParser());
            this.app.use(express.methodOverride());
            this.app.use(middleware.queryFilter());
            this.app.use(middleware.cors());

            if(this.appDir) {
                this.app.use(express.static(this.appDir));
            }

            this.app.use(this.app.router);
            this.app.use(middleware.notFound());
        });
    },

    addServerListeners: function() {

        // Listen on server application
        this.app.listen(this.port, function() {

            console.log(MESSAGE_LISTENER, this.name, this.port);
        });
    }
};

module.exports = Application;