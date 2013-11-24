var UI;
(function (UI) {
    /// <reference path="../../defintion/lib.d.ts"/>
    /// <reference path="../../defintion/herlock.d.ts"/>
    /// <reference path="../../dist/herlock.d.ts"/>
    /**
    * @namespace UI.LayoutMap
    */
    (function (LayoutMap) {
        
        var Sequence = hlk.command.Sequence;
        var Call = hlk.command.Call;
        var Loader = hlk.command.Loader;
        var ObjectUtil = hlk.utils.ObjectUtil;
        var StringUtil = hlk.utils.StringUtil;

        /**
        * 配置の基準位置
        *
        * @enum
        */
        (function (VerticalAlign) {
            VerticalAlign[VerticalAlign["TOP"] = 0] = "TOP";
            VerticalAlign[VerticalAlign["MIDDLE"] = 1] = "MIDDLE";
            VerticalAlign[VerticalAlign["BOTTOM"] = 2] = "BOTTOM";
        })(LayoutMap.VerticalAlign || (LayoutMap.VerticalAlign = {}));
        var VerticalAlign = LayoutMap.VerticalAlign;

        /**
        * 配置の基準位置
        *
        * @enum
        */
        (function (HorizontalAlign) {
            HorizontalAlign[HorizontalAlign["LEFT"] = 0] = "LEFT";
            HorizontalAlign[HorizontalAlign["CENTER"] = 1] = "CENTER";
            HorizontalAlign[HorizontalAlign["RIGHT"] = 2] = "RIGHT";
        })(LayoutMap.HorizontalAlign || (LayoutMap.HorizontalAlign = {}));
        var HorizontalAlign = LayoutMap.HorizontalAlign;

        function toEnum(enumType, value) {
            return typeof enumType[value] !== 'undefined' ? enumType[value] : 0;
        }
        LayoutMap.toEnum = toEnum;

        /**
        * @class LayoutRectangle
        * @constructor
        * @param {any} data
        */
        var LayoutRectangle = (function () {
            /**
            * @private
            * @type any
            * @property data
            */
            function LayoutRectangle(data) {
                this.data = data;
            }
            Object.defineProperty(LayoutRectangle.prototype, "x", {
                get: /**
                * @readonly
                * @type number
                * @property x
                */
                function () {
                    return typeof this.data.x !== 'undefined' ? parseInt(this.data.x) : 0;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(LayoutRectangle.prototype, "y", {
                get: /**
                * @readonly
                * @type number
                * @property y
                */
                function () {
                    return typeof this.data.y !== 'undefined' ? parseInt(this.data.y) : 0;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(LayoutRectangle.prototype, "width", {
                get: /**
                * @readonly
                * @type number
                * @property width
                */
                function () {
                    return typeof this.data.width !== 'undefined' ? parseInt(this.data.width) : 0;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(LayoutRectangle.prototype, "height", {
                get: /**
                * @readonly
                * @type number
                * @property height
                */
                function () {
                    return typeof this.data.height !== 'undefined' ? parseInt(this.data.height) : 0;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * 矩形の取得
            *
            * @method getRectangle
            * @returns {Rectangle}
            */
            LayoutRectangle.prototype.getRectangle = function () {
                return new Rectangle(this.x, this.y, this.width, this.height);
            };
            return LayoutRectangle;
        })();
        LayoutMap.LayoutRectangle = LayoutRectangle;

        /**
        * @class LayoutItem
        * @constructor
        * @param {any} data
        */
        var LayoutItem = (function () {
            function LayoutItem(data) {
                var param = data.param;

                this.name = data.id;
                this.verticalAlign = Number(param.verticalAlign);
                this.horizontalAlign = Number(param.horizontalAlign);
                this.src = String(data.src);
                this.x = Number(param.x);
                this.y = Number(param.y);
                this.alpha = Number(param.alpha);
                this.rotation = Number(param.rotation);
                this.visible = !!param.visible;
                this.width = Number(param.width);
                this.height = Number(param.height);
                this.clipRect = !param.clipRect ? null : new LayoutRectangle(param.clipRect);
                this.isWrap = !!param.isWrap;
            }
            return LayoutItem;
        })();
        LayoutMap.LayoutItem = LayoutItem;

        /**
        * @private
        * @class LayoutDataParser
        */
        var LayoutDataParser = (function () {
            function LayoutDataParser() {
            }
            LayoutDataParser.parseResolver = /**
            * @param {any} data
            * @returns {Array<LayoutItem>}
            * @method parseResolver
            * @static
            */
            function (data) {
                var items = [];
                var itr = data.items;

                for (var i = 0; i < itr.length; i++) {
                    items.push(new LayoutItem(itr[i]));
                }

                return items;
            };

            LayoutDataParser.parse = /**
            *
            * @param data
            * @returns {LayoutData}
            * @method parse
            * @static
            */
            function (data) {
                var modules = {};
                var moduleName;

                for (moduleName in data) {
                    if (data.hasOwnProperty(moduleName))
                        modules[moduleName] = this.parseResolver(data[moduleName]);
                }

                return modules;
            };
            return LayoutDataParser;
        })();

        /**
        * @class LayoutResolverFactory
        * @constructor
        * @param data
        */
        var LayoutResolverFactory = (function () {
            function LayoutResolverFactory(data) {
                if (typeof data === "undefined") { data = {}; }
                this.setConfig(data);
                this.id = StringUtil.getUnique();
            }
            /**
            * @private
            * @method addConfig
            * @param {any} data
            */
            LayoutResolverFactory.prototype.addConfig = function (data) {
                this.data = ObjectUtil.merge(this.data, LayoutDataParser.parse(data));
            };

            /**
            * @private
            * @method setConfig
            * @param {any} data
            */
            LayoutResolverFactory.prototype.setConfig = function (data) {
                this.data = LayoutDataParser.parse(data);
            };

            /**
            * @private
            * @method loadConfig
            * @param {string} src
            * @param {Function} callback
            */
            LayoutResolverFactory.prototype.loadConfig = function (src, callback) {
                var _this = this;
                var xhr = new XMLHttpRequest();

                xhr.addEventListener('readystatechange', function (event) {
                    if (xhr.readyState === 4) {
                        var data = JSON.parse(xhr.responseText);
                        _this.addConfig(data);
                        callback();
                    }
                }, false);

                xhr.open('get', src);
                xhr.send(null);
            };

            /**
            * @private
            * @method getConfig
            * @param {string} resolverName
            * @returns {Array<LayoutItem>}
            */
            LayoutResolverFactory.prototype.getConfig = function (resolverName) {
                return this.data[resolverName];
            };

            /**
            *
            * @method createResolver
            * @param {string} resolverName
            * @returns {LayoutResolver}
            */
            LayoutResolverFactory.prototype.createResolver = function (resolverName) {
                var config = this.getConfig(resolverName);

                if (!config) {
                    throw new Error('resolver config not exists!');
                }
                return new LayoutResolver(resolverName, config);
            };

            /**
            *
            * @method loadResolver
            * @param {string} resolverName
            * @param {Array<ILoadItem>} materials
            * @param {Function} callback
            */
            LayoutResolverFactory.prototype.loadResolver = function (resolverName, materials, callback) {
                var _this = this;
                var sequence = new Sequence();

                sequence.add(new Loader(materials));

                sequence.add(new Call(function (loadeds) {
                    _this.loadConfig(LayoutResolverFactory.DEFAULT_CONFIG_FILE, function () {
                        //@this LayoutResolverFactory
                        var resolver = _this.createResolver(resolverName);

                        for (var name in loadeds) {
                            if (loadeds.hasOwnProperty(name)) {
                                if (loadeds[name] instanceof Image) {
                                    resolver.addImage(loadeds[name]);
                                }
                            }
                        }

                        callback(resolver);
                    });
                }));

                sequence.execute(null);
            };
            LayoutResolverFactory.DEFAULT_CONFIG_FILE = 'assets/layout.json';
            return LayoutResolverFactory;
        })();
        LayoutMap.LayoutResolverFactory = LayoutResolverFactory;

        /**
        * @class LayoutResolver
        * @constructor
        * @param name
        * @param config
        */
        var LayoutResolver = (function () {
            function LayoutResolver(name, config) {
                this.name = name;
                this.config = config;
                this.imageStore = {};
                this.bitmapDataStore = {};
            }
            /**
            * @method get
            * @param itemName
            * @param isWrapSprite
            * @returns {DisplayObject}
            */
            LayoutResolver.prototype.get = function (itemName, isWrapSprite) {
                if (typeof isWrapSprite === "undefined") { isWrapSprite = undefined; }
                var configs = this.config.filter(function (value, index, array) {
                    return value.name === itemName;
                });

                if (configs.length > 0) {
                    return this.getItem(configs[0], isWrapSprite);
                }

                return null;
            };

            /**
            * @private
            * @method getItem
            * @param config
            * @param isWrapSprite
            * @returns {DisplayObject}
            */
            LayoutResolver.prototype.getItem = function (config, isWrapSprite) {
                var bmp;
                var target;
                var isWrap = typeof isWrapSprite !== 'undefined' ? isWrapSprite : !!config.isWrap;

                if (typeof this.bitmapDataStore[config.src] === 'undefined') {
                    if (typeof this.imageStore[config.src] === 'undefined') {
                        throw new Error('not exists image.');
                    }

                    this.bitmapDataStore[config.src] = new BitmapData(this.imageStore[config.src]);
                    delete this.imageStore[config.src];
                }

                bmp = new Bitmap(this.bitmapDataStore[config.src]);

                if (config.clipRect) {
                    bmp.setClippingRect(config.clipRect.getRectangle());
                }

                bmp.height = config.height;
                bmp.width = config.width;

                if (isWrap) {
                    var container = new Sprite();
                    container.addChild(bmp);

                    //SpriteでWrapするときのみ有効
                    this.setAlign(bmp, config);

                    target = container;
                } else {
                    target = bmp;
                }

                this.setLayout(target, config);

                return target;
            };

            /**
            * @private
            * @method setAlign
            * @param target
            * @param param
            */
            LayoutResolver.prototype.setAlign = function (target, param) {
                if (param.horizontalAlign === HorizontalAlign.CENTER) {
                    target.x = -target.width / 2;
                } else if (param.horizontalAlign === HorizontalAlign.RIGHT) {
                    target.x = -target.width;
                }

                if (param.verticalAlign === VerticalAlign.MIDDLE) {
                    target.y = -target.height / 2;
                } else if (param.verticalAlign === VerticalAlign.BOTTOM) {
                    target.y = -target.height;
                }
            };

            /**
            * @private
            * @method setLayout
            * @param target
            * @param param
            */
            LayoutResolver.prototype.setLayout = function (target, param) {
                target.name = param.name;
                target.x = param.x;
                target.y = param.y;
                target.alpha = param.alpha;
                target.rotation = param.rotation;
            };

            /**
            * @private
            * @method getItems
            * @param isWrapSprite
            * @returns {DisplayObject[]}
            */
            LayoutResolver.prototype.getItems = function (isWrapSprite) {
                var items = [];
                var i;

                for (i = 0; i < this.config.length; i++) {
                    var config = this.config[i];
                    items[i] = this.getItem(config, isWrapSprite);
                }

                return items;
            };

            /**
            * @method addChildTo
            * @param itemName
            * @param stage
            * @param isWrapSprite
            */
            LayoutResolver.prototype.addChildTo = function (itemName, stage, isWrapSprite) {
                if (typeof isWrapSprite === "undefined") { isWrapSprite = undefined; }
                var item = this.get(itemName, isWrapSprite);
                stage.addChild(item);
            };

            /**
            * @method addChildrenTo
            * @param stage
            * @param isWrapSprite
            */
            LayoutResolver.prototype.addChildrenTo = function (stage, isWrapSprite) {
                if (typeof isWrapSprite === "undefined") { isWrapSprite = undefined; }
                this.getItems(isWrapSprite).forEach(function (item) {
                    stage.addChild(item);
                });
            };

            /**
            * @method addImage
            * @param image
            */
            LayoutResolver.prototype.addImage = function (image) {
                this.imageStore[image.src.replace(LayoutResolver.URL_PATTERN, '')] = image;
            };

            /**
            * @method addBitmapData
            * @param src
            * @param bitmapData
            */
            LayoutResolver.prototype.addBitmapData = function (src, bitmapData) {
                this.bitmapDataStore[src.replace(LayoutResolver.URL_PATTERN, '')] = bitmapData;
            };

            /**
            * @method clear
            */
            LayoutResolver.prototype.clear = function () {
                var name;

                for (name in this.bitmapDataStore) {
                    if (this.bitmapDataStore.hasOwnProperty(name))
                        delete this.bitmapDataStore[name];
                }

                for (name in this.imageStore) {
                    if (this.imageStore.hasOwnProperty(name))
                        delete this.bitmapDataStore[name];
                }
            };
            LayoutResolver.URL_PATTERN = /^https?:\/\/[-_.!~*\'()a-zA-Z0-9;?:\@&=+\$,%#]+\/workspace\/.*?\/.*?\//;
            return LayoutResolver;
        })();
        LayoutMap.LayoutResolver = LayoutResolver;
    })(UI.LayoutMap || (UI.LayoutMap = {}));
    var LayoutMap = UI.LayoutMap;
})(UI || (UI = {}));
