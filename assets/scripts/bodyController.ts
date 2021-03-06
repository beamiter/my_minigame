import engine, { Vector3, TouchInputComponent, Texture2D } from "engine";

@engine.decorators.serialize("bodyController")
export default class BodyController extends engine.Script {
  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public name: string = "myname"

  private _canMove: boolean = false;
  private _curTime: number = 0.0;
  private _epochTime: number = 0.5;
  private _yCoordinate: number = 0.35;
  // 0: x, 1: y, 2: z.
  private _rotateAxis: number = 0;
  private _jumpHeight: number = 1.5;
  private _deltaPos: Vector3 = new Vector3();
  private _targetPos: Vector3 = new Vector3();
  private _previousPos: Vector3 = new Vector3();

  // @ts-ignore
  set targetPos(pos: Vector3) {
    this._targetPos = pos.clone();
    this._targetPos.y = this._yCoordinate;
    this._previousPos = this.entity.transform.position.clone();
    this._targetPos.sub(this.entity.transform.position, this._deltaPos);
  }

  // @ts-ignore
  get targetPos(): Vector3 {
    return this._targetPos;
  }

  public onTouchEnd() {
    this._canMove = true;
    // console.log(this.canJump_);
  }
  public onAwake() {
    engine.game.customEventEmitter.on('TOUCH_END', () => {
      this.onTouchEnd();
    });
  }

  public hightFunc(t: number) {
    return this._jumpHeight * Math.sin((0.5 * Math.PI / (this._epochTime + 0.01)) * t);
  }

  public onUpdate(dt) {
    if (!this._canMove) {
      return;
    }
    // This is for moving logic.
    if (this._curTime < this._epochTime) {
      this._curTime += dt;
      const ratio = this._curTime / this._epochTime;
      // this.entity.transform.rotate(Vector3.createFromNumber(0, 0, 360 * ratio), true, false);
      this._previousPos.add(Vector3.createFromNumber(
        this._deltaPos.x * ratio, this.hightFunc(ratio), this._deltaPos.z * ratio),
        this.entity.transform.position);
    } else {
      this.entity.transform.position = this._targetPos;
      // console.log(this.entity.transform.euler.z * 360 / Math.PI);
      this._curTime = 0;
      this._canMove = false;
      engine.game.customEventEmitter.emit('JUMP_END');
    }
  };

  public onDestroy() {

  }
}
