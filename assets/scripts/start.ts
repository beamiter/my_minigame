
import engine, { TouchInputComponent, TouchInputEvent, Scene, LoadTask } from "engine";
@engine.decorators.serialize("start")
export default class start extends engine.Script {
  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public name: string = "myname"

  private _scene_loaded = false;

  public onAwake() {
    const that = this;
    const load_task = engine.loader.load("scenes/mv.scene");
    load_task.promise.then(function (scene: Scene) {
      engine.game.playScene(scene);
      that._scene_loaded = true;
    });
  }
  public onUpdate(dt) {

  }
  public onDestroy() {

  }
  public onTouchEnd(touch: TouchInputComponent, event: TouchInputEvent) {
    if (this._scene_loaded === false) {
      return;
    }
    this.entity.transform2D.parent.entity.destroyImmediate();
  }
}
