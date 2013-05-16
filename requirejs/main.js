var BASE_URL = "http://HOSTNAME/requirejs/js";

( function() {
    "use strict";
    
    var loader = new Script( BASE_URL + "/require.min.js" );
    
    loader.onload = function() {
    
        //Configure BasePath
        require( {
            baseUrl: BASE_URL
        } );
        
        //load
        require( ["demo"] , function(mDemo) {
            //See Debug log
            mDemo.main(); 
        });
    };
    
} )();