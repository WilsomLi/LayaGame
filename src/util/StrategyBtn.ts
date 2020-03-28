import Utils from "./Utils";
import StrategyMgr from "../mgr/StrategyMgr";
import UIMgr from "../mgr/UIMgr";
import DataStatistics from "../core/DataStatistics";
import AldSDK from "../platform/AldSDK";



/**
 * 策略按钮脚本，简化代码操作
 */
export default class StrategyBtn extends Laya.Script {

    /** @prop {name:module,tips:"策略名称（必填）",type:string}*/
    /** @prop {name:childIdx,tips:"策略图的子项下标",type:int}*/
    /** @prop {name:format,tips:"策略图命名格式，childIdx有效时会自动识别",type:string}*/
    /** @prop {name:videoIdx,tips:"视频ID下标（默认0）",type:number}*/
    /** @prop {name:aldEvent,tips:"阿拉丁打点名称（最好在最后加上横杠，默认为module值加横杠）",type:string}*/
    /** @prop {name:refresh,tips:"是否执行完策略就刷新按钮（默认false，对于按钮实时存在的需要设为true）",type:Bool,default:false}*/
    /** @prop {name:freeeCount,tips:"免费次数，有次数时不执行策略（默认0）",type:int,default:0}*/

    /**
     * 缓存
     */
    private $cache: any[] = [];
    /**
     * 策略配置
     */
    private $config: number;
    /**
     * 阿拉丁打点类型
     */
    private $aldType: string;
    /**
     * 后台打点类型
     */
    private $datType: string;
    /**
     * 是否关卡打点
     */
    private $aldLevel: boolean;
    /**
     * 阿拉丁打点函数 
     */
    private $aldFunc: (str: string) => void;

    public owner: Laya.Sprite;

    /**
     * 重写
     */
    public onEnable(): void {
        var self = this, owner = self.owner;
        if (owner instanceof Laya.Sprite) {
            self.setAldInfo(true);
            Utils.addClick(owner, self.onExcute, self, self.$cache[15]);
            self.initFormat();
            self.update();
        }
        else {
            throw 'owner not instanceof Sprite';
        }
    }

    /**
     * 重写
     */
    public onDisable(): void {
        var self = this;
        self.$aldFunc = self.$cache = null;
        self.owner.offAll();
        // 清理事件
        StrategyMgr.setRefresh('', self, self.updateStrategy);
    }

    /**
     * 更新策略
     */
    protected updateStrategy(): void {
        var self = this;
        var module = self.freeCount > 0 ? '' : self.module;
        var config = self.$config = Utils.initVSBtn(self.owner, module, self.childIdx, self.format);
        if (config > 0) {
            let isVideo = config == 2;
            self.$aldType = isVideo ? '视频' : '分享';
            self.$datType = isVideo ? 'shipin' : 'fenxiang';
        }
        self.excuteCall(2);
    }

    /**
     * 策略属性变更
     */
    protected changeVS(index: number, v: any): void {
        var self = this;
        var cache = self.$cache;
        if (cache[index] !== v) {
            cache[index] = v;
            self.update();
        }
    }

    /**
     * 初始化格式
     */
    protected initFormat(): void {
        var self = this, owner = self.owner;
        if (owner && !self.format) {
            let img: Laya.Image;
            let childIdx = self.childIdx;
            if (childIdx > -1) {
                img = owner.getChildAt(childIdx) as Laya.Image;
            }
            else if (childIdx === void 0) {
                img = <any>owner;
            }
            if (img instanceof Laya.Image) {
                let skin = img.skin.replace(/_((video)|(share))/, '_%s');
                if (skin.indexOf('%s') > -1) {
                    self.format = skin;
                }
            }
        }
    }

    /**
     * 设置策略
     */
    public set module(v: string) {
        var self = this;
        self.changeVS(0, v);
        StrategyMgr.setRefresh(v, self, self.updateStrategy);
    }

    /**
     * 获取策略
     */
    public get module(): string {
        return this.$cache[0];
    }

    /**
     * 设置子控件下标
     */
    public set childIdx(v: number) {
        var self = this;
        self.changeVS(1, v);
        self.initFormat();
    }

    /**
     * 获取子控件下标
     */
    public get childIdx(): number {
        return this.$cache[1];
    }

    /**
     * 设置策略图格式
     */
    public set format(v: string) {
        this.changeVS(2, v);
    }

    /**
     * 获取策略图格式
     */
    public get format(): string {
        return this.$cache[2];
    }

    /**
     * 设置视频下标
     */
    public set videoIdx(v: number) {
        this.$cache[3] = v;
    }

    /**
     * 获取视频下标
     */
    public get videoIdx(): number {
        return this.$cache[3] || 0;
    }

    /**
     * 设置阿拉丁打点名称
     */
    public set aldEvent(v: string) {
        this.$cache[4] = v;
    }

    /**
     * 获取阿拉丁打点名称
     */
    public get aldEvent(): string {
        var self = this;
        return self.$cache[4] || (self.module + '-');
    }

    /**
     * 设置实时刷新
     */
    public set refresh(v: boolean) {
        this.$cache[5] = v;
    }

    /**
     * 获取实时刷新
     */
    public get refresh(): boolean {
        return this.$cache[5];
    }

    /**
     * 设置免费次数
     */
    public set freeCount(v: number) {
        this.changeVS(6, v);
    }

    /**
     * 获取免费次数
     */
    public get freeCount(): number {
        return this.$cache[6];
    }

    /**
     * 界面更新
     */
    public update(): void {
        var self = this, owner = self.owner;
        if (owner) {
            Laya.timer.callLater(self, self.updateStrategy);
        }
    }

    //// 点击相关 ////

    /**
     * 点击执行策略
     */
    protected onExcute(): void {
        var self = this, config = self.$config, bool;
        if (config) {
            self.$aldFunc('%u-' + self.aldEvent + self.$aldType + '-按钮点击');
            self.logEvent();
        }
        bool = self.excuteCall(0);
        if (bool !== false) {
            self.setBtnEnable(false);
            switch (config) {
                case 0:
                    self.onCallBack(true);
                    break;
                case 1:
                    self.onShare();
                    break;
                case 2:
                    self.onVideo();
                    break;
            }
        }
    }

    /**
     * 设置是否能点击
     * @param bool 
     */
    protected setBtnEnable(bool: boolean): void {
        this.owner.mouseEnabled = bool;
    }

    /**
     * 视频
     */
    protected onVideo(): void {
        var self = this;
        // ServerAgency.showVideo(self.videoIdx, self.onCallBack.bind(self));
    }

    /**
     * 分享
     */
    protected onShare(): void {
        var self = this;
        // ServerAgency.shareCard(self.onCallBack.bind(self), {aldEvent: self.aldEvent, aldLevel: self.$aldLevel});
    }

    /**
     * 回调
     * @param bool 结果
     * @param code 错误码，仅视频报错才会传该值，该功能需跟SDK文件搭配
     */
    protected onCallBack(bool: boolean, code?: number): void {
        var self = this;
        self.setBtnEnable(true);
        if (bool) {
            let refresh = false;
            if (self.$config) {
                StrategyMgr.setTimesByModule(self.module);
                self.$aldFunc('%u-' + self.aldEvent + self.$aldType + '-成功领取');
                self.logEvent('chenggong');
                refresh = self.refresh;
            }
            else if (self.freeCount > 0) {
                self.freeCount--;
                refresh = true;
            }
            self.excuteCall(1);
            refresh && self.updateStrategy();
        }
        else {
            self.excuteCall(-1);
            if (code > 0) {
                self.updateStrategy();
                if (code >= 1000) {
                    UIMgr.showTips('视频次数已用完，请明日再来');
                }
            }
        }
    }

    /**
     * 后台打点
     * @param param 参数描述
     */
    protected logEvent(param?: string): void {
        var self = this, cache = self.$cache;
        var eventId = cache[13];
        if (eventId) {
            DataStatistics.logEvent(eventId, {paramID: cache[14] + (param ? '' : param) + self.$datType + '%u'})
        }
    }

    /**
     * 执行回调
     * @param state 类型，0点击前，1点击成功，-1点击失败
     */
    protected excuteCall(state: number): any {
        var self = this, cache = self.$cache, index, param;
        switch (state) {
            case 0:
                index = 9;
                break;
            case -1:
            case 1:
                index = 7;
                param = state == 1;
                break;
            case 2:
                index = 11;
                param = self.$config;
                break;
        }
        var call = cache[index], ret;
        if (call) {
            let obj = cache[index + 1];
            if (param !== void 0) {
                ret = call.call(obj, param);
            }
            else {
                ret = call.call(obj);
            }
        }
        return ret;
    }

    /**
     * 设置回调
     * @param index 起始坐标
     * @param call 
     * @param thisObj 
     */
    protected setCall(index: number, call: Function, thisObj?: any): void {
        var cache = this.$cache;
        cache[index] = call;
        cache[index + 1] = thisObj;
    }

    /**
     * 设置执行完策略的回调
     * @param call 参数表示是否策略的结果
     * @param thisObj 回调所属对象
     */
    public setRetCall(call: (bool: boolean) => void, thisObj?: any): void {
        this.setCall(7, call, thisObj);
    }

    /**
     * 设置点击前的回调
     * @param call 若返回false，则本次点击不执行策略结果
     * @param thisObj 
     */
    public setClickCall(call: ()=> boolean | void, thisObj?: any): void {
        this.setCall(9, call, thisObj);
    }

    /**
     * 设置策略更改回调
     * @param call 参数，当前策略
     * @param thisObj 
     */
    public setUpdateCall(call: (config: number) => void, thisObj?: any): void {
        this.setCall(11, call, thisObj);
    }

    /**
     * 设置阿拉丁打点信息（非游戏功能性方法，因此可勿过深纠）
     * @param 是否加上关卡ID
     * 注：目前仅关卡ID，后续扩展
     */
    public setAldInfo(addLevel: boolean): void {
        var self = this;
        self.$aldLevel = addLevel;
        // 因游戏而定，由于默认参数就带关卡，因此只用一个即可
        self.$aldFunc = /* addLevel ? AldSDK.aldLevelEvent :  */AldSDK.aldSendEvent;
    }

    /**
     * 设置后台打点
     * @param eventId 打点ID
     * @param param 按钮类型
     */
    public setDatInfo(eventId: string, param: string): void {
        var cache = this.$cache;
        cache[13] = eventId;
        cache[14] = param;
    }

    /**
     * 设置点击音效，仅初始时设置有效
     */
    public setSound(sound: string): void {
        this.$cache[15] = sound;
    }

    /**
     * 获取当前策略
     */
    public getConfig(): number {
        return this.$config;
    }
}