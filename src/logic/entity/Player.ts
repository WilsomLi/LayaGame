import { ActionFSM, FSMState } from "../fsm/ActionFSM";
import BaseEntity, { EntityType } from "./BaseEntity";
import { ESprite3D, ESound, SceneRoot, SkinRoot } from "../../const/ERes";
import GameMgr from "../../mgr/GameMgr";
import EventMgr from "../../mgr/EventMgr";
import EventType from "../../const/EventType";
import CfgDataMgr from "../../mgr/CfgDataMgr";
import { ShakeType } from "../ctrl/CameraCtrl";
import UserData from "../../mgr/UserData";
import SoundMgr from "../../mgr/SoundMgr";
import ExUtils from "../../util/ExUtils";
import SceneMgr from "../../mgr/SceneMgr";
import ShopMgr from "../../mgr/ShopMgr";

/**
 * 玩家
 */
export default class Player extends BaseEntity {

    protected playerId: number;
    protected isRole: boolean = false;
    
    protected skinId: number = 0;     // 默认皮肤
    
    public fsm: ActionFSM;
    public isDead:boolean = false;

    private _playerName:string;
    private _modelName:string;
    private _mesh:Laya.SkinnedMeshSprite3D;
    private _useOneLvSkin:boolean = false;

    constructor() { super(); }

    onAwake(): void {
        super.onAwake();
        this.entityType = EntityType.Player;

        if (!this.isRole)
            this.fsm = new ActionFSM(this);

        // if(this.cfgData) {
        //     this.collider.setRadius(this.cfgData.modelR);
        // }     
    }

    setData(data: any): void {
        super.setData(data);
        // if(this.collider)
        //     this.collider.setRadius(this.cfgData.modelR);
    }

    isRolePlayer(): boolean {
        return this.isRole;
    }

    setPlayerId(id: number): void {
        this.playerId = id;
    }

    getPlayerId(): number {
        return this.playerId;
    }

    public set playerName(val:string) {
        this._playerName = val;
    }

    public get playerName():string {
        return this._playerName;
    }

    updateLogic(now: number): void {
        super.updateLogic(now);
        this.fsm && this.fsm.updateLogic();
    }

    startAI():void {
        if(this.fsm) {
            this.fsm.changeState(FSMState.AttackState);
            this.fsm.setRunning(true);
        }
    }

    stopAI():void {
        if(this.fsm) {
            this.fsm.setRunning(false);
            this.fsm.changeState(FSMState.None);
        }
    }

    onCollisionEnter(collision: Laya.Collision): void {

    }

    onTriggerEnter(other: Laya.PhysicsComponent): void {

    }

    public doDead():void {
        this.isDead = true;
        this.stopAI();
    }

    public revive():void {
        this.isDead = false;
        this.startAI();
    }

    //动态异步加载模型
    public changeModel(skinId:number,useOneLv:boolean=false,callback:Laya.Handler=null) {
        this._useOneLvSkin = useOneLv;
        var config = ShopMgr.getShop(skinId);
        
        if (skinId != this.skinId && config) {
            let modelName = config.url;
            this.setData(config);
            this.skinId = skinId;
        }
        if(name == this._modelName) return;
        this._modelName = name;
        
        let path:string = SceneRoot+name+".lh";
        ExUtils.instanceSprite3D(path,null,Laya.Handler.create(this,(newModel:Laya.Sprite3D)=>{
            let oldModel:Laya.Sprite3D = this.gameObject.getChildAt(0) as Laya.Sprite3D;
            if(oldModel)
                oldModel.destroy();
            this.gameObject.addChildAt(newModel,0);
            this.animator = ExUtils.getComponentInChild(newModel,Laya.Animator) as Laya.Animator;
            this.crossFade("run",0);
            this._mesh = ExUtils.getSkinMesh(newModel);
            if(callback) {
                callback.run();
            }
        }));
    }

    // public isVisible():boolean { //TER-v2.2.0
    //     if(!this._mesh) return false;
    //     return this._mesh._render._visible;
    // }
}