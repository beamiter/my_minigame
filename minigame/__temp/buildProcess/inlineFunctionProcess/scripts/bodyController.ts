import engine, { Vector3, TouchInputComponent } from "engine";

@engine.decorators.serialize("bodyController")
export default class bodyController extends engine.Script {
  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public name: string = "myname"

  private canJump_: boolean = false;
  private curTime_: number = 0.0;
  private epochTime_: number = 0.5;
  private yCoordinate_: number = 0.55;
  // 0: x, 1: y, 2: z.
  private rotateAxis_: number = 0;
  private jumpHeight_: number = 2;
  private deltaPos_: Vector3 = new Vector3();
  private targetPos_: Vector3 = new Vector3();

  // @ts-ignore
  set targetPos(pos: Vector3) {
    this.targetPos_ = pos.clone();
    this.targetPos_.y = this.yCoordinate_;
    this.targetPos_.sub(this.entity.transform.position, this.deltaPos_);
  }

  // @ts-ignore
  get targetPos(): Vector3 {
    return this.targetPos_;
  }

  public onTouchEnd() {
    this.canJump_ = true;
    // console.log(this.canJump_);
  }
  public onAwake() {
    engine.game.customEventEmitter.on('TOUCH_END', () => {
      this.onTouchEnd();
    });
  }


  public onUpdate(dt) {
    if (!this.canJump_) {
      return;
    }

    // This is for moving logic.
    if (this.curTime_ <= this.epochTime_) {
      this.curTime_ += dt;
      let ratio = dt / this.epochTime_;
      let dir = Math.sign(this.epochTime_ / 2 - this.curTime_);
      // this.entity.transform.rotate(Vector3.createFromNumber(0, 0, 360 * ratio), true, false);
      this.entity.transform.position.add(
        Vector3.createFromNumber(
          this.deltaPos_.x * ratio, dir * this.jumpHeight_ * ratio, this.deltaPos_.z * ratio),
        this.entity.transform.position);
    } else {
      this.entity.transform.position = this.targetPos_;
      // console.log(this.entity.transform.euler.z * 360 / Math.PI);
      this.curTime_ = 0;
      this.canJump_ = false;
      engine.game.customEventEmitter.emit('JUMP_END');
    }
  };

  public onDestroy() {

  }
}
