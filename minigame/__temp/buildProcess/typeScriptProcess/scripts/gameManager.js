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
        _this.cubePrefab_ = null;
        _this.cylinderPrefab_ = null;
        _this.posTransition = [];
        return _this;
    }
    gameManager.prototype.onAwake = function () {
        var _this = this;
        for (var i = 1; i <= 3; ++i) {
            this.posTransition.push(engine_1.Vector3.createFromNumber(-i * 0.3 - 1, 0, 0));
            this.posTransition.push(engine_1.Vector3.createFromNumber(0, 0, i * 0.3 + 1));
        }
        engine_1.default.game.customEventEmitter.on('JUMP_END', function () {
            _this.onJumpEnd();
        });
    };
    gameManager.prototype.initRoad = function () {
        var first = this.cubePrefab_.instantiate();
        first.transform.position = engine_1.Vector3.createFromNumber(0, 0, 0);
        console.log(first.transform.position);
        this.entity.transform.addChild(first.transform);
        var second = this.cylinderPrefab_.instantiate();
        second.transform.position = engine_1.Vector3.createFromNumber(-2, 0, 0);
        console.log(second.transform.position);
        this.entity.transform.addChild(second.transform);
        this.bodyController_.targetPos = second.transform.position;
        this.cameraController_.targetAnchor = engine_1.Vector3.createFromNumber(-1, 0, 0);
    };
    gameManager.prototype.onEnable = function () {
        this.initRoad();
    };
    gameManager.prototype.addNewStone = function () {
        var prevTargetPos = this.bodyController_.targetPos.clone();
        var choice = Math.floor(Math.random() * 2);
        var prefab = choice ? this.cubePrefab_ : this.cylinderPrefab_;
        var stone = prefab.instantiate();
        var id = Math.floor(Math.random() * 6);
        stone.transform.position = this.bodyController_.targetPos.add(this.posTransition[id]);
        stone.transform.position.y = 0;
        this.entity.transform.addChild(stone.transform);
        this.bodyController_.targetPos = stone.transform.position;
        this.cameraController_.shiftCameraPos(this.bodyController_.targetPos.add(prevTargetPos).scale(0.5));
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
    ], gameManager.prototype, "cubePrefab_", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.Prefab
        })
    ], gameManager.prototype, "cylinderPrefab_", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: bodyController_1.default
        })
    ], gameManager.prototype, "bodyController_", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: cameraController_1.default
        })
    ], gameManager.prototype, "cameraController_", void 0);
    gameManager = tslib_1.__decorate([
        engine_1.default.decorators.serialize("gameManager")
    ], gameManager);
    return gameManager;
}(engine_1.default.Script));
exports.default = gameManager;
//# sourceMappingURL=gameManager.js.map
