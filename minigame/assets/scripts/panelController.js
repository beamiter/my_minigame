"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var pictureController_1 = require("./pictureController");
var PanelController = (function (_super) {
    tslib_1.__extends(PanelController, _super);
    function PanelController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        _this._album = [
            'musics/1.mp3',
            'musics/2.mp3',
            'musics/3.mp3',
        ];
        _this._enableInput = true;
        _this._start_triggered = true;
        _this._audio = wx.createInnerAudioContext();
        _this._bgm = wx.createInnerAudioContext();
        _this._pause_bg = false;
        _this._needChange = false;
        _this._episode_id = 0;
        _this._episode_map = new Map();
        _this._startButton = _this.entity.transform2D.findChildByName('Button').entity;
        _this._background = _this.entity.transform2D.findChildByName('Background').entity;
        _this._ready = false;
        return _this;
    }
    PanelController.prototype.onTouchStart = function (touch, event) {
        this._pictureController.hidden = true;
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
        var startComponent = this._startButton.getComponent(engine_1.default.TouchInputComponent);
        startComponent.onClick.add(function (touch, event) {
            if (!_this._ready) {
                return;
            }
            var uiSprite = _this._background.getComponent(engine_1.default.UISprite);
            uiSprite.spriteFrame = null;
            _this._pictureController.hidden = true;
            _this._startButton.active = false;
        });
        engine_1.default.game.customEventEmitter.on('JUMP_END', function () {
            _this.changeMusic();
            if (!_this._needChange) {
                _this._pictureController.changePicture();
            }
            else {
                _this._pictureController.hidden = false;
            }
        });
        engine_1.default.game.customEventEmitter.on('CAMERA_MOVE', function () {
            _this._enableInput = true;
        });
        this._bgm.loop = true;
        this._bgm.onCanplay(function () {
            console.log('Will play BGM');
            _this._bgm.play();
            _this._audio.pause();
            _this._ready = true;
            var label = _this._startButton.transform2D.findChildByName('UILabel').entity.getComponent(engine_1.default.UILabel);
            label.text = 'Start';
        });
        engine_1.default.loader.load('musics/0.mp3', { cacheable: true, httpPriority: 100 }).promise.then(function (asset) {
            console.log('Loaded BGM');
            _this._bgm.src = asset.fileSrc;
        });
        var _loop_1 = function (song) {
            engine_1.default.loader.load(song, { cacheable: true }).promise.then(function (asset) {
                console.log('Loaded music: ', song);
                _this._episode_map.set(song, asset);
            });
        };
        for (var _i = 0, _a = this._album; _i < _a.length; _i++) {
            var song = _a[_i];
            _loop_1(song);
        }
        this._audio.loop = true;
        this._audio.onCanplay(function () {
            console.log('Will play this song: ', _this._album[_this._episode_id]);
            _this._audio.play();
            _this._bgm.pause();
            _this._episode_id = (_this._episode_id + 1) % _this._album.length;
        });
    };
    PanelController.prototype.onUpdate = function (dt) {
        if (this._needChange) {
            var episode_name = this._album[this._episode_id];
            if (this._episode_map.has(episode_name)) {
                this._audio.src = this._episode_map.get(episode_name).fileSrc;
                this._needChange = false;
            }
            else {
                console.log(episode_name, ' not valid');
            }
        }
        if (!this._pause_bg) {
            if (this._bgm.paused) {
                this._bgm.play();
                this._audio.pause();
            }
        }
    };
    PanelController.prototype.onDestroy = function () {
    };
    PanelController.prototype.changeMusic = function () {
        this._pause_bg = !this._pause_bg;
        if (this._pause_bg) {
            this._needChange = true;
        }
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], PanelController.prototype, "name", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: pictureController_1.default
        })
    ], PanelController.prototype, "_pictureController", void 0);
    PanelController = tslib_1.__decorate([
        engine_1.default.decorators.serialize("panelController")
    ], PanelController);
    return PanelController;
}(engine_1.default.Script));
exports.default = PanelController;
//# sourceMappingURL=panelController.js.map
