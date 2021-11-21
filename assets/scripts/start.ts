
import engine, { TouchInputComponent, TouchInputEvent, Scene, LoadTask } from "engine";


@engine.decorators.serialize("start")
export default class start extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.String
    })
    public name: string = "myname"

    private _scene_loaded = false;
    private _load_task: LoadTask<any>;
    private _label: engine.UILabel;

    public onAwake() {
        this._label = this.entity.transform2D.findChildByName('UILabel').entity.getComponent(engine.UILabel);
        this._load_task = engine.loader.load("scenes/game.scene", { cacheable: true });
        const that = this;
        this._load_task.promise.then(function (scene: Scene) {
            engine.game.playScene(scene);
            console.log('Scene loaded.');
            that._scene_loaded = true;
            that._label.text = '开始/Start';
        });
    }
    public onUpdate(dt: number) {
        if (this._scene_loaded) {
            return;
        }
        this._label.text = ('Loading ' + Math.floor(this._load_task.progress.current / this._load_task.progress.total * 100) + '%');
    }
    public onDestroy() {

    }
    public onTouchEnd(touch: TouchInputComponent, event: TouchInputEvent) {
        if (!this._scene_loaded) {
            return;
        }
        this.entity.transform2D.parent.entity.destroyImmediate();
    }
}
