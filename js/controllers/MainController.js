app.controller('MainController', ['$scope', 'gasPrice', function($scope, gasPrice) { //MainController-inn sem notar $scope og gasPrice (sem sækir gögn í API)
	gasPrice.success(function(data) { 
	    $scope.stations = data; //$scope.stations fær data-ð úr api-inu
	});
}]);