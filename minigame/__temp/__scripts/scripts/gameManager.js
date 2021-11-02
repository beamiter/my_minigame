"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var bodyController_1 = require("../scripts/bodyController");
var cameraController_1 = require("../scripts/cameraController");
var GameState;
(function (GameState) {
    GameState[GameState["GS_INIT"] = 0] = "GS_INIT";
    GameState[GameState["GS_PLAYING"] = 1] = "GS_PLAYING";
    GameState[GameState["GS_END"] = 2] = "GS_END";
})(GameState || (GameState = {}));
var gameManager = (function (_super) {
    tslib_1.__extends(gameManager, _super);
    function gameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        _this._cubePrefab = null;
        _this._cylinderPrefab = null;
        _this._posTransition = [];
        _this._transformPool = [];
        return _this;
    }
    gameManager.prototype.onAwake = function () {
        var _this = this;
        for (var i = 1; i <= 3; ++i) {
            this._posTransition.push(engine_1.Vector3.createFromNumber(-i * 0.3 - 1, 0, 0));
            this._posTransition.push(engine_1.Vector3.createFromNumber(0, 0, i * 0.3 + 1));
        }
        engine_1.default.game.customEventEmitter.on('JUMP_END', function () {
            _this.onJumpEnd();
        });
    };
    gameManager.prototype.initRoad = function () {
        var first = this._cubePrefab.instantiate();
        first.transform.position = engine_1.Vector3.createFromNumber(0, 0, 0);
        console.log(first.transform.position);
        this.entity.transform.addChild(first.transform);
        this._transformPool.push(first.transform);
        var second = this._cylinderPrefab.instantiate();
        second.transform.position = engine_1.Vector3.createFromNumber(-2, 0, 0);
        console.log(second.transform.position);
        this.entity.transform.addChild(second.transform);
        this._transformPool.push(second.transform);
        this._bodyController.targetPos = second.transform.position;
        this._cameraController.targetAnchor = engine_1.Vector3.createFromNumber(-1, 0, 0);
    };
    gameManager.prototype.onEnable = function () {
        this.initRoad();
    };
    gameManager.prototype.addNewStone = function () {
        var prevTargetPos = this._bodyController.targetPos.clone();
        var choice = Math.floor(Math.random() * 2);
        var prefab = choice ? this._cubePrefab : this._cylinderPrefab;
        var stone = prefab.instantiate();
        var id = Math.floor(Math.random() * 6);
        stone.transform.position = this._bodyController.targetPos.add(this._posTransition[id]);
        stone.transform.position.y = 0;
        this.entity.transform.addChild(stone.transform);
        this._transformPool.push(stone.transform);
        if (this._transformPool.length > 6) {
            this.entity.transform.removeChild(this._transformPool.shift());
        }
        this._bodyController.targetPos = stone.transform.position;
        this._cameraController.shiftCameraPos(this._bodyController.targetPos.add(prevTargetPos).scale(0.5));
    };
    gameManager.prototype.onJumpEnd = function () {
        this.addNewStone();
    };
    gameManager.prototype.onUpdate = function (dt) {
    };
    gameManager.prototype.onDestroy = function () {
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], gameManager.prototype, "name", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.Prefab
        })
    ], gameManager.prototype, "_cubePrefab", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.Prefab
        })
    ], gameManager.prototype, "_cylinderPrefab", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: bodyController_1.default
        })
    ], gameManager.prototype, "_bodyController", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: cameraController_1.default
        })
    ], gameManager.prototype, "_cameraController", void 0);
    gameManager = tslib_1.__decorate([
        engine_1.default.decorators.serialize("gameManager")
    ], gameManager);
    return gameManager;
}(engine_1.default.Script));
exports.default = gameManager;
//# sourceMappingURL=gameManager.js.map
