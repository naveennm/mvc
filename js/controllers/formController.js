var app = angular.module('stockapp');
app.controller('formController', function($scope, $http) {
    $scope.createform = function() {
        console.log($scope.stripcode);
     
        var req = {
            method: 'POST',
            url: 'api/todos',
            
            data: { 
                test: $scope.stripcode,
                stripname : $scope.stripname,
                currentrate : $scope.currentrate,
                stockloss : $scope.stockloss,
                target : $scope.target
             }
           }
           
           $http(req).then(function(){$("#createMsg").text("Successfully Saved");}, function(){$("#createMsg").text("Error");});
            
    };   
   
});