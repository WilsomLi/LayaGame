import Player from "./Player";
import GameMgr from "../../mgr/GameMgr";
import CfgDataMgr from "../../mgr/CfgDataMgr";
import SceneMgr from "../../mgr/SceneMgr";
import Utils from "../../util/Utils";
import Vector3 = Laya.Vector3;
import BaseProp from "./BaseProp";

/**
 * 障碍物
 */
export default class Obstacle extends BaseProp {

    private _speedPercent:number = 0;
    private _speedTime:number = 0;

    constructor(){
        super();
    }

    onAwake() {
        super.onAwake();

        this._speedPercent = CfgDataMgr.instance.getGlobalCfg("Obstacle_Bump_Speed");
        this._speedTime = CfgDataMgr.instance.getGlobalCfg("Obstacle_Bump_Time");

        this.resetPos();
    }

    onEnable() {
        super.onEnable();
    }

    onDisable() {
        super.onDisable();
    }

    setData(pos:Vector3,forward:Vector3,normal:Vector3,degree:number) {
        pos.cloneTo(this._pos);
        forward.cloneTo(this._forward);
        normal.cloneTo(this._normal);
        this._degree = degree;
        this.resetPos();
    }

    onCollide(player:Player) {
        if(player.isRolePlayer()) {
            platform.vibrateShort();
        }
        
        // SceneMgr.instance.showSceneEffect(this.subTF.position,"zhuangzhangai_ef",this.transform.rotationEuler);
        // GameMgr.instance.recoverProp(this);
    }
}