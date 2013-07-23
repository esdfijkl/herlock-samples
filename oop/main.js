
( function( ) {
    "use strict";

    var loader = new Script( "require.min.js" );

    loader.onload = function() {

        require.config( {
            baseUrl: "."
        } );

        require(["app/main"]);
    };

} )();