
define(
    [
        'backbone',
        'app/SampleModel'
    ],
    function() {

        var Backbone    = require('backbone');
        var SampleModel = require('app/SampleModel');

        //========================================
        // Basic Usage
        //========================================
        var model = new SampleModel();

        //初期値
        console.log("default name: " + model.get("name"));
        console.log("default id: " + model.get("id"));

        //changeイベントを監視して更新を検知します
        model.on("change", function (model) {

            //更新された値
            console.log("name: " + model.get("name"));
            console.log("id: " + model.get("id"));
        });

        //サーバーから値を取得します
        model.fetch();


        //========================================
        // Backbone Collection
        //========================================

        //Backbone Collectionを拡張したListを定義します
        //こちらもJSONで値を取得する想定です
        var List = Backbone.Collection.extend({
            // 要素の型指定
            model : SampleModel,
            // 取得先のURL
            url : 'https://raw.github.com/herlock/samples/master/backbone/sample2.json',
            parse : function(response) {
                //リストを返却する部分を返す
                return response;
            }
        });

        var collection = new List();

        //addイベントを監視してcollectionへデータが追加されるのを検知します
        collection.on("add", function (model) {
            console.log(JSON.stringify(model));
        });

        //サーバーから値を取得します
        collection.fetch();

    });
    