import engine, {Prefab, Vector3, Color, Transform3D, SpriteFrame, Entity} from "engine";
import BodyController from "../scripts/bodyController"
import CameraController from "../scripts/cameraController"

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
  public _cubePrefab: Prefab | null = null;
  @engine.decorators.property({
    type: engine.TypeNames.Prefab
  })
  public _cylinderPrefab: Prefab | null = null;
  @engine.decorators.property({
    type: BodyController
  })
  public _bodyController: BodyController
  @engine.decorators.property({
    type: CameraController
  })
  public _cameraController: CameraController

  private _posTransition: Vector3[] = [];

  // Used for garbage collection.
  private _transformPool: Transform3D[] = [];

  private _spriteFrames: SpriteFrame[] = [];

  public onAwake() {
    // Sample pos transition.
    for (let i = 1; i <= 3; ++i) {
      this._posTransition.push(Vector3.createFromNumber(-i * 0.3 - 1, 0, 0));
      this._posTransition.push(Vector3.createFromNumber(0, 0, i * 0.3 + 1));
    }

    engine.game.customEventEmitter.on('JUMP_END', () => {
      // Move camera.
      this.addNewStone();
    });

    // Extend ikons in the future.
    for (let i = 0; i <= 11; ++i) {
      let name = 'pictures/' + i + '.spriteframe';
      console.log(name);
      engine.loader.load(name).promise.then((spriteFrameAsset:
                                               SpriteFrame) => {
        this._spriteFrames.push(spriteFrameAsset);
      });
    }
  }

  private updateIllustrator(e: Entity) {
    const node = e.transform.findChildByName('illustrator');
    const uiSpriteComponent = node.entity.getComponent(engine.UISprite);
    // Select randomly.
    let id = Math.floor(Math.random() * this._spriteFrames.length);
    uiSpriteComponent.spriteFrame = this._spriteFrames[id];
  }

  // Init road with two entity.
  public initRoad() {
    let first = this._cubePrefab.instantiate();
    first.transform.position = Vector3.createFromNumber(0, 0, 0);
    console.log(first.transform.position);
    this.entity.transform.addChild(first.transform);
    this._transformPool.push(first.transform);

    let second = this._cylinderPrefab.instantiate();
    second.transform.position = Vector3.createFromNumber(-2, 0, 0);
    console.log(second.transform.position);
    this.entity.transform.addChild(second.transform);
    this._transformPool.push(second.transform);

    // Body
    this._bodyController.targetPos = second.transform.position;
    // Camera
    this._cameraController.targetAnchor = Vector3.createFromNumber(-1, 0, 0);
  }

  public onEnable() {
    this.initRoad();
  }

  public addNewStone() {
    let prevTargetPos = this._bodyController.targetPos.clone();

    let choice = Math.floor(Math.random() * 2);
    // May support more prefab in the future.
    let prefab = choice ? this._cubePrefab : this._cylinderPrefab;
    let stone = prefab.instantiate();

    let id = Math.floor(Math.random() * 6);
    stone.transform.position = this._bodyController.targetPos.add(this._posTransition[id]);
    stone.transform.position.y = 0;
    this.entity.transform.addChild(stone.transform);
    this._transformPool.push(stone.transform);
    this.updateIllustrator(stone);

    if (this._transformPool.length > 6) {
      this.entity.transform.removeChild(this._transformPool.shift());
    }

    // Body
    this._bodyController.targetPos = stone.transform.position;
    // Camera
    this._cameraController.shiftCameraPos(this._bodyController.targetPos.add(prevTargetPos).scale(0.5));
  }

  public onUpdate(dt) {
  }

  public onDestroy() {

  }
}
