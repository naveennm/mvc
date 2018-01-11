var app = angular.module('stockapp');
app.controller('updateController', function($scope, $http,sharedvalues) {
    tbldata = sharedvalues.getProperty();
    $scope.stripcodes = tbldata.stripcode; 
    $scope.stripname=tbldata.stripname
    $scope.currentrate=tbldata.currentrate
    $scope.stockloss=tbldata.stockloss
    $scope.target=tbldata.target
   console.log("end",tbldata.stripcode);
   


   $scope.update = function() {
    // $scope.editData();

     console.log("up",tbldata._id);
    id= tbldata._id;
     
     var req = {
         method: 'PUT',
         url: 'api/todos/'+ id,
         
         data: { 
             id :tbldata._id,
             test : $scope.stripcodes,
             stripname : $scope.stripname,
             currentrate : $scope.currentrate,
             stockloss : $scope.stockloss,
             target : $scope.target
          }
        }
        
       $http(req).then(function(){$("#updateMsg").text("Update Successful");}, function(){$("#updateMsg").text("Error");});
    }
   
});