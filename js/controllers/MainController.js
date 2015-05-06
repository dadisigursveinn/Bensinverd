//http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
var today = new Date();
var dd = today.getDate()-1;
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = yyyy+'/'+mm+'/'+dd;
document.write(today);



app.controller('MainController', ['$scope', 'gasPrice', function($scope, gasPrice) { //MainController-inn sem notar $scope og gasPrice (sem sækir gögn í API). Posts injectað í main controller til þess að senda gögn í database
	gasPrice.success(function(data) { 
	    $scope.stations = data; //$scope.stations fær data-ð úr api-inu
	});

	$scope.posts = [];//Array sem heldur utanum bensíndælingar
	$scope.failed = '';    // A message displayed if the form fails to submit
	//Færði þetta í sendToServer.js
	// For each item in local storage...
    for( item in localStorage ) {

        // Parse the JSON string and add it to contacts array
        var newItem = JSON.parse( localStorage[item] );
        $scope.posts.push( newItem );

    }


	//$scope.posts = posts.posts;//hérna erum við að láta scope variable-ð mirrora posts í sendToServer.js þannig að það sé hægt að hava two-way-data-binding


	/*$localStorage.posts = [];
	$scope.posts = $localStorage.posts;*/

	//$scope.saved = localStorage.getItem('posts');
	//$scope.posts = (localStorage.getItem('posts')!==null) ? JSON.parse($scope.saved) : [];


	/*$scope.saved = localStorage.getItem('posts');
	$scope.posts = (localStorage.getItem('posts')!==null) ? JSON.parse($scope.saved) : 
	[
	];
	localStorage.setItem('posts', JSON.stringify($scope.posts));*/
	

	

	$scope.addPost = function(){//addPost er function til þess að skrá nýjar dælingar
		if(!$scope.stationInput || $scope.stationInput === '') { return; }
		if(!$scope.litersInput || $scope.litersInput === '') { return; }
		//if(!$scope.noteInput || $scope.noteInput === '') { return; }//kemur í veg fyrir að hægt sé að posta með engu info
	    /*$scope.posts.push({
	    	id: localStorage.length,
	    	station: $scope.stationInput, 
	    	liters: $scope.litersInput,
	    	date: $scope.dateInput 
	    });
	    $scope.litersInput = '';
	    $scope.dateInput = '';
	    //localStorage.setItem('posts', JSON.stringify($scope.posts));*/

	    var priceAtStation = 0;
		$scope.stations.results.forEach(function(station){
			if(station.flag_value === $scope.stationInput){
				priceAtStation = station.ver_number;
			}
		})

		var newPost = {
				id: localStorage.length,
		    	station: $scope.stationInput, 
		    	liters: $scope.litersInput,
		    	note: $scope.noteInput, 
		    	date: today,
		    	price: (priceAtStation * $scope.litersInput)
			}

		// Add contact object to localStorage as the value to a new property
	    localStorage.setItem( 'item' + localStorage.length, JSON.stringify(newPost) );

	    // Add new contact object to the model by adding it to the contacts array
		$scope.posts.push( newPost );

		$scope.litersInput = '';//Cleara textboxin
		$scope.noteInput = '';

	};

	/*$scope.deletePost = function(index, item) { // Náði ekki að láta þetta virka

        // index param is an ngRepeat variable
        // docs.angularjs.org/api/ng/directive/ngRepeat

        // Delete item from localStorage
        localStorage.removeItem( 'item' + item.id );

        // Remove item from the contacts array
        console.log(index);
        console.log(item.id);
        $scope.posts.splice( item.id-1, 1 );

    }*/


	$scope.save = function(){
		//localStorage.setItem('posts', JSON.stringify($scope.posts));
	}

}]);