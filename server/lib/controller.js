'use strict'

var Controller = function(route) {

    this.route = route || this.route;
};

Controller.prototype = {

    // Route signature for all route handlers
    route: '/',

    // Controller setup
    initialize: function(app) {

        app.get(this.route, this.middleware, this.get);
    },


    // Default Middleware for controllers
    middleware: function(req, res, next) {

        console.log(req.isCrawler + '-------------------------');

        // TODO: Check to see if the request is coming from a crawler

        next();
    },


    // Controller route handlers
    get: function(req, res) {}
};

module.exports = Controller;
