

//Imageオブジェクトを生成します
var image = new Image();

//Imageオブジェクトに画像のソースURLを設定します
image.src = "assets/images/image.png";

//読み込み完了時にimageを引数にBitmapを作成し表示します
var stage = new Stage( 640, 640 );
addLayer( new Layer( stage ) );

image.onload = function() {
    var bd = new BitmapData( image );
    var bitmap = new Bitmap( bd );
    stage.addChild( bitmap );
}


