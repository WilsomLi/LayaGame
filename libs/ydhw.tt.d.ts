declare namespace IYDHW {
    export namespace TT {
        
        export enum EM_RECORD_TYPE {
            None = 0,
            Recording = 1,
            Pasuse = 2,
        }
        export interface IShareAppMessageExtra {
            withVideoId: boolean;
            videoPath: string;
            videoTopics: string[];
            createChallenge: boolean;
        }

        export interface IMoreGamesButtonStyle {
            left: number;
            top: number;
            width: number;
            height: number;
            lineHeight: number;
            backgroundColor: string;//#ff0000
            textColor: string;//#ff0000
            textAlign: string;//center
            fontSize: number;
            borderRadius: number;
            borderWidth: number;
            borderColor: string;//#ff0000
        }

        export interface IUserInfo {
            /**
             * 用户头像
             */
            avatarUrl: string;
            /**
             * 用户名
             */
            nickName: string;
            /**
             * 用户性别，0: 未知；1:男性；2:女性
             */
            gender: number;
            /**
             * 用户城市
             */
            city: string;
            /**
             * 用户省份
             */
            province: string;
            /**
             * 用户国家
             */
            country: string;
            /**
             * 用户语言，目前为空
             */
            language: string;
            /**
             * userInfo 的 JSON 字符串形式
             */
            rawDatas: string;
            //----------------------------------------------------------------
            //如果输入中传递了 withCredentials:true，返回对象参数会增加如下扩展属性：
            /**
             * 用于校验用户信息是否被篡改
             */
            signature: string;
            /**
             * 包括敏感信息（如 openId）在内的已加密用户数据，如需解密数据请参考官方文档
             */
            encryptedData: string;
            /**
             * 加密算法参数
             */
            iv: string;
        }


        export interface IToutiaoSDK {
            TemplateIdList: string[];

            // /**
            //  * 分享信息
            //  */
            // ShareAppMessage(shareCardId: number, scene: string, channel: string, templateId: string,
            //     desc: string, title: string, imageUrl: string, query: string,
            //     extra: YDHW.TT.IShareAppMessageExtra, caller: any, onSuccess: (isOk: boolean) => void, onError?: (error: any) => void): void;


            /**
             * 
             * @param scene 获取分享图的场景，该值需要与后台管理系统配置的值保持一致
             */
            ShareImage(scene: string, onSuccess: (isOk: boolean) => void, channel?: string, description?: string);
            ShareVideo(title: string, description: string, query: string, onSuccess: (isOk: boolean) => void): void;
            ShareTemplate(onSuccess: (isOk: boolean) => void): void;
            ShareToken(onSuccess: (isOk: boolean) => void): void;
            /**
             * 显示更多游戏
             */
            ShowMoreGamesModal(onEvtOpen: (isOk: boolean) => void): void;

            RecorderStart(duration: number, onStart: (result: any) => void, onError: (error: any) => void, onInterruptionBegin?: () => void, onInterruptionEnd?: () => void): void;
            RecorderStop(onStop: () => void): void;
            RecorderPause(onPause: (result?: any) => void): void;
            RecorderResume(onResume: (result?: any) => void): void;

            GetPlatformUserInfo(caller: any, method: (userInfo: IYDHW.TT.IUserInfo) => void): void;
        }
        export interface IToutiaoPlatform {
            RecorderStatus: EM_RECORD_TYPE;
            Recorder: any;
            /**
             * 获取录屏资源保存地址
             */
            VideoPath: string;


            ShareAppMessage(channel: string, templateId: string,
                desc: string, title: string, imageUrl: string, query: string,
                extra: IYDHW.TT.IShareAppMessageExtra,
                caller: any, onSuccess: () => void, onFail: (error: any) => void): void;


            RecorderStart(duration: number, caller: any,
                onStart: (result: any) => void, onError: (error: any) => void,
                onInterruptionBegin?: () => void, onInterruptionEnd?: () => void): void;

            RecorderStop(caller: any, onStop: (videoPath: string) => void): void;

            RecorderPause(caller: any, onPause: (result: any) => void): void;
            RecorderResume(caller: any, onResume: (result: any) => void): void;

            ShowMoreGamesModal(caller: any, onGetOptions: () => any[], onSuccess: (isOk: boolean) => void, onError: (error: any) => void): void;
            CreateMoreGamesButton(type: string, image: string, style: IYDHW.TT.IMoreGamesButtonStyle,
                caller: any, onGetOptions: () => any[], onMoreGame: (isOk: boolean) => void, onTip: () => void): void;

            GetPlatformUserInfo(caller: any, onSuccess: (userInfo: IYDHW.TT.IUserInfo) => void, onFail: (error: any) => void);
        }

        export interface ISDK extends IToutiaoSDK, ICommonSDK { }
        export interface IPlatform extends IToutiaoPlatform, ICommonPlatform { }
    }
}

declare var ydhw_tt: IYDHW.TT.ISDK;