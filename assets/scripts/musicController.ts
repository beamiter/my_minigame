
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
    private _episode: engine.AudioSource;
    private _pause_bg: boolean = false;
    private _episode_id: number = 0;
    private _episode_name: string;

    public onAwake() {
        engine.game.markAsPersist(this.entity);
        engine.game.customEventEmitter.on('JUMP_END', () => {
            // Change music.
            this.changeMusic();
        });
        this._bgm = this.entity.transform.findChildByName('BGM').entity.getComponent(engine.AudioSource);
        this._episode = this.entity.transform.findChildByName('Episode').entity.getComponent(engine.AudioSource);
        // No need pre-load.
        // for (let song of this._album) {
        //     engine.loader.load(song, { cacheable: true }).promise.then(_ => {
        //         console.log(song, ' loaded');
        //     })
        // }
    }
    public onUpdate(dt: number) {
        if (!this._pause_bg) {
            if (this._bgm.canplay && !this._bgm.playing) {
                this._bgm.play();
                this._episode.pause();
            }
        } else {
            this._episode.playing && this._bgm.pause();
        }
    }
    public onDestroy() {
    }

    public changeMusic() {
        this._pause_bg = !this._pause_bg;
        const util = (asset: engine.AudioClip) => {
            this._episode.audioSourceNode.destroy();
            this._episode = this.entity.addComponent(engine.AudioSource);
            this._episode_name = this._album[this._episode_id];
            this._episode_id = (this._episode_id + 1) % this._album.length;
            this._episode.clip = asset;
            this._episode.loop = true;
            console.log('Will play this song: ', this._episode_name);
            if (this._episode.clip === null) {
                console.log(this._episode_name, 'not valid');
            }
        };
        if (this._pause_bg) {
            if (0) {
                // 1. Sync.
                util(engine.loader.getAsset(this._episode_name));
            } else {
                // 2. Async.
                engine.loader.load(this._album[this._episode_id]).promise.then((asset: engine.AudioClip) => {
                    util(asset);
                });
            }
        }
    }

}
