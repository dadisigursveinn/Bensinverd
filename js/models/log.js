var app = app || {};

app.Log = Backbone.Model.extend({
    defaults: {
        station: 'Óþekkt',
        liters: 'Óþekkt',
        date: 'Óþekkt'
    },

    idAttribute: '_id'
});