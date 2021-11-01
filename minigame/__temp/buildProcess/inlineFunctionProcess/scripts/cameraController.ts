import engine, { Vector3 } from "engine";

@engine.decorators.serialize("cameraController")
export default class cameraController extends engine.Script {
  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public name: string = "myname"

  private targetAnchor_: Vector3 = Vector3.createFromNumber(0, 0, 0);

  public shiftCameraPos(pos: Vector3) {
    let prevPos = this.targetAnchor_.clone();
    this.targetAnchor_ = pos;
    this.targetAnchor_.y = 0;
    let shiftPos = this.targetAnchor_.sub(prevPos);
    console.log(pos, shiftPos);
    this.entity.transform.position.add(shiftPos, this.entity.transform.position);
  }

  // @ts-ignore
  set targetAnchor(pos: Vector3) {
    this.targetAnchor_ = pos.clone();
  }

  // @ts-ignore
  get targetAnchor(): Vector3 {
    return this.targetAnchor_;
  }

  public onAwake() {
  }

  public onUpdate(dt) {

  }

  public onDestroy() {

  }
}
