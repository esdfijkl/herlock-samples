//test2に依存
define( "test1", ["test2"], function(mTest2) {
    
    var Test2 = function(){
        this.initialize.apply(this, arguments);
    };
    
    Test2.prototype = {
        initialize: function(prefix) {
            this.prefix = prefix;
        },
        say: function(){
            console.log( "Hello!:" + this.prefix + mTest2.name);
        }
    };
    
    return Test2;
} );