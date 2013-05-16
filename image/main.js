

var image = new Image();
image.src = "http://dummyimage.com/300/09f/fff.png";
image.onload = function() {
    addLayer( new Layer( image ) );
}


/*
var stage = new Stage( 640, 640 );
addLayer( new Layer( stage ) );

var image = new Image( "http://dummyimage.com/300/09f/fff.png" );
image.onload = function() {
    var bd = new BitmapData( image );
    var bitmap = new Bitmap( bd );
    stage.addChild( bitmap );
}
*/

