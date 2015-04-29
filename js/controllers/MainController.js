app.controller('MainController', ['$scope', 'gasPrice', function($scope, gasPrice) { 
  gasPrice.success(function(data) { 
    $scope.stations = data; 
  });
}]);