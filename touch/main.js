
//表示用のステージを作成します
var stage = new Stage( 300, 300 );

//ステージをベースにレイヤーを作成し、windowにアタッチします
addLayer( new Layer( stage ) );

//Imageオブジェクトを生成します
var image = new Image();

//Imageオブジェクトに画像のソースURLを設定します
//このあたりはhtmlのimageと同じような概念となります
image.src = "assets/images/image.png";

//画像リソースは読み込みが完了しないと扱えないので
//onloadで画像の読み込み完了を待ちます
image.addEventListener("load", onLoadImage);

function onLoadImage(){

	//イベントを解放します
	image.removeEventListener("load", onLoadImage);

	//読み込み完了時に画像リソースからBitmapDataを作成し、Bitmapをstageに追加します
    var bd = new BitmapData( image );
    var bitmap = new Bitmap( bd );

    //bitmapはタッチイベントを取得出来ないのでspriteを生成し、その中にbitmapを入れます
    var sprite = new Sprite();
    sprite.addChild( bitmap );

    //spriteをstageに追加します
    stage.addChild( sprite );

    //spriteにタッチイベントを設定します
    sprite.addEventListener("touchBegin", onTouch);
}

function onTouch(){
    alert("Hello!", alertCallback);
}

function alertCallback() {
    console.log("alerted");
}
