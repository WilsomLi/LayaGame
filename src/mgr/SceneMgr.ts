import Sprite3D = Laya.Sprite3D;
import Scene3D = Laya.Scene3D;
import DirectionLight = Laya.DirectionLight;
import Camera = Laya.Camera;
import Vector3 = Laya.Vector3;
import Quaternion = Laya.Quaternion;

import { ESprite3D, MapRoot } from "../const/ERes";
import CameraCtrl from "../logic/ctrl/CameraCtrl";
import CfgDataMgr from "./CfgDataMgr";
import { EntityType } from "../logic/entity/BaseEntity";
import Obstacle from "../logic/entity/Obstacle";
import BaseProp from "../logic/entity/BaseProp";
import { SceneConst } from "../const/EConst";

/**
 * 场景管理
 */
export default class SceneMgr {
    static instance = new SceneMgr();

    public scene: Scene3D;
    public cameraCtrl: CameraCtrl;
    public light: DirectionLight;

    private _prefabDic: object;
    private _mapNode: Sprite3D;
    private _propParent: Sprite3D;
    private effects:Sprite3D;
    private obstacle:Sprite3D;

    private _levelId: number;//关卡ID
    private _levelCfg: any;//关卡配置

    constructor() {

    }

    init() {
        this.scene = new Scene3D();
        //环境光
        this.scene.ambientColor = new Vector3(0.6, 0.6, 0.6);
        Laya.stage.addChild(this.scene);

        let camera: Camera = Laya.loader.getRes(ESprite3D.MainCamera) as Camera;
        this.scene.addChild(camera);
        this.cameraCtrl = camera.addComponent(CameraCtrl);

        this.light = Laya.loader.getRes(ESprite3D.DirectionalLight) as DirectionLight;
        this.scene.addChild(this.light);

        this.initLight();
        this.initFog();
        this.initSkybox();
        this.initPrefab();
    }

    /**
     * 必须先添加到场景在设置阴影属性
     */
    initLight(): DirectionLight {
        var light = this.light;
        if (SceneConst.Realtime_Shadow) {
            //灯光开启阴影
            light.shadow = true;
            //可见阴影距离
            light.shadowDistance = 3;
            //生成阴影贴图尺寸
            light.shadowResolution = 1024;
            //生成阴影贴图数量
            light.shadowPSSMCount = 1;
            //模糊等级,越大越高,更耗性能
            light.shadowPCFType = 1;
        }
        return light;
    }

    private initFog() {
        if (!SceneConst.Enable_Fog) return;
        this.scene.enableFog = true;
        //设置雾化的颜色
        this.scene.fogColor = new Vector3(0, 0, 0.6);
        //设置雾化的起始位置，相对于相机的距离
        this.scene.fogStart = 10;
        //设置雾化最浓处的距离。
        this.scene.fogRange = 40;
    }

    private initSkybox() {
        if(!SceneConst.Enable_Skybox) return;
        Laya.BaseMaterial.load("nativescene/Conventional/Assets/Resources/Mat/Sky.lmat",Laya.Handler.create(this,this.loadSkyMaterial));
    }
    
    private loadSkyMaterial(mat:Laya.SkyBoxMaterial) {
        this.cameraCtrl.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        let skyRenderer = this.scene.skyRenderer;
        skyRenderer.mesh = Laya.SkyBox.instance;
        skyRenderer.material = mat;
    }

    private initPrefab() {
        this._prefabDic = {};

        // this.initSubPrefab(ESprite3D.Props);

        this._mapNode = new Sprite3D("Map", true);
        this.scene.addChild(this._mapNode);

        this.effects = Laya.loader.getRes(ESprite3D.Effect) as Sprite3D;

        this._propParent = new Sprite3D("Props",false);
        this.scene.addChild(this._propParent);
    }

    private initSubPrefab(path: string): void {
        let node: Sprite3D = Laya.loader.getRes(path) as Sprite3D;
        let obj: Laya.Node;
        for (let i = 0, num = node.numChildren; i < num; i++) {
            obj = node.getChildAt(i);
            this._prefabDic[obj.name] = obj;
        }
    }

    public loadSceneData(lv: number, handler: Laya.Handler = null): void {
        this._levelId = lv;

        let mapPath: string = MapRoot + `level${lv}.json`;
        console.log("mapPath---", mapPath);
        Laya.loader.load(mapPath, Laya.Handler.create(this, ()=> {
            let json: object = Laya.loader.getRes(mapPath);
            if (json == null) {
                console.error("兼容错误，找不到地图配置,Level", lv);
                this.loadSceneData(lv - 1, handler);
            } else {
                this._levelCfg = json;
                this.revertMapFromCfg();

                if (Laya.Browser.onPC) {
                    //模拟微信上加载json耗时
                    Laya.timer.once(100, this, ()=> {
                        handler && handler.run();
                    });
                } else {
                    handler && handler.run();
                }
            }
        }));
    }

    private revertMapFromCfg(): void {
        this.revertPrefabToPool();

        let data;
        for (let key in this._levelCfg) {
            data = this._levelCfg[key];
            this.instancePrefab(data);
        }
    }

    private revertPrefabToPool(): void {
        for (let i = this._mapNode.numChildren - 1; i >= 0; i--) {
            let node = this._mapNode.getChildAt(i).removeSelf();
            node.active = false;
            Laya.Pool.recover(node.name, node);
        }
    }

    private instancePrefab(data: any): void {
        let pos: Vector3 = new Vector3();
        pos.fromArray(data.position);
        let rot: Quaternion = new Quaternion();
        rot.fromArray(data.rotation);
        let scaleValue: Vector3 = new Vector3();
        scaleValue.fromArray(data.scale);

        let nodeName: string = data.name;
        let nodePos: number = nodeName.indexOf('_stage');
        if (nodePos > 0) {
            nodeName = nodeName.substr(0, nodePos);
        }
        // console.log("instancePrefab", data.name, nodeName);
        let obj: Sprite3D = Laya.Pool.getItem(nodeName) as Sprite3D;
        if (!obj) {
            let prefab: Sprite3D = this._prefabDic[nodeName];
            if (prefab) {
                obj = Sprite3D.instantiate(prefab, this._mapNode, false, pos, rot);
            } else {
                // console.log("prefab null", nodeName);
                obj = this._mapNode.addChild(new Sprite3D(nodeName)) as Sprite3D;
                obj.transform.position = pos;
                obj.transform.rotation = rot;
                obj.transform.setWorldLossyScale(scaleValue);
            }
        }
        else {
            this._mapNode.addChild(obj);
            obj.transform.position = pos;
            obj.transform.rotation = rot;
            obj.transform.setWorldLossyScale(scaleValue);
            obj.active = true;
        }
        obj.name = data.name; //记录配置中的名称

    }

    //创建特效对象
    public createEffect(effectName:string,parent:Sprite3D):Sprite3D {
        let effect:Sprite3D = Sprite3D.instantiate((this.effects.getChildByName(effectName) as Sprite3D),parent,false);
        return effect;
    }

    //显示场景特效
    public showSceneEffect(pos:Vector3,name:string,rot:Vector3=null,parent:Sprite3D=null,autoRecover:boolean=true):Sprite3D {
        let effect:Sprite3D = Laya.Pool.getItem(name) as Sprite3D;
        if(parent == null)
            parent = this._propParent;
        if(effect == null) {
            effect = this.createEffect(name,parent);
        }
        parent.addChild(effect);
        effect.transform.position = pos;
        if(rot) {
            effect.transform.rotationEuler = rot;
        }
        effect.active = true;
        if(autoRecover) {
            Laya.timer.once(1000,this,()=>{
                this.recoverEffect(effect);
            })
        }
        return effect;
    }

    //回收特效
    public recoverEffect(effect:Sprite3D):void {
        effect.active = false;
        effect.removeSelf();
        Laya.Pool.recover(effect.name,effect);
    }

    //获取道具
    public getProp(entityType:EntityType):any {
        let name:string = EntityType[entityType];
        let prop:any = Laya.Pool.getItem(name);
        if(prop==null) {
            let obj:Sprite3D;
            if(entityType == EntityType.Obstacle) {
                obj = Sprite3D.instantiate(this.obstacle,this._propParent,false);
                prop = obj.addComponent(Obstacle);
            }
            obj.name = name;
        }
        this._propParent.addChild(prop.owner)
        prop.owner.active = true;
        return prop;
    }

    //回收道具
    public recoverProp(prop:BaseProp):void {
        // console.trace("recoverProp",prop.gameObject.name);
        prop.owner.removeSelf();
        prop.owner.active = false;
        Laya.Pool.recover(prop.gameObject.name,prop);
    }

    
}