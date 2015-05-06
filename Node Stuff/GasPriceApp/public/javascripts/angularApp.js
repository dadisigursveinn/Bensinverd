//Það sem að ég notaði til að hjálpa mér með node partinn
//https://thinkster.io/mean-stack-tutorial/
var app = angular.module('GasPriceApp', []); 
//Gerir app-ið GasPriceApp 


var mongoose = require('mongoose');
require('./models/Posts');

mongoose.connect('mongodb://localhost/news');



//Hérna kemur kóði til að senda dót á server
app.factory('posts', [function(){
	/*
	What we're doing here is creating a new object 
	that has an array property called posts. We then 
	return that variable so that our o object essentially 
	becomes exposed to any other Angular module that cares 
	to inject it. You'll note that we could have simply 
	exported the posts array directly, however, by exporting 
	an object that contains the posts array we can add new 
	objects and methods to our services in the future.
	https://thinkster.io/mean-stack-tutorial/ */
	var o = {
		posts: []
	};
	return o;
}]);


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


//Býr til gasPrice sem að nær í API-in
app.factory('gasPrice', ['$http', function($http) {
	//Bensínverð API sem að er búin til með import.io
	return $http.get('https://api.import.io/store/data/82694251-6082-4b03-a17b-c7e730372da2/_query?input/webpage/url=http%3A%2F%2Fgsmbensin.is%2Fgsmbensin_web.php&_user=57aadf26-6a0a-4803-907b-c71d48eab740&_apikey=57aadf26-6a0a-4803-907b-c71d48eab740%3AFhb4C8Hc68G6xUj29MpsGNCrlfo%2BkVSv9F9zKQw%2FztrwmjgCl4UidtSPJfK6Rm0eabe3Mw2sE%2BVYjpUg7hgq5g%3D%3D')
					.success(function(data) {//success
						//console.log(data);
						return data;//returnar data úr API
						})
					.error(function(err) {//error
						//console.log(err);
						return err;//skilar errornum... Hef samt alldrei fengið error, ekki viss hvort að það komi error message.
					});
}]);