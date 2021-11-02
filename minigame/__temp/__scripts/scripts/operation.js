"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var operation = (function (_super) {
    tslib_1.__extends(operation, _super);
    function operation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        _this._enableInput = true;
        _this._start_triggered = true;
        return _this;
    }
    operation.prototype.onTouchStart = function (touch, event) {
        if (!this._enableInput) {
            return;
        }
        this._start_triggered = true;
        console.log('touch start');
        engine_1.default.game.customEventEmitter.emit('TOUCH_START');
    };
    operation.prototype.onTouchEnd = function (touch, event) {
        if (!this._enableInput || !this._start_triggered) {
            return;
        }
        this._enableInput = false;
        this._start_triggered = false;
        console.log('touch end');
        engine_1.default.game.customEventEmitter.emit('TOUCH_END');
    };
    operation.prototype.onJumpEnd = function () {
        this._enableInput = true;
    };
    operation.prototype.onAwake = function () {
        var _this = this;
        engine_1.default.game.customEventEmitter.on('JUMP_END', function () {
            _this.onJumpEnd();
        });
    };
    operation.prototype.onUpdate = function (dt) {
    };
    operation.prototype.onDestroy = function () {
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], operation.prototype, "name", void 0);
    operation = tslib_1.__decorate([
        engine_1.default.decorators.serialize("operation")
    ], operation);
    return operation;
}(engine_1.default.Script));
exports.default = operation;
//# sourceMappingURL=operation.js.map
