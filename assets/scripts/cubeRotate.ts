
import engine, {Vector3} from "engine";
@engine.decorators.serialize("cubeRotate")
export default class cubeRotate extends engine.Script {
  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public name: string = "myname"
  
  public onAwake() {

  }
  public onUpdate(dt) {
    this.entity.transform.rotate(Vector3.createFromNumber(0, dt * 30, 0), true, false);
  }
  public onDestroy() {

  }
}
