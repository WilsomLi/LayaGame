/**
     * 3D缓动类
     * 改自网上 longhui创作的开源类
     * by cjh
     */
    export default class Tween3D  {
        /** 缓动映射表 */
        private static tweenMaps: any = {};
        /** 缓动目标 */
        private target: Laya.Sprite3D;
        /** 缓动 */
        private tween: Laya.Tween;
        /** 缓动数据 */
        private data;
        /** 缩放属性 */
        public scaleX: number = 1;
        public scaleY: number = 1;
        public scaleZ: number = 1;
        /** 位置属性 */
        public posX: number = 0;
        public posY: number = 0;
        public posZ: number = 0;
        public posVec3: Laya.Vector3;
        /** 世界位置属性 */
        public wposX: number = 0;
        public wposY: number = 0;
        public wposZ: number = 0;
        public wposVec3: Laya.Vector3;
        /** 欧拉角属性 */
        public eulerX: number = 0;
        public eulerY: number = 0;
        public eulerZ: number = 0;
        public eulerVec3: Laya.Vector3;

        /** 唯一id */
        public id: number = 0;

        constructor(target: Laya.Sprite3D, data: any) {
            // super();
            this.target = target;
            this.data = data;
            this.id = target.id + Tween3D.hashCode(target.url);
        }

        public static hashCode(strValue: string):number {
            let tmpRet = 0;
            if(!strValue || strValue.length == 0)
            {
                return tmpRet;
            }
            let tmpValue = 0;
            for (let i = 0; i < strValue.length; i++) {
                tmpValue = 31 * tmpValue + strValue.charCodeAt(i);
            }
            tmpRet = tmpValue;
            return tmpRet;
        }


        /** 到达缓动 */
        public static to(target: Laya.Sprite3D, data: any, duration: number, ease?: Function, completeHandler?: Laya.Handler, delay?: number): Tween3D {
            let tmpTween3D = new Tween3D(target, data);
            return tmpTween3D._to(duration, ease, completeHandler, delay);
        }

        /** 到达缓动 */
        public _to(duration: number, ease?: Function, completeHandler?: Laya.Handler, delay?: number): Tween3D {
            let data = {};
            // 缩放
            if (this.data.localScale) {
                let curScale = this.target.transform.localScale;
                this.scaleX = curScale.x;
                this.scaleY = curScale.y;
                this.scaleZ = curScale.z;
                data["scaleX"] = this.data.localScale.x;
                data["scaleY"] = this.data.localScale.y;
                data["scaleZ"] = this.data.localScale.z;                
            }
            // 位置
            if (this.data.localPosition) {
                let curPos = this.target.transform.localPosition;
                this.posX = curPos.x;
                this.posY = curPos.y;
                this.posZ = curPos.z;
                data["posX"] = this.data.localPosition.x;
                data["posY"] = this.data.localPosition.y;
                data["posZ"] = this.data.localPosition.z;
                this.posVec3 = new Laya.Vector3(this.posX, this.posY, this.posZ);
            }
            // 世界位置
            if (this.data.position) {
                let curPos = this.target.transform.position;
                this.wposX = curPos.x;
                this.wposY = curPos.y;
                this.wposZ = curPos.z;
                data["wposX"] = this.data.position.x;
                data["wposY"] = this.data.position.y;
                data["wposZ"] = this.data.position.z;
                this.wposVec3 = new Laya.Vector3(this.wposX, this.wposY, this.wposZ);
            }
            // 欧拉角
            if (this.data.localRotationEuler) {
                let curEuler = this.target.transform.localRotationEuler;
                this.eulerX = curEuler.x;
                this.eulerY = curEuler.y;
                this.eulerZ = curEuler.z;
                data["eulerX"] = this.data.localRotationEuler.x;
                data["eulerY"] = this.data.localRotationEuler.y;
                data["eulerZ"] = this.data.localRotationEuler.z;
                this.eulerVec3 = new Laya.Vector3(this.eulerX, this.eulerY, this.eulerZ);
            }
            data["update"] = Laya.Handler.create(this, this.onUpdate, null, false);
            this.tween = Laya.Tween.to(this, data, duration, ease, Laya.Handler.create(this, this.onTweenCompleted, [function() {
                if (completeHandler) {
                    completeHandler.run();
                }
            }]), delay, true);
            let key = "" + this.target.id;
            Tween3D.tweenMaps[key] = Tween3D.tweenMaps[key] || {};
            Tween3D.tweenMaps[key]["" + this.id] = this;
            // Laya.timer.frameLoop(1, this, this.onUpdate);
            return this;
        }

        /** 结束 */
        private onTweenCompleted(completeFunction) {
            this.clear();
            if (completeFunction) {
                completeFunction();
            }
        }

        /** 停止缓动 */
        public clear() {
            Laya.timer.clear(this, this.onUpdate);
            if (this.tween){
                Laya.Tween.clear(this.tween);
                this.tween = null;
            }
        }

        /** 停止目标身上的缓动 */
        public static clearTargetTween(target: Laya.Sprite3D, tween3D?: Tween3D) {
            if (target && Tween3D.tweenMaps["" + target.id]) {
                let key = "" + target.id;
                let tween3DArr = Tween3D.tweenMaps[key];
                if (tween3D) {
                    for (let tkey in tween3DArr) {
                        if (tween3DArr.hasOwnProperty(tkey)) {
                            let t3d = tween3DArr[tkey];
                            if (t3d.id == tween3D.id) {
                                t3d.clear();
                                // Tween3D.tweenMaps[key][tkey] = null;
                                return;
                            }
                        }
                    }
                }else {
                    for (let tkey in tween3DArr) {
                        if (tween3DArr.hasOwnProperty(tkey)) {
                            let t3d = tween3DArr[tkey];
                            t3d.clear();
                            // Tween3D.tweenMaps[key][tkey] = null;
                        }
                    }
                }
            }
        }

        /** 每帧刷新 */
        private onUpdate() {
            if (this.target) {
                if (this.data.localScale && this.scaleX != null && this.scaleY != null && this.scaleZ != null) {
                    this.target.transform.localScale.x = this.scaleX;
                    this.target.transform.localScale.y = this.scaleY;
                    this.target.transform.localScale.z = this.scaleZ;
                }
                if (this.data.localPosition && this.posX != null && this.posY != null && this.posZ != null) {
                    this.posVec3.x = this.posX;
                    this.posVec3.y = this.posY;
                    this.posVec3.z = this.posZ;
                    this.target.transform.localPosition = this.posVec3;
                }
                if (this.data.position && this.wposX != null && this.wposY != null && this.wposZ != null) {
                    this.wposVec3.x = this.wposX;
                    this.wposVec3.y = this.wposY;
                    this.wposVec3.z = this.wposZ;
                    this.target.transform.position = this.wposVec3;
                }
                if (this.data.localRotationEuler && this.eulerX != null && this.eulerY != null && this.eulerZ != null) {
                    this.eulerVec3.x = this.eulerX;
                    this.eulerVec3.y = this.eulerY;
                    this.eulerVec3.z = this.eulerZ;
                    this.target.transform.localRotationEuler = this.eulerVec3;
                }
            }
        }
    }