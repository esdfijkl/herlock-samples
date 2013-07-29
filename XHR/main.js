//ログ出力用にテキストフィールドを表示します
//stageを用意します
var stage = new Stage( 320, 320 );
addLayer( new Layer( stage ) );

//背景を敷き詰めます
var bg = stage.addChild( new Bitmap( new BitmapData( 1, 1, true, 0xffffffff) ) );
bg.width = stage.stageWidth;
bg.height = stage.stageHeight;

//テキストフィールドを表示します
var logField = new TextField();
logField.text = "log:";
logField.multiline = true;
logField.height = 320;
logField.width = 320;

stage.addChild( logField );

( function( ) {
    "use strict";
    
    //※urlは任意のものに変更して下さい。
    //※尚herlockのwebideのworkspace上のファイルは
    // POSTによる通信を許可していないので注意してください
    var URL = "./sample.json";
    
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
            
            //statusは現在実装面調整中の為0しか返さないので
            //ここで判定していません
            
            logField.appendText("get result=============\n");
            logField.appendText(httpGet.responseText);
            logField.appendText("\n");
            
        }
    };

    //通信を開きます
    //第一引数はHTTPメソッド、第二引数がURLです
    httpGet.open("GET", URL);

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
            
            //statusは現在実装面調整中の為0しか返さないので
            //ここで判定していません
            
            logField.appendText("post result============\n");
            logField.appendText(httpPost.responseText);
            logField.appendText("\n");
            
        }
    };

    //通信を開きます
    //第一引数はHTTPメソッド、第二引数がURLです
    httpPost.open("POST", URL);

    //リクエストを送信します
    httpPost.send(postBody);

} )();
