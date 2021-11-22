
import engine, { TouchInputComponent, TouchInputEvent } from "engine";

@engine.decorators.serialize("panelController")
export default class PanelController extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.String
    })
    public name: string = "myname"

    private _album: string[] = [
        'musics/1.mp3',
        'musics/2.mp3',
        'musics/3.mp3',
    ];

    private _enableInput: boolean = true;
    private _start_triggered: boolean = true;

    private _audio = wx.createInnerAudioContext();
    private _bgm = wx.createInnerAudioContext();
    private _pause_bg: boolean = false;
    private _needChange: boolean = false;
    private _episode_id: number = 0;
    private _episode_map: Map<string, engine.AudioClip> = new Map();
    private _startButton: engine.Entity = this.entity.transform2D.findChildByName('Button').entity;
    private _background: engine.Entity = this.entity.transform2D.findChildByName('Background').entity;
    private _ready: boolean = false;

    public onTouchStart(touch: TouchInputComponent, event: TouchInputEvent) {
        // Check if input is enabled.
        if (!this._enableInput) {
            return;
        }
        this._start_triggered = true;
        engine.game.customEventEmitter.emit('TOUCH_START');
    }

    public onTouchEnd(touch: TouchInputComponent, event: TouchInputEvent) {
        // Check if input is enabled.
        if (!this._enableInput || !this._start_triggered) {
            return;
        }
        // Disable input after touch end.
        this._enableInput = false;
        this._start_triggered = false;
        // console.log('touch end');
        engine.game.customEventEmitter.emit('TOUCH_END');
    }

    public onAwake() {
        const startComponent: engine.TouchInputComponent = this._startButton.getComponent(engine.TouchInputComponent);
        startComponent.onClick.add((touch, event) => {
            if (!this._ready) {
                return;
            }
            // const bgSprite: engine.UISprite = this._background.getComponent(engine.UISprite);
            // bgSprite.alpha = 255;
            this._background.active = false;
            this._startButton.active = false;
        });

        engine.game.customEventEmitter.on('JUMP_END', () => {
            // Change music.
            this.changeMusic();
        });

        engine.game.customEventEmitter.on('CAMERA_MOVE', () => {
            this._enableInput = true;
        });

        this._bgm.loop = true;
        this._bgm.onCanplay(() => {
            console.log('Will play BGM');
            this._bgm.play();
            this._audio.pause();
            // Ready to start.
            this._ready = true;
            const label: engine.UILabel = this._startButton.transform2D.findChildByName('UILabel').entity.getComponent(engine.UILabel);
            label.text = 'Start';
        });
        engine.loader.load('musics/0.mp3', { cacheable: true, httpPriority: 100 }).promise.then((asset: engine.AudioClip) => {
            console.log('Loaded BGM');
            this._bgm.src = asset.fileSrc;
        })
        // Pre-load.
        for (let song of this._album) {
            engine.loader.load(song, { cacheable: true }).promise.then((asset: engine.AudioClip) => {
                console.log('Loaded music: ', song);
                this._episode_map.set(song, asset);
            })
        }
        // this._audio.autoplay = true;
        this._audio.loop = true;
        this._audio.onCanplay(() => {
            console.log('Will play this song: ', this._album[this._episode_id]);
            this._audio.play();
            this._bgm.pause();
            this._episode_id = (this._episode_id + 1) % this._album.length;
        });
    }
    public onUpdate(dt: number) {
        if (this._needChange) {
            const episode_name = this._album[this._episode_id];
            if (this._episode_map.has(episode_name)) {
                this._audio.src = this._episode_map.get(episode_name).fileSrc;
                this._needChange = false;
            } else {
                console.log(episode_name, ' not valid');
            }
        }
        if (!this._pause_bg) {
            if (this._bgm.paused) {
                this._bgm.play();
                this._audio.pause();
            }
        }
    }
    public onDestroy() {

    }
    public changeMusic() {
        this._pause_bg = !this._pause_bg;
        if (this._pause_bg) {
            // console.log(this._episode_map);
            this._needChange = true;
        }
    }
}
