
var src = "assets/sounds/bell.mp3";
var audio  = new Audio( src, Audio.SE );
audio.onload = function() {
    audio.loop = true;
    audio.play();
}

