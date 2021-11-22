
import engine, { } from "engine";

@engine.decorators.serialize("musicController")
export default class MusicController extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.String
    })
    public name: string = "myname"

    private _album: string[] = [
        'musics/1.mp3',
        'musics/2.mp3',
        'musics/3.mp3',
    ];

    private _bgm: engine.AudioSource;
    private _pause_bg: boolean = false;
    private _episode_id: number = 0;
    private _episode_map: Map<string, engine.AudioClip> = new Map();
    private _audio = wx.createInnerAudioContext();
    private _needChange: boolean = false;

    public onAwake() {
        engine.game.markAsPersist(this.entity);
        engine.game.customEventEmitter.on('JUMP_END', () => {
            // Change music.
            this.changeMusic();
        });
        this._bgm = this.entity.transform.findChildByName('BGM').entity.getComponent(engine.AudioSource);
        engine.loader.load('musics/0.mp3', { cacheable: true }).promise.then((asset: engine.AudioClip) => {
            console.log('Loaded BGM');
            this._bgm.clip = asset;
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
                this._needChange = false;
                this._audio.src = this._episode_map.get(episode_name).fileSrc;
            } else {
                console.log(episode_name, ' not valid');
            }
        }
        if (!this._pause_bg) {
            if (this._bgm.canplay && !this._bgm.playing) {
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
