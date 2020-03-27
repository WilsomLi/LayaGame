import Circle from "./Circle";
import AABB from "./AABB";
import OBB from "./OBB";
import Utils from "../../util/Utils";

/**
 * 二维空间 扇形
 */
export default class Sector {
    private _x:number = 0;
    private _y:number = 0;
    private _radius:number = 0;
    private _angle1:number = 0;//边1角度
    private _angle2:number = 0;//边2角度
    
    private _vx1:number=0;_vy1:number=0;//向量1
    private _vx2:number=0;_vy2:number=0;//向量2

    constructor(x:number,y:number,radius:number,angle1:number,angle2:number) {
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._angle1 = angle1;
        this._angle2 = angle2;
        this.calVec();
    }

    setRadius(radius:number) {
        this._radius = radius;
    }

    setPos(x:number,y:number) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get radius() {
        return this._radius;
    }

    set angle1(val:number) {
        this._angle1 = val;
        this.calVec();
    }

    get angle1():number {
        return this._angle1;
    }

    set angle2(val:number) {
        this._angle2 = val;
        this.calVec();
    }

    get angle2():number {
        return this._angle2;
    }

    private calVec():void {
        let rad1 = Utils.DegToRad(this.angle1);
        let rad2 = Utils.DegToRad(this.angle2);
        this._vx1 = this.radius*Math.cos(rad1);
        this._vy1 = this.radius*Math.sin(rad1);
        this._vx2 = this.radius*Math.cos(rad2);
        this._vy2 = this.radius*Math.sin(rad2);
    }

    isCollideCircle(circle:Circle):boolean {
        let alpha,beta,delta;
        let ar;//两圆半径和
        let dx = circle.x - this.x;
        let dy = circle.y - this.y;
        let distSqr = dx*dx+dy*dy;
        if(distSqr < circle.radius*circle.radius) {
            //扇形圆心在圆形内
            return true;
        }
        else {
            delta = this._vx1*this._vy2 - this._vx2*this._vy1;
            alpha = (dx*this._vy2 - dy*this._vx2) / delta;
            beta = (-dx*this._vy1 + dy*this._vx1) / delta;
            if(alpha >=0 && beta >=0) {
                let ar = this.radius+circle.radius;
                if(distSqr <= ar*ar) {
                    //圆形的圆心在扇形内
                    return true;
                }
            }
            else {
                let a,b,c,d,t;
                a = this._vx1*this._vx1+this._vy1*this._vy1;
                b = -(this._vx1*dx+this._vy1*dy);
                c = dx*dx+dy*dy-circle.radius*circle.radius;
                d = b*b - a*c;
                if(d >= 0) {
                    t = (-b-Math.sqrt(d))/a;
                    if(t>=0&&t<=1) {
                        //边1与圆形相交
                        return true;
                    }
                }
                a = this._vx2*this._vx2+this._vy2*this._vy2;
                b = -(this._vx2*dx+this._vy2*dy);
                c = dx*dx+dy*dy-this.radius*this.radius;
                d = b*b - a*c;
                if(d >= 0) {
                    t = (-b-Math.sqrt(d))/a;
                    if(t>=0&&t<=1) {
                        //边2与圆形相交
                        return true;
                    }
                }
            }
        }
        return false;
    }

    isCollideOBB(obb:OBB):boolean {
        //TODO
        return false;
    }

    isCollideAABB(aabb:AABB):boolean {
        //TODO
        return false;
    }
}