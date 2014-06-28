
/**
 * Module dependencies.
 */

'use strict'

var express = require('express'),
    util = require('util'),
    http = require('http'),
    path = require('path'),
    Application = require('./lib/application'),
    PostApplication = require('./modules/post'),
    CommonApplication = require('./modules/common');

var NTApplication = function () {

    Application.call(this, {
        name: 'Nerd Talk',
        viewDir: path.join(__dirname, '/views'),
        appDir: path.join(__dirname, '../client'),
        isRoot: true
    });
};

util.inherits(NTApplication, Application);

NTApplication.prototype.initialize = function (params) {

    var commonApp = new CommonApplication();
    var postApp = new PostApplication();

    this.app = express();
    this.name = params.name;
    this.port = process.env.PORT || this.port;
    this.viewsDir =  params.viewDir;
    this.appDir = params.appDir || null;
    this.isRoot = params.isRoot || false;

    this.addMdoule(commonApp.app);
    this.addMdoule(postApp.app);

    this.configure();

};

var ntapp = new NTApplication();

http.createServer(ntapp.app).listen(ntapp.port, function() {

    console.log(ntapp.MESSAGE_LISTENER, ntapp.name, ntapp.port);
});
