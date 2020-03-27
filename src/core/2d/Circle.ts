
import OBB from "./OBB";
import AABB from "./AABB";

/**
 * 二维空间 圆形
 */
export default class Circle {
    private _x: number = 0;
    private _y: number = 0;
    private _radius: number = 0;

    constructor(x: number, y: number, radius: number) {
        this._x = x;
        this._y = y;
        this._radius = radius;
    }

    setRadius(radius: number) {
        this._radius = radius;
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

    get radius() {
        return this._radius;
    }

    isCollideCircle(circle: Circle): boolean {
        let radiusSum = this._radius + circle._radius;
        let offX = this._x - circle._x;
        if (offX > radiusSum || offX < -radiusSum)
            return false;//优化计算性能
        let offY = this._y - circle._y;
        if (offY > radiusSum || offY < -radiusSum)
            return false;//优化计算性能
        return offX * offX + offY * offY < radiusSum * radiusSum;
    }

    isCollideOBB(obb: OBB): boolean {
        return obb.isCollideCircle(this);
    }

    isCollideAABB(aabb: AABB): boolean {
        return aabb.isCollideCircle(this);
    }
}