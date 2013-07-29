/**
 * hello.Worldオブジェクトを定義します
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
        hello.World = function() {
            this._initialize.apply(this, arguments);
        };

        (/** @this hello.World.prototype */function(){

            /**
             * @protected
             */
            this._initialize = function() {

                console.log("class:hello.World");

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
             * hello.World.say
             */
            this.say = function() {

                console.log("Hello," + this.getName());
            };

        }).call(hello.World.prototype);

    }
);