import engine, { Vector3 } from "engine";

@engine.decorators.serialize("cameraController")
export default class cameraController extends engine.Script {
  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public name: string = "myname"

  private _targetAnchor: Vector3 = Vector3.createFromNumber(0, 0, 0);

  public shiftCameraPos(pos: Vector3) {
    let prevPos = this._targetAnchor.clone();
    this._targetAnchor = pos;
    this._targetAnchor.y = 0;
    let shiftPos = this._targetAnchor.sub(prevPos);
    console.log(pos, shiftPos);
    this.entity.transform.position.add(shiftPos, this.entity.transform.position);
  }

  // @ts-ignore
  set targetAnchor(pos: Vector3) {
    this._targetAnchor = pos.clone();
  }

  // @ts-ignore
  get targetAnchor(): Vector3 {
    return this._targetAnchor;
  }

  public onAwake() {
  }

  public onUpdate(dt) {

  }

  public onDestroy() {

  }
}
