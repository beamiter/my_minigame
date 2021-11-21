"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var bodyController_1 = require("../scripts/bodyController");
var cameraController_1 = require("../scripts/cameraController");
var gameManager = (function (_super) {
    tslib_1.__extends(gameManager, _super);
    function gameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        _this._cubePrefab = null;
        _this._cylinderPrefab = null;
        _this._posTransition = [];
        _this._transformPool = [];
        _this._myColor = [
            engine_1.Vector3.createFromNumber(204, 255, 255).scale(1 / 255),
            engine_1.Vector3.createFromNumber(204, 255, 153).scale(1 / 255),
            engine_1.Vector3.createFromNumber(204, 255, 204).scale(1 / 255),
            engine_1.Vector3.createFromNumber(153, 204, 153).scale(1 / 255),
            engine_1.Vector3.createFromNumber(204, 255, 255).scale(1 / 255),
            engine_1.Vector3.createFromNumber(255, 204, 153).scale(1 / 255),
            engine_1.Vector3.createFromNumber(204, 204, 204).scale(1 / 255),
            engine_1.Vector3.createFromNumber(153, 204, 255).scale(1 / 255),
            engine_1.Vector3.createFromNumber(204, 204, 255).scale(1 / 255),
            engine_1.Vector3.createFromNumber(204, 255, 153).scale(1 / 255),
            engine_1.Vector3.createFromNumber(255, 255, 204).scale(1 / 255),
            engine_1.Vector3.createFromNumber(255, 153, 204).scale(1 / 255),
            engine_1.Vector3.createFromNumber(255, 102, 102).scale(1 / 255),
            engine_1.Vector3.createFromNumber(204, 51, 153).scale(1 / 255),
            engine_1.Vector3.createFromNumber(102, 204, 204).scale(1 / 255),
            engine_1.Vector3.createFromNumber(204, 102, 0).scale(1 / 255),
            engine_1.Vector3.createFromNumber(153, 153, 153).scale(1 / 255),
            engine_1.Vector3.createFromNumber(9, 153, 102).scale(1 / 255),
            engine_1.Vector3.createFromNumber(204, 0, 102).scale(1 / 255),
            engine_1.Vector3.createFromNumber(0, 153, 153).scale(1 / 255),
            engine_1.Vector3.createFromNumber(153, 204, 51).scale(1 / 255),
            engine_1.Vector3.createFromNumber(255, 102, 102).scale(1 / 255),
            engine_1.Vector3.createFromNumber(51, 102, 153).scale(1 / 255),
            engine_1.Vector3.createFromNumber(255, 102, 0).scale(1 / 255),
        ];
        return _this;
    }
    gameManager.prototype.onAwake = function () {
        var _this = this;
        for (var i = 1; i <= 3; ++i) {
            this._posTransition.push(engine_1.Vector3.createFromNumber(-i * 0.3 - 1, 0, 0));
            this._posTransition.push(engine_1.Vector3.createFromNumber(0, 0, i * 0.3 + 1));
        }
        var that = this.entity;
        engine_1.default.game.customEventEmitter.on('JUMP_END', function () {
            _this.addNewStone(that);
        });
    };
    gameManager.prototype.initRoad = function () {
        var first = this._cubePrefab.instantiate();
        first.transform.position = engine_1.Vector3.createFromNumber(0, 0, 0);
        this.entity.transform.addChild(first.transform);
        this._transformPool.push(first);
        var second = this._cylinderPrefab.instantiate();
        second.transform.position = engine_1.Vector3.createFromNumber(-2, 0, 0);
        this.entity.transform.addChild(second.transform);
        this._transformPool.push(second);
        this._bodyController.targetPos = second.transform.position;
        this._cameraController.targetAnchor = engine_1.Vector3.createFromNumber(-1, 0, 0);
    };
    gameManager.prototype.onEnable = function () {
        this.initRoad();
    };
    gameManager.prototype.addNewStone = function (that) {
        var _this = this;
        var prevTargetPos = this._bodyController.targetPos.clone();
        var choice = Math.floor(Math.random() * 2);
        var prefab = choice ? this._cubePrefab : this._cylinderPrefab;
        var stone = prefab.instantiate();
        var pos_id = Math.floor(Math.random() * 6);
        stone.transform.position = this._bodyController.targetPos.add(this._posTransition[pos_id]);
        stone.transform.position.y = 0;
        var frame_id = Math.floor(Math.random() * 8);
        var frame_name = 'pictures/' + frame_id + '.spriteframe';
        engine_1.default.loader.load(frame_name).promise.then(function (asset) {
            var uiSpriteComponent = stone.transform.findChildByName('illustrator').entity.getComponent(engine_1.default.UISprite);
            uiSpriteComponent.spriteFrame = asset;
            var meshRenderer = stone.getComponent(engine_1.default.MeshRenderer);
            var color_id = Math.floor(Math.random() * _this._myColor.length);
            meshRenderer.material.setVector("_Color", _this._myColor[color_id]);
            that.transform.addChild(stone.transform);
            _this._transformPool.push(stone);
            if (_this._transformPool.length > 6) {
                var old_node = _this._transformPool.shift();
                that.transform.removeChild(old_node.transform);
                old_node.destroyImmediate();
            }
            _this._bodyController.targetPos = stone.transform.position;
            _this._cameraController.shiftCameraPos(_this._bodyController.targetPos.add(prevTargetPos).scale(0.5));
        });
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
