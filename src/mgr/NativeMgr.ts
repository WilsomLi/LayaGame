
/**
 * 原生广告管理类，oppo专属
 */
export default class NativeMgr {

    /**
     * 原生广告对象
     */
    private static $nativeAd: any;

    /**
     * 是否初始化了原生广告信息
     */
    private static $info: INativeInfo;

    /**
     * 初始化原生广告信息
     * @param info 
     */
    public static init(nativeAd: any, infos: INativeInfo[]): void {
        if (nativeAd && infos && infos.length > 0) {
            NativeMgr.$nativeAd = nativeAd;
            NativeMgr.$info = infos[0];
            console.log('原生广告', NativeMgr.$info);
        }
    }

    /**
     * 显示原生广告 todo界面自定义
     */
    public static show(call: Function, thisObj?: any): void {
        var info = NativeMgr.$info;
        if (info) {
            // UIMgr.openUI(EUI.Native2View, info).setCloseCall(<any>call, thisObj);
        }
        else {
            call.call(thisObj);
        }
    }

    /**
     * 原生广告点击
     */
    public static click(): void {
        var nativeAd = NativeMgr.$nativeAd;
        nativeAd && nativeAd.reportAdClick({ adId: NativeMgr.$info.adId });
    }
}