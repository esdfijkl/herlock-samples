//URLは環境に合わせて変更
var src = "/assets/sounds/button.mp3";
var audio  = new Audio( src, Audio.SE );
audio.onload = function() {
    audio.loop = true;
    audio.play();
}

