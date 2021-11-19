"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var start = (function (_super) {
    tslib_1.__extends(start, _super);
    function start() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        _this._scene_loaded = false;
        return _this;
    }
    start.prototype.onAwake = function () {
        var that = this;
        var load_task = engine_1.default.loader.load("scenes/mv.scene");
        load_task.promise.then(function (scene) {
            engine_1.default.game.playScene(scene);
            that._scene_loaded = true;
        });
    };
    start.prototype.onUpdate = function (dt) {
    };
    start.prototype.onDestroy = function () {
    };
    start.prototype.onTouchEnd = function (touch, event) {
        if (this._scene_loaded === false) {
            return;
        }
        this.entity.transform2D.parent.entity.destroyImmediate();
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], start.prototype, "name", void 0);
    start = tslib_1.__decorate([
        engine_1.default.decorators.serialize("start")
    ], start);
    return start;
}(engine_1.default.Script));
exports.default = start;
//# sourceMappingURL=start.js.map
