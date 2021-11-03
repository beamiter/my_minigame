"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var jumpAnimation = (function (_super) {
    tslib_1.__extends(jumpAnimation, _super);
    function jumpAnimation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        return _this;
    }
    jumpAnimation.prototype.onAwake = function () {
    };
    jumpAnimation.prototype.onStart = function () {
        this.animComp.play('jump', 0, engine_1.Animation.WrapMode.Loop);
    };
    jumpAnimation.prototype.onUpdate = function (dt) {
    };
    jumpAnimation.prototype.onDestroy = function () {
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], jumpAnimation.prototype, "name", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.Animation
        })
    ], jumpAnimation.prototype, "animComp", void 0);
    jumpAnimation = tslib_1.__decorate([
        engine_1.default.decorators.serialize("jumpAnimation")
    ], jumpAnimation);
    return jumpAnimation;
}(engine_1.default.Script));
exports.default = jumpAnimation;
//# sourceMappingURL=jumpAnimation.js.map
