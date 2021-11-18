"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var cubeRotate = (function (_super) {
    tslib_1.__extends(cubeRotate, _super);
    function cubeRotate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        return _this;
    }
    cubeRotate.prototype.onAwake = function () {
    };
    cubeRotate.prototype.onUpdate = function (dt) {
        this.entity.transform.rotate(engine_1.Vector3.createFromNumber(0, dt * 30, 0), true, false);
    };
    cubeRotate.prototype.onDestroy = function () {
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], cubeRotate.prototype, "name", void 0);
    cubeRotate = tslib_1.__decorate([
        engine_1.default.decorators.serialize("cubeRotate")
    ], cubeRotate);
    return cubeRotate;
}(engine_1.default.Script));
exports.default = cubeRotate;
//# sourceMappingURL=cubeRotate.js.map
