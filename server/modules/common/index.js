'use strict'

var util = require('util'),
    path = require('path'),
    Application = require('../../lib/application'),
    appController = require('./controllers');

var CommonApplication = function () {

    Application.call(this, {
        name: 'Common',
        viewDir: path.join(__dirname, '/views')
    });
};

CommonApplication.prototype.initialize = function () {

    CommonApplication.super_.prototype.initialize();

    appController.initialize(this.app);

};

util.inherits(CommonApplication, Application);

module.export = new CommonApplication();