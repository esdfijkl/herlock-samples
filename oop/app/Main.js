/**
 * app.hello.Hogeを使用するモジュールです
 */
define(
    [
        "app/hello/Hoge"
    ],
    function() {
        'use strict';

        //インスタンスを生成して
        //sayメソッドを呼び出します

        /** @type {hello.Hoge} */
        var hoge = new hello.Hoge();

        hoge.say();
    }
);