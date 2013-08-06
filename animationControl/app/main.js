define( ['tweenjs'], function () {

    //回転して移動すると驚くアニメーションを作ります

    //==============================================
    //　定義
    //==============================================

    /**
     * Frameの概念を定義します
     * Frameは描画矩形の情報と該当フレームで動作するFunctionを保持します
     *
     * @param rect
     * @constructor
     */
    var Frame = function ( rect ) {
        this.setScript( null );
        this.setRect( rect );
    };

    /**
     * @param {Function} script
     */
    Frame.prototype.setScript = function ( script ) {

        if ( typeof script !== 'undefined' && script instanceof Function ) {
            this.script = script;
        } else {
            this.script = null;
        }
    };

    /**
     * @param {Rectangle} rect
     */
    Frame.prototype.setRect = function ( rect ) {

        if ( typeof rect !== 'undefined' && rect instanceof Rectangle ) {
            this.rect = rect;
        } else {
            this.rect = null;
        }
    };

    /**
     * Frame情報の配列を定義します
     *
     * @type {Array.<Frame>}
     */
    var frames = [
        new Frame( new Rectangle( 0, 0, 200, 143 ) ),
        new Frame( new Rectangle( 200, 0, 200, 143 ) ),
        new Frame( new Rectangle( 400, 0, 200, 143 ) ),
        new Frame( new Rectangle( 600, 0, 200, 143 ) ),
        new Frame( new Rectangle( 800, 0, 200, 143 ) ),
        new Frame( new Rectangle( 0, 143, 200, 143 ) ),
        new Frame( new Rectangle( 200, 143, 200, 143 ) ),
        new Frame( new Rectangle( 400, 143, 200, 143 ) ),
        new Frame( new Rectangle( 600, 143, 200, 143 ) ),
        new Frame( new Rectangle( 800, 143, 200, 143 ) ),
        new Frame( new Rectangle( 0, 286, 200, 143 ) ),
        new Frame( new Rectangle( 200, 286, 200, 143 ) ),
        new Frame( new Rectangle( 400, 286, 200, 143 ) ),
        new Frame( new Rectangle( 600, 286, 200, 143 ) ),
        new Frame( new Rectangle( 800, 286, 200, 143 ) ),
        new Frame( new Rectangle( 0, 429, 200, 143 ) ),
        new Frame( new Rectangle( 200, 429, 200, 143 ) ),
        new Frame( new Rectangle( 400, 429, 200, 143 ) ),
        new Frame( new Rectangle( 600, 429, 200, 143 ) ),
        new Frame( new Rectangle( 800, 429, 200, 143 ) ),
        new Frame( new Rectangle( 0, 572, 200, 143 ) ),
        new Frame( new Rectangle( 200, 572, 200, 143 ) ),
        new Frame( new Rectangle( 400, 572, 200, 143 ) ),
        new Frame( new Rectangle( 600, 572, 200, 143 ) ),
        new Frame( new Rectangle( 800, 572, 200, 143 ) )
    ];


    /**
     * Mixinの実装
     *
     * @param target メソッド実装先オブジェクト
     * @param imports メソッド定義
     */
    var mixin = function ( target, imports ) {
        for ( var method in imports ) {
            target[method] = imports[method];
        }
    };

    /**
     * アニメーション生成用のSpriteオブジェクトを生成します
     */
    var MovieClipFactory = {
        /**
         * @param {BitmapData} bmd
         * @param {Array.<Rectangle>} frames
         * @returns {Sprite}
         */
        create: function ( bmd, frames ) {

            //表示コンテナ
            var sprite = new Sprite();

            //methodsの定義内容をmixin
            mixin( sprite, this.methods );

            //表示用Bitmap
            sprite.bitmap = sprite.addChild( new Bitmap( bmd, false, false, frames[0].rect ) );

            //Frame
            sprite.frames = frames;

            //現在のFrameIndex
            sprite.frameIndex = 0;

            return sprite;
        },
        /**
         * アニメーションの表示コンテナに実装するメソッド
         */
        methods: {
            /**
             * アニメーションの再生
             */
            play: function () {
                var self = this;
                this.update = function () {
                    self.renderFrame( self.frameIndex++ );
                    if ( self.frameIndex >= self.frames.length && self.isPlay ) {
                        this.stop();
                    }
                };

                this.isPlay = true;
                this.addEventListener( "enterFrame", this.update );
            },
            goto: function ( frame ) {

                this.frameIndex = frame;
            },
            gotoAndPlay: function ( frame ) {

                this.goto( frame );

                if ( !this.isPlay ) {
                    this.play();
                }
            },
            /**
             * アニメーションの停止
             */
            stop: function () {

                this.removeEventListener( "enterFrame", this.update );
                this.isPlay = false;
            },
            /**
             * フレームの表示とスクリプトの実行
             */
            renderFrame: function ( frameIndex ) {

                var frame = this.frames[frameIndex];

                //Rectangleがあれば描画します
                if (  !! frame.rect ) {
                    this.bitmap.setClippingRect( frame.rect );
                }

                //functionがあれば実行します
                if (  !! frame.script ) {
                    frame.script.call( this, frameIndex );
                }
            }
        }
    };

    //==============================================
    //　実行処理
    //==============================================
    var stage = new Stage( 320, 480 );
    addLayer( new Layer( stage ) );
    //背景を敷き詰めます
    var bg = stage.addChild( new Bitmap( new BitmapData( 1, 1, true, 0xff00ffff ) ) );
    bg.width = stage.stageWidth;
    bg.height = stage.stageHeight;

    //画像を読み込みます
    var image = new Image( "assets/images/sheet.png" );

    image.onload = function () {

        //enterFrameイベントでcreatejs.Tween.tickを処理して
        //Tweenアニメーションを実行します
        stage.addEventListener( "enterFrame", function ( ) {
            createjs.Tween.tick( 1000 / 60 );
        }, false );

        //初期フレームでTweenを設定します
        frames[0].setScript( function ( currentFrame ) {

            var self = this;

            //Tween
            createjs.Tween.get( self, {
                loop: false
            } )
                .to( {
                    x: 220,
                    y: 100,
                    rotation: 360
                }, 700, createjs.Ease.bounceOut )
                .call( function () {
                    //Tweenが重複実行されないように０ではなく１フレーム目へ
                    self.gotoAndPlay( 1 );
                } )
                .to( {
                    x: 220,
                    y: 400,
                    rotation: 720
                }, 700, createjs.Ease.bounceOut )
                .call( function () {
                    //Tweenが重複実行されないように０ではなく１フレーム目へ
                    self.gotoAndPlay( 1 );
                } )
                .to( {
                    x: 100,
                    y: 400,
                    rotation: 1080
                }, 700, createjs.Ease.bounceOut )
                .call( function () {
                    //Tweenが重複実行されないように０ではなく１フレーム目へ
                    self.gotoAndPlay( 1 );
                } )
                .to( {
                    x: 100,
                    y: 100,
                    rotation: 1440
                }, 700, createjs.Ease.bounceOut )
                .call( function () {
                    self.rotation = 0;
                    //初期フレームに戻す
                    self.gotoAndPlay( 0 );
                } );
        } );

        //アニメーション表示コンテナを生成してstageに追加
        var cat = MovieClipFactory.create( new BitmapData( image ), frames );

        //回転の中心を画像の中心にしたいので位置を調整します
        cat.bitmap.x = -cat.bitmap.width / 2;
        cat.bitmap.y = -cat.bitmap.height / 2;

        stage.addChild( cat );

        //再生
        cat.play();
    };


} );