'use strict'

var Controller = function(route) {

    this.route = route || this.route;
};

Controller.prototype = {

    // Route signature for all route handlers
    route: '/',

    // Controller setup
    initialize: function(app) {

        app.get(this.route, this.middleware, this.getHandler);
    },


    // Default Middleware for controllers
    middleware: function(req, res, next) {

        next();
    },


    // Controller route handlers
    getHandler: function(req, res) {}
};

module.exports = Controller;
