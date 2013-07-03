
// --tutorial image--
var stage = new Stage( 640, 640 );
addLayer( new Layer( stage ) );

var image = new Image();
image.src = "assets/images.png";

image.onload = function() {

    var bd = new BitmapData( image );
    var bitmap = new Bitmap( bd );

    stage.addChild( bitmap );

    // animation
    stage.addEventListener( "enterFrame", function(){
        bitmap.x += 20;
        bitmap.y += 5;
        if( bitmap.x > 640 ) bitmap.x = -bitmap.width;
        if( bitmap.y > 640 ) bitmap.y = -bitmap.height;
    } );
    // animation
};



