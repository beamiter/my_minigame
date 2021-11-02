"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var bodyController = (function (_super) {
    tslib_1.__extends(bodyController, _super);
    function bodyController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        _this._canJump = false;
        _this._curTime = 0.0;
        _this._epochTime = 0.5;
        _this._yCoordinate = 0.55;
        _this._rotateAxis = 0;
        _this._jumpHeight = 2;
        _this._deltaPos = new engine_1.Vector3();
        _this._targetPos = new engine_1.Vector3();
        return _this;
    }
    Object.defineProperty(bodyController.prototype, "targetPos", {
        get: function () {
            return this._targetPos;
        },
        set: function (pos) {
            this._targetPos = pos.clone();
            this._targetPos.y = this._yCoordinate;
            this._targetPos.sub(this.entity.transform.position, this._deltaPos);
        },
        enumerable: false,
        configurable: true
    });
    bodyController.prototype.onTouchEnd = function () {
        this._canJump = true;
    };
    bodyController.prototype.onAwake = function () {
        var _this = this;
        engine_1.default.game.customEventEmitter.on('TOUCH_END', function () {
            _this.onTouchEnd();
        });
    };
    bodyController.prototype.onUpdate = function (dt) {
        if (!this._canJump) {
            return;
        }
        if (this._curTime <= this._epochTime) {
            this._curTime += dt;
            var ratio = dt / this._epochTime;
            var dir = Math.sign(this._epochTime / 2 - this._curTime);
            this.entity.transform.position.add(engine_1.Vector3.createFromNumber(this._deltaPos.x * ratio, dir * this._jumpHeight * ratio, this._deltaPos.z * ratio), this.entity.transform.position);
        }
        else {
            this.entity.transform.position = this._targetPos;
            this._curTime = 0;
            this._canJump = false;
            engine_1.default.game.customEventEmitter.emit('JUMP_END');
        }
    };
    ;
    bodyController.prototype.onDestroy = function () {
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], bodyController.prototype, "name", void 0);
    bodyController = tslib_1.__decorate([
        engine_1.default.decorators.serialize("bodyController")
    ], bodyController);
    return bodyController;
}(engine_1.default.Script));
exports.default = bodyController;
//# sourceMappingURL=bodyController.js.map
