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
        return _this;
    }
    MusicController.prototype.onAwake = function () {
        var _this = this;
        engine_1.default.game.markAsPersist(this.entity);
        engine_1.default.game.customEventEmitter.on('JUMP_END', function () {
            _this.changeMusic();
        });
        this._bgm = this.entity.transform.findChildByName('BGM').entity.getComponent(engine_1.default.AudioSource);
        this._episode = this.entity.transform.findChildByName('Episode').entity.getComponent(engine_1.default.AudioSource);
    };
    MusicController.prototype.onUpdate = function (dt) {
        if (!this._pause_bg) {
            if (this._bgm.canplay && !this._bgm.playing) {
                this._bgm.play();
                this._episode.pause();
            }
        }
        else {
            this._episode.playing && this._bgm.pause();
        }
    };
    MusicController.prototype.onDestroy = function () {
    };
    MusicController.prototype.changeMusic = function () {
        var _this = this;
        this._pause_bg = !this._pause_bg;
        var util = function (asset) {
            _this._episode.audioSourceNode.destroy();
            _this._episode = _this.entity.addComponent(engine_1.default.AudioSource);
            _this._episode_name = _this._album[_this._episode_id];
            _this._episode_id = (_this._episode_id + 1) % _this._album.length;
            _this._episode.clip = asset;
            _this._episode.loop = true;
            console.log('Will play this song: ', _this._episode_name);
            if (_this._episode.clip === null) {
                console.log(_this._episode_name, 'not valid');
            }
        };
        if (this._pause_bg) {
            if (0) {
                util(engine_1.default.loader.getAsset(this._episode_name));
            }
            else {
                engine_1.default.loader.load(this._album[this._episode_id]).promise.then(function (asset) {
                    util(asset);
                });
            }
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
