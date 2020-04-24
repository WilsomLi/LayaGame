import Vector3 = Laya.Vector3;

import GameMgr, { EGamePhase } from "../../mgr/GameMgr";
import Utils from "../../util/Utils";
import Vector3Ex from "../../util/Vector3Ex";

export enum ShakeType {
    Light,
    Medium,
    Heavy
}

/**
 * 摄像机控制 跟随、镜头动画
 */
export default class CameraCtrl extends Laya.Script {

    public camera:Laya.Camera;
    public transform:Laya.Transform3D;
    public chaseTime:number=0.3;
 	public lookAroundRadius:number = 1.5;
 	private curChaseTime:number = 0;
 	public isPrePare:boolean = false;
    
    private _initPos:Vector3;
    private _initRot:Laya.Quaternion;
    private _lookAtTf:Laya.Transform3D;
    private _moveToTf:Laya.Transform3D;
    
    private _aroundTf:Laya.Transform3D;
    private _velocity:Vector3 = new Vector3();
    private _movePos:Vector3 = new Vector3();
    private _rotation:Laya.Quaternion = new Laya.Quaternion();
    private _deltaVec:Vector3 = new Vector3();
    private _lookAtPos:Vector3 = new Vector3();
    private _lookAtRot:Laya.Quaternion = new Laya.Quaternion();
    private _lookAtDeltaVec:Vector3 = new Vector3();

    private _startFlyPos:Vector3 = new Vector3();
    private _startFlyRot:Laya.Quaternion = new Laya.Quaternion();
    private _rotElements = new Float32Array(4);

    public static INIT_CHASE_TIME:number = 0.3;
    
    constructor() { super(); }
    
    onAwake():void{
        this.camera = this.owner as Laya.Camera;
        this.transform = this.camera.transform;
        //摄像机裁剪 优化性能
        // this.camera.viewport.minDepth = 10;
        // this.camera.viewport.maxDepth = 5000;
        this._initPos = this.camera.transform.position.clone();
        this._initRot = this.camera.transform.rotation.clone();
    }

    onLateUpdate() {
        if(GameMgr.instance.isCurPhase(EGamePhase.Prepare) && !this.isPrePare) return;
        if(this._aroundTf) {
            this._rotation.rotateY(0.001,this._rotation);
            this._rotation.forNativeElement(this._rotElements);
            Laya.Utils3D.transformQuat(this._deltaVec, this._rotElements, this._movePos);
            Vector3.add(this._aroundTf.position,this._movePos,this._movePos);
            Utils.SmoothDamp(this.transform.position,this._movePos,this._velocity,this.chaseTime,-1,GameMgr.FixedDeltaTime,this._movePos);
            this.transform.position = this._movePos;

            this._lookAtDeltaVec.x = Laya.MathUtil.lerp(this._lookAtDeltaVec.x,this.lookAroundRadius,GameMgr.FixedDeltaTime*0.5);
            this._lookAtDeltaVec.z = this._lookAtDeltaVec.x;
            this._rotation.cloneTo(this._lookAtRot);
            this._lookAtRot.rotateY(Utils.DegToRad(90),this._lookAtRot);
            this._lookAtRot.forNativeElement(this._rotElements);
            Laya.Utils3D.transformQuat(this._lookAtDeltaVec, this._rotElements, this._lookAtPos);
            Vector3.add(this._aroundTf.position,this._lookAtPos,this._lookAtPos);
            this.transform.lookAt(this._lookAtPos,Vector3Ex.Up,false);
        }
        else {
            if(this._moveToTf) {
                // this.curChaseTime = this.chaseTime * (1 + (MoveCtrl.InitSpeed - GameMgr.instance.role.moveCtrl._speed)/MoveCtrl.InitSpeed);
                Utils.SmoothDamp(this.transform.position,this._moveToTf.position,this._velocity,this.chaseTime,-1,GameMgr.FixedDeltaTime,this._movePos);
                this.transform.position = this._movePos;
            }
            if(this._lookAtTf) {
                this.transform.lookAt(this._lookAtTf.position,Vector3Ex.Up,false);
            }
        }

        // console.info("镜头的速度：",GameMgr.instance.role.moveCtrl._speed,"|",MoveCtrl.InitSpeed,"时间：|",this.curChaseTime);
    }

    setLookAt(transform:Laya.Transform3D) {
        this._lookAtTf = transform;
        // if(this._lookAtTf) {
        //     this.transform.lookAt(this._lookAtTf.position,Vector3.Up,false);
        // }
        
        // //相机绑定人身上
        // (this.owner as Laya.Sprite3D).transform._setParent(transform);
        // this.transform.localPosition = new Vector3(0,10,24);
        // this.transform.localRotationEulerY = 0;
    }

    setMoveTo(transform:Laya.Transform3D) {
        this._moveToTf = transform;
    }

    rotateAround(tf:Laya.Transform3D):void {
        this._aroundTf = tf;
        this.transform.position.cloneTo(this._deltaVec);
        // this._deltaVec.y = tf.position.y + 3;
        Vector3.subtract(this._deltaVec,tf.position,this._deltaVec);
        Laya.Quaternion.createFromYawPitchRoll(0,tf.rotationEuler.y,0,this._rotation);

        this._lookAtDeltaVec.setValue(0,0,0);
    }

    recordStartFlyState():void {
        this.transform.position.cloneTo(this._startFlyPos);
        this.transform.rotation.cloneTo(this._startFlyRot);
    }

    revertStartFlyState():void {
        this.transform.position = this._startFlyPos;
        this.transform.rotation = this._startFlyRot;
    }

    setRoleMoveSpeedPercent(scale:number):void {
        this.chaseTime = CameraCtrl.INIT_CHASE_TIME / scale;
    }

    reset():void {
        this.camera.transform.position = this._initPos;
        this.camera.transform.rotation = this._initRot;
        this._aroundTf = null;
        this.isPrePare = false;
    }
}