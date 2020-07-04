import { ui } from "../ui/layaMaxUI";
import EventType from "../const/EventType";
import ResMgr from "../mgr/ResMgr";
import EventMgr from "../mgr/EventMgr";
import AldSDK from "../platform/AldSDK";
import LoadUtils from "../util/LoadUtils";
import Timer from "../util/Timer";

/**
 * 新版loading界面
 * 携带功能：分包加载、资源加载、卡登陆（确保进入首屏时已登录，若未登陆，界面显示以UserData数据为主，无需考虑数据刷新问题）
 */
export default class LoadingView extends ui.view.LoadingViewUI {

    private util: LoadUtils;    // 多类型加载工作
    private netTimer: Timer;    // 登录定时器

    /**
     * 重写
     */
    public onAwake() {
        var self = this;
        var loadingTime = AldSDK.loadingTime = Date.now();
        self.regEvent(EventType.ResProgress, self.onProgress);
        Laya.loader.on(Laya.Event.ERROR, self, self.onLoadError);
        AldSDK.aldSendEvent('进入加载页', false, { time: loadingTime });
        EventMgr.event(EventType.EnterLoading);
        // 加载分包，将分包的进度写入进度条
        var local = Laya.LocalStorage, cache = 'hasCache';
        // 如果分包已缓存则比重0，否则30%
        var subWg = local.getItem(cache) ? 0 : 0.3;   
        // 类型：0分包、1资源、2登录
        self.util = LoadUtils.create([0, 1, 2], [subWg, 0.95 - subWg, 0.05]);
        // 分包名称，游戏自定
        platform.loadSubpackage('nativescene', function (prog) {
            self.setValue(0, prog);   // 微信返回的是百分比
        }).then(function () {
            local.setItem(cache, '1');
            self.setValue(0, 1);
            ResMgr.preLoadCfg();
        });
    }

    /**
     * 重写
     */
    public onDisable(): void {
        var self = this;
        self.util.clear();
        self.util = null;
        self.removeTimer();
        Laya.loader.off(Laya.Event.ERROR, self, self.onLoadError);
    }

    /**
     * 初始化网络定时器
     */
    protected initTimer(): void {
        var self = this;
        if (!self.netTimer) {
            self.netTimer = new Timer(self.onLogin, self, 12);
        }
        self.onLogin();
    }

    /**
     * 定时器回调
     */
    protected onLogin(): void {
        var self = this;
        var timer = self.netTimer, value;
        // 5秒卡登陆
        // if (ServerAgency.loginSuc() || (value = timer.runTime / 5000) >= 1) {
            value = 1;
            timer.clear();
        // }
        self.util.setValue(2, value);
        self.updateBar();
    }

    /**
     * 移除定时器
     */
    protected removeTimer(): void {
        var self = this;
        var timer = self.netTimer;
        if (timer) {
            timer.clear();
            self.netTimer = null;
        }
    }

    /**
     * 资源加载中
     * @param value 资源加载进度
     */
    protected onProgress(value: number): void {
        var self = this;
        self.setValue(1, value);
        // 资源进度超过一定值时检测登录
        value >= 0.95 && self.initTimer();
    }

    /**
     * 设置类型进度
     * @param key 类型：0分包进度，1登陆进度，2资源进度
     * @param value 0~1
     */
    protected setValue(key: number, value: number): void {
        var self = this;
        self.util.setValue(key, value);
        self.updateBar();
    }

    /**
     * 更新进度条，根据游戏自定
     */
    protected updateBar(): void {
        var self = this, value = self.util.value;
        self.bar.value = value;
        self.txt.changeText("加载中，请稍等..." + (value * 100).toFixed(0) + "%");
        // 真正loading完
        if (value >= 1) {
            EventMgr.event(EventType.LoadingSuc);
        }
    }

    /**
     * 加载异常
     */
    protected onLoadError() {
        this.txt.color = "#FF0000";
        this.txt.text = "加载失败，请确保网络正常，退出游戏重试";
    }
}