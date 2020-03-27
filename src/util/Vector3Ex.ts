import Vector3 = Laya.Vector3;

/**
* Laya.Vector3 扩展
*/
export default class Vector3Ex {
    static readonly ZERO = new Vector3(0, 0, 0);
    static readonly One = new Vector3(1, 1, 1);
    static readonly Up = new Vector3(0, 1, 0);
    static readonly ForwardLH = new Vector3(0, 0, 1);
    static readonly ForwardRH = new Vector3(0, 0, -1);
    static readonly UnitX = new Vector3(1, 0, 0);
    static readonly UnitY = new Vector3(0, 1, 0);
    static readonly UnitZ = new Vector3(0, 0, 1);
}