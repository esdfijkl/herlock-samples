(function(){

/*
var image = new Image();
image.src = "http://dummyimage.com/300/09f/fff.png";
image.onload = function() {
    var layer = new Layer( image );
    layer.scaleMode = "showAll"// Layer.SCALE_SHOW_ALL ;
    //layer.scaleMode = "noBorder";// Layer.SCALE_NO_BORDER ;
    //layer.scaleMode = "noScale";// Layer.SCALE_NO_SCALE ;
    //layer.scaleMode = "exactFit";// Layer.SCALE_EXACT_FIT ;
    window.addLayer( layer );
}
return;
*/

// header 上に吸着
var headerLayer = new Layer( new Stage( 640, 80 ) );
headerLayer.verticalAlign = "top";
headerLayer.scaleMode = "showAll";

// content 多少端が切れてもいいデザインで、必ず表示したいものは中央に寄せる
var contentLayer = new Layer(  new Stage( 300, 300 )  );
contentLayer.verticalAlign = "middle";
contentLayer.scaleMode = Layer.SCALE_NO_BORDER;

// header 下に吸着
var footerLayer = new Layer( new Stage( 640, 80 ) );
footerLayer.verticalAlign = "bottom";
footerLayer.scaleMode = "showAll";

//
window.addLayer( contentLayer );
window.addLayer( footerLayer );
window.addLayer( headerLayer );


//


//
var header = new TextField();
header.width = 640;
header.height = 80;
header.background = true;
header.backgroundColor = 0x0;
header.defaultTextFormat = new TextFormat( null, 30, 0xffffff );
header.text = "header";
header.alpha = 0.7;
headerLayer.content.addChild( header );


// 
var image = new Image();
image.src = "http://dummyimage.com/300/09f/fff.png";
image.onload = function() {
	contentLayer.verticalAlign = "middle";
	contentLayer.scaleMode = "noBorder";
    contentLayer.content.addChild( new Bitmap( new BitmapData( image ) ) );
}


//
var footer = new TextField();
footer.width = 640;
footer.height = 80;
footer.background = true;
footer.backgroundColor = 0x0;
footer.defaultTextFormat = new TextFormat( null, 30, 0xffffff );
footer.text = "footer";
footer.alpha = 0.7;
footerLayer.content.addChild( footer );




})();



