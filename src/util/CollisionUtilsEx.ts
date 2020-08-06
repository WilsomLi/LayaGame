import Vector3 = Laya.Vector3;
import Ray = Laya.Ray;
import Vector3Ex from "./Vector3Ex";
    
/**
 * 重写 Laya.CollisionUtils 有问题的方法
 */
export default class CollisionUtilsEx {

    static _tempV30:Vector3 = new Vector3;
    static _tempV31:Vector3 = new Vector3;
    static _tempV32:Vector3 = new Vector3;
    static _tempV33:Vector3 = new Vector3;
    static _tempV34:Vector3 = new Vector3;

    /**
     * 求射线和三角面距离
     * @param ray 
     * @param vertex1 
     * @param vertex2 
     * @param vertex3 
     * @returns distance 不相交-1，相交实际距离
     */
    static intersectsRayAndTriangleRD(ray:Ray, vertex1:Vector3, vertex2:Vector3, vertex3:Vector3):number {
        var rayO = ray.origin;
        var rayOeX = rayO.x;
        var rayOeY = rayO.y;
        var rayOeZ = rayO.z;
        var rayD = ray.direction;
        var rayDeX = rayD.x;
        var rayDeY = rayD.y;
        var rayDeZ = rayD.z;
        var v1eX = vertex1.x;
        var v1eY = vertex1.y;
        var v1eZ = vertex1.z;
        var v2eX = vertex2.x;
        var v2eY = vertex2.y;
        var v2eZ = vertex2.z;
        var v3eX = vertex3.x;
        var v3eY = vertex3.y;
        var v3eZ = vertex3.z;
        var _tempV30eX = CollisionUtilsEx._tempV30.x;
        var _tempV30eY = CollisionUtilsEx._tempV30.y;
        var _tempV30eZ = CollisionUtilsEx._tempV30.z;
        _tempV30eX = v2eX - v1eX;
        _tempV30eY = v2eY - v1eY;
        _tempV30eZ = v2eZ - v1eZ;
        var _tempV31eX = CollisionUtilsEx._tempV31.x;
        var _tempV31eY = CollisionUtilsEx._tempV31.y;
        var _tempV31eZ = CollisionUtilsEx._tempV31.z;
        _tempV31eX = v3eX - v1eX;
        _tempV31eY = v3eY - v1eY;
        _tempV31eZ = v3eZ - v1eZ;
        var _tempV32eX = CollisionUtilsEx._tempV32.x;
        var _tempV32eY = CollisionUtilsEx._tempV32.y;
        var _tempV32eZ = CollisionUtilsEx._tempV32.z;
        _tempV32eX = (rayDeY * _tempV31eZ) - (rayDeZ * _tempV31eY);
        _tempV32eY = (rayDeZ * _tempV31eX) - (rayDeX * _tempV31eZ);
        _tempV32eZ = (rayDeX * _tempV31eY) - (rayDeY * _tempV31eX);
        var determinant = (_tempV30eX * _tempV32eX) + (_tempV30eY * _tempV32eY) + (_tempV30eZ * _tempV32eZ);
        if (Laya.MathUtils3D.isZero(determinant)) {
            return -1;
        }
        var inversedeterminant = 1 / determinant;
        var _tempV33eX = CollisionUtilsEx._tempV33.x;
        var _tempV33eY = CollisionUtilsEx._tempV33.y;
        var _tempV33eZ = CollisionUtilsEx._tempV33.z;
        _tempV33eX = rayOeX - v1eX;
        _tempV33eY = rayOeY - v1eY;
        _tempV33eZ = rayOeZ - v1eZ;
        var triangleU = (_tempV33eX * _tempV32eX) + (_tempV33eY * _tempV32eY) + (_tempV33eZ * _tempV32eZ);
        triangleU *= inversedeterminant;
        if (triangleU < 0 || triangleU > 1) {
            return -1;
        }
        var _tempV34eX = CollisionUtilsEx._tempV34.x;
        var _tempV34eY = CollisionUtilsEx._tempV34.y;
        var _tempV34eZ = CollisionUtilsEx._tempV34.z;
        _tempV34eX = (_tempV33eY * _tempV30eZ) - (_tempV33eZ * _tempV30eY);
        _tempV34eY = (_tempV33eZ * _tempV30eX) - (_tempV33eX * _tempV30eZ);
        _tempV34eZ = (_tempV33eX * _tempV30eY) - (_tempV33eY * _tempV30eX);
        var triangleV = ((rayDeX * _tempV34eX) + (rayDeY * _tempV34eY)) + (rayDeZ * _tempV34eZ);
        triangleV *= inversedeterminant;
        if (triangleV < 0 || triangleU + triangleV > 1) {
            return -1;
        }
        var raydistance = (_tempV31eX * _tempV34eX) + (_tempV31eY * _tempV34eY) + (_tempV31eZ * _tempV34eZ);
        raydistance *= inversedeterminant;
        if (raydistance < 0) {
            return -1;
        }
        return raydistance;
    }

    /**
     * 求射线和三角面的交点 可用于求鼠标点击地面点
     * @param ray 
     * @param vertex1 
     * @param vertex2 
     * @param vertex3 
     * @param out 相交点
     * @returns isCollide 
     */
    static intersectsRayAndTriangleRP(ray:Ray, vertex1:Vector3, vertex2:Vector3, vertex3:Vector3, out:Vector3):boolean {
        var distance = CollisionUtilsEx.intersectsRayAndTriangleRD(ray, vertex1, vertex2, vertex3);
        if (distance == -1) {
            Vector3Ex.ZERO.cloneTo(out);
            return false;
        }
        Vector3.scale(ray.direction, distance, CollisionUtilsEx._tempV30);
        Vector3.add(ray.origin, CollisionUtilsEx._tempV30, out);
        return true;
    }
}