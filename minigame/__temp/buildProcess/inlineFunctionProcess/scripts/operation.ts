
import engine, { TouchInputComponent, TouchInputEvent } from "engine";
@engine.decorators.serialize("operation")
export default class operation extends engine.Script {
  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public name: string = "myname"

  private enableInput_: boolean = true;
  private start_triggered_: boolean = true;

  public onTouchStart(touch: TouchInputComponent, event: TouchInputEvent) {
    // Check if input is enabled.
    if (!this.enableInput_) {
      return;
    }
    this.start_triggered_ = true;
    console.log('touch start');
    engine.game.customEventEmitter.emit('TOUCH_START');
  }

  public onTouchEnd(touch: TouchInputComponent, event: TouchInputEvent) {
    // Check if input is enabled.
    if (!this.enableInput_ || !this.start_triggered_) {
      return;
    }
    // Disable input after touch end.
    this.enableInput_ = false;
    this.start_triggered_ = false;
    console.log('touch end');
    engine.game.customEventEmitter.emit('TOUCH_END');
  }

  public onJumpEnd() {
    this.enableInput_ = true;
  }

  public onAwake() {
    engine.game.customEventEmitter.on('JUMP_END', () => {
      this.onJumpEnd();
    });
  }
  public onUpdate(dt) {

  }
  public onDestroy() {

  }
}
