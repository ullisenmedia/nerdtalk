'use strict'

var util = require('util'),
    path = require('path'),
    Application = require('../../lib/application'),
    appController = require('./controllers');

var CommonApplication = function () {

    Application.call(this, {
        name: 'Common',
        viewsDirs: path.join(__dirname, '/views')

    });
};

util.inherits(CommonApplication, Application);

CommonApplication.prototype.initialize = function (params) {

    CommonApplication.super_.prototype.initialize(params);

    appController.initialize(this.app);

};

module.exports = CommonApplication;