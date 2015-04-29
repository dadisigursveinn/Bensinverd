console.log("Hellopello");
app.controller('MainController', ['$scope', 'gasPrice', function($scope, gasPrice) { 
	console.log('Hello');
	gasPrice.success(function(data) { 
	    $scope.stations = data; 
	});
}]);