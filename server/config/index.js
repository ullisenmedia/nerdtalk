'use strict'

var path = require('path'),
    _ = require('underscore');

var confPath = process.env['CONF_PATH'];
var pemPath = process.env['PEM_PATH'];

module.exports = _.extend({pem: pemPath}, require(confPath));