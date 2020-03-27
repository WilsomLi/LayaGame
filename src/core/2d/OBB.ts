import Circle from "./Circle";
import Utils from "../../util/Utils";

/**
 * 旋转矩形（以矩形中心点为旋转轴）
 * https://aotu.io/notes/2017/02/16/2d-collision-detection/
 */
export default class OBB
{
    private _rectX:number = 0; //左上角X坐标。
    private _rectY:number = 0; //左上角Y坐标。
    private _centerX:number = 0; //中心点X
    private _centerY:number = 0; //中心点Y
    private _width:number = 0;
    private _height:number = 0;
    private _deg:number = 0;//矩形中心点随原点(0,0)顺时针旋转的角度

    private _halfW:number = 0;
    private _halfH:number = 0;
    public axisX = [];
    public axisY = [];

    constructor(width:number, height:number, deg:number)
    {
        this.width = width;
        this.height = height;
        this.setDeg(deg);
    }

    /*角度（非弧度）*/
    setDeg(deg:number)
    {
        this._deg = deg;
        let radian = Utils.DegToRad(this._deg);

        let cosVal = Math.cos(radian);
        let sinVal = Math.sin(radian);

        this.axisX[0] = cosVal;
        this.axisX[1] = sinVal;

        this.axisY[0] = -sinVal;
        this.axisY[1] = cosVal;
    }

    setOriginCenterPos(x:number, y:number, offsetX:number = 0, offsetY:number = 0):void
    {
        x = x - offsetX;
        y = y - offsetY;
        //以下为旋转后的真实坐标。
        let radian = Utils.DegToRad(this._deg);
        let cosVal = Math.cos(radian);
        let sinVal = Math.sin(radian);
        let newCenterX = x * cosVal - y * sinVal;
        let newCenterY = y * cosVal + x * sinVal;
        newCenterX += offsetX;
        newCenterY += offsetY;
        this.setCenterPos(newCenterX, newCenterY);
    }

    setCenterPos(x:number, y:number):void
    {
        this._centerX = x;
        this._centerY = y;

        this._rectX = this._centerX - this._halfW;
        this._rectY = this._centerY - this._halfH;
    }

    get width()
    {
        return this._width;
    }

    set width(value)
    {
        this._width = value;
        this._halfW = value * 0.5;
    }

    get height()
    {
        return this._height;
    }

    set height(value)
    {
        this._height = value;
        this._halfH = value * 0.5;
    }

    /*获取角度*/
    get angle()
    {
        return this._deg;
    }

    get centerX():number
    {
        return this._centerX;
    }

    get centerY():number
    {
        return this._centerY;
    }

    //整体旋转，转化成圆和AABB判断
    isCollideCircle(circle:Circle):boolean
    {
        let cx, cy;
        let radian = Utils.DegToRad(-this._deg);
        let sinVal = Math.sin(radian);
        let cosVal = Math.cos(radian);
        let rx = cosVal * (circle.x - this._centerX) - sinVal * (circle.y - this._centerY) + this._centerX;
        let ry = sinVal * (circle.x - this._centerX) + cosVal * (circle.y - this._centerY) + this._centerY;

        if(rx < this._rectX)
        {
            cx = this._rectX;
        }
        else if(rx > this._rectX + this._width)
        {
            cx = this._rectX + this._width;
        }
        else
        {
            cx = rx;
        }

        if(ry < this._rectY)
        {
            cy = this._rectY;
        }
        else if(ry > this._rectY + this._height)
        {
            cy = this._rectY + this._height;
        }
        else
        {
            cy = ry;
        }

        if(Utils.DistanceSquared(rx, ry, cx, cy) < circle.radius * circle.radius)
            return true;

        return false;
    }

    //获取点(pointX,pointY)到矩形的距离：整体旋转，转化成圆点和AABB判断。
    public miniDistance(pointX:number, pointY:number):number
    {
        let cx, cy;
        let radian = Utils.DegToRad(-this._deg);
        let sinVal = Math.sin(radian);
        let cosVal = Math.cos(radian);
        let rx = cosVal * (pointX - this._centerX) - sinVal * (pointY - this._centerY) + this._centerX;
        let ry = sinVal * (pointX - this._centerX) + cosVal * (pointY - this._centerY) + this._centerY;

        if(rx < this._rectX)
        {
            cx = this._rectX;
        }
        else if(rx > this._rectX + this._width)
        {
            cx = this._rectX + this._width;
        }
        else
        {
            cx = rx;
        }

        if(ry < this._rectY)
        {
            cy = this._rectY;
        }
        else if(ry > this._rectY + this._height)
        {
            cy = this._rectY + this._height;
        }
        else
        {
            cy = ry;
        }

        return Math.sqrt(Utils.DistanceSquared(rx, ry, cx, cy));
    }

    //判断两OBB4个坐标轴上的投影是否有重叠
    private _centerVec = [];
    private _axes = [];
    private _axis;

    isCollideOBB(obb:OBB):boolean
    {
        this._centerVec[0] = this._centerX - obb.centerX;
        this._centerVec[1] = this._centerY - obb.centerY;

        this._axes[0] = this.axisX;
        this._axes[1] = this.axisY;
        this._axes[2] = obb.axisX;
        this._axes[3] = obb.axisY;

        for(let i = 0; i < 4; i++)
        {
            this._axis = this._axes[i];
            if(this.getProjectionRadius(this._axis) + obb.getProjectionRadius(this._axis) <= this.dot(this._centerVec, this._axis))
                return false;
        }

        return true;
    }

    private getProjectionRadius(axis:Array<number>):number
    {
        let projectionX = this.dot(axis, this.axisX);
        let projectionY = this.dot(axis, this.axisY);
        return this._halfW * projectionX + this._halfH * projectionY;
    }

    private dot(axisA:Array<number>, axisB:Array<number>)
    {
        return Math.abs(axisA[0] * axisB[0] + axisA[1] * axisB[1])
    }
}