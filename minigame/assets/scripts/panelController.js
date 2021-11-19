"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var PanelController = (function (_super) {
    tslib_1.__extends(PanelController, _super);
    function PanelController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        _this._enableInput = true;
        _this._start_triggered = true;
        return _this;
    }
    PanelController.prototype.onTouchStart = function (touch, event) {
        if (!this._enableInput) {
            return;
        }
        this._start_triggered = true;
        engine_1.default.game.customEventEmitter.emit('TOUCH_START');
    };
    PanelController.prototype.onTouchEnd = function (touch, event) {
        if (!this._enableInput || !this._start_triggered) {
            return;
        }
        this._enableInput = false;
        this._start_triggered = false;
        engine_1.default.game.customEventEmitter.emit('TOUCH_END');
    };
    PanelController.prototype.onAwake = function () {
        var _this = this;
        engine_1.default.game.customEventEmitter.on('CAMERA_MOVE', function () {
            _this._enableInput = true;
        });
        var that = this;
        this._load_task = engine_1.default.loader.load("scenes/mv.scene");
        this._load_task.promise.then(function (scene) {
            engine_1.default.game.playScene(scene);
        });
    };
    PanelController.prototype.onUpdate = function (dt) {
        if (this._load_task.progress.current < this._load_task.progress.total) {
            var rate = this._load_task.progress.current / this._load_task.progress.total;
            rate = Math.floor(rate * 1000) / 1000;
            console.log(rate);
        }
    };
    PanelController.prototype.onDestroy = function () {
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], PanelController.prototype, "name", void 0);
    PanelController = tslib_1.__decorate([
        engine_1.default.decorators.serialize("panelController")
    ], PanelController);
    return PanelController;
}(engine_1.default.Script));
exports.default = PanelController;
//# sourceMappingURL=panelController.js.map
