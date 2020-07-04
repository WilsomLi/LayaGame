
import Utils from "../util/Utils";
import Tween from "../util/Tween";
import YLSDK from "../platform/YLSDK";
import EventMgr from "./EventMgr";
import GameConst from "../const/GameConst";
import UIUtils from "../util/UIUtils";
import EventType from "../const/EventType";
// import SideList from "../script/side/SideList";

/**
 * 类接口，新增参数是便于UI管理类的使用，UI类勿随意更改这些变量
 */
interface IBaseView extends Laya.UIBaseView {
    $uiConfig?: IUIConfig;              // ui配置
    $showBanner?: boolean;              // 是否显示banner
    // Laya未暴露属性
    _aniList?: Laya.AnimationBase[];    // ui动画列表
}

/**
 * 提示文本视图
 */
class TipView extends Laya.View {

    private _txt: Laya.Text;

    public constructor() {
        super();
        var width = 800, height = 80;
        // 底图
        var img = new Laya.Image("common/blank.png");
        img.width = width;
        img.height = height;
        // 文本
        var txt = new Laya.Text();
        this._txt = txt;
        txt.fontSize = 36;
        txt.wordWrap = true;
        txt.color = "#FFFFFF";
        txt.width = width;
        txt.height = height;
        txt.align = "center";
        txt.valign = "middle";
        this.addChild(img);
        this.addChild(txt);
        this.width = width;
        this.height = height;
    }

    /**
     * 设置提示文本
     */
    public set text(text: string) {
        this._txt.text = text;
    }

    /**
     * 开始播放
     * @param call 
     * @param thisObj 
     */
    public play(call: Function, thisObj?: any): void {
        var self = this;
        self.scale(.8, .8);
        self.alpha = 1;
        Tween.get(self).
            to({
                scaleX: 1, scaleY: 1
            }, 200, Tween.turnEase(Laya.Ease.backOut)).
            wait(400).
            to({ alpha: 0 }, 400).
            call(call, thisObj);
    }
}

/**
 * 随机banner
 */
export const randomBanner = function (): string {
    var banners = platform.banners;
    return banners && banners[Math.random() * banners.length | 0];
};

/**
 * UI 管理
 */
export default class UIMgr {

    private static _zOrder: number = 1000;
    private static _keepZOrder: number = 80000;
    private static _tZOrder: number = 100000;
    private static _maskBg: Laya.Image;
    // private static _sideList: SideList;

    private static _uiArray: IBaseView[] = [];
    private static _tipViews: TipView[];

    /**
     * 误触弹起时间
     */
    public static misDelay: number = 0;

    /**
     * 检测界面
     * @param ui 
     */
    protected static checkView(ui: IBaseView): void {
        // 界面出现的时候禁止点击
        // var mgr = Laya.MouseManager; 太坑,微信里会导致有些界面丢失点击
        // if (mgr.enabled) {
        //     mgr.enabled = false;
        //     Utils.uiEnableCall(ui, function () {
        //         mgr.enabled = true;
        //     });
        // }
        if (ui.setCloseCall === void 0) {
            ui.setCloseCall = function (call, obj) {
                let ond = ui.onDisable;
                ui.onDisable = function () {
                    ond.call(ui);
                    ui.onDisable = ond;
                    call && call.call(obj);
                };
            };
        }
        if (ui.onShow === void 0) {
            ui.onShow = function () { };
        }
        if (ui.onHide === void 0) {
            ui.onHide = function () { };
        }
    }

    /**
     * 检测界面banner状态
     * @param ui
     * @param bool 
     */
    protected static checkBanner(ui: IBaseView, bool?: boolean): void {
        let uiConfig = ui.$uiConfig;
        if (bool && uiConfig.banner && GameConst.gamebanner) {
            // let id = randomBanner();
            // if (id) {
            // 显示banner
            let show = function () {
                // platform.setBannerVisible(true);
                YLSDK.ylBannerAdShow();
            };
            let delay = uiConfig.delay && UIMgr.misDelay;
            // 先创建
            // platform.createBannerAd(id, function (isShow: boolean) {
            //     isShow || UIMgr.showSideList(ui);
            // }, uiConfig.keepBan, uiConfig.smallBan);
            if (Utils.checkPhoneIsBangs()) {
                YLSDK.ylBannerAdCreate(true);
            }
            else {
                YLSDK.ylBannerAdCreateSmall(true);
            }
            if (delay > 0) {
                // 先隐藏，时间到再显示
                // platform.setBannerVisible(false);
                YLSDK.ylBannerAdHide();
                ui.timer.once(delay, null, function () {
                    if (ui.$showBanner && ui == UIMgr.topUI()) {
                        show();
                    }
                });
            }
            else {
                show();
            }
            ui.$showBanner = true;
            return;
            // }
            // else {
            //     UIMgr.showSideList(ui);
            // }
        }
        ui.$showBanner = false;
        // platform.setBannerVisible(false);
        YLSDK.ylBannerAdHide();
        UIMgr.hideSideList();
    }

    /**
     * 检测界面遮罩状态
     * @param ui 
     */
    protected static checkMask(ui: IBaseView): void {
        var config = ui.$uiConfig;
        config && config.mask ? UIMgr.showMaskBg(ui) : UIMgr.hideMaskBg();
    }

    /**
     * 
     * @param ui 误触
     */
    protected static checkMistouch(ui: IBaseView): void {
        let name = ui.$uiConfig.mistouch;
        if (!name) return;

        let originOnAwake = ui.onAwake;
        ui.onAwake = ()=>{
            originOnAwake.apply(ui);
            let component: Laya.UIComponent = ui[name];
            if (component) {
                UIUtils.showMisTouch(component);
            }
            else {
                console.warn('checkMistouch null:', name);
            }
        }
    }

    /**
     * 顶层检测
     */
    protected static checkTop(topUI: IBaseView): void {
        var curTop = UIMgr.topUI();
        // 确保关闭了顶层界面的同时没有再打开新界面
        if (topUI == curTop && curTop) {
            // 最顶层检测是否显示banner
            UIMgr.checkBanner(topUI, true);
            // 最顶层检测是否显示遮罩
            UIMgr.checkMask(topUI);
            // 通知顶层显示
            curTop.onShow();
        }
    }

    /**
     * 显示底部卖量
     */
    protected static showSideList(ui: IBaseView): void {
        // var list = UIMgr._sideList;
        // if (!list) {
        //     list = new SideList;
        //     list.zOrder = 100;
        //     list.centerX = 0;
        // }
        // Utils.uiEnableCall(ui, function () {
        //     ui.addChild(list);
        //     list.y = Utils.globalToLocal(ui, 0, Laya.stage.height - 200).y; // 200 为list的高度
        // });
    }

    /**
     * 隐藏卖量列表
     */
    protected static hideSideList(): void {
        // var list = UIMgr._sideList;
        // list && (list.visible = false);
    }

    /**
     * 页面关闭
     */
    protected static onUIClose(ui: IBaseView): void {
        var config = ui.$uiConfig;
        var tween = config && config.tween;
        if (tween) {
            UIMgr.hideTween(ui);
        } else {
            UIMgr.destroyUI(ui);
        }
    }

    /**
     * UI界面销毁
     */
    protected static destroyUI(ui: IBaseView): void {
        var list = ui._aniList;
        if (list) {
            for (let i = 0, len = list.length; i < len; i++) {
                let ani = list[i];
                if (ani instanceof Laya.AnimationBase)
                    ani.clear();
            }
            ui._aniList = null;
        }
        Laya.timer.clearAll(ui);
        Laya.stage.removeChild(ui);
        Tween.clearAll(ui);
        ui.close();
        ui.destroy(true);
    }

    /**
     * 显示界面动画
     * @param ui 
     */
    protected static showTween(ui: IBaseView): void {
        Utils.uiEnableCall(ui, UIMgr.onShowTween, UIMgr, ui);
    }

    /**
     * 显示界面动画回调
     * @param ui 
     */
    protected static onShowTween(ui: IBaseView): void {
        var stage = Laya.stage;
        if (isNaN(ui.anchorX)) {
            ui.anchorX = .5;
            ui.x += ui.width / 2;
        }
        if (isNaN(ui.anchorY)) {
            ui.anchorY = .5;
            ui.y += ui.height / 2;
        }
        // 准备动作
        ui.scale(0, 0);
        stage.mouseEnabled = false;
        // 动画
        Tween.get(ui).to({ scaleX: 1, scaleY: 1 }, 300, Tween.turnEase(Laya.Ease.backOut)).call(function () {
            // 结束动作
            stage.mouseEnabled = true;
        });
    }

    /**
     * 关闭界面动画
     * @param ui 
     */
    protected static hideTween(ui: IBaseView): void {
        // 显示动画已设置过锚点，关闭就不再检测了
        var stage = Laya.stage;
        // 准备动作
        UIMgr.showMaskBg(ui);
        stage.mouseEnabled = false;
        // 动画
        Tween.get(ui).to({ scaleX: 0, scaleY: 0 }, 300, Tween.turnEase(Laya.Ease.backIn)).call(function () {
            // 结束动作
            UIMgr.hideMaskBg();
            stage.mouseEnabled = true;
            // 销毁
            UIMgr.destroyUI(ui);
        });
    }

    /**
     * 显示遮罩背景
     */
    protected static showMaskBg(ui: IBaseView): void {
        var mask = UIMgr._maskBg;
        var stage = Laya.stage;
        if (!mask) {
            mask = UIMgr._maskBg = new Laya.Image("common/blank_2.png");
            mask.sizeGrid = "2,2,2,2";
            mask.size(stage.width + 20, stage.height + 20);
            mask.pos(-10, -10);
            mask.alpha = .7;
            mask.on(Laya.Event.MOUSE_DOWN, UIMgr, UIMgr.onStMask);
        }
        stage.addChild(mask);
        mask.zOrder = ui.zOrder;
        stage.setChildIndex(mask, stage.getChildIndex(ui));
    }

    /**
     * 隐藏遮罩背景
     */
    protected static hideMaskBg(): void {
        var mask = UIMgr._maskBg;
        mask && mask.removeSelf();
    }

    /**
     * 点中黑色遮罩
     * @param e 
     */
    protected static onStMask(e: Laya.Event): void {
        e.stopPropagation();
    }

    //// 供外部使用方法 ////

    /**
     * 页面打开
     */
    public static openUI(uiConfig: IUIConfig, data?: any, visible?: boolean, isKeep: boolean = false): IBaseView {
        if (GameConst.Log) {
            console.log('openUI', uiConfig.class)
        }
        if (uiConfig) {
            if (GameConst.openMisTouch() && uiConfig.mistouch) {
                uiConfig.delay = GameConst.BannerShowTime;
            }

            let old = UIMgr.findUI(uiConfig);
            if (old) {
                console.warn('so quick');
                return;
            }
            let clzz = Laya.ClassUtils.getRegClass(uiConfig.class);
            // 类存在且必须继承自基类
            if (clzz && clzz.prototype instanceof Laya.Sprite) {
                let ui = <IBaseView>new clzz;
                let top = UIMgr.topUI();
                if (data != null) {
                    ui.dataSource = data;
                }

                if (isKeep) {
                    ui.zOrder = UIMgr._keepZOrder;
                }
                else {
                    ui.zOrder = UIMgr._zOrder++;
                }
                ui.visible = visible !== false;
                ui.$uiConfig = uiConfig;     // 额外添加参数
                
                UIMgr._uiArray.push(ui);
                UIMgr.checkBanner(ui, true);
                UIMgr.checkView(ui);
                UIMgr.checkMistouch(ui);
                Laya.stage.addChild(ui);
                UIMgr.checkMask(ui);
                // 通知顶层被覆盖
                top && top.onHide();
                // 动画
                uiConfig.tween && UIMgr.showTween(ui);
                ui.eventCount && ui.eventCount();

                EventMgr.event(EventType.UpdateView);

                return ui;
            }
            else
                console.error("openUI error", uiConfig);
        }
    }

    /**
     * 打开页面列表
     * @param views 页面列表，子项：[界面配置，界面参数]
     * @param call 所有页面全部关闭后触发的回调
     */
    public static openUIs(views: [IUIConfig, any][], call?: Function): void {
        // 执行弹窗顺序
        for (let i = views.length - 1; i >= 0; i--) {
            let view = views[i];
            let old = <any>call;
            call = function () {
                UIMgr.openUI(view[0], view[1]).setCloseCall(old);
            };
        }
        call && call();
    }

    /**
     * 页面关闭
     * @param uiConfig 
     */
    public static closeUI(uiConfig: IUIConfig): void {
        var isTop = false;
        if (uiConfig) {
            let _uiArray = UIMgr._uiArray;
            for (let endi = _uiArray.length - 1, i = endi; i >= 0; i--) {
                let ui = _uiArray[i];
                if (ui.$uiConfig == uiConfig) {
                    _uiArray.splice(i, 1);
                    UIMgr.onUIClose(ui);
                    isTop = i == endi;
                    break;
                }
            }
        }
        // 如果移除的是顶层（延迟机制，多层关闭仅触发一次）
        if (isTop) {
            Laya.timer.frameOnce(2, UIMgr, UIMgr.checkTop, [UIMgr.topUI()]);
        }

        EventMgr.event(EventType.UpdateView);
    }

    /**
     * UI更新
     * @param uiConfig UI配置，详情看EUI.ts
     * @param data 参数，注意，页面存在时data为undefined时不刷新原来的数据，如果想清空原数据请传null；页面不存在时原理同openUI
     */
    public static updateUI(uiConfig: IUIConfig, data?: any): void {
        var view = UIMgr.findUI(uiConfig);
        if (view) {
            UIMgr.setTop(uiConfig);
        }
        else
            UIMgr.openUI(uiConfig, data);
    }

    /**
     * 关闭除uiConfig之外的其他界面，若不存在则打开新界面
     * @param uiConfig 界面配置
     * @param data 新的界面数据，若存在旧界面，且不为undefined则刷新数据
     */
    public static toUI(uiConfig: IUIConfig, data?: any): IBaseView {
        var array = UIMgr._uiArray, oldUI;
        // 关闭无关界面
        for (let i = array.length - 1; i >= 0; i--) {
            let ui = array[i];
            if (ui.$uiConfig != uiConfig) {
                if (ui.zOrder != UIMgr._keepZOrder) {
                    UIMgr.onUIClose(ui);
                    array.splice(i, 1);
                }
            }
            else {
                oldUI = ui;
                data !== void 0 && (ui.dataSource = data);
            }
        }
        if (oldUI) {
            UIMgr.checkTop(oldUI)
        }
        else {
            oldUI = UIMgr.openUI(uiConfig, data);
        }
        // 不存在则打开新的
        return oldUI;
    }

    //// 工具方法 ////

    /**
     * 修改界面banner状态
     * @param uiConfig 必须是当前置顶的UI才能被修改
     * @param bool 是否显示
     */
    public static showBanner(uiConfig: UIConfig, bool?: boolean): void {
        var view = UIMgr.topUI();
        if (view && view.$uiConfig == uiConfig) {
            UIMgr.checkBanner(view, bool);
        }
    }

    /**
     * 显示提示文本（同一时间最多显示三条）
     * @param msg 
     */
    public static showTips(msg: string): void {
        var tips = UIMgr._tipViews;
        if (tips == null) {
            let box = new Laya.Box();
            tips = UIMgr._tipViews = [];
            Laya.stage.addChild(box);
            box.zOrder = UIMgr._tZOrder;
            for (let i = 0; i < 3; i++) {
                let subBox = new TipView;
                subBox.alpha = 0;
                box.addChild(subBox);
                subBox.anchorX = subBox.anchorY = 0.5;
                subBox.x = 400;
                subBox.visible = false;
                tips.push(subBox);
            }
            box.width = 800;
            box.centerX = 0;
            box.centerY = -20;
        }
        if (tips.length == 0)
            return;
        var txt = tips.shift();
        txt.text = msg;
        txt.visible = true;
        txt.play(function () {
            tips.push(txt);
            txt.visible = false;
        });
    }

    /**
     * 查找对应配置的UI
     */
    public static findUI(uiConfig: IUIConfig): IBaseView {
        if (uiConfig) {
            let _uiArray = UIMgr._uiArray;
            for (let i = _uiArray.length - 1; i >= 0; i--) {
                let ui = _uiArray[i];
                if (ui.$uiConfig == uiConfig)
                    return ui;
            }
        }
        return null;
    }

    /**
     * 页面置顶
     * @param uiConfig 
     */
    public static setTop(uiConfig: IUIConfig): void {
        var ui = UIMgr.findUI(uiConfig);
        if (ui) {
            let _uiArray = UIMgr._uiArray;
            let index = _uiArray.indexOf(ui);
            _uiArray.splice(index, 1);
            _uiArray.push(ui);
            ui.visible = true;
            ui.zOrder = UIMgr._zOrder++;
            UIMgr.checkTop(ui);
        }
    }

    /**
     * 获取最上层的UI
     */
    private static topUI(): IBaseView {
        var array = UIMgr._uiArray;
        var length = array.length;
        if (length > 0)
            return array[length - 1];
    }

    /**
     * 设置UI界面visible属性
     */
    public static setVisible(uiConfig: IUIConfig, bool?: boolean, isKeep?: boolean): IBaseView {
        var ui = UIMgr.findUI(uiConfig);
        if (bool && !ui) {
            ui = UIMgr.openUI(uiConfig, null, bool, isKeep);
        }
        ui && (ui.visible = bool);
        return ui;
    }

    public static get topZOrder(): number {
        return UIMgr._tZOrder - 1;
    }
}