
import engine, { TouchInputComponent, TouchInputEvent } from "engine";
@engine.decorators.serialize("panelController")
export default class PanelController extends engine.Script {
  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public name: string = "myname"

  private _enableInput: boolean = true;
  private _start_triggered: boolean = true;

  public onTouchStart(touch: TouchInputComponent, event: TouchInputEvent) {
    // Check if input is enabled.
    if (!this._enableInput) {
      return;
    }
    this._start_triggered = true;
    // console.log('touch start');
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
  }
  public onUpdate(dt) {

  }
  public onDestroy() {

  }
}