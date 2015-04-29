app.factory('gasPrice', ['$http', function($http) {
	return $http.get('https://api.import.io/store/data/82694251-6082-4b03-a17b-c7e730372da2/_query?input/webpage/url=http%3A%2F%2Fgsmbensin.is%2Fgsmbensin_web.php&_user=57aadf26-6a0a-4803-907b-c71d48eab740&_apikey=57aadf26-6a0a-4803-907b-c71d48eab740%3AFhb4C8Hc68G6xUj29MpsGNCrlfo%2BkVSv9F9zKQw%2FztrwmjgCl4UidtSPJfK6Rm0eabe3Mw2sE%2BVYjpUg7hgq5g%3D%3D')
					.success(function(data) {
						console.log(data);
						return data;
						})
					.error(function(err) {
						console.log(err);
						return err;
					});
}]);