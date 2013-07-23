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

        /** @type {app.hello.Hoge} */
        var hoge = new app.hello.Hoge();

        hoge.say();
    }
);