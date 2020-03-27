
import Vector3 = Laya.Vector3;
import Quaternion = Laya.Quaternion;

/**
 * 3维空间 OBB
 */
export class OBBBox {
    /**
     * 中心点
     */
    public center: Vector3;
    /**
     * 旋转四元数
     */
    public rotatioin: Quaternion;
    /**
     * localScale * 0.5
     */
    public extents: Vector3 = new Vector3();
}

export default class OBB3D {
    private static _v: Vector3 = new Vector3();
    private static _VAx: Vector3 = new Vector3();
    private static _VAy: Vector3 = new Vector3();
    private static _VAz: Vector3 = new Vector3();
    private static _VBx: Vector3 = new Vector3();
    private static _VBy: Vector3 = new Vector3();
    private static _VBz: Vector3 = new Vector3();
    private static _VA: Array<Vector3> = new Array<Vector3>();
    private static _VB: Array<Vector3> = new Array<Vector3>();
    private static _T: Vector3 = new Vector3();
    private static _R: Array<Array<number>> = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    private static _FR: Array<Array<number>> = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    static readonly UnitX = new Vector3(1, 0, 0);
    static readonly UnitY = new Vector3(0, 1, 0);
    static readonly UnitZ = new Vector3(0, 0, 1);

    public static IntersectOBB(box0: OBBBox, box1: OBBBox): boolean {

        box0.extents[0] = box0.extents.x;
        box0.extents[1] = box0.extents.y;
        box0.extents[2] = box0.extents.z;

        box1.extents[0] = box1.extents.x;
        box1.extents[1] = box1.extents.y;
        box1.extents[2] = box1.extents.z;

        Vector3.subtract(box1.center, box0.center, this._v);
        //Compute A's basis
        Vector3.transformQuat(this.UnitX, box0.rotatioin, this._VAx);
        Vector3.transformQuat(this.UnitY, box0.rotatioin, this._VAy);
        Vector3.transformQuat(this.UnitZ, box0.rotatioin, this._VAz);
        this._VA[0] = this._VAx;
        this._VA[1] = this._VAy;
        this._VA[2] = this._VAz;

        //Compute B's basis
        Vector3.transformQuat(this.UnitX, box1.rotatioin, this._VBx);
        Vector3.transformQuat(this.UnitY, box1.rotatioin, this._VBy);
        Vector3.transformQuat(this.UnitZ, box1.rotatioin, this._VBz);
        this._VB[0] = this._VBx;
        this._VB[1] = this._VBy;
        this._VB[2] = this._VBz;

        let x = Vector3.dot(this._v, this._VAx),
            y = Vector3.dot(this._v, this._VAy),
            z = Vector3.dot(this._v, this._VAz);
        this._T.setValue(x, y, z);
        this._T[0] = x;
        this._T[1] = y;
        this._T[2] = z;

        let ra, rb, t, d, arr;
        for (let i = 0; i < 3; i++) {
            for (let k = 0; k < 3; k++) {
                d = Vector3.dot(this._VA[i], this._VB[k]);
                this._R[i][k] = d;
                this._FR[i][k] = 1e-6 + Math.abs(d);
            }
        }

        // A's basis vectors
        for (let i = 0; i < 3; i++) {
            ra = box0.extents[i];
            arr = this._FR[i];
            rb = box1.extents.x * arr[0] + box1.extents.y * arr[1] + box1.extents.z * arr[2];
            t = Math.abs(this._T[i]);
            if (t > ra + rb) {
                return false;
            }
        }

        // B's basis vectors
        for (let k = 0; k < 3; k++) {
            ra = box0.extents.x * this._FR[0][k] + box0.extents.y * this._FR[1][k] + box0.extents.z * this._FR[2][k];
            rb = box1.extents[k];
            t = Math.abs(this._T[0] * this._R[0][k] + this._T[1] * this._R[1][k] + this._T[2] * this._R[2][k]);
            if (t > ra + rb) {
                return false;
            }
        }

        //9 cross products

        //L = A0 x B0
        ra = box0.extents[1] * this._FR[2][0] + box0.extents[2] * this._FR[1][0];
        rb = box1.extents[1] * this._FR[0][2] + box1.extents[2] * this._FR[0][1];
        t = Math.abs(this._T[2] * this._R[1][0] - this._T[1] * this._R[2][0]);
        if (t > ra + rb) return false;

        //L = A0 x B1
        ra = box0.extents[1] * this._FR[2][1] + box0.extents[2] * this._FR[1][1];
        rb = box1.extents[0] * this._FR[0][2] + box1.extents[2] * this._FR[0][0];
        t = Math.abs(this._T[2] * this._R[1][1] - this._T[1] * this._R[2][1]);
        if (t > ra + rb) return false;

        //L = A0 x B2
        ra = box0.extents[1] * this._FR[2][2] + box0.extents[2] * this._FR[1][2];
        rb = box1.extents[0] * this._FR[0][1] + box1.extents[1] * this._FR[0][0];
        t = Math.abs(this._T[2] * this._R[1][2] - this._T[1] * this._R[2][2]);
        if (t > ra + rb) return false;

        //L = A1 x B0
        ra = box0.extents[0] * this._FR[2][0] + box0.extents[2] * this._FR[0][0];
        rb = box1.extents[1] * this._FR[1][2] + box1.extents[2] * this._FR[1][1];
        t = Math.abs(this._T[0] * this._R[2][0] - this._T[2] * this._R[0][0]);
        if (t > ra + rb) return false;

        //L = A1 x B1
        ra = box0.extents[0] * this._FR[2][1] + box0.extents[2] * this._FR[0][1];
        rb = box1.extents[0] * this._FR[1][2] + box1.extents[2] * this._FR[1][0];
        t = Math.abs(this._T[0] * this._R[2][1] - this._T[2] * this._R[0][1]);
        if (t > ra + rb) return false;

        //L = A1 x B2
        ra = box0.extents[0] * this._FR[2][2] + box0.extents[2] * this._FR[0][2];
        rb = box1.extents[0] * this._FR[1][1] + box1.extents[1] * this._FR[1][0];
        t = Math.abs(this._T[0] * this._R[2][2] - this._T[2] * this._R[0][2]);
        if (t > ra + rb) return false;

        //L = A2 x B0
        ra = box0.extents[0] * this._FR[1][0] + box0.extents[1] * this._FR[0][0];
        rb = box1.extents[1] * this._FR[2][2] + box1.extents[2] * this._FR[2][1];
        t = Math.abs(this._T[1] * this._R[0][0] - this._T[0] * this._R[1][0]);
        if (t > ra + rb) return false;

        //L = A2 x B1
        ra = box0.extents[0] * this._FR[1][1] + box0.extents[1] * this._FR[0][1];
        rb = box1.extents[0] * this._FR[2][2] + box1.extents[2] * this._FR[2][0];
        t = Math.abs(this._T[1] * this._R[0][1] - this._T[0] * this._R[1][1]);
        if (t > ra + rb) return false;

        //L = A2 x B2
        ra = box0.extents[0] * this._FR[1][2] + box0.extents[1] * this._FR[0][2];
        rb = box1.extents[0] * this._FR[2][1] + box1.extents[1] * this._FR[2][0];
        t = Math.abs(this._T[1] * this._R[0][2] - this._T[0] * this._R[1][2]);
        if (t > ra + rb) return false;

        return true;
    }
}