'use strict'

/**
 * Module dependencies.
 */

var express = require('express'),
    util = require('util'),
    http = require('http'),
    path = require('path'),
    _ = require('underscore'),
    hbs = require('handlebars'),
    cons = require('consolidate'),
    middleware = require('./middleware');


var Application = function (params) {

    this.initialize(params);
};

Application.prototype = {

    MESSAGE_LISTENER: '%s Application Listening on port %s',

    name: null,
    app: express(),
    port: 3000,
    viewsDir: null,
    appDir: null,
    isRoot: false,

    initialize: function (params) {

//        this.app = express();
        this.name = params.name;
        this.port = process.env.PORT || this.port;
        this.viewsDir =  params.viewDir;
        this.appDir = params.appDir || null;
        this.isRoot = params.isRoot || false;

        this.configure();
    },

    addMdoule: function(module) {

        this.app.use(module);
    },

    configure: function() {

        var that = this;

        this.app.engine('handlers', cons.handlebars);

        this.app.configure(function () {

            if(that.isRoot) {

                that.app.set('port', that.port);
            }

            if(that.viewsDir) {

                that.app.set('views', that.viewsDir);
                that.app.set('view engine', 'hbs');
            }

            that.app.use(express.compress());
            that.app.use(express.logger('dev'));
            that.app.use(express.bodyParser());
            that.app.use(express.methodOverride());

            if(that.isRoot) {

                that.app.use(middleware.queryFilter());
                that.app.use(middleware.cors());
            }

            if(that.appDir) {

                that.app.use(express.static(that.appDir));
            }

            that.app.use(that.app.router);
//            that.app.use(middleware.notFound());
        });
    }
};

module.exports = Application;