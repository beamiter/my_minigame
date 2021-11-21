
import engine, { Vector3 } from "engine";
@engine.decorators.serialize("pictureController")
export default class PictureController extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.String
    })
    public name: string = "myname"
    private _hidden: boolean = true;
    private _epochTime: number = 0.5;
    private _canMove: boolean = false;
    private _curTime: number = 0;
    private _deltaPos: Vector3 = Vector3.createFromNumber(0, 0, 0);
    private _targetPos: Vector3 = Vector3.createFromNumber(0, 0, 0);
    private _previousPos: Vector3 = new Vector3();
    private _id: number = 0;
    private _uiSprite: engine.UISprite;
    private _child: engine.Entity;
    private _album: string[] = [];

    // @ts-ignore
    set hidden(h: boolean) {
        this._hidden = h;
        this._canMove = true;
        this._previousPos = this._child.transform.position.clone();
        if (this._hidden) {
            this._targetPos = Vector3.createFromNumber(0, -2.5, 0);
        } else {
            this._targetPos = Vector3.createFromNumber(0, 0, 0);
        }
        this._targetPos.sub(this._previousPos, this._deltaPos);
    }
    // @ts-ignore
    get hidden() {
        return this._hidden;
    }

    public onAwake() {
        this._child = this.entity.transform.findChildByName('Picture').entity;
        this._uiSprite = this._child.getComponent(engine.UISprite);
        for (let i = 0; i < 45; ++i) {
            this._album.push('pictures/m' + i + '.spriteframe');
        }
    }
    public onUpdate(dt: number) {
        if (!this._canMove) {
            return;
        }

        // This is for moving logic.
        if (this._curTime >= this._epochTime) {
            this._child.transform.position = this._targetPos;
            this._curTime = 0;
            this._canMove = false;
            if (this._hidden) {
                const pic_name = this._album[this._id];
                this._id = (this._id + 1) % this._album.length;
                engine.loader.load(pic_name).promise.then((asset: engine.SpriteFrame) => {
                    console.log("Use picture: ", pic_name);
                    this._uiSprite.spriteFrame = asset;
                });
            }
        } else {
            this._curTime += dt;
            const ratio = this._curTime / this._epochTime;
            this._previousPos.add(Vector3.createFromNumber(
                this._deltaPos.x * ratio, this._deltaPos.y * ratio, this._deltaPos.z * ratio),
                this._child.transform.position);
        }
    }
    public onDestroy() {

    }
}
