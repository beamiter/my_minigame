"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var CameraController = (function (_super) {
    tslib_1.__extends(CameraController, _super);
    function CameraController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        _this._targetAnchor = engine_1.Vector3.createFromNumber(0, 0, 0);
        _this._deltaPos = engine_1.Vector3.createFromNumber(0, 0, 0);
        _this._targetPos = engine_1.Vector3.createFromNumber(0, 0, 0);
        _this._epochTime = 0.5;
        _this._canMove = false;
        _this._curTime = 0;
        return _this;
    }
    CameraController.prototype.shiftCameraPos = function (pos) {
        var prevPos = this._targetAnchor.clone();
        this._targetAnchor = pos;
        this._deltaPos.x = this._targetAnchor.x - prevPos.x;
        this._deltaPos.z = this._targetAnchor.z - prevPos.z;
        this.entity.transform.position.add(this._deltaPos, this._targetPos);
        this._canMove = true;
    };
    Object.defineProperty(CameraController.prototype, "targetAnchor", {
        get: function () {
            return this._targetAnchor;
        },
        set: function (pos) {
            this._targetAnchor = pos.clone();
        },
        enumerable: false,
        configurable: true
    });
    CameraController.prototype.onAwake = function () {
    };
    CameraController.prototype.onUpdate = function (dt) {
        if (!this._canMove) {
            return;
        }
        if (this._curTime > this._epochTime) {
            this.entity.transform.position = this._targetPos;
            this._curTime = 0;
            this._canMove = false;
            engine_1.default.game.customEventEmitter.emit('CAMERA_MOVE');
        }
        else {
            this._curTime += dt;
            var ratio = dt / this._epochTime;
            this.entity.transform.position.add(engine_1.Vector3.createFromNumber(this._deltaPos.x * ratio, 0, this._deltaPos.z * ratio), this.entity.transform.position);
        }
    };
    CameraController.prototype.onDestroy = function () {
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], CameraController.prototype, "name", void 0);
    CameraController = tslib_1.__decorate([
        engine_1.default.decorators.serialize("cameraController")
    ], CameraController);
    return CameraController;
}(engine_1.default.Script));
exports.default = CameraController;
//# sourceMappingURL=cameraController.js.map
