
import engine, { Vector3 } from "engine";
@engine.decorators.serialize("pictureController")
export default class PictureController extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.String
    })
    public name: string = "myname"

    private _hidden: boolean = false;
    private _needVanish: boolean = false;
    private _needChange: boolean = false;
    private _epochTime: number = 0.5;
    private _curTime: number = 0;
    private _id: number = 0;
    private _uiSprite: engine.UISprite = this.entity.getComponent(engine.UISprite);
    private _previousAlpha: number = 0;
    private _targetAlpha: number = 0;
    private _deltaAlpha: number = 0;

    private _album: string[] = [];
    private _spriteMap: Map<string, engine.SpriteFrame> = new Map();

    // @ts-ignore
    set hidden(h: boolean) {
        this._needVanish = (h !== this._hidden);
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
        for (let pic_name of this._album) {
            engine.loader.load(pic_name, { cacheable: true }).promise.then((asset: engine.SpriteFrame) => {
                console.log("Loaded picture: ", pic_name);
                this._spriteMap.set(pic_name, asset);
            });
        }
    }
    public onUpdate(dt: number) {
        // Vanish has higher priority.
        if (this._needVanish) {
            // console.log(this._uiSprite.alpha);
            this._curTime += dt;
            if (this._curTime >= this._epochTime) {
                this._curTime = 0;
                this._needVanish = false;
                this._uiSprite.alpha = this._targetAlpha;
            } else {
                this._uiSprite.alpha = this._previousAlpha + this._curTime / this._epochTime * this._deltaAlpha;
            }
            return;
        }

        // Change has lower priority.
        if (this._needChange) {
            const pic_name = this._album[this._id];
            if (this._spriteMap.has(pic_name)) {
                this._needChange = false;
                const asset: engine.SpriteFrame = this._spriteMap.get(pic_name);
                this._uiSprite.spriteFrame = asset;
                this._uiSprite.entity.transform2D.size = engine.Vector2.createFromNumber(
                    asset.rect.width, asset.rect.height);
                if (asset.rect.width > asset.rect.height) {
                    const ratio = asset.rect.height / asset.rect.width;
                    this._uiSprite.entity.transform2D.scale = engine.Vector2.createFromNumber(ratio, ratio);
                } else {
                    this._uiSprite.entity.transform2D.scale = engine.Vector2.createFromNumber(1, 1);
                }
                this._id = (this._id + 1) % this._album.length;
                console.log('Change to picture: ', pic_name);
            }
        }
    }
    public changePicture() {
        this._needChange = true;
    }
}
