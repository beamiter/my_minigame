"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var cameraController = (function (_super) {
    tslib_1.__extends(cameraController, _super);
    function cameraController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        _this._targetAnchor = engine_1.Vector3.createFromNumber(0, 0, 0);
        return _this;
    }
    cameraController.prototype.shiftCameraPos = function (pos) {
        var prevPos = this._targetAnchor.clone();
        this._targetAnchor = pos;
        this._targetAnchor.y = 0;
        var shiftPos = this._targetAnchor.sub(prevPos);
        console.log(pos, shiftPos);
        this.entity.transform.position.add(shiftPos, this.entity.transform.position);
    };
    Object.defineProperty(cameraController.prototype, "targetAnchor", {
        get: function () {
            return this._targetAnchor;
        },
        set: function (pos) {
            this._targetAnchor = pos.clone();
        },
        enumerable: false,
        configurable: true
    });
    cameraController.prototype.onAwake = function () {
    };
    cameraController.prototype.onUpdate = function (dt) {
    };
    cameraController.prototype.onDestroy = function () {
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], cameraController.prototype, "name", void 0);
    cameraController = tslib_1.__decorate([
        engine_1.default.decorators.serialize("cameraController")
    ], cameraController);
    return cameraController;
}(engine_1.default.Script));
exports.default = cameraController;
//# sourceMappingURL=cameraController.js.map
