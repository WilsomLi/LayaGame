import SideMsg, { ESMessage } from "../side/mgr/SideMsg";
import UserData from "./UserData";
import SoundMgr from "./SoundMgr";
import AldSDK from "../platform/AldSDK";
import DataStatistics from "../core/DataStatistics";

/**
 * 卖量接受者/继承基类卖量需要使用该工具，减少通用功能代码的重复调用
 */
export default class SideReceiver {

    /**
     * 初始化
     */
    public static init(): void {
        var self = SideReceiver;
        var register = SideMsg.register;
        register(ESMessage.S2C_REMOVE, self.onRemove, self);
        register(ESMessage.S2C_CLICK_BTN, self.onClickBtn, self);
        register(ESMessage.S2C_CANCEL, self.onCancel, self);
        register(ESMessage.S2C_DOT_SERVER, self.onDotServer, self);
        register(ESMessage.S2C_DOT_ALD, self.onDotAld, self);
        register(ESMessage.S2C_DOT_EVENT, self.onDotEvent, self);
    }

    /**
     * 卖量移除
     */
    protected static onRemove(data: IYDHW.GameBase.ISideBoxResult): void {
        UserData.instance.removeSide(data);
    }

    /**
     * 点击卖量
     */
    protected static onClickBtn(): void {
        SoundMgr.playBtnClick();
    }

    /**
     * 取消卖量跳转，游戏自定义
     */
    protected static onCancel(): void {
        // UIMgr.openUI(EUI.MoreGame);
    }

    /**
     * 服务器卖量打点
     * @param event 卖量标识
     * @param side 卖量
     * @param enable 是否跳转
     */
    protected static onDotServer(event: string, side: ISideboxData, enable: boolean): void {
        // ServerAgency.reqC2SClick(event, side, enable);
    }

    /**
     * 阿拉丁打点
     * @param event 卖量标识
     * @param data 打点参数
     */
    protected static onDotAld(event: string, data: any): void {
        AldSDK.aldSendEvent(event, true, data);
    }

    /**
     * 后台事件打点
     * @param event 界面
     * @param paramId 卖量标识
     */
    protected static onDotEvent(event: string, paramId: string): void {
        DataStatistics.logEvent(event, { paramID: paramId });
    }
}