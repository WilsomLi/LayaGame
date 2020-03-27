import Circle from "./Circle";
import Utils from "../../util/Utils";

/**
 * 轴对称包围盒（Axis-Aligned Bounding Box），即无旋转矩形
 */
export default class AABB {
    private _x: number = 0; //左上角X
    private _y: number = 0; //左上角Y
    private _width: number = 0;
    private _height: number = 0;


    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    setPos(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    setWidth(width: number) {
        this._width = width;
    }

    setHeight(height: number) {
        this._height = height;
    }

    isCollideAABB(rect: AABB): boolean {
        if (this._x > rect._x + rect._width || this._x + this._width < rect._x ||
            this._y > rect._y + rect._height || this._y + this._height < rect._y)
            return false;
        return true;
    }

    isCollideCircle(circle: Circle): boolean {
        //找出AABB上离圆心最近的点做判断
        let cx, cy;
        if (circle.x < this.x) {
            cx = this.x;
        }
        else if (circle.x > this.x + this.width) {
            cx = this.x + this.width;
        }
        else {
            cx = circle.x;
        }

        if (circle.y < this.y) {
            cy = this.y;
        }
        else if (circle.y > this.y + this.height) {
            cy = this.y + this.height;
        }
        else {
            cy = circle.y;
        }

        if (Utils.DistanceSquared(circle.x, circle.y, cx, cy) < circle.radius * circle.radius)
            return true;

        return false;
    }
}