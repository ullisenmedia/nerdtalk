
/**
 * Module dependencies.
 */

'use strict'

var util = require('util'),
    http = require('http'),
    path = require('path'),
    Application = require('./lib/application'),
    commonApp = require('./modules/common');

var NTApplication = function () {

    Application.call(this, {
        name: 'Nerd Talk',
        viewDir: path.join(__dirname, '/views'),
        appDir: path.join(__dirname, '../client'),
        isRoot: true
    });
};

NTApplication.prototype.initialize = function () {

    this.addMdoule(commonApp.app);

    NTApplication.super_.prototype.initialize();

};

util.inherits(NTApplication, Application);


var ntapp = new NTApplication();

http.createServer(ntapp.app).listen(ntapp.port, function() {

    console.log(ntapp.MESSAGE_LISTENER, ntapp.name, ntapp.port);
});
