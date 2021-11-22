"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var PictureController = (function (_super) {
    tslib_1.__extends(PictureController, _super);
    function PictureController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        _this._hidden = true;
        _this._epochTime = 0.5;
        _this._canMove = false;
        _this._curTime = 0;
        _this._deltaPos = engine_1.Vector3.createFromNumber(0, 0, 0);
        _this._targetPos = engine_1.Vector3.createFromNumber(0, 0, 0);
        _this._previousPos = new engine_1.Vector3();
        _this._id = 0;
        _this._album = [];
        _this._spriteMap = new Map();
        _this._needChange = false;
        return _this;
    }
    Object.defineProperty(PictureController.prototype, "hidden", {
        get: function () {
            return this._hidden;
        },
        set: function (h) {
            this._hidden = h;
            this._canMove = true;
            this._previousPos = this._child.transform.position.clone();
            if (this._hidden) {
                this._targetPos = engine_1.Vector3.createFromNumber(0, -2.5, 0);
            }
            else {
                this._targetPos = engine_1.Vector3.createFromNumber(0, 0, 0);
            }
            this._targetPos.sub(this._previousPos, this._deltaPos);
        },
        enumerable: false,
        configurable: true
    });
    PictureController.prototype.onAwake = function () {
        var _this = this;
        this._child = this.entity.transform.findChildByName('Picture').entity;
        this._uiSprite = this._child.getComponent(engine_1.default.UISprite);
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
        if (this._needChange) {
            var pic_name = this._album[this._id];
            if (this._spriteMap.has(pic_name)) {
                this._needChange = false;
                this._uiSprite.spriteFrame = this._spriteMap.get(pic_name);
            }
        }
        if (!this._canMove) {
            return;
        }
        if (this._curTime >= this._epochTime) {
            this._curTime = 0;
            this._canMove = false;
            if (this._hidden) {
                this._id = (this._id + 1) % this._album.length;
                this._needChange = true;
            }
        }
        else {
            this._curTime += dt;
            var ratio = this._curTime / this._epochTime;
            this._previousPos.add(engine_1.Vector3.createFromNumber(this._deltaPos.x * ratio, this._deltaPos.y * ratio, this._deltaPos.z * ratio), this._child.transform.position);
        }
    };
    PictureController.prototype.onDestroy = function () {
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
