var Q = require('Q'),
    _ = require('underscore'),
    moment = require('moment'),
    ds = require('./datastore');

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

            function onSuccess(data) {

                deferred.resolve({
                    entity: Model.toObject(data.entity.properties),
                    paging: data.paging
                });
            },

            function onError(err) {

                deferred.reject(err);
            }
        );

        return deferred.promise;
    },

    find: function (filter, isGQL, type) {

        var deferred = Q.defer();

        var finalQuery = null;

        if(isGQL) {

            finalQuery = {gqlQuery: finalQuery};

        } else {

            finalQuery = {query: _.extend(filter, {"kinds": [{"name": this.type || type}]})};
        }

        ds.runQuery(finalQuery).then(

            function onSuccess(data) {

                deferred.resolve({
                    entities: Model.toArray(data.entities),
                    paging: data.paging
                });
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

            result[key] = Model.toObject(property.value.properties);

        } else if(property.type === 'listValue') {

            result[key] = Model.toObject(property.value, true);

        } else {

            result[key] = property.value;
        }

    });

    return result;
};

Model.toArray = function(entities) {

    var result = [];

    _.each(entities, function(item) {

        result.push(Model.toObject(item.entity.properties));
    });

    return result;
};


module.exports = Model;