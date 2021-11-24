"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var PictureController = (function (_super) {
    tslib_1.__extends(PictureController, _super);
    function PictureController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        _this._hidden = false;
        _this._needVanish = false;
        _this._needChange = false;
        _this._epochTime = 0.5;
        _this._curTime = 0;
        _this._id = 0;
        _this._uiSprite = _this.entity.getComponent(engine_1.default.UISprite);
        _this._previousAlpha = 0;
        _this._targetAlpha = 0;
        _this._deltaAlpha = 0;
        _this._album = [];
        _this._spriteMap = new Map();
        return _this;
    }
    Object.defineProperty(PictureController.prototype, "hidden", {
        get: function () {
            return this._hidden;
        },
        set: function (h) {
            this._needVanish = (h !== this._hidden);
            this._hidden = h;
            this._previousAlpha = this._uiSprite.alpha;
            if (this._hidden) {
                this._targetAlpha = 0;
            }
            else {
                this._targetAlpha = 255;
            }
            this._deltaAlpha = this._targetAlpha - this._previousAlpha;
        },
        enumerable: false,
        configurable: true
    });
    PictureController.prototype.onAwake = function () {
        var _this = this;
        for (var i = 0; i < 45; ++i) {
            this._album.push('pictures/m' + i + '.spriteframe');
        }
        var _loop_1 = function (pic_name) {
            engine_1.default.loader.load(pic_name, { cacheable: true }).promise.then(function (asset) {
                console.log("Loaded picture: ", pic_name);
                _this._spriteMap.set(pic_name, asset);
            });
        };
        for (var _i = 0, _a = this._album; _i < _a.length; _i++) {
            var pic_name = _a[_i];
            _loop_1(pic_name);
        }
    };
    PictureController.prototype.onUpdate = function (dt) {
        if (this._needVanish) {
            this._curTime += dt;
            if (this._curTime >= this._epochTime) {
                this._curTime = 0;
                this._needVanish = false;
                this._uiSprite.alpha = this._targetAlpha;
            }
            else {
                this._uiSprite.alpha = this._previousAlpha + this._curTime / this._epochTime * this._deltaAlpha;
            }
            return;
        }
        if (this._needChange) {
            var pic_name = this._album[this._id];
            if (this._spriteMap.has(pic_name)) {
                this._needChange = false;
                var asset = this._spriteMap.get(pic_name);
                this._uiSprite.spriteFrame = asset;
                this._uiSprite.entity.transform2D.size = engine_1.default.Vector2.createFromNumber(asset.rect.width, asset.rect.height);
                if (asset.rect.width > asset.rect.height) {
                    var ratio = asset.rect.height / asset.rect.width;
                    this._uiSprite.entity.transform2D.scale = engine_1.default.Vector2.createFromNumber(ratio, ratio);
                }
                else {
                    this._uiSprite.entity.transform2D.scale = engine_1.default.Vector2.createFromNumber(1, 1);
                }
                this._id = (this._id + 1) % this._album.length;
                console.log('Change to picture: ', pic_name);
            }
        }
    };
    PictureController.prototype.changePicture = function () {
        this._needChange = true;
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], PictureController.prototype, "name", void 0);
    PictureController = tslib_1.__decorate([
        engine_1.default.decorators.serialize("pictureController")
    ], PictureController);
    return PictureController;
}(engine_1.default.Script));
exports.default = PictureController;
//# sourceMappingURL=pictureController.js.map
