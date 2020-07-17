import { ui } from "../ui/layaMaxUI";
import EventType from "../const/EventType";
import ResMgr from "../mgr/ResMgr";
import EventMgr from "../mgr/EventMgr";
import AldSDK from "../platform/AldSDK";
import LoadUtils from "../util/LoadUtils";
import GameConst from "../const/GameConst";

export enum ResType {
    Nativescene,//分包1
    PreloadRes,//预加载资源

    ZipPack,//zip包
}

/**
 * 新版loading界面
 * 携带功能：分包加载、资源加载、卡登陆（确保进入首屏时已登录，若未登陆，界面显示以UserData数据为主，无需考虑数据刷新问题）
 */
export default class LoadingView extends ui.view.LoadingViewUI {

    private util: LoadUtils;    // 多类型加载工作

    /**
     * 重写
     */
    public onAwake() {
        var self = this;
        var loadingTime = AldSDK.loadingTime = Date.now();
        self.regEvent(EventType.ResProgress, self.onPreloadResProgress);
        self.regEvent(EventType.SubpkgProgress, self.onSubPackageProgress);

        Laya.loader.on(Laya.Event.ERROR, self, self.onLoadError);
        AldSDK.aldSendEvent('进入加载页', false, { time: loadingTime });
        EventMgr.event(EventType.EnterLoading);

        let keys = [ResType.Nativescene, ResType.PreloadRes];        
        let ratios = [0.5, 0.5];//加载权重
        self.util = LoadUtils.create(keys, ratios);
        // 分包名称，游戏自定
        platform.loadSubpackage('nativescene', function (prog) {
            self.setValue(0, prog / 100);   // 微信返回的是百分比
        }).then(function () {
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
        Laya.loader.off(Laya.Event.ERROR, self, self.onLoadError);
    }

    /**
     * 资源加载中
     * @param value 资源加载进度
     */
    protected onPreloadResProgress(value: number): void {
        var self = this;
        self.setValue(ResType.PreloadRes, value);
    }

    protected onSubPackageProgress(data:Array<number>):void {
        var self = this;
        self.setValue(data[0],data[1]);
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

    // 勿删，有用代码
    // //3D资源大于4M的可以压缩zip再放分包里
    // public loadZipPackage():Promise<any>{
    //     //subpack4放的是zip包，如果版本一致，并且已解压到wx自定义目录则不再加载
    //     let resVersion = Laya.LocalStorage.getItem('ResVersion');
    //     if (GameConst.ResVersion == resVersion) {
    //         return new Promise((resolve) => {
    //             EventMgr.event(EventType.SubpkgProgress,[ResType.ZipPack, 1]);
    //             resolve(true);
    //         });
    //     }

    //     //如果版本不一致，则删除wx自定义目录,重新下载并解压
    //     return platform.loadSubpackage('subpack4', (prog4) => {
    //         EventMgr.event(EventType.SubpkgProgress,[prog4 / 100]);
    //     }).then(() => {
    //         EventMgr.event(EventType.SubpkgProgress,[ResType.ZipPack, 1]);

    //         let fileManager = wx.getFileSystemManager();
    //         fileManager.rmdir({
    //             dirPath: wx['env'].USER_DATA_PATH + "/scene",
    //             recursive: true,
    //         })
    //         console.log('scene dir remove');

    //         return new Promise((resolve)=>{
    //             fileManager.unzip({
    //                 zipFilePath: '/zipkacp/scene.zip',
    //                 targetPath: window.wx['env'].USER_DATA_PATH,  // 解压资源存放路径
    //                 success: (res) => {// 解压成功
    //                     console.log("assets unzip success");
    //                     Laya.LocalStorage.setItem('ResVersion', GameConst.ResVersion);
    //                     resolve(true);
    //                 },
    //                 fail: (res) => {// 解压失败
    //                     console.error("assets unzip fail");
    //                     resolve(false);
    //                 },
    //             });
    //         })            
    //     });
    // }
}