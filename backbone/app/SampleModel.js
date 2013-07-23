
define(
    [
        'backbone'
    ],
    function() {

        var Backbone = require('backbone');

        //　BackboneModelを拡張してSampleModelを定義します
        //　今回はJSONで通信をして値を更新する想定にします

        var SampleModel = Backbone.Model.extend({
            urlRoot: 'http://ide.alpha.herlock.do/workspace/seikai/BackboneSample/',
            url: function() {
                return this.urlRoot + 'sample.json';
            },
            defaults: function() {
                return {
                    id : 1,
                    level : 1,
                    name : 'test'
                };
            },
            initialize : function () {

            }
        });

        SampleModel.prototype.className = 'SampleModel';

        return SampleModel;
    }
);
