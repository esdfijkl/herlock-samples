/**
 * hello.Worldオブジェクトを継承した
 * hello.Hogeオブジェクトを定義します
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
         * @extends {hello.World}
         */
        hello.Hoge = function() {
            this._initialize.apply(this, arguments);
        };

        /**
         * hello.Worldオブジェクトを継承します
         * 今回はオーソドックスな方法を用いていますが
         * extends関数を容易し、_initializeの中で親のコンストラクタを呼ぶ方法もあります
         */
        hello.Hoge.prototype = new hello.World();


        (/** @this hello.Hoge.prototype */function(){

            //hello.Hogeオブジェクトのメソッドを定義します

            this._initialize = function() {

                console.log("class:hello.Hoge");
            };

            /**
             * getNameメソッドをオーバーライドします
             *
             * @returns {string}
             */
            this.getName = function() {
                return "hello.Hoge";
            };

        }).call(hello.Hoge.prototype);

    }
);

