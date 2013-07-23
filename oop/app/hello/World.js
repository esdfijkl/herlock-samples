/**
 * app.hello.Worldオブジェクトを定義します
 */
define(
    [
        "app/hello/package"
    ],
    function () {

        /**
         * @exports
         * @constructor
         */
        app.hello.World = function() {
            this._initialize.apply(this, arguments);
        };

        (/** @this app.hello.World.prototype */function(){

            /**
             * @protected
             */
            this._initialize = function() {

                console.log("class:app.hello.World");

                /** @type {String} */
                this.name = "World!";
            };

            /**
             * @returns {String}
             */
            this.getName = function() {
                return this.name;
            };

            /**
             * app.hello.World.say
             */
            this.say = function() {

                console.log("Hello," + this.getName());
            };

        }).call(app.hello.World.prototype);

    }
);