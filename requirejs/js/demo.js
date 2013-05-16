//test1に依存
define( "demo", ["test1"], function(Test1) {
    var Demo = {
        main: function() {
            this.test();
        },
        test: function(){
            var test = new Test1("HogeHoge,");
            test.say();
        }
    };
    
    return Demo;
} );
