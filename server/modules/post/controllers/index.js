'use strict'

var util = require('util');
var webController = require('./web');
var apiController = require('./api');
var Controller = require('../lib/controller');

// Controller used to setup other controller modules
var AppController = function() {

    Controller.call(this);
};

util.inherits(AppController, Controller);

AppController.prototype.initialize = function(app) {

    apiController.initialize(app);
    webController.initialize(app);

};

module.exports = new AppController();