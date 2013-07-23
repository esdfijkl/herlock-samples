
( function( ) {
    "use strict";

    var loader = new Script( "lib/requirejs/require.min.js" );

    loader.onload = function() {

        require.config( {
            baseUrl: ".",
            paths: {
                'zepto'        : 'lib/zepto',
                'underscore'   : 'lib/lodash',
                'backbone'     : 'lib/backbone'
            },
            shim: {
                'backbone': {
                    deps: ['underscore', 'zepto'],
                    exports: 'Backbone'
                },
                'underscore': {
                    exports: '_'
                },
                'zepto': {
                    exports: '$'
                }
            }

        });

        require(["app/main"]);
    };

} )();