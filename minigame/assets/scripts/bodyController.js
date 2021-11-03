"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var BodyController = (function (_super) {
    tslib_1.__extends(BodyController, _super);
    function BodyController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        _this._canMove = false;
        _this._curTime = 0.0;
        _this._epochTime = 0.5;
        _this._yCoordinate = 0.55;
        _this._rotateAxis = 0;
        _this._jumpHeight = 2;
        _this._deltaPos = new engine_1.Vector3();
        _this._targetPos = new engine_1.Vector3();
        return _this;
    }
    Object.defineProperty(BodyController.prototype, "targetPos", {
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
    BodyController.prototype.onTouchEnd = function () {
        this._canMove = true;
    };
    BodyController.prototype.onAwake = function () {
        var _this = this;
        engine_1.default.game.customEventEmitter.on('TOUCH_END', function () {
            _this.onTouchEnd();
        });
    };
    BodyController.prototype.onUpdate = function (dt) {
        if (!this._canMove) {
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
            this._canMove = false;
            engine_1.default.game.customEventEmitter.emit('JUMP_END');
        }
    };
    ;
    BodyController.prototype.onDestroy = function () {
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], BodyController.prototype, "name", void 0);
    BodyController = tslib_1.__decorate([
        engine_1.default.decorators.serialize("bodyController")
    ], BodyController);
    return BodyController;
}(engine_1.default.Script));
exports.default = BodyController;
//# sourceMappingURL=bodyController.js.map
