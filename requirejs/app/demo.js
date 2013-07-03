//test1に依存
define(["test1"], function(Test1) {
    var Demo = {
        main: function() {
            this.test();
        },
        test: function(){
            var test = new Test1("HogeHoge,");
            test.say();
            alert("finish!,See Debug log", function(){
                if (window.hasOwnProperty( "developer" ) ) window.developer.show();
            });
        }
    };
    
    return Demo;
} );
