import Player from "./Player";
import Vector3 = Laya.Vector3;
import Utils from "../../util/Utils";
import Vector3Ex from "../../util/Vector3Ex";

export default class BaseProp extends Laya.Script
{
    public gameObject:Laya.Sprite3D;
    public transform:Laya.Transform3D;
    public subGo:Laya.Sprite3D;
    public subTF:Laya.Transform3D;

    protected _pos:Vector3 = new Vector3();
    protected _localPos:Vector3 = new Vector3();
    protected _forward:Vector3 = new Vector3();
    protected _normal:Vector3 = new Vector3();
    protected _degree:number = 0;

    protected CollideDistSqr:number = 1.2*1.2;

    onAwake() {
        super.onAwake();
        this.gameObject = this.owner as Laya.Sprite3D;
        this.transform = this.gameObject.transform;
        this.subGo = this.gameObject.getChildAt(0) as Laya.Sprite3D;
        this.subTF = this.subGo.transform;
    }

    onDisable() {
        super.onDisable();
        this.resetData();
    }

    resetData() {
        //重载此方法，回收对象池时重置数据
    }

    setData(pos:Vector3,forward:Vector3,normal:Vector3,degree:number) {
        pos.cloneTo(this._pos);
        forward.cloneTo(this._forward);
        normal.cloneTo(this._normal);
        this._degree = degree;
        this.resetPos();
    }

    checkCollider(player:Player):boolean {        
        if(!this.subTF) return false;
        let distSqr = Vector3.distanceSquared(this.subTF.position,player.transform.position);
        if(distSqr <= this.CollideDistSqr) {
            this.onCollide(player);
            return true;
        }
        return false;
    }

    onCollide(player:Player) {
    }

    resetPos():boolean {
        // if(!this.subTF || Utils.equalVec(this._pos,Vector3.ZERO)) return false; //TER-v2.2.0
        if(!this.subTF || Utils.equalVec(this._pos,Vector3Ex.ZERO)) return false;

        this.transform.position = this._pos;
        Vector3.add(this._pos,this._forward,this._pos);
        this.transform.lookAt(this._pos,this._normal,false);

        return true;
    }
}