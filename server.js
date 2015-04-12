//
'use strict';

// Module dependencies.
var application_root = __dirname,
	express = require( 'express' ), //Web framework
	path = require( 'path' ), //Utilities for dealing with file paths
	mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();

//Connect to database
mongoose.connect( 'mongodb://localhost/library_database' );

//Schemas
var Keywords = new mongoose.Schema({
	keyword: String
});

var Log = new mongoose.Schema({
	station: String,
	liters: String,
	date: String
});

//Models
var LogModel = mongoose.model( 'Log', Log );

// Configure server
app.configure( function() {
	//parses request body and populates request.body
	app.use( express.bodyParser() );

	//checks request.body for HTTP method overrides
	app.use( express.methodOverride() );

	//perform route lookup based on url and HTTP method
	app.use( app.router );

	//Where to serve static content
	app.use( express.static( path.join( application_root, 'site') ) );

	//Show all errors in development
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes
app.get( '/api', function( request, response ) {
	response.send( 'Library API is running' );
});

//Get a list of all books
app.get( '/api/logs', function( request, response ) {
	return LogModel.find( function( err, logs ) {
		if( !err ) {
			return response.send( logs );
		} else {
			return console.log( err );
		}
	});
});

//Get a single book by id
app.get( '/api/logs/:id', function( request, response ) {
	return LogModel.findById( request.params.id, function( err, log ) {
		if( !err ) {
			return response.send( log );
		} else {
			return console.log( err );
		}
	});
});

//Insert a new book
app.post( '/api/logs', function( request, response ) {
	var log = new LogModel({
		station: request.body.station,
		liters: request.body.liters,
		date: request.body.date
	});
	log.save( function( err ) {
		if( !err ) {
			return console.log( 'created' );
		} else {
			return console.log( err );
		}
		return response.send( log );
	});
});

//Update a book
app.put( '/api/logs/:id', function( request, response ) {
	console.log( 'Updating log ' + request.body.title );
	return LogModel.findById( request.params.id, function( err, log ) {
		station: request.body.station,
		liters: request.body.liters,
		date: request.body.date;

		return log.save( function( err ) {
			if( !err ) {
				console.log( 'log updated' );
			} else {
				console.log( err );
			}
			return response.send( log );
		});
	});
});

//Delete a book
app.delete( '/api/logs/:id', function( request, response ) {
	console.log( 'Deleting log with id: ' + request.params.id );
	return LogModel.findById( request.params.id, function( err, log ) {
		return log.remove( function( err ) {
			if( !err ) {
				console.log( 'Log removed' );
				return response.send( '' );
			} else {
				console.log( err );
			}
		});
	});
});

//Start server
var port = 4711;
app.listen( port, function() {
	console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});
