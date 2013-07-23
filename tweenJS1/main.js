
( function( ) {
    "use strict";

    var loader = new Script( "tween.js" );
    var image = new Image();
    var stage = new Stage( 320, 480 );
    addLayer( new Layer( stage ) );

    loader.onload = function() {

        //enterFrameイベントでcreatejs.Tween.tickを処理して
        //Tweenアニメーションを実行します
        stage.addEventListener("enterFrame", function () {
            createjs.Tween.tick(1000/60);
        }, false);

        //画像を読み込みます
        image.src = "http://dummyimage.com/100/09f/fff.png";
        image.onload = function () {

            //Bitmapを生成してstageに表示します
            var bitmap = new Bitmap( new BitmapData( image ) );
            stage.addChild( bitmap );

            //500ms毎にTweenアニメーションでbitmapを動かします
            createjs.Tween.get(bitmap, {loop:true})
                .to({x:200,y:0},500, createjs.Ease.cubicIn)
                .to({x:200,y:200},500, createjs.Ease.quadIn)
                .to({x:0,y:200},500, createjs.Ease.cubicIn)
                .to({x:0,y:0},500);
        };

    };

} )();