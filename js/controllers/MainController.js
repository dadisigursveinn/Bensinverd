app.controller('MainController', ['$scope', 'gasPrice', 'posts', function($scope, gasPrice, posts) { //MainController-inn sem notar $scope og gasPrice (sem sækir gögn í API). Posts injectað í main controller til þess að senda gögn í database
	gasPrice.success(function(data) { 
	    $scope.stations = data; //$scope.stations fær data-ð úr api-inu
	});

	//$scope.posts = [];//Array sem heldur utanum bensíndælingar
	//Færði þetta í sendToServer.js
	$scope.posts = posts.posts;//hérna erum við að láta scope variable-ð mirrora posts í sendToServer.js þannig að það sé hægt að hava two-way-data-binding

	$scope.addPost = function(){//addPost er function til þess að skrá nýjar dælingar
		if(!$scope.stationInput || $scope.stationInput === '') { return; }
		if(!$scope.litersInput || $scope.litersInput === '') { return; }
		if(!$scope.dateInput || $scope.dateInput === '') { return; }//kemur í veg fyrir að hægt sé að posta með engu info
	    $scope.posts.push({
	    	station: $scope.stationInput, 
	    	liters: $scope.litersInput,
	    	date: $scope.dateInput 
	    });
	    $scope.stationInput = '';
	    $scope.litersInput = '';
	    $scope.dateInput = '';
	};

}]);