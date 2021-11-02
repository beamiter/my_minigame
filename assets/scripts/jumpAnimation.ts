
import engine, {Animation} from "engine";
@engine.decorators.serialize("jumpAnimation")
export default class jumpAnimation extends engine.Script {
  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public name: string = "myname"

  @engine.decorators.property({
    type: engine.Animation
  })
  public animComp: engine.Animation;
  
  public onAwake() {

  }
  public onStart() {
    this.animComp.play('jump', 0, Animation.WrapMode.Loop);
  }

  public onUpdate(dt) {

  }
  public onDestroy() {

  }
}
