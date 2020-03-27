import GameMgr, { EGamePhase } from "../../mgr/GameMgr";
import EventMgr from "../../mgr/EventMgr";
import EventType from "../../const/EventType";
import RolePlayer from "../entity/RolePlayer";
import SceneMgr from "../../mgr/SceneMgr";
import CfgDataMgr from "../../mgr/CfgDataMgr";
import Vector3Ex from "../../util/Vector3Ex";

/**
 * 主角 移动控制
 */
export default class RoleMoveCtrl extends Laya.Script {
   
    private _role:RolePlayer;

    private _isDown:boolean;

    private _mouseDownX:number;
    private _mouseDownY:number;

    private _attackRot:Laya.Vector3 = new Laya.Vector3;
    private _rotateVec:Laya.Vector3 = new Laya.Vector3;
    private _forward:Laya.Vector3 = new Laya.Vector3;
    private _moveSpeed:Laya.Vector3 = new Laya.Vector3(0,0,0.02);
    private _angularSpeed:number = 0;

    constructor() { super(); }
    
    onAwake():void {
        this._role = this.owner.getComponent(RolePlayer);
        this._angularSpeed = CfgDataMgr.instance.getGlobalCfg("Rotate_Speed");

        Laya.stage.on(Laya.Event.MOUSE_OUT,this,this.onStageMouseUp);  
    }

    onDestroy() {
        Laya.stage.off(Laya.Event.MOUSE_OUT,this,this.onStageMouseUp);
    }

    onStageMouseDown(e:Laya.Event):void{
        if(!GameMgr.instance.isCurPhase(EGamePhase.InGame)) return;
        if(this._isDown) return;
        this._mouseDownX = e.stageX;
        this._mouseDownY = e.stageY;
        
        this._isDown = true;
    }

    onStageMouseUp(e:Laya.Event):void{
        this.stop(false);
    }
    
    onStageMouseMove(e:Laya.Event):void{
        if(!this._isDown || GameMgr.instance.isCurPhase(EGamePhase.Prepare)) return;

        //计算鼠标移动的距离
         var deltaX = Laya.stage.mouseX - this._mouseDownX;
         var deltaY = Laya.stage.mouseY - this._mouseDownY;

        if(deltaX < -5 || deltaX > 5 || deltaY < -5 || deltaY > 5){//没移动
            this._attackRot.setValue(deltaX,0,deltaY);
        }
    }

    stop(immediately:boolean=false){
        this._isDown = false;
    }

    onUpdate():void
    {
        if(this._isDown)
        {
            this.onRotate();
        }
        this._role.transform.translate(this._moveSpeed);
        // this._role.transform.position.z -= 0.2;
    }

    private onRotate() {
        this._role.transform.getForward(this._forward);
        Laya.Vector3.lerp(this._forward,this._attackRot,GameMgr.deltaTime*this._angularSpeed,this._rotateVec);
        Laya.Vector3.add(this._role.transform.position,this._rotateVec,this._rotateVec);
        this._role.transform.lookAt(this._rotateVec,Vector3Ex.Up,true);
    }
}