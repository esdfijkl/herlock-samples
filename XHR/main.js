( function( ) {
    "use strict";

    //XMLHttpRequestオブジェクトを生成
    var httpGet = new XMLHttpRequest();

    //onreadystatechangeで通信ステータスの変更を待ちます
    httpGet.onreadystatechange = function (){

        //readyState
        //・0：初期化未完了状態
        //・1：ロード中状態
        //・2：ロード完了状態
        //・3：操作可能状態
        //・4：全データ読込完了状態
        if(httpGet.readyState === 4) {


            console.log(httpGet.responseText);

        }
    };

    //通信を開きます
    //第一引数はHTTPメソッド、第二引数がURLです
    httpGet.open("GET", "sample.json");

    //リクエストを送信します
    httpGet.send(null);

    //XMLHttpRequestオブジェクトを生成
    var httpPost = new XMLHttpRequest();
    var postBody = new FormData();
    postBody.append("hello", "xhr");

    //onreadystatechangeで通信ステータスの変更を待ちます
    httpPost.onreadystatechange = function (){

        //readyState
        //・0：初期化未完了状態
        //・1：ロード中状態
        //・2：ロード完了状態
        //・3：操作可能状態
        //・4：全データ読込完了状態
        if(httpPost.readyState === 4) {


            console.log(httpPost.responseText);

        }
    };

    //通信を開きます
    //第一引数はHTTPメソッド、第二引数がURLです
    httpPost.open("POST", "sample.json");

    //リクエストを送信します
    httpPost.send(postBody);

} )();