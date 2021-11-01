import engine, { Prefab, Vector3, Color } from "engine";
import bodyController from "../scripts/bodyController"
import cameraController from "../scripts/cameraController"

enum GameState {
  GS_INIT,
  GS_PLAYING,
  GS_END,
}

@engine.decorators.serialize("gameManager")
export default class gameManager extends engine.Script {
  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public name: string = "myname"
  @engine.decorators.property({
    type: engine.TypeNames.Prefab
  })
  public cubePrefab_: Prefab | null = null;
  @engine.decorators.property({
    type: engine.TypeNames.Prefab
  })
  public cylinderPrefab_: Prefab | null = null;
  @engine.decorators.property({
    type: bodyController
  })
  public bodyController_: bodyController
  @engine.decorators.property({
    type: cameraController
  })
  public cameraController_: cameraController

  private posTransition: Vector3[] = [];

  public onAwake() {
    // Sample pos transition.
    for (let i = 1; i <= 3; ++i) {
      this.posTransition.push(Vector3.createFromNumber(-i * 0.3 - 1, 0, 0));
      this.posTransition.push(Vector3.createFromNumber(0, 0, i * 0.3 + 1));
    }

    engine.game.customEventEmitter.on('JUMP_END', () => {
      this.onJumpEnd();
    });
  }

  // Init road with two entity.
  public initRoad() {
    let first = this.cubePrefab_.instantiate();
    first.transform.position = Vector3.createFromNumber(0, 0, 0);
    console.log(first.transform.position);
    this.entity.transform.addChild(first.transform);
    let second = this.cylinderPrefab_.instantiate();
    second.transform.position = Vector3.createFromNumber(-2, 0, 0);
    console.log(second.transform.position);
    this.entity.transform.addChild(second.transform);
    // Body
    this.bodyController_.targetPos = second.transform.position;
    // Camera
    this.cameraController_.targetAnchor = Vector3.createFromNumber(-1, 0, 0);
  }

  public onEnable() {
    this.initRoad();
  }

  public addNewStone() {
    let prevTargetPos = this.bodyController_.targetPos.clone();

    let choice = Math.floor(Math.random() * 2);
    // May support more prefab in the future.
    let prefab = choice ? this.cubePrefab_ : this.cylinderPrefab_;
    let stone = prefab.instantiate();

    let id = Math.floor(Math.random() * 6);
    stone.transform.position = this.bodyController_.targetPos.add(this.posTransition[id]);
    stone.transform.position.y = 0;
    this.entity.transform.addChild(stone.transform);

    // Body
    this.bodyController_.targetPos = stone.transform.position;
    // Camera
    this.cameraController_.shiftCameraPos(this.bodyController_.targetPos.add(prevTargetPos).scale(0.5));
  }

  public onJumpEnd() {
    this.addNewStone();
  }

  public onUpdate(dt) {
  }

  public onDestroy() {

  }
}
