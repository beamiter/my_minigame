
import engine from "engine";
@engine.decorators.serialize("captionController")
export default class captionController extends engine.Script {
  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public name: string = "myname"

  private _uiLabel: engine.UILabel = this.entity.getComponent(engine.UILabel);
  private _count: number = 0;
  private _id: number = 0;

  private _poetry: string = "我们的故事\n钟于\n2005年 我们相遇\n是学习上的竞争者\
也是朋友\n怕打扰对方 关心总是默默的\n会在生病请假时帮做笔记\n会在中考时默默为对方加油\n\
会装作不经意路过\n寻找那位熟悉的篮球少年"

  //@ts-ignore
  public onAwake() {
    this._uiLabel.text = '';
  }
  public onUpdate(dt) {
    if (this._id >= this._poetry.length || ++this._count < 8) {
      return;
    }
    this._count = 0;
    this._uiLabel.text += this._poetry[this._id++];
  }
  public onDestroy() {

  }
}
