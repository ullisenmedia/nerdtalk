var Q = require('Q'),
    _ = require('underscore'),
    ds = require('datastore');

var Model = function (type) {

    this.type = type;
};

Model.prototype = {

    type: null,

    findById: function (id) {

        var deferred = Q.defer();

        var key = {path: [
            {kind: this.type, id: id}
        ]};

        ds.lookup({keys: [key]}).then(

            function onSuccess(entity) {

                deferred.resolve(Model.toObject(entity.properties));
            },

            function onError(err) {

                deferred.reject(err);
            }
        );

        return deferred.promise;
    },

    find: function (filter) {

        var deferred = Q.defer();

        var finalQuery = _.extend({filter: filter}, {"kinds": [{"name": this.type}]});

        ds.runQuery({query: finalQuery}).then(

            function onSuccess(entities) {

                deferred.resolve(Model.toArray(entities));
            },

            function onError(err) {

                deferred.reject(err);
            }
        );

        return deferred.promise;
    }
};

Model.toProperty = function (value) {

    var valueType, propertyValue, result = null;
    var keys = _.keys(value);

    if (keys.length > 0) {

        valueType = keys[0];
        propertyValue = value[valueType];

        result = {value: propertyValue, type: valueType};
    }

    return result;
};

Model.toObject = function (properties, isArray) {

    var property;
    var result = (isArray) ? [] : {};

    _.each(properties, function (value, key) {

        property = Model.toProperty(value);

        if(property.type === 'entityValue') {

            result[key] = this.toObject(property.value.properties);

        } else if(property.type === 'listValue') {

            result[key] = this.toObject(property.value, true);

        } else {

            result[key] = property.value;
        }

    });

    return result;
};

Model.toArray = function(entities) {

    var result = [];

    _.each(entities, function(entity) {

        result.push(entity.properties);
    });

    return result;
};


module.exports = Model;