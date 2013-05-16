var stage = new Stage( 640, 640 );
addLayer( new Layer( stage ) );

var textField = new TextField();
textField.defaultTextFormat = new TextFormat( null, 20, 0xff0000 );
textField.text = "テキスト";
stage.addChild( textField );

