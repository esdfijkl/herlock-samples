
(function(){

    //==============================================
    //　定義
    //==============================================
    /**
     * コマアニメ用のスプライトシート上の描画領域を
     * Rectangleの配列として定義します。
     *
     * @type {Array.<Rectangle>}
     */
    var FRAMES = [
        new Rectangle(0, 0, 200, 143),
        new Rectangle(200, 0, 200, 143),
        new Rectangle(400, 0, 200, 143),
        new Rectangle(600, 0, 200, 143),
        new Rectangle(800, 0, 200, 143),
        new Rectangle(0, 143, 200, 143),
        new Rectangle(200, 143, 200, 143),
        new Rectangle(400, 143, 200, 143),
        new Rectangle(600, 143, 200, 143),
        new Rectangle(800, 143, 200, 143),
        new Rectangle(0, 286, 200, 143),
        new Rectangle(200, 286, 200, 143),
        new Rectangle(400, 286, 200, 143),
        new Rectangle(600, 286, 200, 143),
        new Rectangle(800, 286, 200, 143),
        new Rectangle(0, 429, 200, 143),
        new Rectangle(200, 429, 200, 143),
        new Rectangle(400, 429, 200, 143),
        new Rectangle(600, 429, 200, 143),
        new Rectangle(800, 429, 200, 143),
        new Rectangle(0, 572, 200, 143),
        new Rectangle(200, 572, 200, 143),
        new Rectangle(400, 572, 200, 143),
        new Rectangle(600, 572, 200, 143),
        new Rectangle(800, 572, 200, 143)
    ];

    /**
     * Mixinの実装
     *
     * @param target メソッド実装先オブジェクト
     * @param imports メソッド定義
     */
    var mixin = function( target, imports ) {
        for ( var method in imports ) {
            target[method] = imports[method];
        }
    };

    /**
     * アニメーション生成用のSpriteオブジェクトを生成します
     */
    var SpriteAnimationFactory = {
        /**
         *
         *
         * @param {BitmapData} bmd
         * @param {Array.<Rectangle>} frames
         * @returns {Sprite}
         */
        create: function( bmd, frames ) {

            //表示コンテナ
            var sprite = new Sprite();

            //methodsの定義内容をmixin
            mixin(sprite, this.methods);

            //表示用Bitmap
            sprite.bitmap = sprite.addChild( new Bitmap(bmd, false, false, frames[0]) );

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
            play: function() {
                var self = this;
                this.update = function() {
                    self.renderFrame(self.frameIndex++);
                    if(self.frameIndex >= self.frames.length) {
                        self.frameIndex = 0;
                    }
                };
                this.addEventListener("enterFrame", this.update);
            },
            /**
             * アニメーションの停止
             */
            stop: function() {
                this.removeEventListener("enterFrame", this.update);
            },
            /**
             * フレームを表示
             */
            renderFrame: function(frameIndex) {
                var frame = this.frames[frameIndex];
                this.bitmap.setClippingRect(frame);
            },
            /**
             * フレームのリセット
             */
            reset: function() {
                this.renderFrame(0);
                this.frameIndex = 0;
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

    image.onload = function() {

        //アニメーション表示コンテナを生成してstageに追加
        var cat = SpriteAnimationFactory.create( new BitmapData( image ), FRAMES);
        stage.addChild( cat );

        //再生
        cat.play();
    };

})();

