var stage = new Stage( 320, 640 );
addLayer( new Layer( stage ) );

var textField = new TextField();
textField.defaultTextFormat = new TextFormat( null, 25, 0xff0000 );
textField.text = "テキスト";
stage.addChild( textField );
