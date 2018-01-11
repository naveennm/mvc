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

app.controller('tableController', function($scope, $http,sharedvalues) {

    
    $http({
        method: 'GET',
        url: 'api/todos'
      }).then(function successCallback(response) {
          $scope.data = response.data;
          console.log('-------', $scope.data);
        }, function errorCallback(response) {
        });
       
  //  }; 
    
    $scope.deleteData = function(id) {

        $http({
            method: 'Delete',
            url: 'api/todos/'+id
          }).then(function successCallback(response) {
              $scope.data = response.data;
              $("#deleteMsg").text("Delete Successfully");
              // this callback will be called asynchronously
              // when the response is available
            }, function errorCallback(response) {
                $("#deleteMsg").text("Error");
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
    }
    $scope.editData = function(tbldata){ 
        location.href='#!admin_update';
        console.log("my",tbldata);
        sharedvalues.setProperty(tbldata);
    }
});