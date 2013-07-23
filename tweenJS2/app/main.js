define( ['tweenjs'], function () {

    //表示ツリーのルートを作成します
    var stage = addLayer( new Stage( 640, 640 * window.innerHeight / window.innerWidth ) ).content;

    //背景を敷き詰めます
    var bg = stage.addChild( new Bitmap( new BitmapData( 1, 1, true, 0xffffffff ) ) );
    bg.width = stage.stageWidth;
    bg.height = stage.stageHeight;

    //enterFrameでTween.tickを処理してTweenを進めます
    stage.addEventListener( "enterFrame", function ( ) {
        createjs.Tween.tick( 1 );
    } );

    //タッチ座標に応じてTween対象を生成します
    stage.addEventListener( "touchBegin", function ( e ) {
        createObject( e.localX, e.localY );
    } );

    //タッチ座標に応じてTween対象を生成します
    stage.addEventListener( "touchMove", function ( e ) {
        createObject( e.localX, e.localY );
    } );

    // Tween座標を管理する配列を作ります
    var SIZE = 20;
    var map = [];
    map.size = SIZE;
    map.get = function ( x, y ) {
        return this[y * this.size + x];
    };
    map.set = function ( x, y, value ) {
        this[y * this.size + x] = value;
    };


    function createObject( x, y ) {

        //処理する座標を算出
        var coord = {
            x: Math.round( map.size * x / 640 ),
            y: Math.round( map.size * y / 640 )
        };

        //処理中の座標は終わる迄処理をしない
        if ( map.get( coord.x, coord.y ) )
            return;

        //処理する座標を保持
        map.set( coord.x, coord.y, true );

        //Tween対象となるSpriteの生成
        var obj = stage.addChild( new Sprite() );
        obj.coord = coord;
        x = coord.x * 640 / map.size;
        y = coord.y * 640 / map.size;
        obj.x = x;
        obj.y = y;
        obj.mouseEnabled = false;

        //表示用のBitmapを生成
        var bmp = obj.addChild( new Bitmap( new BitmapData( 2, 2, true, 0xff000000 + randColor() ) ) );
        bmp.width = bmp.height = 640 / map.size;
        bmp.x = -bmp.width / 2;
        bmp.y = -bmp.height / 2;

        //速度係数
        var a = 0.5;

        //Tweenアニメーションを作成します
        createjs.Tween.get( obj, {
            useTicks: true
        } )
        //拡大
        .to( {
            x: x + 0,
            y: y + 0,
            scaleX: 1.1,
            scaleY: 1.1
        }, 60 * a, createjs.Ease.bounceIn )
        //縮小＋回転
        .to( {
            x: x + 0,
            y: y + 0,
            scaleX: 1,
            scaleY: 1,
            rotation: 360 * 1.75
        }, 60 * a, createjs.Ease.quadOut )
        //拡大＋回転
        .to( {
            alpha: 0,
            scaleX: 6,
            scaleY: 6,
            rotation: 180 * Math.random()
        }, 30 * a, createjs.Ease.bounceIn )
        //コールバックで処理中座標の解除
        .call( function ( ) {
            map.set( this.coord.x, this.coord.y, false );
        } )
        //待機
        .wait( 30 * a )
        //元の大きさ角度に戻す
        .to( {
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            rotation: 0
        }, 60 * a, createjs.Ease.bounceOut )
        //待機
        .wait( 30 * a )
        //移動＋回転
        .to( {
            y: y + 1200,
            rotation: 60
        }, 30 * a, createjs.Ease.quadIn )
        //表示の削除
        .call( function ( ) {
            this.parent.removeChild( this );
        } );
    }

    //ランダムに配色を取得します
    function randColor() {
        return 255 << 16 | parseInt( Math.random() * 255 ) << 8 | parseInt( Math.random() * 255 ) << 0;
    }

} );