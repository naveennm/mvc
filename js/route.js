var app = angular.module("stockapp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl :  "./views/admin_table.html"
    })
    .when('/admin_add', {
        templateUrl :  "./views/admin_add.html"
    })
    .when('/admin_table', {
        templateUrl :  "../views/admin_table.html"
    })
    .when('/admin_update', {
        templateUrl :  "../views/admin_update.html",
        
    })
});