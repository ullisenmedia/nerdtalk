'use strict'

var util = require('util'),
    path = require('path'),
    Application = require('../../lib/application'),
    appController = require('./controllers');

var SearchApplication = function () {

    Application.call(this, {
        name: 'Search',
        viewsDirs: path.join(__dirname, '/views')

    });
};

util.inherits(SearchApplication, Application);

SearchApplication.prototype.initialize = function (params) {

    SearchApplication.super_.prototype.initialize(params);

    appController.initialize(this.app);

};

module.exports = SearchApplication;