
import engine, { Vector3 } from "engine";
@engine.decorators.serialize("pictureController")
export default class PictureController extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.String
    })
    public name: string = "myname"

    private _hidden: boolean = false;
    private _needUpdate: boolean = false;
    private _epochTime: number = 0.5;
    private _curTime: number = 0;
    private _id: number = 0;
    private _uiSprite: engine.UISprite = this.entity.getComponent(engine.UISprite);
    private _album: string[] = [];
    private _previousAlpha: number = 0;
    private _targetAlpha: number = 0;
    private _deltaAlpha: number = 0;

    // @ts-ignore
    set hidden(h: boolean) {
        this._needUpdate = (h !== this._hidden);
        this._hidden = h;
        this._previousAlpha = this._uiSprite.alpha;
        if (this._hidden) {
            this._targetAlpha = 0;
        } else {
            this._targetAlpha = 255;
        }
        this._deltaAlpha = this._targetAlpha - this._previousAlpha;
    }
    // @ts-ignore
    get hidden() {
        return this._hidden;
    }

    public onAwake() {
        for (let i = 0; i < 45; ++i) {
            this._album.push('pictures/m' + i + '.spriteframe');
        }
    }
    public onUpdate(dt: number) {
        if (!this._needUpdate) {
            return;
        }
        // console.log(this._uiSprite.alpha);
        this._curTime += dt;
        if (this._curTime >= this._epochTime) {
            this._curTime = 0;
            this._needUpdate = false;
            this._uiSprite.alpha = this._targetAlpha;
        } else {
            this._uiSprite.alpha = this._previousAlpha + this._curTime / this._epochTime * this._deltaAlpha;
        }
    }
    public changePicture() {
        const pic_name = this._album[this._id];
        engine.loader.load(pic_name, { cacheable: true }).promise.then((asset: engine.SpriteFrame) => {
            console.log("Loaded picture: ", pic_name);
            this._uiSprite.spriteFrame = asset;
            this._id = (this._id + 1) % this._album.length;
        });
    }
}
