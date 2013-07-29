/**
 * package.jsはnamespace解決の為のみに使用しています
 * 親ディレクトリのpackage.jsを必ず呼び出すことで
 * 親のnamespaceの存在を保証しています
 * ※今回はhelloがパッケージのルートです
 *
 * ※namespaceに属するオブジェクトの定義は必ずこのファイルを呼び出すルールです
 */
define(
    [],
    function(){

        //自身のnamespaceが無ければ生成します
        if(typeof window.hello === "undefined") {
            /** @namespace */
            window.hello = {};
        }
    }
);