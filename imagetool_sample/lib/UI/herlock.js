/// <reference path="../defintion/herlock.d.ts" />
/**
* @namespace hlk
*/
var hlk;
(function (hlk) {
    hlk.VERSION = '0.1.1';

    var cache = {};

    function isCached(url) {
        return !!cache[url];
    }

    var Imports = (function () {
        function Imports(scripts, useCache) {
            var _this = this;
            this.onLoadHandler = function (event) {
                var target = event.target;
                
                target.removeEventListener('load', _this.onLoadHandler, false);
                
                target.onload = null;

                if (++_this.loaded === _this.limit) {
                    cache[target.src] = true;
                    _this.completeHandler();
                }
                
                _this.completeHandler = null;
            };
            this.done = function (callback) {
                if (_this.isComplete) {
                    callback();
                } else {
                    if (typeof callback === "function")
                        _this.completeHandler = callback;
                }
            };
            var i;

            this.isComplete = false;

            this.completeHandler = function () {
            };

            this.loaded = 0;

            this.limit = scripts.length;

            for (i = 0; i < this.limit; i++) {
                if (!useCache || !isCached(scripts[i])) {
                    var loader = new Script();
                    loader.src = scripts[i];
                    loader.addEventListener('load', this.onLoadHandler, false);
                } else {
                    this.loaded++;
                }
            }

            if (this.loaded === this.limit)
                this.isComplete = true;
        }
        return Imports;
    })();

    /**
    * @method imports
    * @param scripts
    * @param useCache
    * @returns {hlk.Imports}
    */
    function imports(scripts, useCache) {
        if (typeof useCache === "undefined") { useCache = true; }
        return new Imports(scripts, useCache);
    }
    hlk.imports = imports;
})(hlk || (hlk = {}));
/// <reference path="../hlk.ts" />
/**
* @namespace hlk
*/
var hlk;
(function (hlk) {
    /**
    * @class ObserverEvent
    */
    var ObserverEvent = (function () {
        /**
        * @constructor
        * @param type
        * @param data
        * @param target
        */
        function ObserverEvent(type, data, target) {
            if (typeof type === "undefined") { type = 'event'; }
            if (typeof data === "undefined") { data = {}; }
            if (typeof target === "undefined") { target = null; }
            this.type = type;
            this.target = target;
            this.data = data;
        }
        return ObserverEvent;
    })();
    hlk.ObserverEvent = ObserverEvent;

    /**
    * @class Observer
    * @constructor
    */
    var Observer = (function () {
        /**
        * 初期化
        */
        function Observer() {
            this.listeners = {};
        }
        /**
        * @method addObserver
        * @param {string} type
        * @param {Function} listener
        * @param {any} context
        */
        Observer.prototype.addObserver = function (type, listener, context) {
            if (typeof context === "undefined") { context = null; }
            var listeners = this.listeners;

            if (!listeners[type]) {
                listeners[type] = [];
            }

            listeners[type].push({
                listener: listener,
                context: context
            });
        };

        /**
        * @method removeObserver
        * @param {string} type
        * @param {Function} listener
        */
        Observer.prototype.removeObserver = function (type, listener) {
            var listeners = this.listeners;

            if (listeners[type]) {
                var i;
                var len = listeners[type].length;

                for (i = len - 1; i >= 0; i--) {
                    var entry = listeners[type][i];
                    if (entry.listener === listener) {
                        listeners[type].splice(i, 1);
                    }
                }
            }
        };

        /**
        * @method removeObservers
        * @param {string} type
        */
        Observer.prototype.removeObservers = function (type) {
            var listeners = this.listeners;
            if (listeners[type]) {
                delete [type];
            }
        };

        /**
        * @method observeEvent
        * @param {ObserverEvent} event
        * @param {boolean} [async=false]
        */
        Observer.prototype.observeEvent = function (event, async) {
            if (typeof async === "undefined") { async = false; }
            var listeners = this.listeners;

            var type = event.type;

            if (!!listeners[type]) {
                var i;
                var len = listeners[type].length;

                for (i = 0; i < len; i++) {
                    var entry = listeners[type][i];
                    var context = entry.context || event.target;

                    if (!async) {
                        entry.listener.call(context, event);
                    } else {
                        setTimeout(this.createCaller(entry.listener, context, event), 0);
                    }
                }
            }
        };

        /**
        * @method notify
        * @param {string} type
        * @param {any} [data=null]
        * @param {boolean} [async=false]
        */
        Observer.prototype.notify = function (type, data, async) {
            if (typeof data === "undefined") { data = null; }
            if (typeof async === "undefined") { async = false; }
            var event = new ObserverEvent();
            event.type = type;
            event.target = this;
            event.data = data;
            this.observeEvent(event, async);
        };

        /**
        * @private
        * @method createCaller
        * @param {Function} listener
        * @param {any} context
        * @param {ObserverEvent} event
        * @returns {Function}
        */
        Observer.prototype.createCaller = function (listener, context, event) {
            return function () {
                listener.call(context, event);
            };
        };
        return Observer;
    })();
    hlk.Observer = Observer;
})(hlk || (hlk = {}));
var hlk;
(function (hlk) {
    /**
    * @namespace hlk.utils
    */
    (function (utils) {
        /**
        * @class StringUtil
        */
        var StringUtil = (function () {
            function StringUtil() {
            }
            StringUtil.sprintf = /**
            * @method sprintf
            * @static
            * @param {string} text
            * @param {string} replacement*
            * @returns {string}
            */
            function (text) {
                var replacement = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    replacement[_i] = arguments[_i + 1];
                }
                for (var i; i < replacement.length; i++) {
                    text = text.replace('%s', replacement[i]);
                }
                return text;
            };

            StringUtil.getUnique = /**
            * @method getUnique
            * @static
            * @returns {string}
            */
            function () {
                return 'ns_' + String(StringUtil.uniqueStringCounter++);
            };

            StringUtil.startsWith = /**
            * @method startsWith
            * @static
            * @param {string} text
            * @param {string} prefix
            * @returns {boolean}
            */
            function (text, prefix) {
                return text.indexOf(prefix) === 0;
            };

            StringUtil.endsWith = /**
            * @method endsWith
            * @static
            * @param {string} text
            * @param {string} postfix
            * @returns {boolean}
            */
            function (text, postfix) {
                return text.lastIndexOf(postfix, 0) === 0;
            };

            StringUtil.contains = /**
            * @method contains
            * @static
            * @param {string} text
            * @param {string} needle
            * @returns {boolean}
            */
            function (text, needle) {
                return text.indexOf(needle) !== -1;
            };

            StringUtil.htmlEncode = /**
            * @method htmlEncode
            * @static
            * @param {string} text
            * @returns {string}
            */
            function (text) {
                return text.replace(/&/g, "&amp;").replace(/&amp;amp;/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            };

            StringUtil.ucFirst = /**
            * @method ucFirst
            * @static
            * @param {string} text
            * @returns {string}
            */
            function (text) {
                text += '';
                return text.charAt(0).toUpperCase() + text.substr(1);
            };

            StringUtil.fillZero = /**
            * @method fillZero
            * @static
            * @param {number} value
            * @param {number} length
            * @returns {string}
            */
            function (value, length) {
                if (String(value).length >= length)
                    return String(value);

                var numbers = [];
                numbers.length = (length + 1) - value.toString().split('').length;

                return numbers.join('0') + value;
            };
            StringUtil.uniqueStringCounter = Math.random() * 0x80000000 | 0;
            return StringUtil;
        })();
        utils.StringUtil = StringUtil;
    })(hlk.utils || (hlk.utils = {}));
    var utils = hlk.utils;
})(hlk || (hlk = {}));
var hlk;
(function (hlk) {
    /**
    * Created by info on 2013/11/13.
    */
    (function (utils) {
        /**
        * @class ObjectUtil
        */
        var ObjectUtil = (function () {
            function ObjectUtil() {
            }
            ObjectUtil.merge = /**
            * 列挙可能な値をマージして新しいオブジェクトを返す
            *
            * @static
            * @method merge
            * @param {any} obj1
            * @param {any} obj2
            * @returns {any}
            */
            function (obj1, obj2) {
                var ret = {};
                var name;

                for (name in obj1) {
                    if (obj1.hasOwnProperty(name)) {
                        ret[name] = obj1[name];
                    }
                }

                for (name in obj2) {
                    if (obj2.hasOwnProperty(name)) {
                        ret[name] = obj2[name];
                    }
                }

                return ret;
            };

            ObjectUtil.mixin = /**
            * mixin
            *
            * @static
            * @method mixin
            * @param {any} base
            * @param {any} include
            */
            function (base, include) {
                for (var name in include) {
                    base[name] = include[name];
                }

                return base;
            };
            return ObjectUtil;
        })();
        utils.ObjectUtil = ObjectUtil;
    })(hlk.utils || (hlk.utils = {}));
    var utils = hlk.utils;
})(hlk || (hlk = {}));
var hlk;
(function (hlk) {
    /**
    * Created by info on 2013/11/13.
    */
    /// <reference path="../../../defintion/herlock.d.ts" />
    /**
    * @namespace hlk.utils
    */
    (function (utils) {
        /**
        * @class DisplayUtil
        */
        var DisplayUtil = (function () {
            function DisplayUtil() {
            }
            DisplayUtil.removeAllChildren = /**
            * 全ての子オブジェクトを削除
            *
            * @static
            * @method removeAllChildren
            * @param {DisplayObjectContainer} container
            */
            function (container) {
                var len = container.numChildren;

                for (var i = 0; i < len; i++) {
                    container.removeChildAt(0);
                }
            };

            DisplayUtil.clearAllChildren = /**
            * 全ての子オブジェクトを削除し、イベントリスナーを解除する
            *
            * @static
            * @method clearAllChildren
            * @param {DisplayObjectContainer} container
            * @param {boolean} [recursive=false]
            */
            function (container, recursive) {
                if (typeof recursive === "undefined") { recursive = false; }
                var len = container.numChildren;
                var removed;

                for (var i = 0; i < len; i++) {
                    removed = container.removeChildAt(0);
                    removed.removeAllEventListeners();

                    if (removed instanceof Sprite && recursive) {
                        DisplayUtil.clearAllChildren(removed);
                    }
                }
            };
            return DisplayUtil;
        })();
        utils.DisplayUtil = DisplayUtil;
    })(hlk.utils || (hlk.utils = {}));
    var utils = hlk.utils;
})(hlk || (hlk = {}));
var hlk;
(function (hlk) {
    /**
    * @namespace hlk.net
    */
    (function (net) {
        /**
        * @class HttpMethod
        */
        var HttpMethod = (function () {
            function HttpMethod() {
            }
            HttpMethod.GET = 'get';

            HttpMethod.POST = 'post';

            HttpMethod.PUT = 'put';

            HttpMethod.DELETE = 'delete';
            return HttpMethod;
        })();
        net.HttpMethod = HttpMethod;
    })(hlk.net || (hlk.net = {}));
    var net = hlk.net;
})(hlk || (hlk = {}));
var hlk;
(function (hlk) {
    /**
    * @namespace hlk.net
    */
    (function (net) {
        /**
        * @class HttpUtil
        */
        var HttpUtil = (function () {
            function HttpUtil() {
            }
            HttpUtil.buildQuery = /**
            * オブジェクトの列挙可能なプロパティからクエリ文字列生成
            *
            * @method buildQuery
            * @static
            * @param {Object} params
            * @returns {string}
            */
            function (params) {
                var query = [];

                for (var key in params) {
                    if (params.hasOwnProperty(key) && params[key] instanceof Array) {
                        var i, m = params[key].length;

                        for (i = 0; i < m; i++) {
                            query.push(key + '[]=' + encodeURIComponent(params[key][i]));
                        }
                    } else {
                        query.push(key + '=' + encodeURIComponent(params[key]));
                    }
                }

                return query.join('&');
            };

            HttpUtil.isValidUrl = /**
            * 正しいURLか
            *
            * @static
            * @method isValidUrl
            * @param {string} url
            * @returns {boolean}
            */
            function (url) {
                return HttpUtil.URL_PATTERN.test(url);
            };

            HttpUtil.parseQuery = /**
            * クエリ文字列のパース
            *
            * @static
            * @method parseQuery
            * @param {string} text
            * @returns {any}
            */
            function (text) {
                if (!text)
                    return {};

                var index = text.indexOf('?');
                var params = {};

                text = (index === -1) ? text : text.substr(index + 1);

                params.query = decodeURIComponent(text);

                if (text && text != '') {
                    var qsa = text.split('&');

                    for (var i = 0; i < qsa.length; i++) {
                        var pair = qsa[i].split('=');

                        if (typeof pair[0] != 'undefined' && typeof pair[1] != 'undefined') {
                            var pn, matcher = pair[0].match(/\[\]/), isArray = matcher && (matcher[0]) === '[]';

                            if (isArray) {
                                pn = pair[0].replace("[]", "");
                                if (typeof params[pn] === 'undefined') {
                                    params[pn] = [];
                                }

                                params[pn].push(decodeURIComponent(pair[1]));
                            } else {
                                params[pair[0]] = decodeURIComponent(pair[1]);
                            }
                        }
                    }
                }

                return params;
            };
            HttpUtil.URL_PATTERN = new RegExp('^(https?:\\/\\/)?' + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + '((\\d{1,3}\\.){3}\\d{1,3}))' + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + '(\\?[;&a-z\\d%_.~+=-]*)?' + '(\\#[-a-z\\d_]*)?$', 'i');
            return HttpUtil;
        })();
        net.HttpUtil = HttpUtil;
    })(hlk.net || (hlk.net = {}));
    var net = hlk.net;
})(hlk || (hlk = {}));
var hlk;
(function (hlk) {
    /// <reference path="../../../defintion/herlock.d.ts" />
    /// <reference path="../utils/ObjectUtil.ts" />
    /// <reference path="HttpMethod.ts" />
    /// <reference path="HttpUtil.ts" />
    /**
    * @namespace hlk.net
    */
    (function (net) {
        var ObjectUtil = hlk.utils.ObjectUtil;

        /**
        * Ajax基底クラス
        *
        * @class HttpClient
        * @constructor
        * @param {string} [method=HttpMethod.GET]
        */
        var HttpClient = (function () {
            function HttpClient(method) {
                if (typeof method === "undefined") { method = net.HttpMethod.GET; }
                /**
                * @private
                * @type any
                * @property requestBody
                */
                this.requestBody = null;
                this.setMethod(method);

                this.headers = {
                    X_REQUESTED_WITH: 'XMLHttpRequest'
                };
            }
            /**
            * @method setMethod
            * @param {string} method
            */
            HttpClient.prototype.setMethod = function (method) {
                this.method = method.toLowerCase() === net.HttpMethod.GET ? net.HttpMethod.GET : net.HttpMethod.POST;
            };

            /**
            * @method getMethod
            * @returns {string}
            */
            HttpClient.prototype.getMethod = function () {
                return this.method;
            };

            /**
            * @method addHeader
            * @param {string} name
            * @param {string} value
            */
            HttpClient.prototype.addHeader = function (name, value) {
                this.headers[name] = value;
            };

            /**
            * @method getHeaders
            * @returns {any}
            */
            HttpClient.prototype.getHeaders = function () {
                return this.headers;
            };

            /**
            * @method getHeader
            * @param {string} name
            * @returns {string}
            */
            HttpClient.prototype.getHeader = function (name) {
                return this.headers[name];
            };

            /**
            * @method removeHeader
            * @param {string} name
            */
            HttpClient.prototype.removeHeader = function (name) {
                delete this.headers[name];
            };

            /**
            * @method addHeaders
            * @param {any} headers
            */
            HttpClient.prototype.addHeaders = function (headers) {
                for (var name in headers) {
                    if (headers.hasOwnProperty(name))
                        this.addHeader(name, headers[name]);
                }
            };

            /**
            * @method abort
            */
            HttpClient.prototype.abort = function () {
                if (this.xhr != null) {
                    var xhr = this.xhr;
                    this.clearRequest();
                    xhr.abort();
                }
            };

            /**
            * @method setRequestBody
            * @param {any} param
            */
            HttpClient.prototype.setRequestBody = function (param) {
                if (param instanceof FormData || typeof param === 'string') {
                    this.requestBody = param;
                } else {
                    this.requestBody = net.HttpUtil.buildQuery(param);
                }
            };

            /**
            * @method getRequestBody
            * @returns {any}
            */
            HttpClient.prototype.getRequestBody = function () {
                return this.requestBody;
            };

            /**
            * @method setQueryParams
            * @param {any} param
            */
            HttpClient.prototype.setQueryParams = function (param) {
                this.queryParam = ObjectUtil.merge(this.getQueryParams(), param);
            };

            /**
            * @method getQueryParams
            * @returns {any}
            */
            HttpClient.prototype.getQueryParams = function () {
                return this.queryParam;
            };

            /**
            * @method addQueryParam
            * @param {string} key
            * @param {string} value
            */
            HttpClient.prototype.addQueryParam = function (key, value) {
                this.queryParam[key] = value;
            };

            /**
            * @method removeQueryParam
            * @param {string} key
            */
            HttpClient.prototype.removeQueryParam = function (key) {
                delete this.queryParam[key];
            };

            /**
            * @method getQueryParam
            * @param {string} key
            */
            HttpClient.prototype.getQueryParam = function (key) {
                return this.queryParam[key];
            };

            /**
            * @method getQueryString
            * @returns {string}
            */
            HttpClient.prototype.getQueryString = function () {
                return net.HttpUtil.buildQuery(this.getQueryParams());
            };

            /**
            * @method setUrl
            * @param {string} url
            */
            HttpClient.prototype.setUrl = function (url) {
                if (net.HttpUtil.isValidUrl(url)) {
                    this.url = url;
                } else {
                    throw new Error('invalid url.');
                }
            };

            /**
            * @method getUrl
            * @returns {string}
            */
            HttpClient.prototype.getUrl = function () {
                return this.url;
            };

            /**
            * @method buildUrl
            * @returns {string}
            */
            HttpClient.prototype.buildUrl = function () {
                var url = this.getUrl();
                var query = this.getQueryString();

                if (url.indexOf('?') === -1 && !!query) {
                    url += '?';
                } else if (url.substr(url.length - 1, 1) != '&' && query) {
                    url += '&';
                }

                url += query != '' ? query : '';

                return url;
            };

            HttpClient.prototype.clearRequest = function () {
                this.xhr.onreadystatechange = this.xhr.onabort = this.xhr.onerror = null;
                this.xhr = null;
            };

            /**
            * @method send
            * @param {Function} success
            * @param {Function} error
            */
            HttpClient.prototype.send = function (success, error) {
                if (typeof success === "undefined") { success = null; }
                if (typeof error === "undefined") { error = null; }
                var _this = this;
                if (this.xhr) {
                    throw new Error('Request dose sent');
                }

                var xhr = new XMLHttpRequest();
                var headers = this.getHeaders();

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (typeof success === 'function')
                            success(xhr);

                        _this.clearRequest();
                    }
                };

                xhr.onabort = xhr.onerror = function () {
                    if (typeof error === 'function')
                        error(xhr);

                    _this.clearRequest();
                };

                xhr.open(this.getMethod(), this.buildUrl());

                for (var name in headers) {
                    if (headers.hasOwnProperty(name))
                        xhr.setRequestHeader(name, headers[name]);
                }

                xhr.send(this.getRequestBody());

                this.xhr = xhr;
            };
            return HttpClient;
        })();
        net.HttpClient = HttpClient;
    })(hlk.net || (hlk.net = {}));
    var net = hlk.net;
})(hlk || (hlk = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var hlk;
(function (hlk) {
    (function (net) {
        /**
        * Created by info on 2013/11/13.
        */
        /// <reference path="../../Observer.ts" />
        /// <reference path="../../../../defintion/herlock.d.ts" />
        /**
        * @namespace hlk.net.loader
        */
        (function (loader) {
            var Observer = hlk.Observer;

            /**
            * @class MaterialLoader
            * @extends Observer
            * @constructor
            * @param {Array<ILoadItem>} list
            */
            var MaterialLoader = (function (_super) {
                __extends(MaterialLoader, _super);
                function MaterialLoader(list) {
                    _super.call(this);

                    this.list = [];

                    if (list) {
                        for (var i = 0; i < list.length; i++) {
                            this.put(list[i]);
                        }
                    }

                    this.loaded = {};
                }
                /**
                * @method put
                * @param {ILoadItem} item
                */
                MaterialLoader.prototype.put = function (item) {
                    this.list.push(item);
                };

                /**
                * @method load
                */
                MaterialLoader.prototype.load = function () {
                    this.loadSequence();
                };

                /**
                * @private
                * @method createItem
                * @param {ILoadItem} item
                * @returns {any}
                */
                MaterialLoader.prototype.createItem = function (item) {
                    if (typeof item.type !== 'undefined') {
                        return this.createAudioItem(item);
                    } else {
                        return this.createImageItem(item);
                    }
                };

                /**
                * @private
                * @method createImageItem
                * @param {ILoadItem} item
                * @returns {Image}
                */
                MaterialLoader.prototype.createImageItem = function (item) {
                    var image = new Image();
                    image.src = item.src;

                    return image;
                };

                /**
                * @private
                * @method createAudioItem
                * @param {ILoadItem} item
                * @returns {Audio}
                */
                MaterialLoader.prototype.createAudioItem = function (item) {
                    return new Audio(item.src, item.type);
                };

                /**
                * @private
                * @method loadSequence
                */
                MaterialLoader.prototype.loadSequence = function () {
                    var item = this.list.shift();
                    var self = this;

                    if (item) {
                        var loadItem = this.createItem(item);

                        loadItem.onload = function () {
                            self.loaded[item.name] = loadItem;
                            self.loadSequence();

                            loadItem.onerror = loadItem.onload = null;
                            item = loadItem = self = null;
                        };

                        loadItem.onerror = function () {
                            console.log('[error]' + item.src);
                            loadItem.onerror = loadItem.onload = null;
                        };
                    } else {
                        this.onLoadFinish();
                    }
                };

                /**
                * @private
                * @method onLoadFinish
                */
                MaterialLoader.prototype.onLoadFinish = function () {
                    this.notify('complete', this.loaded);
                    this.loaded = null;
                };
                return MaterialLoader;
            })(hlk.Observer);
            loader.MaterialLoader = MaterialLoader;
        })(net.loader || (net.loader = {}));
        var loader = net.loader;
    })(hlk.net || (hlk.net = {}));
    var net = hlk.net;
})(hlk || (hlk = {}));
var hlk;
(function (hlk) {
    (function (command) {
        /// <reference path="../../Observer.ts" />
        /**
        * @namespace hlk.command.event
        */
        (function (event) {
            /**
            * @class CommandEvent
            * @constructor
            * @param {string} type
            * @param {any} [data={}]
            * @param {any} [target=null]
            */
            var CommandEvent = (function (_super) {
                __extends(CommandEvent, _super);
                /**
                * @constructor
                * @param {string} type
                * @param {any} [data={}]
                * @param {any} [target=null]
                */
                function CommandEvent(type, data, target) {
                    if (typeof data === "undefined") { data = {}; }
                    if (typeof target === "undefined") { target = null; }
                    _super.call(this, type, data, target);
                }
                CommandEvent.COMMAND_COMPLETE = "sequenceComplete";

                CommandEvent.COMMAND_COMPLETE_ONE = "sequenceCompleteOne";

                CommandEvent.COMMAND_ABORT = "sequenceAbort";
                return CommandEvent;
            })(hlk.ObserverEvent);
            event.CommandEvent = CommandEvent;
        })(command.event || (command.event = {}));
        var event = command.event;
    })(hlk.command || (hlk.command = {}));
    var command = hlk.command;
})(hlk || (hlk = {}));
var hlk;
(function (hlk) {
    /// <reference path="../../IKeyValue.ts" />
    /// <reference path="../Observer.ts" />
    /// <reference path="../utils/StringUtil.ts" />
    /// <reference path="event/CommandEvent.ts" />
    /**
    * @namespace hlk.command
    */
    (function (command) {
        var StringUtil = hlk.utils.StringUtil;
        var CommandEvent = hlk.command.event.CommandEvent;

        /**
        * @class Abstract
        * @extends Observer
        * @constructor
        * @param {string} [name='']
        */
        var Abstract = (function (_super) {
            __extends(Abstract, _super);
            /**
            * @constructor
            * @param {string} [name = '']
            */
            function Abstract(name) {
                if (typeof name === "undefined") { name = ''; }
                _super.call(this);
                this._name = '';
                this._isComplete = false;
                var name = name.length > 0 ? name : 'exec_' + StringUtil.getUnique();
                this.setName(name);
            }
            /**
            * @method getName
            * @return {string}
            */
            Abstract.prototype.getName = function () {
                return this._name;
            };

            /**
            * @method setName
            * @param {string} name
            */
            Abstract.prototype.setName = function (name) {
                this._name = name;
            };

            /**
            * @method isComplete
            * @return {boolean}
            */
            Abstract.prototype.isComplete = function () {
                return this._isComplete;
            };

            /**
            * @method setComplete
            * @param {boolean} value
            */
            Abstract.prototype.setComplete = function (value) {
                this._isComplete = value;
            };

            /**
            * @method execute
            * @param {any} [data]
            */
            Abstract.prototype.execute = function (data) {
                this.setComplete(false);
                throw new Error("require override");
            };

            /**
            * @protected
            * @method _abort
            */
            Abstract.prototype._abort = function () {
                //Any
            };

            /**
            * @method abort
            */
            Abstract.prototype.abort = function () {
                this.setComplete(true);
                this._abort();
                this.notify(CommandEvent.COMMAND_ABORT);
                this.clear();
            };

            /**
            * @method complete
            * @param {any} data
            */
            Abstract.prototype.complete = function (data) {
                if (!this.isComplete()) {
                    this.setComplete(true);
                    this.notify(CommandEvent.COMMAND_COMPLETE, data);
                    this.clear();
                }
            };

            /**
            * @method notify
            * @param {string} type
            * @param {any} [data = {}]
            */
            Abstract.prototype.notify = function (type, data) {
                if (typeof data === "undefined") { data = {}; }
                this.observeEvent(new CommandEvent(type, data, this));
            };

            /**
            * @protected
            * @method clear
            */
            Abstract.prototype.clear = function () {
                // Any
            };
            return Abstract;
        })(hlk.Observer);
        command.Abstract = Abstract;
    })(hlk.command || (hlk.command = {}));
    var command = hlk.command;
})(hlk || (hlk = {}));
var hlk;
(function (hlk) {
    /// <reference path="Abstract.ts" />
    /// <reference path="event/CommandEvent.ts" />
    /**
    * @namespace hlk.command
    */
    (function (command) {
        var CommandEvent = hlk.command.event.CommandEvent;

        /**
        * @class Sequence
        * @extends Abstract
        * @constructor
        * @param {Abstract} commands*
        */
        var Sequence = (function (_super) {
            __extends(Sequence, _super);
            /**
            * @constructor
            * @param {Abstract} commands*
            */
            function Sequence() {
                var commands = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    commands[_i] = arguments[_i + 0];
                }
                _super.call(this);

                this._initialize(commands);

                this._isExecute = false;
            }
            /**
            * @protected
            * @method _initialize
            * @param {Abstract[]} commands
            */
            Sequence.prototype._initialize = function (commands) {
                var queue = [];

                if (!!commands) {
                    var count = commands.length;

                    for (var i = 0; i < count; i++) {
                        if (commands[i] instanceof command.Abstract) {
                            queue.push(commands[i]);
                        }
                    }
                }

                this._queue = queue;
            };

            /**
            *
            * @method getCurrent
            * @return {Abstract}
            */
            Sequence.prototype.getCurrent = function () {
                return this._current;
            };

            /**
            *
            * @method add
            * @param {Abstract} cmd
            * @return {Abstract}
            */
            Sequence.prototype.add = function (cmd) {
                if (cmd instanceof command.Abstract) {
                    this._queue.push(cmd);
                }

                return this;
            };

            /**
            *
            * @method remove
            * @param {Abstract} cmd
            * @return {Abstract}
            */
            Sequence.prototype.remove = function (cmd) {
                var index = this._queue.indexOf(cmd);

                if (index >= 0) {
                    this._queue.splice(index, 1);
                }

                return this;
            };

            /**
            *
            * @method execute
            * @param {any} [data]
            */
            Sequence.prototype.execute = function (data) {
                if (this._isExecute || this.isComplete())
                    return;

                this.setComplete(false);

                this._isExecute = true;

                var command = this._queue.shift();

                this._current = command;
                command.addObserver(CommandEvent.COMMAND_COMPLETE, this.completeOne, this);

                command.execute.apply(command, arguments);
            };

            /**
            * @protected
            * @method _abort
            */
            Sequence.prototype._abort = function () {
                this._isExecute = false;
                var command = this.getCurrent();
                if (command != null) {
                    command.abort();
                }
            };

            /**
            * @method completeOne
            * @param {CommandEvent} event
            */
            Sequence.prototype.completeOne = function (event) {
                if (!this._isExecute)
                    return;

                var command = event.target;

                command.removeObserver(CommandEvent.COMMAND_COMPLETE, this.completeOne);

                command.clear();

                this._current = null;

                this._isExecute = false;

                if (this._queue.length > 0) {
                    //Next
                    this.execute(event.data);
                } else {
                    //完了
                    this.complete(event.data);
                }
            };
            return Sequence;
        })(command.Abstract);
        command.Sequence = Sequence;
    })(hlk.command || (hlk.command = {}));
    var command = hlk.command;
})(hlk || (hlk = {}));
var hlk;
(function (hlk) {
    /// <reference path="Abstract.ts" />
    /// <reference path="Sequence.ts" />
    /// <reference path="event/CommandEvent.ts" />
    /**
    * @namespace hlk.command
    */
    (function (command) {
        var CommandEvent = hlk.command.event.CommandEvent;

        /**
        * @class Parallel
        * @extends Sequence
        * @protected
        * @method _initialize
        * @param {Abstract[]} commands
        */
        var Parallel = (function (_super) {
            __extends(Parallel, _super);
            /**
            * @protected
            * @method _initialize
            * @param {Abstract[]} commands
            */
            function Parallel() {
                var commands = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    commands[_i] = arguments[_i + 0];
                }
                _super.call(this);
                this._execCount = 0;

                this._initialize(commands);

                this._results = [];
            }
            /**
            * @method completeOne
            * @param {CommandEvent} event
            */
            Parallel.prototype.completeOne = function (event) {
                var cmd = event.target;

                cmd.removeObserver(CommandEvent.COMMAND_COMPLETE, this.completeOne);
                cmd.clear();

                this._execCount--;
                this._results.push(event.data);
                if (this._execCount <= 0) {
                    this._isExecute = false;
                    this.complete(this._results);
                }
            };

            /**
            * @method execute
            * @param {any} [data]
            */
            Parallel.prototype.execute = function (data) {
                if (this._isExecute || this.isComplete())
                    return;

                this._isExecute = true;

                this.setComplete(false);

                this._execCount = 0;

                var queue = this._queue;

                queue.reverse();

                if (queue.length !== 0) {
                    while (queue.length) {
                        var cmd = queue.pop();
                        this._execCount++;

                        cmd.addObserver(CommandEvent.COMMAND_COMPLETE, this.completeOne, this);

                        cmd.execute(data);
                    }
                } else {
                    this.complete(data);
                }
            };

            /**
            * @protected
            * @method _abort
            */
            Parallel.prototype._abort = function () {
                var queue = this._queue;
                var count = queue.length;
                for (var i = 0; i < count; i++) {
                    queue[i].abort();
                }
                this._isExecute = false;
            };
            return Parallel;
        })(command.Sequence);
        command.Parallel = Parallel;
    })(hlk.command || (hlk.command = {}));
    var command = hlk.command;
})(hlk || (hlk = {}));
var hlk;
(function (hlk) {
    /// <reference path="Abstract.ts" />
    /**
    * @namespace hlk.command
    */
    (function (command) {
        /**
        * @class Call
        * @extends Abstract
        * @constructor
        * @param {Function} fn
        */
        var Call = (function (_super) {
            __extends(Call, _super);
            /**
            * @constructor
            * @param {Function} fn
            */
            function Call(fn) {
                _super.call(this);
                this.fn = fn;
            }
            /**
            * @method execute
            * @param {any} [data]
            */
            Call.prototype.execute = function (data) {
                this.setComplete(false);

                var arg = this.fn(data);

                if (typeof arg === "undefined") {
                    arg = data;
                }

                this.complete(arg);
            };
            return Call;
        })(command.Abstract);
        command.Call = Call;
    })(hlk.command || (hlk.command = {}));
    var command = hlk.command;
})(hlk || (hlk = {}));
var hlk;
(function (hlk) {
    /// <reference path="Abstract.ts" />
    /// <reference path="../net/loader/MaterialLoader.ts" />
    /**
    * @namespace hlk.command
    */
    (function (command) {
        var MaterialLoader = hlk.net.loader.MaterialLoader;
        

        /**
        * @class Loader
        * @extends Abstract
        * @constructor
        * @param {Array<ILoadItem>} list
        */
        var Loader = (function (_super) {
            __extends(Loader, _super);
            /**
            * @constructor
            * @param {Array<ILoadItem>} list
            */
            function Loader(list) {
                _super.call(this);

                this.list = list;
                this.setComplete(false);
            }
            /**
            * @method execute
            * @param {any} [data]
            */
            Loader.prototype.execute = function (data) {
                if (this.isComplete())
                    return;

                var self = this;

                var loader = new MaterialLoader(this.list);

                this.setComplete(false);

                loader.addObserver('complete', function completeLoad(event) {
                    loader.removeObserver('complete', completeLoad);
                    self.complete(event.data);
                    self.list = null;
                    loader = null;
                });

                loader.load();
            };
            return Loader;
        })(command.Abstract);
        command.Loader = Loader;
    })(hlk.command || (hlk.command = {}));
    var command = hlk.command;
})(hlk || (hlk = {}));
var hlk;
(function (hlk) {
    /// <reference path="Abstract.ts" />
    /**
    * @namespace hlk.command
    */
    (function (command) {
        /**
        * @class Wait
        * @extends Abstract
        * @constructor
        * @param {number} time
        */
        var Wait = (function (_super) {
            __extends(Wait, _super);
            /**
            * @constructor
            * @param {number} time
            */
            function Wait(time) {
                _super.call(this);
                this._timeout = time;
                this._timerId = 0;
            }
            /**
            * @protected
            * @method _abort
            */
            Wait.prototype._abort = function () {
                clearTimeout(this._timerId);
            };

            /**
            * @method execute
            * @param {any} [data]
            */
            Wait.prototype.execute = function (data) {
                var _this = this;
                if (this.isComplete())
                    return;

                this.setComplete(false);

                this._timerId = setTimeout(function () {
                    _this.complete(data);
                    clearTimeout(_this._timerId);
                }, this._timeout);
            };
            return Wait;
        })(command.Abstract);
        command.Wait = Wait;
    })(hlk.command || (hlk.command = {}));
    var command = hlk.command;
})(hlk || (hlk = {}));
var hlk;
(function (hlk) {
    /// <reference path="Abstract.ts" />
    /// <reference path="../net/HttpClient.ts" />
    /**
    * @namespace hlk.command
    */
    (function (command) {
        var HttpClient = hlk.net.HttpClient;

        /**
        * @class Ajax
        * @extends Abstract
        * @constructor
        * @param {string} method
        * @param {string} url
        * @param {any} [requestBody]
        * @param {KeyValueString} [queryParam]
        * @param {KeyValueString} [headers]
        * @param {Function} [success]
        * @param {Function} [error]
        */
        var Ajax = (function (_super) {
            __extends(Ajax, _super);
            /**
            * @constructor
            * @param {string} method
            * @param {string} url
            * @param {any} requestBody
            * @param {KeyValueString} queryParam
            * @param {KeyValueString} headers
            * @param {Function} success
            * @param {Function} error
            */
            function Ajax(method, url, requestBody, queryParam, headers, success, error) {
                if (typeof requestBody === "undefined") { requestBody = null; }
                if (typeof queryParam === "undefined") { queryParam = null; }
                if (typeof headers === "undefined") { headers = null; }
                if (typeof success === "undefined") { success = function () {
                }; }
                if (typeof error === "undefined") { error = function () {
                }; }
                _super.call(this);
                this.success = success;
                this.error = error;

                this.ajax = new HttpClient(method);
                this.ajax.setUrl(url);

                if (requestBody != null) {
                    this.ajax.setRequestBody(requestBody);
                }

                if (queryParam != null) {
                    this.ajax.setQueryParams(queryParam);
                }

                if (headers != null) {
                    this.ajax.addHeaders(headers);
                }
            }
            /**
            * @protected
            * @method _abort
            */
            Ajax.prototype._abort = function () {
                this.ajax.abort();
            };

            /**
            * @method execute
            * @param {any} [data]
            */
            Ajax.prototype.execute = function (data) {
                this.setComplete(false);

                this.ajax.send(this._createCallback(this.success, data), this._createCallback(this.error, data));
            };

            /**
            * @private
            * @param {Function} callback
            * @param {any} data
            * @method _createCallback
            */
            Ajax.prototype._createCallback = function (callback, data) {
                var self = this;

                return function (xhr) {
                    var arg = callback.apply(self, [xhr, data]);

                    self.complete(arg);
                    self.ajax = null;
                    self = null;
                };
            };
            return Ajax;
        })(command.Abstract);
        command.Ajax = Ajax;
    })(hlk.command || (hlk.command = {}));
    var command = hlk.command;
})(hlk || (hlk = {}));
