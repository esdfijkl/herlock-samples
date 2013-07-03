

//Imageオブジェクトを生成します
var image = new Image();

//Imageオブジェクトに画像のソースURLを設定します
image.src = "assets/images.png";

//読み込み完了時にimageを引数にレイヤーを作成し、windowにアタッチします
image.onload = function() {
    addLayer( new Layer( image ) );
}

/*
var stage = new Stage( 640, 640 );
addLayer( new Layer( stage ) );

var image = new Image( "assets/images.png" );
image.onload = function() {
    var bd = new BitmapData( image );
    var bitmap = new Bitmap( bd );
    stage.addChild( bitmap );
}
*/

