
import engine, { TouchInputComponent, TouchInputEvent, Scene, LoadTask } from "engine";
@engine.decorators.serialize("panelController")
export default class PanelController extends engine.Script {
  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public name: string = "myname"

  private _enableInput: boolean = true;
  private _start_triggered: boolean = true;
  // private _load_task: LoadTask<any>;

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
    engine.game.customEventEmitter.on('CAMERA_MOVE', () => {
      this._enableInput = true;
    });
    // this._load_task = engine.loader.load("scenes/mv.scene");
    // this._load_task.promise.then(function (scene: Scene) {
    //   engine.game.playScene(scene);
    // });
  }
  public onUpdate(dt) {
    // if (this._load_task.progress.current < this._load_task.progress.total) {
    //   let rate = this._load_task.progress.current / this._load_task.progress.total;
    //   rate = Math.floor(rate * 1000) / 1000;
    //   console.log(rate);
    // }
  }
  public onDestroy() {

  }
}
