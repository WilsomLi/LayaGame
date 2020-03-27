import Circle from "../../core/2d/Circle";
import CfgDataMgr from "../../mgr/CfgDataMgr";
import { ESprite3D, SceneRoot } from "../../const/ERes";
import GameMgr from "../../mgr/GameMgr";
import Utils from "../../util/Utils";
import SceneMgr from "../../mgr/SceneMgr";
import ExUtils from "../../util/ExUtils";

export enum EntityType {
    Player,
    Obstacle,
    SpeedupBuff,
    Glod,
    Box
}

/**
 * 基础实体
 */
export default class BaseEntity extends Laya.Script {

    public gameObject:Laya.Sprite3D;
    public transform:Laya.Transform3D;
    
    // protected modelObject:Laya.Sprite3D;
    protected animator:Laya.Animator;

    protected entityType:EntityType;

    protected cfgData:any;
    protected modelPath:string;
    protected modelId:number;
    
    private _animatorSpeed:number = 0; //用于暂停动作
    private _animatorName:string = ""; //动作名
    
    constructor() { super(); }
    
    onAwake(): void {
        this.gameObject = this.owner as Laya.Sprite3D;
        this.transform = this.gameObject.transform;
        if(this.entityType == EntityType.Player) {
            this.animator = ExUtils.getComponentInChild(this.gameObject,Laya.Animator) as Laya.Animator;
        }
    }

    updateLogic(now:number):void {
    }

    getModelId():number {
        return this.modelId;
    }

    crossFade(name:string,time:number):void {
        if(!this.animator) return;
        this.animator.crossFade(name,time);
    }
    playAnimation(_animatorName:string, _isPlay:boolean=true):void {
        if (this.animator) {
            if (_isPlay) {
                if (this._animatorSpeed >0) {
                    this.animator.speed = this._animatorSpeed;
                }
                this._animatorSpeed = 0;
                //是否新动画
                if (_animatorName.length >0 && (_animatorName != this._animatorName)) {
                    this._animatorName = _animatorName;
                    this.crossFade(_animatorName, 0.1);
                }
            } else {
                if (this.animator.speed >0) {
                    this._animatorSpeed = this.animator.speed;
                }
                this.animator.speed = 0;
            }
        }
    }

    setData(data:any):void {
        this.cfgData = data;
        // if(this.gameObject)
        //     this.modelId = data.model;
    }
}