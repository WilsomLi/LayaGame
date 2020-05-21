

import Sprite3D = Laya.Sprite3D;
import Texture2D = Laya.Texture2D;
import MeshSprite3D = Laya.MeshSprite3D;
import BlinnPhongMaterial = Laya.BlinnPhongMaterial;
import SkinnedMeshSprite3D = Laya.SkinnedMeshSprite3D;
import Handler = Laya.Handler;
import BaseMaterial = Laya.BaseMaterial;
import Node = Laya.Node;
import Vector3 = Laya.Vector3;
import Transform3D = Laya.Transform3D;

import Vector3Ex from "./Vector3Ex";
import { SceneConst } from "../const/EConst";

/**
 * 3D相关操作
 */
export default class ExUtils {

    static _vec:Vector3 = new Vector3();

    constructor() { }

    /**
     * 设置路面贴图，解决模糊问题，关闭贴图的mipmap
     * @param model 路面
     * @param skinUrl 贴图
     */
    static setPathSkin(model:Laya.Sprite3D,skinUrl:string):void {
        if (!skinUrl) return;
        Laya.loader.create(skinUrl, Laya.Handler.create(this,  (texture:Laya.Texture2D)=> {
            ExUtils.setModelSkin(model, texture, null, "materials");
            model.active = true;
        }),null,Laya.Loader.TEXTURE2D,[256,256,0,false])
    }

    static setModelSkinByUrl(model: Sprite3D, skinUrl: string): void {
        // console.log("skinurl:",skinUrl);
        if (!skinUrl) return;
        Texture2D.load(skinUrl, Handler.create(this, function (texture) {
            ExUtils.setModelSkin(model, texture, null, "materials");
            model.active = true;
        }))
    }

    /**
    *修改模型材质
    * @param model 模型
    */
    static setModelSkin(model: Sprite3D, texture: Texture2D, color: Laya.Vector4 = null, matName: string = "sharedMaterials"): void {
        if (model == null || texture == null) return;
        // console.log("------------------setModelSkin:",color);
        //如果是模型网格显示对象
        if (model instanceof MeshSprite3D) {
            //获取模型网格对象
            var meshSprite3D: MeshSprite3D = model as MeshSprite3D;
            for (var i: number = 0; i < meshSprite3D.meshRenderer[matName].length; i++) {
                //根据下标获取模型共享材质组中的共享材质
                var material: BlinnPhongMaterial = meshSprite3D.meshRenderer[matName][i] as BlinnPhongMaterial;
                material.albedoTexture = texture;
                if (color)
                    material.albedoColor = color;
            }
            meshSprite3D.meshRenderer.castShadow = SceneConst.Realtime_Shadow;
        }
        //如果是蒙皮模型网格显示对象
        if (model instanceof SkinnedMeshSprite3D) {
            //获取蒙皮模型网格显示对象
            var skinnedMeshSprite3D: SkinnedMeshSprite3D = model as SkinnedMeshSprite3D;
            for (var i: number = 0; i < skinnedMeshSprite3D.skinnedMeshRenderer[matName].length; i++) {
                //根据下标获取模型共享材质组中的共享材质
                var material: BlinnPhongMaterial = skinnedMeshSprite3D.skinnedMeshRenderer[matName][i] as BlinnPhongMaterial;
                material.albedoTexture = texture;
                if (color)
                    material.albedoColor = color;
            }
            skinnedMeshSprite3D.skinnedMeshRenderer.castShadow = SceneConst.Realtime_Shadow;
        }
        //递归方法获取子对象
        for (var i: number = 0, n = model.numChildren; i < n; i++) {
            this.setModelSkin(model.getChildAt(i) as Sprite3D, texture, color, matName);
        }
    }

    //设置材质
    static setMatetial(node: Node, path: string, handler: Handler = null): void {
        BaseMaterial.load(path, Handler.create(this, function (mat) {
            let mesh: MeshSprite3D = this.getMesh(node);
            if (mesh) {
                mesh.meshRenderer.material = mat;
                mesh.meshRenderer.castShadow = SceneConst.Realtime_Shadow;
                mesh.meshRenderer.receiveShadow = SceneConst.Realtime_Shadow;
                if (handler)
                    handler.run();
            }
        }))
    }

    static setSkinMeshMaterail(node: Node, mat: Laya.Material): void {
        let mesh: SkinnedMeshSprite3D = this.getSkinMesh(node);
        if (mesh) {
            mesh.skinnedMeshRenderer.material = mat;
        }
    }

    //获取材质
    static getMaterial(node: Node): BaseMaterial {
        if (node == null) return null;
        let mesh: MeshSprite3D = this.getMesh(node);
        if (mesh) {
            var material: BaseMaterial = mesh.meshRenderer.sharedMaterials[0] as BaseMaterial;
            return material;
        }

        let mat: BaseMaterial;
        for (let i = 0; i < node.numChildren; i++) {
            mat = this.getMaterial(node.getChildAt(i));
            if (mat) {
                return mat;
            }
        }
        return null;
    }

    //设置阴影接收
    static setRecieveShadow(model: Node, val: boolean): void {
        if (model instanceof MeshSprite3D) {
            var meshSprite3D: MeshSprite3D = model as MeshSprite3D;
            meshSprite3D.meshRenderer.receiveShadow = val;
        }
        if (model instanceof SkinnedMeshSprite3D) {
            var skinnedMeshSprite3D: SkinnedMeshSprite3D = model as SkinnedMeshSprite3D;
            skinnedMeshSprite3D.skinnedMeshRenderer.receiveShadow = val;
        }
        for (var i: number = 0; i < model.numChildren; i++) {
            this.setRecieveShadow(model.getChildAt(i), val);
        }
    }

    //设置阴影投射
    static setCastShadow(model: Node, val: boolean): void {
        if (model instanceof MeshSprite3D) {
            var meshSprite3D: MeshSprite3D = model as MeshSprite3D;
            meshSprite3D.meshRenderer.castShadow = val;
        }
        if (model instanceof SkinnedMeshSprite3D) {
            var skinnedMeshSprite3D: SkinnedMeshSprite3D = model as SkinnedMeshSprite3D;
            skinnedMeshSprite3D.skinnedMeshRenderer.castShadow = val;
        }
        for (var i: number = 0; i < model.numChildren; i++) {
            this.setCastShadow(model.getChildAt(i), val);
        }
    }

    //获取网格
    static getMesh(obj: Node): MeshSprite3D {
        if (obj == null) return null;
        let mesh: MeshSprite3D;
        if (obj instanceof MeshSprite3D) {
            return obj as MeshSprite3D;
        }
        for (let i = 0; i < obj.numChildren; i++) {
            mesh = this.getMesh(obj.getChildAt(i));
            if (mesh) {
                return mesh;
            }
        }
        return null;
    }

    static getSkinMesh(obj: Node): SkinnedMeshSprite3D {
        if (obj == null) return null;
        let mesh: SkinnedMeshSprite3D;
        if (obj instanceof SkinnedMeshSprite3D) {
            return obj as SkinnedMeshSprite3D;
        }
        for (let i = 0; i < obj.numChildren; i++) {
            mesh = this.getSkinMesh(obj.getChildAt(i));
            if (mesh) {
                return mesh;
            }
        }
        return null;
    }

    //实例化物体
    static instanceSprite3D(path: string, parent: Node, handler: Handler = null): void {
        let callback: Handler = Handler.create(this, function (obj: Sprite3D) {
            if (obj == null || obj == null) {
                console.error("instanceSprite3D null", path);
                return;
            }
            let instance: Sprite3D = Sprite3D.instantiate(obj, parent, false);
            if (handler)
                handler.runWith(instance);
        })

        let obj: Sprite3D = Laya.loader.getRes(path);
        if (obj) {
            callback.runWith(obj);
            return;
        }
        Sprite3D.load(path, callback);
    }

    //获取组件
    static getComponentInChild(obj: Node, cls: any): any {
        let component: any = obj.getComponent(cls);
        if (component instanceof cls) {
            return component;
        }
        for (let i = 0; i < obj.numChildren; i++) {
            component = this.getComponentInChild(obj.getChildAt(i), cls);
            if (component instanceof cls) {
                return component;
            }
        }
        return null;
    }

    static addSingleComponent(obj: Node, cls: any): any {
        if (obj == null) {
            console.trace("addSingleComponent obj null", cls);
            return null;
        }
        let component: any = obj.getComponent(cls);
        if (component == null) {
            component = obj.addComponent(cls);
        }
        return component;
    }

    static getChild(obj:Node,path:string):Sprite3D {
        let nodeNames:Array<string> = path.split("/");
        for(let i=0,size=nodeNames.length; i<size; i++) {
            obj = obj.getChildByName(nodeNames[i]);
        }
        return obj as Sprite3D;
    }

    static findChild(obj:Sprite3D,name:string):Sprite3D {
        if(obj.name == name) {
            return obj;
        }
        let result:Sprite3D = null;
        for(let i=0,size=obj.numChildren; i<size; i++) {
            result = this.findChild(obj.getChildAt(i) as Sprite3D,name);
            if(result) {
                return result;
            }
        }
        return null;
    }


    /**
     * 因为U3D和Laya坐标系不同，Laya下子节点沿Y轴旋转180度使用transform.lookAt才正常
     * 此方法用于非子节点旋转180度设定
     * @param tf 模型Transform
     * @param targetPos 目标点
     * @param ignoreY 忽略Y轴坐标
     */
    static LayaLookAt(tf:Transform3D,targetPos:Vector3,ignoreY:boolean=false):void {
        Vector3.subtract(tf.position,targetPos,this._vec);
        Vector3.add(tf.position,this._vec,this._vec);
        if(ignoreY) {
            this._vec.y = tf.position.y;
        }
        tf.lookAt(this._vec,Vector3Ex.Up,false);
    }

}