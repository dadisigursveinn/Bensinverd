var app = app || {};

app.LogLibView = Backbone.View.extend({
    el: $('#logLib'),

    initialize: function() {
        this.collection = new app.LogLib();
        this.collection.fetch();
        this.render();

        this.listenTo( this.collection, 'add', this.renderLog );
        this.listenTo( this.collection, 'reset', this.render );
    },

    events: {
        'click #add': 'addLog'
    },


    addLog: function( e ) {
        e.preventDefault();

        var formData = {};

        $( '#addLog div' ).children( 'input' ).each( function( i, el ) {
            if( $( el ).val() != "" )
            {
                if( el.id === 'date' ) {
                    formData[ el.id ] = $( '#date' ).datepicker( 'getDate' ).getTime();
                } else {
                    formData[ el.id ] = $( el ).val();
                }
            }
        });

        this.collection.create( formData );
    },

    // render library by rendering each book in its collection
    render: function() {
        this.collection.each(function( item ) {
            this.renderLog( item );
        }, this );
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderLog: function( item ) {
        var logView = new app.LogView({
            model: item
        });
        this.$el.append( logView.render().el );
    }
});