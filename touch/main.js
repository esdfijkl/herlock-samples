
var stage = new Stage( 640, 640 );
addLayer( new Layer( stage ) );


var textField = stage.addChild( new TextField() );
textField.autoSize = TextFieldAutoSize.LEFT;
textField.defaultTextFormat = new TextFormat( null, 30 );
textField.mouseEnabled = false;
textField.text = "[ 0, 0 ]";

stage.addEventListener( "touchMove", function( event ){
	textField.text = "[ " + Math.round( event.localX ) + ", " + Math.round( event.localY ) + " ]";
	textField.x = event.localX - textField.width/2;
	textField.y = event.localY - textField.height/2;
} );


