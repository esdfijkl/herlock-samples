
new Script('lib/UI/herlock.min.js').onload = function(){
    
    
    hlk.imports(['lib/UI/layoutmap.min.js']).done(function(){

        var mLayoutMap = UI.LayoutMap;
        var stage = new Stage( 320, 480 );
        var materials = [
            {
                name: 'image1',
                src: 'assets/images/image.png'
            }, {
                name: 'image2',
                src: 'assets/images/bg_tabbarItem_selected@2x.png'
            }, {
                name: 'image3',
                src: 'assets/images/bg_tabbarItem.png'
            }, {
                name: 'image4',
                src: 'assets/images/bg_tabbarItem_selected@2x.png'
            }
        ];

        var factory = new mLayoutMap.LayoutResolverFactory();

        //引数はレイアウト名、素材リスト、コールバック
        factory.loadResolver(
            "hlk_1863991900",
            materials,
            function(resolver){

                var bg = stage.addChild( new Bitmap( new BitmapData( 1, 1, true, 0xffffffff ) ) );
                bg.width = stage.stageWidth;
                bg.height = stage.stageHeight;

                //ステージに展開
                resolver.addChildrenTo( stage, true );

                //アイテムを個別に生成する
                //var item = layout.get('test', true);
                //stage.addChild(item);
                //layout.addChildrenTo( stage, true );

                //各アイテムへのアクセスはstage.getChildByName('hoge')

            }
        );

        /*
         //既にレイアウトデータのJSONを読み込んでいるケース
         var data = JSON.parse(jsonText);
         factory.addConfig(data);
         var resolver = factory.createResolver('hlk_1863991900');
         //以下上記CallBack内の処理同様
         */

        addLayer( stage );
        
    });

};

