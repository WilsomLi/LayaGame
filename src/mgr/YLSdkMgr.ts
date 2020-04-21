
import SideMgr from "../side/SideMgr";
import GameConst from "../const/GameConst";
import UserData from "./UserData";
import SideMsg, { ESMessage } from "../side/SideMsg";
import UIMgr from "./UIMgr";

declare const qg: any;
declare const wx: any;
declare const qq: any;
declare const tt: any;

/**
 * 影流SDK oppo版
 */
export default class YLSdkMgr {

    private static _platform: any;
    /**
     * 是否登陆
     */
    public static isLogin: boolean;

    /**
     * 存放自定义开关
     */
    private static defValues: { [key: string]: string } = {};

    /**
     * 初始化
     */
    public static init(): void {
        if ((platform.isOppo || platform.isVivo) && typeof qg !== 'undefined') {
            this._platform = qg;
        } else if (platform.isWechat && typeof wx !== 'undefined') {
            this._platform = wx;
        } else if (platform.isQQ && typeof qg !== 'undefined') {
            this._platform = qq;
        } else if (platform.isToutiao && typeof tt !== 'undefined') {
            this._platform = tt;
        }

        if (this._platform) {
            // 影流sdk初始化
            this._platform.ylInitSDK(function (bool) {
                bool && YLSdkMgr.onInit();
            });
        }
        else {
            // ServerAgency.init();
            // ServerAgency.login();
        }
    }

    /**
     * 设置卖量场景
     * @param scene 
     */
    public static setScene(scene: string): void {
        if (YLSdkMgr.loginSuc()) {
            this._platform.ylSetCurScene(scene);
            UserData.instance.source = scene;
        }
    }

    /**
     * 事件统计
     * @param name 
     */
    public static eventCount(name: string){
        if (YLSdkMgr.loginSuc()) {
            this._platform.ylEventCount(name);
        }
    }

    /**
     * 获取自定义开关
     * @param name 
     */
    public static getDefValue(name: string): string {
        return YLSdkMgr.defValues[name];
    }

    /**
     * 是否登陆
     */
    public static loginSuc(): boolean {
        return YLSdkMgr.isLogin;
    }

    /**
     * 初始化回调
     */
    protected static onInit(): void {
        // 开关
        var switchData = this._platform.ylGetSwitchInfo();
        console.log('开关', switchData);
        GameConst.SceneSwitch = switchData.switchPush == 1;
        GameConst.MisTouchSwitch = switchData.switchTouch == 1;
        GameConst.switchTouch = switchData.switchTouch == 1;

        if (!platform.isToutiao) {
            // 卖量
            this._platform.ylSideBox(function (infos) {
                console.log('卖量', infos);
                // 补充游戏识别的格式
                for (let i in infos) {
                    let info = infos[i];
                    info.sideboxId = info._id;
                    info.jumpAppid = info.toAppid;
                    info.path = info.toUrl;
                    info.status = 1;
                }
                SideMgr.setSvrSide(infos);
            });

            this._platform.ylIntegralWall(function (infos) {
                console.log('积分墙', infos);
                // 补充游戏识别的格式
                for (let i in infos) {
                    let info = infos[i];
                    info.sideboxId = info._id;
                    info.jumpAppid = info.toAppid;
                    info.path = info.toUrl;
                    info.status = 1;
                }
                SideMgr.setSvrSBoard(infos);
            })
        }

        // 自定义开关
        this._platform.ylGetCustom(function (infos) {
            let def = YLSdkMgr.defValues;
            for (let i in infos) {
                let info = infos[i], value = info.value;
                // 保持原有写法
                if (info.type == '2') {
                    value = value == '1' ? value : '';
                }
                def[info.name] = value;
            }
            YLSdkMgr.inItBannerCon();
        });
        YLSdkMgr.isLogin = true;
        SideMsg.notice(ESMessage.C2S_SWITCH, GameConst.openSide());
    }

    private static inItBannerCon(): void {
        let data;
        data = YLSdkMgr.defValues["banner_switch"];
        if (data) {
            GameConst.banner_switch = data.split(",");
        }
        data = YLSdkMgr.defValues["banner_rf_time"];
        if (data) {
            GameConst.banner_rf_time = data.split(",");
        }
        data = YLSdkMgr.defValues["gamebanner"];
        if (data) {
            GameConst.gamebanner = true;
        }

    }

    public static getPlatform(): any {
        return this._platform;
    }

    public static ylNavigateToMiniProgram(jumpInfo, _callback) {
        if ((platform.isOppo) && typeof qg !== 'undefined') {
            qg.ylNavigateToMiniGame(jumpInfo, _callback);
        } else if ((platform.isWechat) && typeof wx !== 'undefined') {
            wx.ylNavigateToMiniProgram(jumpInfo, _callback);
        }
    }
}