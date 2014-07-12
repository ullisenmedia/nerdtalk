
/**
 * Module dependencies.
 */

'use strict'

var express = require('express'),
    util = require('util'),
    http = require('http'),
    path = require('path'),
    datastore = require('./lib/datastore'),
    Application = require('./lib/application'),
    SearchApplication = require('./modules/search'),
    PostApplication = require('./modules/post'),
    CommonApplication = require('./modules/common');

var NTApplication = function () {

    Application.call(this, {
        name: 'Nerd Talk',
        appDir: path.join(__dirname, '../client'),
        isRoot: true
    });
};

util.inherits(NTApplication, Application);

NTApplication.prototype.initialize = function (params) {

    this.app = express();
    this.name = params.name;
    this.port = process.env.PORT || this.port;
    this.viewsDirs =  params.viewsDirs;
    this.appDir = params.appDir || null;
    this.isRoot = params.isRoot || false;

    var commonApp = new CommonApplication();
    this.addMdoule(commonApp.app);

    var postApp = new PostApplication();
    this.addMdoule(postApp.app);

    var searchApp = new SearchApplication();
    this.addMdoule(searchApp.app);

    this.configure();

};

var ntapp = new NTApplication();

http.createServer(ntapp.app).listen(ntapp.port, function() {

    console.log(ntapp.MESSAGE_LISTENER, ntapp.title, ntapp.port);
});
