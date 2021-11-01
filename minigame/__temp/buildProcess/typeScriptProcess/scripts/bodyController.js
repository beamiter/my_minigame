"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var bodyController = (function (_super) {
    tslib_1.__extends(bodyController, _super);
    function bodyController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        _this.canJump_ = false;
        _this.curTime_ = 0.0;
        _this.epochTime_ = 0.5;
        _this.yCoordinate_ = 0.55;
        _this.rotateAxis_ = 0;
        _this.jumpHeight_ = 2;
        _this.deltaPos_ = new engine_1.Vector3();
        _this.targetPos_ = new engine_1.Vector3();
        return _this;
    }
    Object.defineProperty(bodyController.prototype, "targetPos", {
        get: function () {
            return this.targetPos_;
        },
        set: function (pos) {
            this.targetPos_ = pos.clone();
            this.targetPos_.y = this.yCoordinate_;
            this.targetPos_.sub(this.entity.transform.position, this.deltaPos_);
        },
        enumerable: false,
        configurable: true
    });
    bodyController.prototype.onTouchEnd = function () {
        this.canJump_ = true;
    };
    bodyController.prototype.onAwake = function () {
        var _this = this;
        engine_1.default.game.customEventEmitter.on('TOUCH_END', function () {
            _this.onTouchEnd();
        });
    };
    bodyController.prototype.onUpdate = function (dt) {
        if (!this.canJump_) {
            return;
        }
        if (this.curTime_ <= this.epochTime_) {
            this.curTime_ += dt;
            var ratio = dt / this.epochTime_;
            var dir = Math.sign(this.epochTime_ / 2 - this.curTime_);
            this.entity.transform.position.add(engine_1.Vector3.createFromNumber(this.deltaPos_.x * ratio, dir * this.jumpHeight_ * ratio, this.deltaPos_.z * ratio), this.entity.transform.position);
        }
        else {
            this.entity.transform.position = this.targetPos_;
            this.curTime_ = 0;
            this.canJump_ = false;
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
