var usedFlags = []; //array til að geima notaðar bensínstöðvar

//Býr til gasPrice sem að nær í API-in
app.factory('gasPrice', ['$http', function($http) {
	//Bensínverð API sem að er búin til með import.io
	return $http.get('https://api.import.io/store/data/82694251-6082-4b03-a17b-c7e730372da2/_query?input/webpage/url=http%3A%2F%2Fgsmbensin.is%2Fgsmbensin_web.php&_user=57aadf26-6a0a-4803-907b-c71d48eab740&_apikey=57aadf26-6a0a-4803-907b-c71d48eab740%3AFhb4C8Hc68G6xUj29MpsGNCrlfo%2BkVSv9F9zKQw%2FztrwmjgCl4UidtSPJfK6Rm0eabe3Mw2sE%2BVYjpUg7hgq5g%3D%3D')
					.success(function(data) {//success
						//console.log(data.results);
						data.results = data.results.filter(function(bensinstod){//filter loopar í gegnum array og ef það skilar true þá kemur það element í arrayið sem það skilar
							var used = false;//declaring used
							usedFlags.forEach(function(usedFlag){//loopa í gegnum notuð notuð flöggg
								if(bensinstod.flag_value === usedFlag){//ef að það er búið að nota flagið setjum við used í true
									used = true;
								}

							})
							if (used === true){
								return false;//ef used === true þá viljum við ekki að það komi í nýja arrayið
							}
							else{
								usedFlags.push(bensinstod.flag_value);//bæta við í used flög
								return true;//láta bensínstöðina í nýja arrayið
							}
						})
						//console.log(data.results);
						return data;//returnar data úr API
						})
					.error(function(err) {//error
						//console.log(err);
						return err;//skilar errornum... Hef samt alldrei fengið error, ekki viss hvort að það komi error message.
					});
}]);