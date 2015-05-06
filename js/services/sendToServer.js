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
}])