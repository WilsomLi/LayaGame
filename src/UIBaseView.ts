import EventMgr from "./mgr/EventMgr";
import YLSDK, { IBtnMisTouch } from "./platform/YLSDK";
import Utils from "./util/Utils";
import GameConst from "./const/GameConst";
import UIUtils from "./util/UIUtils";

/**
 * 面板基类
 */
export default class UIBaseView extends Laya.View {

    constructor(){
        super()
    }
    /**
     * 初始化
     */
    public static init(): void {
        Laya.UIBaseView = <any>UIBaseView;
    }

    //// 内部属性 ////

    private $events: any = {};
    private $calls: any[] = [];
    private $uiConfig:IUIConfig;
    public $btnMisTouch:Laya.Image = null;
    public $userdata:any;    //自定义数据
    private _misTouchBtnPos:Laya.Vector2 = new Laya.Vector2();

    /**
     * 当调用了setCloseCall的回调时，该值为其返回参数；子类重写
     */
    protected closeParam: any;

    onEnable(){
        this.showMisTouchBtn();
    }

    /**
     * 重写
     */
    public onDestroy(): void {
        super.onDestroy();
        var self = this, eventMgr = EventMgr, events = self.$events;
        // 注册事件清理
        for (let name in events) {
            eventMgr.off(name, self, events[name]);
        }
        self.$events = null;
        // 执行关闭回调
        var calls = self.$calls, param = self.closeParam;
        for (let i in calls) {
            let data = calls[i];
            data[0].call(data[1], param);
        }
        // 各种清理
        self.timer.clearAll(this);//不能删除，嵌套子界面销毁计时器
        self.offAll();
        self.$calls = self.closeParam = null;
    }

    /**
     * 注册自身事件
     * @param eventName 
     * @param func 
     */
    protected regEvent(eventName: string, func: Function): void {
        var self = this;
        self.$events[eventName] = func;
        EventMgr.on(eventName, self, func);
    }

    /**
     * 注册自身监听事件，同时清空之前注册事件
     * @param node 节点
     * @param func 回调
     * @param once 是否只触发一次
     * @param data 回调参数
     * @param time 多次点击阻断，默认300
     */
    protected regClick(node: Laya.Sprite, func: Function, once?: boolean, data?: any, time?: number): void {
        UIUtils.addClick(node, func, this, once, data, time);
    }

    /**
     * 层级变化——显示时调用（创建不调用）
     */
    public onShow(): void {

    }

    /**
     * 层级变化——被覆盖时调用
     */
    public onHide(): void {

    }

    /**
     * 设置关闭回调，不会覆盖
     * @param call 
     * @param thisObj 
     */
    public setCloseCall(call: (param?: any) => void, thisObj?: any): void {
        this.$calls.push([call, thisObj]);
    }

    /**
     * 清理关闭回调，阻断界面连续关闭
     */
    public clearCloseCall():void {
        if(this.$calls) {
            this.$calls.length = 0;
        }
    }

    /**
     * 界面事件打点，默认上报ui类名，需要自定义事件名的重载此方法
     */
    public eventCount(){
        if(this.$uiConfig) {
            window.ydhw_wx && ydhw.StatisticEvent('ui', this.$uiConfig.name);
        }
    }

    /**
     * 设置界面误触
     */
    public showMisTouchBtn(): void {
        let misTouchInfo = YLSDK.getBtnMisData() as IBtnMisTouch;
        let moveTime = misTouchInfo.btnTime;        
        let time = moveTime || 0;
        let buttonName = this.$uiConfig ? this.$uiConfig.misTouch : '';

        if(misTouchInfo.switch && buttonName && time && this[buttonName])
        {
            let misTouchBtn = this[buttonName];
            this._misTouchBtnPos.setValue(misTouchBtn.x, misTouchBtn.y);
            misTouchBtn.bottom = 60;

            Laya.timer.once(time, this, () => {
                misTouchBtn.bottom = NaN;
                let x = this._misTouchBtnPos.x + misTouchBtn.width * (misTouchBtn.anchorX || 0);
                let y = this._misTouchBtnPos.y + misTouchBtn.height * (misTouchBtn.anchorY || 0);

                misTouchBtn.pos(x, y);
            })
        }
    }
}