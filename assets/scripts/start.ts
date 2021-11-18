
import engine, { TouchInputComponent, TouchInputEvent, Scene, LoadTask } from "engine";
@engine.decorators.serialize("start")
export default class start extends engine.Script {
  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public name: string = "myname"
  
  public onAwake() {

  }
  public onUpdate(dt) {

  }
  public onDestroy() {

  }
  public onTouchEnd(touch: TouchInputComponent, event: TouchInputEvent) {
    this.entity.transform2D.parent.entity.destroyImmediate();
  }
}
