"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var MusicController = (function (_super) {
    tslib_1.__extends(MusicController, _super);
    function MusicController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        _this._album = [
            'musics/1.mp3',
            'musics/2.mp3',
            'musics/3.mp3',
        ];
        _this._pause_bg = false;
        _this._episode_id = 0;
        _this._episode_map = new Map();
        _this._audio = wx.createInnerAudioContext();
        _this._needChange = false;
        return _this;
    }
    MusicController.prototype.onAwake = function () {
        var _this = this;
        engine_1.default.game.markAsPersist(this.entity);
        engine_1.default.game.customEventEmitter.on('JUMP_END', function () {
            _this.changeMusic();
        });
        this._bgm = this.entity.transform.findChildByName('BGM').entity.getComponent(engine_1.default.AudioSource);
        engine_1.default.loader.load('musics/0.mp3', { cacheable: true }).promise.then(function (asset) {
            console.log('Loaded BGM');
            _this._bgm.clip = asset;
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
    MusicController.prototype.onUpdate = function (dt) {
        if (this._needChange) {
            var episode_name = this._album[this._episode_id];
            if (this._episode_map.has(episode_name)) {
                this._needChange = false;
                this._audio.src = this._episode_map.get(episode_name).fileSrc;
            }
            else {
                console.log(episode_name, ' not valid');
            }
        }
        if (!this._pause_bg) {
            if (this._bgm.canplay && !this._bgm.playing) {
                this._bgm.play();
                this._audio.pause();
            }
        }
    };
    MusicController.prototype.onDestroy = function () {
    };
    MusicController.prototype.changeMusic = function () {
        this._pause_bg = !this._pause_bg;
        if (this._pause_bg) {
            this._needChange = true;
        }
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], MusicController.prototype, "name", void 0);
    MusicController = tslib_1.__decorate([
        engine_1.default.decorators.serialize("musicController")
    ], MusicController);
    return MusicController;
}(engine_1.default.Script));
exports.default = MusicController;
//# sourceMappingURL=musicController.js.map
