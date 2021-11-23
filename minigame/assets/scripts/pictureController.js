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
        _this._needUpdate = false;
        _this._epochTime = 0.5;
        _this._curTime = 0;
        _this._id = 0;
        _this._uiSprite = _this.entity.getComponent(engine_1.default.UISprite);
        _this._album = [];
        _this._previousAlpha = 0;
        _this._targetAlpha = 0;
        _this._deltaAlpha = 0;
        return _this;
    }
    Object.defineProperty(PictureController.prototype, "hidden", {
        get: function () {
            return this._hidden;
        },
        set: function (h) {
            this._needUpdate = (h !== this._hidden);
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
        for (var i = 0; i < 45; ++i) {
            this._album.push('pictures/m' + i + '.spriteframe');
        }
    };
    PictureController.prototype.onUpdate = function (dt) {
        if (!this._needUpdate) {
            return;
        }
        this._curTime += dt;
        if (this._curTime >= this._epochTime) {
            this._curTime = 0;
            this._needUpdate = false;
            this._uiSprite.alpha = this._targetAlpha;
        }
        else {
            this._uiSprite.alpha = this._previousAlpha + this._curTime / this._epochTime * this._deltaAlpha;
        }
    };
    PictureController.prototype.changePicture = function () {
        var _this = this;
        var pic_name = this._album[this._id];
        engine_1.default.loader.load(pic_name, { cacheable: true }).promise.then(function (asset) {
            console.log("Loaded picture: ", pic_name);
            _this._uiSprite.spriteFrame = asset;
            _this._id = (_this._id + 1) % _this._album.length;
        });
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
