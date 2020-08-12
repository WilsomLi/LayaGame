import SoundMgr from "../mgr/SoundMgr";
import Tween from "./Tween";
import GameConst from "../const/GameConst";
import Utils from "./Utils";
import SceneMgr from "../mgr/SceneMgr";
// import ViewModel from "./VideModel";


export default class UIUtils {
    

    static getCell<T>(list:Laya.List,index:number):T {
        return list.getCell(index) as unknown as T;
    }

    /**
     * 舞台转本地
     */
    public static globalToLocal(sprite: Laya.Sprite, x: number, y: number): Laya.Point {
        var temp = Laya.Point.TEMP;
        temp.setTo(x, y);
        sprite.globalToLocal(temp);
        return temp;
    }

    /**
     * 子控件水平居中
     * @param parent 当前节点
     * @param dist 子控件的间隔
     */
    public static centerChild(parent: Laya.Sprite, num?: number, dist: number = 0): void {
        let len = parent.numChildren;
        if (len > 0) {
            let sum = 0, i, j = 0, arr = [];
            num === void 0 && (num = len);
            for (i = 0; i < len; i++) {
                let csi = parent.getChildAt(i) as Laya.Sprite;
                if (csi.visible) {
                    sum += csi.width;
                    arr.push(csi);
                    if (++j >= num) {
                        break;
                    }
                }
            }
            len = arr.length;
            // 起点横坐标
            sum = (parent.width - sum - (len - 1) * dist) / 2;
            for (i = 0; i < len; i++) {
                arr[i].x = sum;
                sum += arr[i].width + dist;
            }
        }
    }

    /**
     * 初始化视频分享按钮，自带总开关控制
     * @param btn 按钮
     * @param module 模块
     * @param childIdx 子控件下标，默认修改按钮本身，若大于-1，则修改子控件图片，若小于0，则不修改
     * @param format 采用“%s”来代替“video”或“share”的命名格式，默认'game/img_%s_icon.png'
     * @returns 配置，大于0为正常，1为分享，2为视频，总开关关闭时也返回0
     */
    public static initVSBtn(btn: Laya.Sprite, module: string, childIdx?: number, format?: string): number {
        var bool = false, config = 0;
        if (module) {
            // let isOpen = GameConst.canShare();
            // config = isOpen ? StrategyMgr.getStrategyByModule(module) : 2;  // 默认策略，因游戏而定，一般是未有流量主是0，有流量主后2
            // config = 2;     // 仅视频

            //TODO

            bool = config > 0;
            if (bool && !(childIdx < 0)) {
                let child = <Laya.Sprite>(childIdx > -1 && btn.getChildAt(childIdx) || btn);
                let skin = Utils.formatString((format || 'main/icon_%s.png'), (config == 2 ? 'video' : 'share'));
                if (child instanceof Laya.Image)
                    child.skin = skin;
                else {
                    Utils.getRes(skin).then(function (res) {
                        child.texture = res;
                    });
                }
                child.visible = true;
            }
        }
        if (!bool) {
            let child = btn.getChildAt(childIdx) as Laya.Sprite;
            if (child) {
                child.visible = false;
                UIUtils.centerChild(btn, 1);
            }
        }
        return config;
    }

    /**
     * 显示误触
     * @param view
     * @param time 延迟时间，默认 GameConst.BtnReSize
     * @param offsetY Y轴偏差
     * @param later 是否延迟触发
     */
    public static showMisTouch(view: Laya.UIComponent, time?: number, offsetY: number = 0, later?: boolean): void {
        if (!GameConst.openMisTouch()) return;
        if (later) {
            let arg = arguments;
            arg[arg.length - 1] = false;
            // 不能覆盖，不然多次调用异常
            Laya.timer.frameOnce(2, UIUtils, UIUtils.showMisTouch, <any>arg, false);
        }
        else {
            let height = view.height;
            let parent = <Laya.UIComponent>view.parent;
            let oldY = view.y, anchorY = view.anchorY || 0;
            let point = UIUtils.globalToLocal(parent, 0, 1180 / 1334 * Laya.stage.height);
            view.y = point.y + ((parent.anchorY || 0) * parent.height) + (anchorY - 0.5) * height + offsetY;

            
            time = time || GameConst.BtnReSize;
            Laya.timer.once(time, null, function () {
                //适配水滴屏
                let offY = 0;
                // let menu: IWXRect = platform.getMenuButtonBoundingClientRect();
                // if(menu) {
                //     offY = menu.top;
                // }
                view.y = oldY + ((view.anchorY || 0) - anchorY) * height - offY;  // 动画结束锚点改动
            });
        }
    }

    /**
     * 添加点击事件
     * @param node 点击对象
     * @param func 回调
     * @param thisObj 回调对象
     * @param once 仅监听一次
     * @param data 回调参数
     * @param time 多次点击阻断，默认300
     * 注：事件清理请使用offAll
     */
    public static addClick(node: Laya.Sprite, func: Function, thisObj?: any, once?: boolean, data?: any, time: number = 300): void {
        var fun = once ? "once" : "on", clickTime = 0, params = [], evtIdx;
        // 防止多次监听  list时可能会出现多次监听
        node.offAll();
        // 当需要传参时，修改回调参数
        if (data !== void 0) {
            params.push(data);
            evtIdx = 1;
        }
        node[fun](Laya.Event.CLICK, thisObj, function (e: Laya.Event) {
            var now = Date.now();
            e.stopPropagation();
            if (now - clickTime < time) {
                // UIMgr.showTips("您的操作过快，请稍后操作");
                return;
            }
            params[evtIdx] = e;
            SoundMgr.playBtnClick();
            func.apply(thisObj, params);
            clickTime = now;
        });
        var oldsx = node.scaleX, oldsy = node.scaleY;
        // 带锚点的控件
        if(node instanceof Laya.UIComponent) {
            if(isNaN(node.anchorX)) {
                node.anchorX = 0.5;
                node.x += node.width * 0.5 * oldsx;
            }
            if(isNaN(node.anchorY)) {
                node.anchorY = 0.5;
                node.y += node.height * 0.5 * oldsy;
            }
        }
        else {
            if (node instanceof Laya.Sprite) {
                if (node.pivotX==0) {
                    node.pivotX = node.width * 0.5 * oldsx;
                    node.x += node.width * 0.5 * oldsx;
                }
                if (node.pivotY==0) {
                    node.pivotY = node.height * 0.5 * oldsy;
                    node.y += node.height * 0.5 * oldsy;
                }
            }
        }
        // 点击动画
        var isTouch = false;
        var nextx = oldsx + (oldsx > 0 ? 1 : -1) * 0.05;
        var nexty = oldsy + (oldsy > 0 ? 1 : -1) * 0.05;
        var tOnce = Tween.once;
        var onDown = function (e: Laya.Event) {
            isTouch = true;
            e.stopPropagation();
            tOnce(node).to({ scaleX: nextx, scaleY: nexty }, 200);
        };
        var onOut = function (e: Laya.Event) {
            if (isTouch) {
                isTouch = false;
                e.stopPropagation();
                tOnce(node).to({ scaleX: oldsx, scaleY: oldsy }, 200);
            }
        };
        node.on(Laya.Event.MOUSE_DOWN, thisObj, onDown);
        node.on(Laya.Event.MOUSE_UP, thisObj, onOut);
        node.on(Laya.Event.MOUSE_OUT, thisObj, onOut);
    }

    //适配顶部
    public static adapterTop(topBox:Laya.Box):void {
        let menu: any = platform.getMenuButtonBoundingClientRect();
        if (menu)  {
            let temp = Laya.Point.TEMP;
            let info: any = platform.getSystemInfoSync();
            temp.y = menu.top * Laya.stage.height / info.screenHeight;
            if (Utils.checkPhoneIsBangs() && temp.y < 44)  {
                temp.y = 44;
            }
            if(!isNaN(topBox.top)) {
                topBox.top = temp.y;
            }
            else {
                (topBox.parent as Laya.Sprite).globalToLocal(temp);
                topBox.y = temp.y;
            }
        }

        if(platform.isOppo) {
            topBox.top = 50;
        }
    }

    // /**
    //  * 显示界面模型
    //  */
    // public static showViewModel(view:Laya.Sprite, cameraUrl:string,url:string=null,aniName:string=null,zOrder:number=-1):ViewModel {
    //     let scene:Laya.Scene3D = new Laya.Scene3D();
    //     scene.input.multiTouchEnabled = true;
    //     if(zOrder != -1){
    //         view.addChildAt(scene,zOrder);
    //     }
    //     else {
    //         view.addChild(scene);
    //     }
    //     scene.ambientColor = SceneMgr.instance.scene.ambientColor;
        
    //     let lightOrigin = SceneMgr.instance.light;
    //     // let light:Laya.DirectionLight = Laya.Sprite3D.instantiate(lightOrigin, null, false) as Laya.DirectionLight; 实例化无效
    //     let light:Laya.DirectionLight = new Laya.DirectionLight();
    //     light.transform.rotation = lightOrigin.transform.rotation;
    //     var attrs = ['color', 'intensity', 'lightmapBakedType'];
    //     Utils.copyAttrs(attrs, light, lightOrigin);

    //     scene.addChild(light);

        
    //     let camera:Laya.Camera = Laya.Sprite3D.instantiate(Laya.loader.getRes(cameraUrl), null, false) as Laya.Camera;
    //     scene.addChild(camera);
    //     camera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;
    //     camera.enableHDR = false;

        
    //     let modelParent:Laya.Sprite3D = new Laya.Sprite3D();
    //     scene.addChild(modelParent);
    //     modelParent.transform.localRotationEulerY = 180;
    //     let model:ViewModel = modelParent.addComponent(ViewModel);
    //     model.changeModel(url);
    //     model.play(aniName);
    //     model.camera = camera;

    //     return model;
    // }
    
    /**
     * 绘制相机渲染到Sprite
     * @param camera 
     * @param sp 
     */
    public static drawTexture(camera:Laya.Camera,sp:Laya.Sprite) {
        let renderTarget = camera.renderTarget;
        let rederTex = new Laya.Texture(<Laya.Texture2D>(renderTarget as any),Laya.Texture.DEF_UV);
        sp.graphics.drawTexture(rederTex);
    }

    public static getRightTop(node:Laya.Sprite):Laya.Point {
        let p = new Laya.Point(node.width,0);
        // if(node.anchorX === 0.5) {
        //     p.x = node.width * 0.5;
        // }
        // if(node.anchorY === 0.5) {
        //     p.y = node.height * 0.5;
        // }
        
        return p;
    }

    /**
     * 添加click监听
     */
    public static addClick2(target: Laya.Sprite, call: Function, thisObj?: any): void {
        target.on(Laya.Event.CLICK, thisObj, call);
    }

}