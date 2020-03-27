import GameConst from "../const/GameConst";
import UserData from "../mgr/UserData";
import Utils from "../util/Utils";
import AldPlatform from "../platform/AldPlatform";
import StrategyMgr from "../mgr/StrategyMgr";
import ShareTimeMgr from "../mgr/ShareTimeMgr";
import YLSdkMgr from "../mgr/YLSdkMgr";

// 自定义开关
interface IDefSwitch {

};

// 分享卡片参数
interface IShareParam { isForce?: boolean, type?: number, aldEvent?: string, aldLevel?: boolean }

// 分享的卡片场景
const shareScenes = ['normal'];

/**
 * 跟服务器交互相关
 */
export default class ServerAgency {

    /**
     * 默认分享卡片
     */
    private static defCards: IShareCardDetail[] = [
        {
            title: '一起来玩吧！',
            img: 'wxlocal/share1.jpg',
            shareId: 0
        }
    ];
    /**
     * 分享卡片
     */
    static shareCards: IShareCardDetail[][] = [];
    /**
     * 当前需要获取的卡片下标
     */
    private static shareIndex: number = 0;
    /**
     * 自定义开关列表的值
     */
    private static defValues: { [key: string]: string } = {};
    /**
     * 是否首次登录
     */
    private static isFirst: boolean;
    /**
     * 是否成功登录游戏
     */
    private static isLogin: boolean;

    /**
     * 玩家副武器的数据是否拉取成功
     */
    public static isCacheSuc: boolean;

    /**
     * 游戏启动参数
     */
    static query: any;

    /**
     * 进来的分享ID，默认0
     */
    static accountId: number = 0;
    /**
     * 分享卡片ID
     */
    static sharecardId: number = 0;

    /**
     * 分享卡片
     * @param handler 分享回调，可为空
     * @param params 参数：isForce是否强制分享，默认true；type分享类型，默认0；aldEvent阿拉丁打点；aldLevel阿拉丁关卡打点
     */
    public static shareCard(handler?: (bool: boolean) => void, params?: IShareParam): void {
        var self = ServerAgency, info = params || {},
            shareCards = self.shareCards[info.type || 0] || self.defCards,
            card = Utils.randomInArray(shareCards),
            shareId = <number>card.shareId,
            isForce = info.isForce !== false,
            aldEvent = info.aldEvent || '',
            queryData = <IQueryData>{};
        if (shareId > 0) {
            queryData.sharecardId = shareId;
            queryData.accountId = UserData.instance.accountId;
            queryData.from = "";
            // self.reqShareCard(shareId);
        }
        /**
         * 分享参数
         */
        var data = <any>{
            title: card.title,
            imageUrl: card.img,
            query: queryData,
            forceShare: isForce,
            target: ServerAgency
        };
        if (typeof handler === 'function') {
            // 失败触发
            let onFail = function () {
                handler(false);
            };
            // 新假分享策略
            data.shareTime = ShareTimeMgr.getShareTime();
            data.success = function (_res) {
                handler(true);
                // 更新策略
                ShareTimeMgr.addShare(true);
            };
            data.fail = function (_res) {
                // 更新策略
                ShareTimeMgr.addShare(false);
                // 弹窗逻辑
                if (typeof (_res) == "string") {
                    if (isForce) {
                        let aldFunc = AldPlatform.aldSendEvent;
                        let eventId = 'fenxiangshibai';
                        aldEvent += '分享-失败提示框-';
                        aldFunc(aldEvent + '曝光-' + '%u');
                        platform.showModal({
                            title: '提示',
                            content: _res,
                            confirmText: '去分享',
                            success: function (res) {
                                if (res.confirm) {
                                    aldFunc(aldEvent + '去分享点击-%u');
                                    self.shareCard(handler, info);
                                }
                                else {
                                    aldFunc(aldEvent + '取消点击-%u');
                                    onFail();
                                }
                            }
                        });
                        // 二次分享，handler由modal触发
                        return;
                    }
                    else {
                        platform.showModal({
                            title: '提示',
                            content: _res,
                            showCancel: false
                        });
                    }
                }
                onFail();
            };
            platform.onShare(data);
        }
        else {
            platform.showShare(data);
        }
    }

    /**
     * 显示视频，方便做事件统一处理
     * @param tpye 视频ID
     * @param handler 分享回调
     */
    public static showVideo(tpye?: number, handler?: (bool: boolean, code?: number) => void): void {
        platform.createRewardedVideoAd(tpye, function (bool: boolean, code?: number) {
            if (handler) {
                handler(bool, code);
            }
        });
    }

    /**
     * 获取自定义开关数据
     * @param name 
     */
    public static getDefValue(name: string): string {
        return YLSdkMgr.getDefValue(name) ;
    }

    /**
     * 是否socket登陆
     */
    public static loginSuc(): boolean {
        return ServerAgency.isLogin;
    }
}