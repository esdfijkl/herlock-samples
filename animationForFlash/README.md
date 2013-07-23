# FrameAnimationSample for Flash

Flashのタイムラインアニメーションから 
スプライトシートを書き出して、アニメーションを生成します

## スプライトシートの書き出し
1. Flash上で任意のムービークリップを右クリックして「スプライトシートを生成」メニューを選択します
2. データ形式に「JSON-Array」、画像形式は「PNG32bit」を選択して書き出します

これで下準備は完了です。

## アニメーションに関して
SpriteSheetによるコマアニメはBitmap.setClippingRectによって生成します。

setClippingRectの引数にはRectangleオブジェクトを渡すので、このRectangleを上記で書き出したjsonから生成します。

Flashから書き出された1フレーム分のJSONデータは下記のようになります。

    {
	"filename": "g0000",
	"frame": {"x":0,"y":0,"w":200,"h":143},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":200,"h":143},
	"sourceSize": {"w":200,"h":143}
    }

ということで下記の用なイメージで1フレーム分の描画矩形情報を生成出来ます。

    new Rectangle(frame.x, frame.y, frame.w, frame.h)

尚、フレーム情報はJSONのframesに配列として格納されているので下記のようなコードで
全フレーム分の情報を抽出出来ます。flashExportがjsonデータです。

    var frames = [];

    for(var i = 0; i < flashExport.frames.length; i++) {
        var frame = flashExport.frames[i].frame;
        frames.push(new Rectangle(frame.x, frame.y, frame.w, frame.h));
    }

※尚コード量を減らしたい場合は、事前にJSONを整形してframe情報以外を削除してもOKです。

## Animation

アニメーションの実行はenterframeでsetClippingRectを呼び、上記で生成したRectangleを渡せばOKです。






