import engine, { Prefab, Vector3, Vector4, Color, Transform3D, SpriteFrame, Entity, Material } from "engine";
import BodyController from "../scripts/bodyController"
import CameraController from "../scripts/cameraController"

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
    private _transformPool: Entity[] = [];
    private _myColor: Vector3[] = [
        Vector3.createFromNumber(204, 255, 255).scale(1 / 255),
        Vector3.createFromNumber(204, 255, 153).scale(1 / 255),
        Vector3.createFromNumber(204, 255, 204).scale(1 / 255),
        Vector3.createFromNumber(153, 204, 153).scale(1 / 255),
        Vector3.createFromNumber(204, 255, 255).scale(1 / 255),
        Vector3.createFromNumber(255, 204, 153).scale(1 / 255),
        Vector3.createFromNumber(204, 204, 204).scale(1 / 255),
        Vector3.createFromNumber(153, 204, 255).scale(1 / 255),
        Vector3.createFromNumber(204, 204, 255).scale(1 / 255),
        Vector3.createFromNumber(204, 255, 153).scale(1 / 255),
        Vector3.createFromNumber(255, 255, 204).scale(1 / 255),
        Vector3.createFromNumber(255, 153, 204).scale(1 / 255),
        Vector3.createFromNumber(255, 102, 102).scale(1 / 255),
        Vector3.createFromNumber(204, 51, 153).scale(1 / 255),
        Vector3.createFromNumber(102, 204, 204).scale(1 / 255),
        Vector3.createFromNumber(204, 102, 0).scale(1 / 255),
        Vector3.createFromNumber(153, 153, 153).scale(1 / 255),
        Vector3.createFromNumber(9, 153, 102).scale(1 / 255),
        Vector3.createFromNumber(204, 0, 102).scale(1 / 255),
        Vector3.createFromNumber(0, 153, 153).scale(1 / 255),
        Vector3.createFromNumber(153, 204, 51).scale(1 / 255),
        Vector3.createFromNumber(255, 102, 102).scale(1 / 255),
        Vector3.createFromNumber(51, 102, 153).scale(1 / 255),
        Vector3.createFromNumber(255, 102, 0).scale(1 / 255),
    ];

    public onAwake() {
        // Sample pos transition.
        for (let i = 1; i <= 3; ++i) {
            this._posTransition.push(Vector3.createFromNumber(-i * 0.3 - 1, 0, 0));
            this._posTransition.push(Vector3.createFromNumber(0, 0, i * 0.3 + 1));
        }

        const that: Entity = this.entity;
        engine.game.customEventEmitter.on('JUMP_END', () => {
            // Move camera.
            this.addNewStone(that);
        });
    }

    // Init road with two entity.
    public initRoad() {
        let first = this._cubePrefab.instantiate();
        first.transform.position = Vector3.createFromNumber(0, 0, 0);
        // console.log(first.transform.position);
        this.entity.transform.addChild(first.transform);
        this._transformPool.push(first);

        let second = this._cylinderPrefab.instantiate();
        second.transform.position = Vector3.createFromNumber(-2, 0, 0);
        // console.log(second.transform.position);
        this.entity.transform.addChild(second.transform);
        this._transformPool.push(second);

        // Body
        this._bodyController.targetPos = second.transform.position;
        // Camera
        this._cameraController.targetAnchor = Vector3.createFromNumber(-1, 0, 0);
    }

    public onEnable() {
        this.initRoad();
    }

    public addNewStone(that: Entity) {
        let prevTargetPos = this._bodyController.targetPos.clone();

        let choice = Math.floor(Math.random() * 2);
        // May support more prefab in the future.
        let prefab = choice ? this._cubePrefab : this._cylinderPrefab;
        let stone = prefab.instantiate();

        // Update position.
        let pos_id = Math.floor(Math.random() * 6);
        stone.transform.position = this._bodyController.targetPos.add(this._posTransition[pos_id]);
        stone.transform.position.y = 0;

        // Select sprite frame randomly.
        let frame_id = Math.floor(Math.random() * 8);
        const frame_name = 'pictures/' + frame_id + '.spriteframe';
        engine.loader.load(frame_name).promise.then((asset: SpriteFrame) => {
            // Update sprite async.
            const uiSpriteComponent: engine.UISprite =
                stone.transform.findChildByName('illustrator').entity.getComponent(engine.UISprite);
            uiSpriteComponent.spriteFrame = asset;

            // Update color.
            const meshRenderer: engine.MeshRenderer = stone.getComponent(engine.MeshRenderer);
            let color_id = Math.floor(Math.random() * this._myColor.length);
            meshRenderer.material.setVector("_Color", this._myColor[color_id]);

            // Update transform.
            that.transform.addChild(stone.transform);
            this._transformPool.push(stone);
            if (this._transformPool.length > 6) {
                const old_node = this._transformPool.shift();
                that.transform.removeChild(old_node.transform);
                old_node.destroyImmediate();
            }
            // Body
            this._bodyController.targetPos = stone.transform.position;
            // Camera
            this._cameraController.shiftCameraPos(this._bodyController.targetPos.add(prevTargetPos).scale(0.5));
        });

    }

    public onUpdate(dt: number) {
    }

    public onDestroy() {

    }
}
