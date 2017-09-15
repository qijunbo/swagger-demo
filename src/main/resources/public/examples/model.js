var app = angular.module("dream", []); 

app.controller("myCtrl", function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});

 
app.controller('clickController', ['$scope', function($scope) {
    $scope.count = 0;
    $scope.myFunc = function() {
        $scope.count++;
    };
}]);


 