( function() {
    "use strict";
    
    var loader = new Script( "lib/requirejs/require.min.js" );
    
    loader.onload = function() {
    
        //Configure BasePath
        require( {
            baseUrl: "./app"
        } );
        
        //load
        require( ["demo"] , function(mDemo) {
            //See Debug log
            mDemo.main();
        });
    };
    
} )();