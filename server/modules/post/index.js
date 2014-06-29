'use strict'

var util = require('util'),
    path = require('path'),
    Application = require('../../lib/application'),
    appController = require('./controllers');

var PostApplication = function () {

    Application.call(this, {
        name: 'Post',
        viewsDirs: path.join(__dirname, '/views')
    });
};

util.inherits(PostApplication, Application);

PostApplication.prototype.initialize = function (params) {

    PostApplication.super_.prototype.initialize(params);

    appController.initialize(this.app);

};

module.exports = PostApplication;