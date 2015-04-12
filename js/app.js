var app = app || {};

$(function() {
	$( '#date' ).datepicker();
	new app.LogLibView();
});

$(function() {
    var logs = [
        { station: 'N1', liters: '36.5', date: '11.04.2015' }
    ];

    new app.LogLibView( logs );
});