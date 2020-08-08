declare namespace IYDHW {
    export namespace Wechat {
        export interface IWechatSDK {
            GridAdUnitIdList: string[];
            // /**
            //  * 获取游戏流失路径列表
            //  * @param onReturn 
            //  */
            // GetLayerList(onReturn: (layerList: YDHW.GameBase.ILayerInfo[]) => void): void

            /**
             * 分享信息
             * 
             * @param scene        当前场景
             * @param channel      渠道名
             * @param module       模块名
             * @param inviteType   邀请参数
             * @param caller       上下文
             * @param method       回调函数
             */
            ShareAppMessage(scene: string, channel: string, module: string, inviteType: string, caller: any, method: (result: any) => void): void;
            /**
             * 创建格子广告
             */
            CreateGridAd(isShow: boolean, adTheme: string, gridCount: number, style: IYDHW.IAdStyle): void;
            /**
             * 显示格子广告
             */
            ShowGridAd(): void;
            /**
             * 隐藏格子广告
             */
            HideGridAd(): void;
            /**
             * 系统订阅消息
             */
            SubscribeSysMsg(msgTypeList: string[], onSuccess: (result: any) => void, onError: (error: any) => void): void;
            /**
             * 获取用户的当前设置
             */
            GetSetting(isSubcribe: boolean, onSuccess: (result: any) => void, onError: (error: any) => void): void;
        }

        export interface IWechatPlatform {
            GridAd: any;
            ShareAppMessage(title: string, imageUrl: string, query: string, caller: any, method: () => void);

            CreateGridAd(isShow: boolean, adId: string, adTheme: string, gridCount: number, style: IYDHW.IAdStyle, caller: any, onLoad: () => void, onShow: () => void, onError: (error: any) => void): void;
            ShowGridAd(caller: any, onError: (error: any) => void): void;
            HideGridAd(caller: any, onError: (error: any) => void): void;
            SubscribeSysMsg(msgTypeList: string[], caller: any, onSuccess: (result: any) => void, onError: (error: any) => void): void;
            GetSetting(isSubcribe: boolean, caller: any, onSuccess: (result: any) => void, onError: (error: any) => void): void;
        }

        export interface ISDK extends IWechatSDK, ICommonSDK { }

        export interface IPlatform extends IWechatPlatform, ICommonPlatform { }
    }
}

declare var ydhw_wx: IYDHW.Wechat.ISDK;