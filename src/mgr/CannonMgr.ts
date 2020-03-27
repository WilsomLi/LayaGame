import ExUtils from "../util/ExUtils";
import Utils from "../util/Utils";


 /**
 * 第三方 cannonjs 物理引擎管理 
 * http://www.cannonjs.org/
 */
export default class CannonMgr {
    static instance = new CannonMgr();

    
    private _world:CANNON.World;
    private _bodyObjectMap:any;
    
    static readonly FRAME_DELTA_TIME:number = 1/60;  

    constructor() {
        
    }
    
    public init() {
        this._bodyObjectMap = {};
        this._world = new CANNON.World();
        this._world.gravity.set(0,-1,0);

        // Laya.timer.frameLoop(1,this,this.onUpdate);
    }

    public onUpdate() {
        this._world.step(CannonMgr.FRAME_DELTA_TIME,CannonMgr.FRAME_DELTA_TIME,3);

        let body,sprite3D,pos;
        for(let i:number=0; i< this._world.bodies.length; i++) {
            body = this._world.bodies[i];
            // sprite3D = body.__sprite3D;
            sprite3D = this._bodyObjectMap[body];
            if(sprite3D) {
                // if(body instanceof this.CANNON.Sphere)
                // pos = sprite3D.transform.position;
                // console.log("sprite3D.name = " + sprite3D.name);
                sprite3D.transform.position = new Laya.Vector3(body.position.x,body.position.y,body.position.z) 
                let quat = body.quaternion;
                sprite3D.transform.quaternion = new Laya.Quaternion(quat.x,quat.y,quat.z,quat.w);
                if(sprite3D.name == "Sphere")
                    Utils.log(sprite3D.transform.position,sprite3D.transform.quaternion);
                // sprite3D.transform.translate(new Laya.Vector3(0,-0.1,0));
            }
        }
    }

    public addBody(body:any,node:Laya.Sprite3D) {
        // console.log("addBody name=" + node.name);
        this._world.addBody(body);
        this._bodyObjectMap[body] = node;
    }

    public test(ground:Laya.Sprite3D ,sphere:Laya.Sprite3D,path:Laya.Sprite3D) {        
        var groundBody = new CANNON.Body({
            mass:0,
            shape:new CANNON.Plane(),
            material:new CANNON.Material(),
        })
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -1.5707963267948966);
        // groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 0), 0);
        this.addBody(groundBody,ground);

        // path.active = false;
        var meshBody = new CANNON.Body({
            mass:1,
        })
        let mesh:Laya.MeshSprite3D = ExUtils.getMesh(path);
        let sharedMesh = mesh.meshFilter.sharedMesh;        
        let vertexBuffer = sharedMesh.getVertices();
        let vertArr = Array.prototype.slice.call(vertexBuffer);
        
        let indexBuffer = sharedMesh.getIndices();
        let indexArr = Array.prototype.slice.call(indexBuffer);
        var meshShap = new CANNON.Trimesh(vertArr, indexArr);
        meshBody.addShape(meshShap);
        // meshBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -1.5707963267948966);
        this.addBody(meshBody,path); 
        // path.transform.localPositionY = 
        
        var pos:Laya.Vector3 = sphere.transform.position;
        var body = new CANNON.Body({
            mass:1,
            shape:new CANNON.Sphere(.5),
            position:new CANNON.Vec3(pos.x,pos.y,pos.z)
        });
        this.addBody(body,sphere);
    }
}

