import Vector3 = Laya.Vector3;
import Camera = Laya.Camera;
import Transform3D = Laya.Transform3D;
import Quaternion = Laya.Quaternion;

export default class CameraDebug extends Laya.Script {

    private camera: Camera;
    private lastMouseX = NaN;
    private lastMouseY = NaN;
    private yawPitchRoll = new Vector3();
    private tempRotationZ = new Quaternion();
    private isMouseDown = false;
    private rotaionSpeed = 0.00006;
    private moveVec = new Vector3();
    private tmpVec = new Vector3();
    private isActive:boolean = false;

    onAwake():void {
        this.camera = this.owner as Camera;
    }

    /**
     * 设置调试模式是否开启
     * @param active 
     */
    setActive(active:boolean):void {
        if(active == this.isActive) {
            return;
        }
        this.isActive = active;
        if(active) {
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);
        }
        else {
            Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
            Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.mouseOut);
        }
    }

    onUpdate():void {
        if(this.isActive) {
            this.updateCamera(Laya.timer.delta);
        }
    }

    mouseDown(e) {
        this.camera.transform.localRotation.getYawPitchRoll(this.yawPitchRoll);
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
        this.isMouseDown = true;
    }

    mouseUp(e) {
        this.isMouseDown = false;
    }

    mouseOut(e) {
        this.isMouseDown = false;
    }

    updateRotation() {
        var yprElem = this.yawPitchRoll;
        if (Math.abs(yprElem.y) < 1.50) {
            Quaternion.createFromYawPitchRoll(yprElem.x, yprElem.y, yprElem.z, this.tempRotationZ);
            this.camera.transform.localRotation = this.tempRotationZ;
        }
    }

    updateCamera(elapsedTime) {
        if (!isNaN(this.lastMouseX) && !isNaN(this.lastMouseY)) {
            var scene = this.owner.scene;
            Laya.KeyBoardManager.hasKeyDown(87) && this.moveForward(-0.01 * elapsedTime);//W
            Laya.KeyBoardManager.hasKeyDown(83) && this.moveForward(0.01 * elapsedTime);//S
            Laya.KeyBoardManager.hasKeyDown(65) && this.moveRight(-0.01 * elapsedTime);//A
            Laya.KeyBoardManager.hasKeyDown(68) && this.moveRight(0.01 * elapsedTime);//D
            Laya.KeyBoardManager.hasKeyDown(81) && this.moveVertical(0.01 * elapsedTime);//Q
            Laya.KeyBoardManager.hasKeyDown(69) && this.moveVertical(-0.01 * elapsedTime);//E

            if (this.isMouseDown) {
                var offsetX = Laya.stage.mouseX - this.lastMouseX;
                var offsetY = Laya.stage.mouseY - this.lastMouseY;

                var yprElem = this.yawPitchRoll;
                yprElem.x -= offsetX * this.rotaionSpeed * elapsedTime;
                yprElem.y -= offsetY * this.rotaionSpeed * elapsedTime;
                this.updateRotation();
            }
        }
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
    }

    /**
     * 向前移动。
     */
    moveForward(distance) {
        this.tmpVec.x = 0;
        this.tmpVec.y = 0;
        this.tmpVec.z = distance;
        this.camera.transform.translate(this.tmpVec);
    }
    /**
     * 向右移动。
     */
    moveRight(distance) {
        this.tmpVec.y = 0;
        this.tmpVec.z = 0;
        this.tmpVec.x = distance;
        this.camera.transform.translate(this.tmpVec);
    }
    /**
     * 向上移动。
     */
    moveVertical(distance) {
        this.tmpVec.x = this.tmpVec.z = 0;
        this.tmpVec.y = distance;
        this.camera.transform.translate(this.tmpVec, false);
    }
}