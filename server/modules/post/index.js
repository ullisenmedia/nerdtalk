
/**
 * Module dependencies.
 */

'use strict'

var util = require('util'),
    path = require('path'),
    Application = require('./lib/application'),
    commonApp = require('./modules/common');

var NTApplication = function () {

    Application.call(this, {
        name: 'Nerd Talk',
        viewDir: path.join(__dirname, '/views'),
        appDir: path.join(__dirname, '../client')
    });
};

NTApplication.prototype.initialize = function () {

    NTApplication.super_.prototype.initialize();

    this.addMdoule(commonApp);

};

util.inherit(NTApplication, Application);

module.export = new NTApplication();
