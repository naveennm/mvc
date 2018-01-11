var app = angular.module('stockapp');
app.service('sharedvalues', function () {
    var property = 'First';

    return {
        getProperty: function () {
            return property;
        },
        setProperty: function(tbldata) {
            property = tbldata;
        }
    };
});