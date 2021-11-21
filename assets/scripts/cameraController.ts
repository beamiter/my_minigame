import engine, {Vector3} from "engine";
import PictureController from "./pictureController";

@engine.decorators.serialize("cameraController")
export default class CameraController extends engine.Script {
  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public name: string = "myname"
  @engine.decorators.property({
    type: PictureController
  })
  public _pictureController: PictureController;

  private _targetAnchor: Vector3 = Vector3.createFromNumber(0, 0, 0);
  private _deltaPos: Vector3 = Vector3.createFromNumber(0, 0, 0);
  private _targetPos: Vector3 = Vector3.createFromNumber(0, 0, 0);
  private _epochTime: number = 0.5;
  private _canMove: boolean = false;
  private _curTime: number = 0;

  public shiftCameraPos(pos: Vector3) {
    let prevPos = this._targetAnchor.clone();
    this._targetAnchor = pos;
    this._deltaPos.x = this._targetAnchor.x - prevPos.x;
    // y is not necessary.
    this._deltaPos.z = this._targetAnchor.z - prevPos.z;
    // console.log(pos, shiftPos);
    // Update target pos.
    this.entity.transform.position.add(this._deltaPos, this._targetPos);
    this._canMove = true;

    this._pictureController.hidden = !this._pictureController.hidden;
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

  public onUpdate(dt: number) {
    if (!this._canMove) {
      return;
    }

    // This is for moving logic.
    if (this._curTime > this._epochTime) {
      this.entity.transform.position = this._targetPos;
      this._curTime = 0;
      this._canMove = false;
      engine.game.customEventEmitter.emit('CAMERA_MOVE');
    } else {
      this._curTime += dt;
      let ratio = dt / this._epochTime;
      this.entity.transform.position.add(
        Vector3.createFromNumber(
          this._deltaPos.x * ratio, 0, this._deltaPos.z * ratio),
        this.entity.transform.position);
    }
  }

  public onDestroy() {

  }
}
