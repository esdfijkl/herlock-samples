( function( ) {
    "use strict";

    var loader = new Script( "lib/requirejs/require.min.js" );

    loader.onload = function() {

        require.config( {
            baseUrl: ".",
            paths: {
                'tweenjs' : 'lib/TweenJS/tweenjs'
            }
        });

        require(["app/main"]);
    };

} )();