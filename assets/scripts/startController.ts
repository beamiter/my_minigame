
import engine, { TouchInputComponent, TouchInputEvent, Scene, LoadTask } from "engine";


@engine.decorators.serialize("startController")
export default class StartController extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.String
    })
    public name: string = "myname"

    private _ready: boolean = false;
    // @ts-ignore 
    set ready(a: boolean) {
        this._ready = a;
    }
    private _process: number = 0;
    // @ts-ignore 
    set process(a: number) {
        this._process = a;
    }
    private _count: number = 0;

    // private _load_task: LoadTask<any>;
    private _label: engine.UILabel;

    public onAwake() {
        this._label = this.entity.transform2D.findChildByName('UILabel').entity.getComponent(engine.UILabel);
        // this._load_task = engine.loader.load("scenes/game.scene", { cacheable: true });
        // const that = this;
        // this._load_task.promise.then(function (scene: Scene) {
        //     engine.game.playScene(scene);
        //     console.log('Scene loaded.');
        //     that._scene_loaded = true;
        //     that._label.text = '开始/Start';
        // });
    }
    public onUpdate(dt: number) {
        if (this._ready) {
            this._label.text = 'Start';
        } else {
            this._label.text = ('Loading');
        }
    }
    public onDestroy() {

    }
    public onTouchEnd(touch: TouchInputComponent, event: TouchInputEvent) {
        if (!this._ready) {
            return;
        }
        this.entity.transform2D.parent.entity.destroyImmediate();
    }
}
