/**
 * app.hello.Worldオブジェクトを継承した
 * app.hello.Hogeオブジェクトを定義します
 */
define(
    [
        "app/hello/package",
        "app/hello/World"
    ],
    function() {
        'use strict';

        /**
         * @exports
         * @constructor
         * @extends {app.hello.World}
         */
        app.hello.Hoge = function() {
            this._initialize.apply(this, arguments);
        };

        /**
         * app.hello.Worldオブジェクトを継承します
         * 今回はオーソドックスな方法を用いていますが
         * extends関数を容易し、_initializeの中で親のコンストラクタを呼ぶ方法もあります
         */
        app.hello.Hoge.prototype = new app.hello.World();


        (/** @this app.hello.Hoge.prototype */function(){

            //app.hello.Hogeオブジェクトのメソッドを定義します

            this._initialize = function() {

                console.log("class:app.hello.Hoge");
            };

            /**
             * getNameメソッドをオーバーライドします
             *
             * @returns {string}
             */
            this.getName = function() {
                return "app.hello.Hoge";
            };

        }).call(app.hello.Hoge.prototype);

    }
);

