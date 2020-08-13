declare namespace IYDHW {
    
    export namespace Alipay {
        export interface IAlipaySDK {

        }

        export interface IAlipayPlatform {

        }

        export interface ISDK extends IAlipaySDK, ICommonSDK { }
        export interface IPlatform extends IAlipayPlatform, ICommonPlatform { }
    }
}


declare namespace IYDHW {
    export namespace Baidu {

        export interface IBaiduSDK {
   
        }

        export interface IBaiduPlatform {

        }

        export interface ISDK extends IBaiduSDK, ICommonSDK { }
        export interface IPlatform extends IBaiduPlatform, ICommonPlatform { }
    }
}


declare namespace IYDHW {
    export namespace Meizu {
        export interface IMeizuSDK {
            /**
             * 获取网络类型
             * 
             * @param caller 
             * @param method 
             */
            GetNetworkType(caller: any, method: (type: string) => void): void;
            /**
             * 监听网络状态变化事件void;
             * @param caller 
             * @param method 
             */
            OnNetworkStatusChange(caller: any, method: (type: string, isConnected: boolean) => void): void;
            
        }
        export interface IMeizuPlatform {
            GetIMEI(caller: any, onSuccess: (code: string, token: string, result: any) => void, onFail: (error: any) => void): void;

            GetToken(caller: any, onSuccess: (code: string, token: string, result: any) => void, onFail: (error: any) => void): void;

            GetNetworkType(caller: any, method: (type: string) => void): void;

            OnNetworkStatusChange(caller: any, method: (type: string, isConnected: boolean) => void): void;

            SetSurfaceScale(width:number, height:number,type:number):void;
        }

        export interface ISDK extends IMeizuSDK, ICommonSDK { }
        export interface IPlatform extends IMeizuPlatform, ICommonPlatform { }
    }
}


declare namespace IYDHW {
    export namespace Momo {
        export interface IMomoSDK {

        }
        export interface IMomoPlatform {

        }

        export interface ISDK extends IMomoSDK, ICommonSDK { }
        export interface IPlatform extends IMomoPlatform, ICommonPlatform { }
    }
}


declare namespace IYDHW {
    export namespace Oppo {
        
        export interface INativeAdInfo {
            /**
             * 广告标识，用来上报曝光与点击
             */
            adId: string;
            /**
             * 广告标题
             */
            title: string;
            /**
             *  广告描述
             */
            desc: string;
            /**
             * 推广应用的 Icon 图标
             */
            icon: string;
            /**
             * 广告图片
             */
            imgUrlList: Array<string>;
            /**
             * “广告”标签图片
             */
            logoUrl: string;
            /**
             * 点击按钮文本描述
             */
            clickBtnTxt: string;
            /**
                获取广告类型，取值说明：
                0：无
                1：纯文字
                2：图片
                3：图文混合
                4：视频
                6. 640x320 大小图文混合
                7. 320x210 大小图文单图
                8. 320x210 大小图文多图
             */
            creativeType: number;
            /**
                获取广告点击之后的交互类型，取值说明：
                0：无
                1：浏览类
                2：下载类
                3：浏览器（下载中间页广告）
                4：打开应用首页
                5：打开应用详情页
             */
            interactionType: number;
        }
        
        export interface IOppoSDK {

        }

        export interface IOppoPlatform {
            
        }


        export interface ISDK extends IOppoSDK, ICommonSDK { }
        export interface IPlatform extends IOppoPlatform, ICommonPlatform { }
    }
}

declare var ydhw_oppo: IYDHW.Oppo.ISDK;


declare namespace IYDHW {
    export namespace P360{
        export interface IP360SDK {

        }
        export interface IP360Platform {

        }

        export interface ISDK extends IP360SDK, ICommonSDK { }
        export interface IPlatform extends IP360Platform, ICommonPlatform { }
    }
}


declare namespace IYDHW {
    export namespace P4399 {
        export interface IP4399SDK {

        }
        export interface IP4399Platform {

        }

        export interface ISDK extends IP4399SDK, ICommonSDK { }
        export interface IPlatform extends IP4399Platform, ICommonPlatform { }
    }
}


declare namespace IYDHW {
    export namespace QQ {
        export interface IQQSDK {
            /**
             * 分享(邀请类模板)
             * 
             * @param shareInfo 分享参数
             * @param caller 
             * @param method 
             */         
            ShareByTemplateId(shareInfo: IShareTempletInfo, caller: any, method: (result: ITempShareResult) => void): void;

            /**
             * 添加彩签
             * 
             * @param caller 
             * @param method 
             */
            AddColorSign(caller: any, method: (success: boolean) => void): void;

            // /**
            //  * 添加桌面图标
            //  * 
            //  * @param caller 
            //  * @param method 
            //  */
            // SaveAppToDesktop(caller: any, method: (success: boolean) => void): void;

            /**
             * 主动订阅
             * 
             * @param appMsgInfo 订阅参数
             * @param caller 
             * @param method 
             */
            SubscribeAppMsg(appMsgInfo:IAppMsgInfo,caller: any, method: (success: boolean) => void): void;

            /**
             * 创建-打开添加好友页面的按钮
             * 
             * @param btnInfo 
             * @param caller 
             * @param method 
             */
            CreateAddFriendButton(btnInfo: IAddFriendButtonInfo,caller: any, method: (success: boolean) => void): void;

            /**
             * 显示-打开添加好友页面的按钮
             * 
             */
            ShowAddFriendButton(): void;

            /**
             * 隐藏-打开添加好友页面的按钮
             */
            HideAddFriendButton(): void;

            /**
             * 销毁-打开添加好友页面的按钮
             */
            DestroyAddFriendButton(): void;

            /**
             * 创建-盒子广告
             * 
             * @param caller 
             * @param method 
             */
            CreateAppBox(caller: any, method: (status: EM_APP_BOX_TYPE) => void): void;

            /**
             * 显示-盒子广告
             */
            ShowAppBox(caller:any ,onSuccess: () => void, onError: (error: any) => void): void;

            /**
             * 创建-积木广告
             * 
             * @param adInfo 积木广告参数
             * @param caller 
             * @param method 
             */
            CreateBlockAd(adInfo:IBlockAdInfo,caller: any, method: (status: EM_BLOCK_TYPE) => void): void; 
            
            /**
             * 显示-积木广告
             * 
             */
            ShowBlockAd(caller: any, show: () => void): void;

            /**
             * 隐藏-积木广告
             */
            HideBlockAd(): void;

            /**
             * 销毁-积木广告
             */
            DestroyBlockAd(): void;
        }

        export interface IQQPlatform {            
            ShareByTemplateId(shareInfo: IYDHW.QQ.IShareTempletInfo,queryData:string, caller: any, method: (result: any) => void);
            AddColorSign(caller:any ,onSuccess: (result: any) => void, onError: (error: any) => void);
            SubscribeAppMsg(appMsgInfo:IYDHW.QQ.IAppMsgInfo,caller: any, onSuccess: (result: any) => void, onError: (error: any) => void);
            CreateAddFriendButton(btnInfo: IYDHW.QQ.IAddFriendButtonInfo,caller:any ,onSuccess: (result: any) => void, onError: (error: any) => void);
            ShowAddFriendButton();
            HideAddFriendButton();
            DestroyAddFriendButton();
            CreateAppBox(adId: string,caller:any ,hasCreated:()=>void,onCreate:(success:boolean)=>void,onLoad:(success:boolean)=>void,onClose:()=>void);
            ShowAppBox(caller:any ,onSuccess: () => void, onError: (error: any) => void);
            CreateBlockAd(_adId: string,adInfo:IYDHW.QQ.IBlockAdInfo,caller: any,onCreate:(success:boolean)=>void,onLoad:(success:boolean)=>void,onResize:()=>void);   
            ShowBlockAd(caller: any, show: (adId:string) => void);
            HideBlockAd();
            DestroyBlockAd();
        }

        export interface IShareTempletInfo{
            shareTemplateId:string;         //分享模板ID
            shareTemplateData:ISHareTemplateData;   //分享文案
            channel?:string;                //渠道
            module?:string;                 //模块
            inviteType?:EM_SHARE_APP_TYPE;  //邀请类型,可以通过qq.getLaunchOptionsSync() 或 qq.onShow() 获取启动参数中的 query获取到的参数中拿到from参数的值就是该参数的传值，CP可以通过该参数给玩家发奖。
            shareAppType?:string;           //转发目标类型,不设该属性默认拉起手q通讯录，详见官方文档
            entryDataHash?:string;          //监听用户点击页面内转发按钮的，只有带上该参数，才支持快速分享，详见官方文档
        }

        export interface ISHareTemplateData{
            txt1:string;    //中间文案
            txt2:string;    //底部文案
        }

        export interface ITempShareResult{
            sSuccess:boolean;       //结果[true:分享成功，false:分享失败]
            hasStrategy:boolean;    //是否有策略[true:有，false:没有] (分享失败才返回此参数)
            trickJson:string;       //分享话术 (分享失败且有策略才返回此参数)
        }

        export interface IAppMsgInfo{
            tmplIds?:string[];   //需订阅的消息模板的id的集合，一次调用最多可订阅3条消息。
            subscribe:boolean;  //订阅(true)及取消订阅(false)
        }

        //用户信息按钮信息
        export interface IUserInfoButtonInfo{
            type: string;       //按钮的类型 ['text':可以设置背景色和文本的按钮 ,'image':只能设置背景贴图的按钮，背景贴图会直接拉伸到按钮的宽高]
            text?: string;      //按钮上的文本，仅当 type 为 text 时有效
            image?:string;      //按钮的背景图片，仅当 type 为 image 时有效
            style: IFbStyle;    //按钮的样式
        }

        //增加好友按钮信息
        export interface IAddFriendButtonInfo{
            type: string;       //按钮的类型 ['text':可以设置背景色和文本的按钮 ,'image':只能设置背景贴图的按钮，背景贴图会直接拉伸到按钮的宽高]
            text?: string;      //按钮上的文本，仅当 type 为 text 时有效
            image?:string;      //按钮的背景图片，仅当 type 为 image 时有效
            openId: string;     //好友的openid
            style: IFbStyle;    //按钮的样式
        }
        
        //按钮的样式
        export interface IFbStyle{
            left: number;               //左上角横坐标
            top: number;                //左上角纵坐标
            width: number;              //宽度
            height: number;             //高度
            backgroundColor: string;    //背景颜色。格式为 6位/8位 16进制数
            borderColor: string;        //边框颜色。格式为 6位/8位 16进制数
            borderWidth: number;        //边框宽度
            borderRadius: number;       //边框圆角
            color: string;              //文本的颜色。格式为 6位 16进制数。
            textAlign: string;          //文本的水平居中方式['left':居左,'center':居中,'right':居右]
            fontSize: number;           //字号
            lineHeight: number;         //文本的行高
        }

        //积木广告参数
        export interface IBlockAdInfo{
            style:IBlockStyle;      //积木广告组件的样式
            size:number;            //范围是1~5，积木广告的个数（展示以实际拉取广告数量为准）
            orientation:string;     //landscape 或者 vertical，积木广告横向展示或者竖向展示
        }

        //积木广告组件的样式
        export interface IBlockStyle{
            left: number;     //积木广告组件的左上角横坐标
            top: number;      //积木广告组件的左上角纵坐标
        }

        export enum EM_APP_BOX_TYPE {
            /**
             * 盒子广告-创建成功
             */
            APPBOX_CREATE_SUCCESS = 0,   
            /**
             * 盒子广告-创建失败
             */
            APPBOX_CREATE_FAIL = 1,      
            /**
             * 盒子广告-关闭
             */
            APPBOX_CLOSE = 2,            
        }

        export enum EM_BLOCK_TYPE {
            /**
             * 盒子广告-创建成功
             */
            BLOCK_CREATE_SUCCESS = 0,   
            /**
             * 盒子广告-创建失败
             */
            BLOCK_CREATE_FAIL = 1,      
            /**
             * 盒子广告-监听积木广告尺寸大小事件
             */
            BLOCK_ONRESIZE = 2,         
        }

        export enum EM_SHARE_APP_TYPE{
            QQ = 'qq',                              //转发到手q通讯录
            QQ_FAST_SHARE = 'qqFastShare',          //快速转发至来源的聊天窗口
            QQ_FAST_SHARE_LIST = 'qqFastShareList', //快速转发列表
            QZONE = 'qzone',                        //转发到空间
            WECHARTFRIENDS = 'wechatFriends',       //转发到微信好友
            WECHATMOMENT = 'wechatMoment',          //转发到微信朋友圈
        }
        export interface ISDK extends IQQSDK, ICommonSDK { }
        export interface IPlatform extends IQQPlatform, ICommonPlatform { }
    }
}

declare var ydhw_qq: IYDHW.QQ.ISDK;


declare namespace IYDHW {
    export namespace Qutoutiao {
        export interface IQutoutiaoCommerce {

        }
        export interface IQutoutiaoPlatform {

        }

        export interface ISDK extends IQutoutiaoCommerce, ICommonSDK { }
        export interface IPlatform extends IQutoutiaoPlatform, ICommonPlatform { }
    }
}


declare namespace IYDHW {
    export namespace TT {
        
        export interface IShareAppMessageExtra {
            /**
             * 是否支持跳转到播放页， 1.40.0+支持
             */
            withVideoId: boolean;
            /**
             * 视频地址
             */
            videoPath: string;
            /**
             * 视频话题(只在抖音可用)
             */
            videoTopics: string[];
            /**
             * 是否分享为挑战视频 (头条支持)
             */
            createChallenge: boolean;
        }

        export interface IMoreGamesButtonStyle {
            /**
             * 左上角横坐标
             */
            left: number;
            /**
             * 左上角纵坐标
             */
            top: number;
            /**
             * 宽度
             */
            width: number;
            /**
             * 高度
             */
            height: number;
            /**
             * 文本的行高
             */
            lineHeight: number;
            /**
             * 背景颜色
             */
            backgroundColor: string;//#ff0000
            /**
             * 文本颜色
             */
            textColor: string;//#ff0000
            /**
             * 文本的水平居中方式
             */
            textAlign: string;//center
            /**
             * 字号
             */
            fontSize: number;
            /**
             * 边框圆角
             */
            borderRadius: number;
            /**
             * 边框宽度
             */
            borderWidth: number;
            /**
             * 边框颜色
             */
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
             * 图片分享(含模板)
             * 
             * @param scene   场景名称 (从ShareCard接口获得)
             * @param onSuccess 
             * @param description 分享文案,不超过 28 个中文字符
             */
            ShareImage(scene: string, onSuccess: (isOk: boolean) => void, description?: string);

            /**
             * 视频分享(含模板)
             * 
             * @param title 分享标题,不超过 14 个中文字符
             * @param description 分享文案,不超过 28 个中文字符
             * @param query 查询字符串，必须是 key1=val1&key2=val2 的格式。从这条转发消息进入后，可通过 tt.getLaunchOptionSync() 或 tt.onShow() 获取启动参数中的 query。
             * @param onSuccess 
             */
            ShareVideo(title: string, description: string, query: string, onSuccess: (isOk: boolean) => void): void;

            /**
             * 模板分享
             * 
             * @param onSuccess 
             */
            ShareTemplate(onSuccess: (isOk: boolean) => void): void;

            /**
             * Token分享(含模板)
             * 
             * @param onSuccess 
             */
            ShareToken(onSuccess: (isOk: boolean) => void): void;

            /**
             * 显示更多游戏
             */
            ShowMoreGamesModal(onEvtOpen: (isOk: boolean) => void): void;

            /**
             * 创建更多游戏按钮
             * 
             * @param type 按钮的类型，取值 image 或 text。image 对应图片按钮，text 对应文本按钮
             * @param imageUrl 按钮的背景图片，type 为 image 时必填。
             * @param style 按钮的样式
             * @param caller 
             * @param onMoreGame 
             * @param onTip 
             */
            CreateMoreGamesButton(type: string, imageUrl: string, style: IYDHW.TT.IMoreGamesButtonStyle, caller: any, onMoreGame: (isOk: boolean) => void, onTip: () => void): void;
            /**
             *  开始录屏
             * 
             * @param duration 录屏的时长，单位 s，必须 >3 &&  <= 300s（5 分钟）
             * @param onStart  监听录屏开始事件
             * @param onStop   录屏停止监听,回调参数videoPath：视频保存地址
             * @param onResume 暂停录屏
             * @param onPause  继续录屏
             * @param onError  监听录屏错误事件
             * @param onInterruptionBegin 监听录屏中断开始
             * @param onInterruptionEnd 监听录屏中断结束
             */
            RecorderStart(duration: number, onStart: (result: any) => void,onStop: (videoPath: string) => void, 
                            onResume?: (result: any) => void,onPause?: (result: any) => void,
                            onError?: (error: any) => void, onInterruptionBegin?: () => void, onInterruptionEnd?: () => void): void;
            /**
             *  停止录屏
             */
            RecorderStop(): void;

            /**
             * 暂停录屏
             * 
             */
            RecorderPause(): void;

            /**
             * 继续录屏
             * 
             */
            RecorderResume(): void;
            // /**
            //  * 获取用户平台信息
            //  * 
            //  * @param caller 
            //  * @param method 
            //  */
            // GetPlatformUserInfo(caller: any, method: (userInfo: IYDHW.TT.IUserInfo) => void): void;
        }
        export interface IToutiaoPlatform {
            RecorderStatus: EM_RECORD_TYPE;
            Recorder: any;
            /**
             * 获取录屏资源保存地址
             */
            VideoPath: string;


            TTShareAppMessage(channel: string, templateId: string,
                desc: string, title: string, imageUrl: string, query: string,
                extra: IYDHW.TT.IShareAppMessageExtra,
                caller: any, onSuccess: (res:any) => void, onFail: (error: any) => void): void;


            RecorderStart(duration: number, caller: any,
                onStart: (result: any) => void, 
                onStop: (videoPath: string) => void,
                onResume?: (result: any) => void,
                onPause?: (result: any) => void,
                onError?: (error: any) => void,
                onInterruptionBegin?: () => void, 
                onInterruptionEnd?: () => void): void;

            RecorderStop(): void;

            RecorderPause(): void;
            RecorderResume(): void;

            ShowMoreGamesModal(caller: any, onGetOptions: () => any[], onSuccess: (isOk: boolean) => void, onError: (error: any) => void): void;
            CreateMoreGamesButton(type: string, image: string, style: IYDHW.TT.IMoreGamesButtonStyle,
                caller: any, onGetOptions: () => any[], onMoreGame: (isOk: boolean) => void, onTip: () => void): void;

            // GetPlatformUserInfo(caller: any, onSuccess: (userInfo: IYDHW.TT.IUserInfo) => void, onFail: (error: any) => void);
        }

        export enum EM_RECORD_TYPE {
            /**
             * 无(或录屏停止)
             */
            T_None = 0,
            /**
             * 录屏中
             */
            T_Recording = 1,
            /**
             * 录屏暂停
             */
            T_Pasuse = 2,
        }

        export interface ISDK extends IToutiaoSDK, ICommonSDK { }
        export interface IPlatform extends IToutiaoPlatform, ICommonPlatform { }
    }
}

declare var ydhw_tt: IYDHW.TT.ISDK;


declare namespace IYDHW {
    export namespace UC {
        export interface IUCSDK {

        }
        export interface IUCPlatform {

        }

        
        export interface ISDK extends IUCSDK, ICommonSDK { }
        export interface IPlatform extends IUCPlatform, ICommonPlatform { }
    }
}


declare namespace IYDHW {
    export namespace Vivo {
        export interface INativeAdInfo{
            /**
             * 广告标识，用来上报曝光与点击
             */
            adId: string;
            /**
             * 广告标题
             */
            title: string;
            /**
             *  广告描述
             */
            desc: string;
            /**
             * 推广应用的 Icon 图标
             */
            icon: string;
            /**
             * 广告图片
             */
            imgUrlList: Array<string>;
            /**
             * “广告”标签图片
             */
            logoUrl: string;
            /**
             * 点击按钮文本描述
             */
            clickBtnTxt: string;
            /**
                获取广告类型，取值说明：
                0：混合
            */
            creativeType: number;
            /**
                获取广告点击之后的交互类型，取值说明：
                0：无
                1：网址类
                2：应用下载类
                8：快应用生态应用）
            */
            interactionType: number;
        }
        export interface IVivoSDK {

            /**
             * 判断用户是否通过桌面图标来启动应用
             * @param caller 
             * @param onSuccess 
             * @param onFail 
             */
            IsStartupByShortcut(caller:any , onSuccess:(status:boolean)=>void,onFail?: (error: any) => void):void;

        }
        export interface IVivoPlatform {
            
            IsStartupByShortcut(caller:any , onSuccess:(status:boolean)=>void,onFail?: (error: any) => void):void;
        }

        export interface ISDK extends IVivoSDK, ICommonSDK { }
        export interface IPlatform extends IVivoPlatform, ICommonPlatform { }
    }
}
declare var ydhw_vivo: IYDHW.Vivo.ISDK;


declare namespace IYDHW {
    export namespace Web {
        export interface IWebSDK {

        }
        export interface IWebPlatform {

        }

        export interface ISDK extends IWebSDK, ICommonSDK { }
        export interface IPlatform extends IWebPlatform, ICommonPlatform { }
    }
}


declare namespace IYDHW {
    export namespace Wechat {
        export enum EM_RECORD_EVENT {
            /**
             * 录制开始事件
             */
            E_START = "start",
            /**
             * 录制结束事件
             */
            E_STOP = "stop",
            /**
             * 录制暂停事件
             */
            E_PAUSE = "pause",
            /**
             * 录制恢复事件
             */
            E_RESUME = "resume",
            /**
             * 录制取消事件
             */
            E_ABORT = "abort",
            /**
             * 录制时间更新事件.在录制过程中触发该事件
             */
            E_TIME_UPDATE = "timeUpdate",
            /**
             * 错误事件。当录制和分享过程中发生错误时触发该事件
             */
            E_ERROR = "error"
        }

        /**
         * 分享到朋友圈参数
         */
        export interface IOnShareTimelineInfo {
            /**
             * 转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。（该图片用于分享到朋友圈的卡片以及从朋友圈转发到会话消息的卡片展示）
             */
            imageUrl:string;
            /**
             * 转发标题，不传则默认使用当前小游戏的昵称
             */
            title?:string;
            /**
             * 查询字符串，必须是 key1=val1&key2=val2 的格式。从这条转发消息进入后，可通过 wx.getLaunchOptionsSync() 或 wx.onShow() 获取启动参数中的 query。不传则默认使用当前页面query
             */
            query?:string;
        }

        export interface IGameRecorderInfo {
            /**
             * 视频 fps
             * 默认：24
             */
            fps?:number;
            /**
             * 视频的时长限制，单位为秒（s）。最大值 7200，最小值 5，到达指定时长后不会再录入。但还需要手动调用 GameRecorder.stop() 来结束录制。
             * 默认：7200
             */
            duration?:number;
            /**
             * 视频比特率（kbps），默认值1000，最大值 3000，最小值 600
             * 默认：1000
             */
            bitrate?:number;
            /**
             * 视频关键帧间隔
             * 默认：12
             */
            gop?:number;
            /**
             * 是否录制游戏音效
             * 默认：true
             */
            hookBgm?:boolean;

        }

        /**
         * 创建分享按钮传参
         * 
         * 详情参考官网文档：
         * https://developers.weixin.qq.com/minigame/dev/api/game-recorder/wx.createGameRecorderShareButton.html
         */
        export interface IGameRecorderBtnInfo {
            /**
             * 按钮的样式
             */
            style:IGameRecorderBtnStyle;
            /**
             * 图标的 url。支持 http/https 开头的网络资源和 wxfile:// 开头的本地资源。如果不设置则使用默认图标。
             */
            icon?:string;
            /**
             * 按钮的背景图片的 url。支持 http/https 开头的网络资源和 wxfile:// 开头的本地资源。如果不设置则使用默认图标
             */
            image?:string;
            /**
             * 按钮的文本
             */
            text?:string;
            /**
             * 对局回放的分享参数
             */
            share:IGameRecorderShareInfo;
        }
        export interface IGameRecorderBtnStyle {
            /**
             * 左上角横坐标，单位 逻辑像素
             * 默认值:0
             */
            left?:number;
            /**
             * 左上角纵坐标，单位 逻辑像素
             * 默认值:0
             */
            top?:number;
            /**
             * 按钮的高度，最小 40 逻辑像素
             * 默认值:40
             */
            height?:number;
            /**
             * 图标和文本之间的距离，最小 8 逻辑像素
             * 默认值:8
             */
            iconMarginRight?:number;
            /**
             * 文本的字体大小。最小 17，最大 22。
             * 默认值:17
             */
            fontSize?:number;
            /**
             * 文本的颜色
             * 默认值:#ffffff
             */
            color?:string;
            /**
             * 按钮的左内边距，最小 16 逻辑像素
             * 默认值:16
             */
            paddingLeft?:number;
            /**
             * 按钮的右内边距，最小 16 逻辑像素。
             * 默认值:16
             */
            paddingRight?:number;
        }
        export interface IGameRecorderShareInfo {
            /**
             * 分享的对局回放打开后跳转小游戏的 query。
             */
            query:string;
            /**
             * 对局回放的标题。对局回放标题不能随意设置，只能选择预设的文案模版和对应的参数。
             */
            title?:IGameRecorderTitle;
            /**
             * 对局回放的按钮。只能选择预设的文案模版
             */
            button?:IGameRecorderBotton;
            /**
             * 对局回放背景音乐的地址。必须是一个代码包文件路径或者 wxfile:// 文件路径，不支持 http/https 开头的 url。
             */
            bgm:string;
            /**
             * 对局回放的剪辑区间，是一个二维数组，单位 ms（毫秒）。[[1000, 3000], [4000, 5000]] 表示剪辑已录制对局回放的 1-3 秒和 4-5 秒最终合成为一个 3 秒的对局回放。对局回放剪辑后的总时长最多 60 秒，即 1 分钟。
             */
            timeRange:Array<number>;
            /**
             * 对局回放的音量大小，最小 0，最大 1
             */
            volume?:number;
            /**
             * 对局回放的播放速率，只能设置以下几个值：0.3，0.5，1，1.5，2，2.5，3。其中1表示原速播放，小于1表示减速播放，大于1表示加速播放。
             */
            atempo?:number;
            /**
             * 如果原始视频文件中有音频，是否与新传入的bgm混音，默认为false，表示不混音，只保留一个音轨，值为true时表示原始音频与传入的bgm混音。
             */
            audioMix?:boolean;
        }
        export interface IGameRecorderTitle {
            /**
             * 对局回放的标题的模版,
             * 不传则为：${用户昵称} 在 ${游戏名称} 的游戏时刻
             * 
             *  值	                说明	
             * default.score	    模版格式为，${游戏名称}，本局得分：${score}，对应的 data 应该如 { score: 4500 }	
             * default.level	    模版格式为，${游戏名称}，当前关卡：第42关，对应的 data 应该如 { level: 23 }	
             * default.opponent	    模版格式为，${游戏名称}，本局对手：${opponent}，对应的 data 应该如 { opponent_openid: 'oC6J75Sh1_4K8Mf5b1mlgDkMPhoI' }	
             * default.cost	        模版格式为，${游戏名称}，本局耗时：${cost}秒，对应的 data 应该如 { cost_seconds: 123 }
             * 
             */
            template:string;
            /**
             * 对局回放的标题的模版参数
             */
            data:IGameRecorderTitleData;
        }
        export interface IGameRecorderBotton {
            /**
             * 对局回放的按钮的模版
             * 默认值:enter 
             *      值	        说明	
             *      enter	    马上玩	
             *      challenge	去挑战	
             *      play	    玩一把
             * 
             */
            template:string;
        }
        /**
         * 该参数根据template选择的模板传对应参数
         */
        export interface IGameRecorderTitleData {
            /**
             * template值为default.score选该参数
             */
            score?: number;
            /**
             * template值为default.level选该参数
             */
            level?: number;
            /**
             * template值为default.opponent选该参数
             */
            opponent_openid?:string;
            /**
             * template值为default.cost选该参数
             */
            cost_seconds?:number;
        }
        
        export interface IWechatSDK {
            GridAdUnitIdList: string[];
            // /**
            //  * 分享信息
            //  * 
            //  * @param scene        当前场景
            //  * @param channel      渠道名
            //  * @param module       模块名
            //  * @param inviteType   邀请参数
            //  * @param caller       上下文
            //  * @param method       回调函数
            //  */
            // ShareAppMessage(scene: string, channel: string, module: string, inviteType: string, caller: any, method: (result: any) => void): void;
            /**
             * 创建格子广告
             * 
             * @param isShow 是否展示格子广告
             * @param adTheme grid(格子) 广告广告组件的主题，提供 white black 两种主题选择。
             * @param gridCount  grid(格子) 广告组件的格子个数，可设置爱5，8两种格子个数样式，默认值为5
             * @param style grid(格子) 广告组件的样式
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
             * @param isSubcribe 是否同时获取用户订阅消息的订阅状态
             * @param onSuccess 
             * @param onError 
             */
            GetSetting(isSubcribe: boolean, onSuccess: (result: any) => void, onError: (error: any) => void): void;
            /**
             * 取消监听录制事件。当对应事件触发时，该回调函数不再执行
             * 
             * @param event 事件名
             * @param caller 
             * @param callBack 
             */
            GameRecorderOff(event:IYDHW.Wechat.EM_RECORD_EVENT,caller?: any, callBack?: (res:any) => void):void;

            /**
             * 注册监听录制事件的回调函数。当对应事件触发时，回调函数会被执行
             * 
             * @param event  事件名
             * @param caller 
             * @param callBack 
             */
            GameRecorderOn(event:IYDHW.Wechat.EM_RECORD_EVENT,caller?: any, callBack?: (res:any) => void):void;

            /**
             * 开始录制游戏画面
             * 
             * @param info 创建分享按钮传参
             * @param caller 
             * @param onStart 录制事件监听-开始
             * @param onStop 录制事件监听-结束
             * @param onError 录制事件监听-错误
             * @param onPause 录制事件监听-暂停
             * @param onResume 录制事件监听-恢复
             * @param onAbort 录制事件监听-取消
             * @param onTimeUpdate  录制时间更新事件监听，在录制过程中触发该事件(如果没有回调可能是录屏)
             */
            GameRecorderStart(info:IYDHW.Wechat.IGameRecorderInfo,caller: any, onStart: (res: any) => void, onStop: (res: any) => void, 
                onError?: (error: any) => void, onPause?: (res: any) => void, onResume?: (res: any) => void, onAbort?: (res: any) => void, onTimeUpdate?: (res: any) => void):void;
            /**
             * 结束录制游戏画面。结束录制后可以发起分享。
             */
            GameRecorderStop():void;
            /**
             * 暂停录制游戏画面。
             */
            GameRecorderPause():void;
            /**
             * 恢复录制游戏画面
             */
            GameRecorderResume():void;
            /**
             * 放弃录制游戏画面。此时已经录制的内容会被丢弃
             */
            GameRecorderAbort():void;
            /**
             * 获取是否支持调节录制视频的播放速率
             */
            IsAtempoSupported():boolean;
            /**
             * 获取是否支持录制游戏画面
             */
            IsFrameSupported():boolean;
            /**
             * 获取是否在录制游戏画面的同时支持录制游戏音频的信息
             */
            IsSoundSupported():boolean;
            /**
             * 获取是否支持调节录制视频的音量
             */
            IsVolumeSupported():boolean;

            /**
             * 创建游戏对局回放分享按钮，返回一个单例对象
             * 按钮在被用户点击后会发起对最近一次录制完成的游戏对局回放的分享
             * @param btnInfo 按钮信息(后面补充类型说明)
             */
            CreateGameRecorderShareButton(btnInfo:IYDHW.Wechat.IGameRecorderBtnInfo):void;
            /**
             * 隐藏游戏对局回放分享按钮
             */
            GameRecorderShareButtonHide():void;
            /**
             * 显示游戏对局回放分享按钮
             */
            GameRecorderShareButtonShow():void;
            /**
             * 监听游戏对局回放分享按钮的点击事件
             */
            GameRecorderShareButtonOnTap(caller: any, method: (res: any) => void):void;
            /**
             * 取消监听游戏对局回放分享按钮的点击事件
             */
            GameRecorderShareButtonOffTap(caller: any, method: (res: any) => void):void;
            /**
             * 设置 wx.shareMessageToFriend 接口 query 字段的值
             * 
             * @param shareMessageToFriendScene 需要传递的代表场景的数字，需要在 0 - 50 之间 (场景值CP自己在该范围定义)
             */
            SetMessageToFriendQuery(shareMessageToFriendScene:number):boolean;
            /**
             * 监听主域接收 wx.shareMessageToFriend 接口的成功失败通知
             * @param caller 
             * @param method 
             */
            OnShareMessageToFriend(caller: any, method: (res: any) => void):void;
            /**
             * 绑定朋友圈分享参数
             * @param shareInfo 分享参数
             * @param caller 
             * @param method 
             */
            OnShareTimeline(shareInfo:IYDHW.Wechat.IOnShareTimelineInfo,caller: any, method: (res: any) => void):void;
            /**
             * 取消绑定分享参数
             */
            OffShareTimeline():void;
        }

        export interface IWechatPlatform {
            GridAd: any;
            CreateGridAd(isShow: boolean, adId: string, adTheme: string, gridCount: number, style: IYDHW.IAdStyle, caller: any, onLoad: () => void, onError: (error: any) => void): void;
            ShowGridAd(caller: any,onSuccess: () => void, onError: (error: any) => void): void;
            HideGridAd(caller: any, onError: (error: any) => void): void;
            SubscribeSysMsg(msgTypeList: string[], caller: any, onSuccess: (result: any) => void, onError: (error: any) => void): void;
            GetSetting(isSubcribe: boolean, caller: any, onSuccess: (result: any) => void, onError: (error: any) => void): void;

            GameRecorderOff(event:IYDHW.Wechat.EM_RECORD_EVENT,caller?: any, callBack?: (res:any) => void):void;
            GameRecorderOn(event:IYDHW.Wechat.EM_RECORD_EVENT,caller?: any, callBack?: (res:any) => void):void;
            GameRecorderStart(info:IYDHW.Wechat.IGameRecorderInfo,caller: any, onStart: (res: any) => void, onStop: (res: any) => void, 
                onError?: (error: any) => void, onPause?: (res: any) => void, onResume?: (res: any) => void, onAbort?: (res: any) => void, onTimeUpdate?: (res: any) => void):void;

            GameRecorderStop():void;
            GameRecorderPause():void;
            GameRecorderResume():void;
            GameRecorderAbort():void;
            IsAtempoSupported():boolean;
            IsFrameSupported():boolean;
            IsSoundSupported():boolean;
            IsVolumeSupported():boolean;

            CreateGameRecorderShareButton(btnInfo:IYDHW.Wechat.IGameRecorderBtnInfo):void;
            GameRecorderShareButtonHide():void;
            GameRecorderShareButtonShow():void;
            GameRecorderShareButtonOnTap(caller: any, method: (res: any) => void):void;
            GameRecorderShareButtonOffTap(caller: any, method: (res: any) => void):void;
            SetMessageToFriendQuery(shareMessageToFriendScene:number):boolean;
            OnShareMessageToFriend(caller: any, method: (res: any) => void):void;
            OnShareTimeline(shareInfo:IYDHW.Wechat.IOnShareTimelineInfo,caller: any, method: (res: any) => void):void;
            OffShareTimeline():void;
            ShowShareMenu():void;
        }

        export interface ISDK extends IWechatSDK, ICommonSDK { }

        export interface IPlatform extends IWechatPlatform, ICommonPlatform { }
    }

}

declare var ydhw_wx: IYDHW.Wechat.ISDK;


declare namespace IYDHW {
    export namespace Xiaomi {
        export interface IXiaomiSDK {

        }
        export interface IXiaomiPlatform {

        }

        export interface ISDK extends IXiaomiSDK, ICommonSDK { }
        export interface IPlatform extends IXiaomiPlatform, ICommonPlatform { }
    }
}



declare namespace IYDHW {
    
    export interface IPrintLoginInfo {
        accountId: string;
        nickName: string;
        avatarUrl: string;
        newPlayer: string;
        openid: string;
        code: string;
        token: string;
        pkgName: string;
    }
    export namespace User {

        //----------------------------------------------------------------
        //Edit
        export interface IEditRequest {
            nickName: string;
            headimgurl: string;
            gender: number;
            language: string;
            province: string;
            city: string;
            country: string;
        }
        //----------------------------------------------------------------
        //MyInfo Result
        export interface IMyInfoResult {
            /**
             * 当前凭证有效时间(毫秒
             */
            expiresIn: number;
            /**
             * 玩家编号
             */
            accountId: number;
            openid: string;
            appid: string;
            /**
             * 玩家IP
             */
            ip: string;
            /**
             * 服务器当前时间戳(纳秒
             */
            nano: number;
            /**
             * 服务器现在时间戳(毫秒
             */
            time: number;
            /**
             * 游戏版本
             */
            version: string;
            /**
             * 平台编号(string类型)
             */
            platform: string;
        }
        //----------------------------------------------------------------
        //Login Request
        export interface IShareInfo {
            /**
             * 场景名称
             */
            scene: string;
            /**
             * 查询字符串
             */
            query: string;
            /**
             * 分享图ID
             */
            sharecardId: number;
            /**
             * 发送者的accountId
             */
            accountId: number;
            /**
             * 分享时传的邀请类型
             */
            from: string;
            /**
             * 分享时的时间戳
             */
            shareTime: number;
            /**
             * 分享类型(头条平台需要)
             */
            shareType?: string; 
            /**
             * 模板ID(头条平台需要)
             */
            templateId?: string;
        }

        export interface IClientInfo {
            uuid: string;
            platform: string;
            version: string;
            brand: string;
            model: string;
            appName: string;
            resolution: string;
        }

        export interface ILoginRequest {
            platform: string;
            appid: string;
            version: string;
            code: string;
            pkgName: string;
            shareInfo: IShareInfo;
            clientInfo: IClientInfo;
        }

        //----------------------------------------------------------------
        //Login Response
        export interface ITips {
            tips: string[];
            prob: number[];
        }
        export interface IStrategy {
            time: number[][];
            prob: number[][];
            num: number;
        }
        export interface IShareVideoModuleFalse {
            _id: number;
            /**
             * 策略
             */
            strategyjson: string;
            /**
             * 分享话术
             */
            trickJson: string;
        }

        export interface ILoopCtrl {
            /**
             * 头部策略[1:分享，2:视频]
             */
            pe: number[];
            /**
             * 循环策略[1:分享，2:视频]
             */
            loop: number[];
            /**
             * 循环次数
             */
            time: number;
        }
        export interface IShareVideoModule {
            /**
             * 渠道
             */
            channel: string;
            /**
             * 模块
             */
            module: string;
            /**
             * 策略类型
             */
            type: string;
            /**
             * 底层逻辑
             */
            logicJson: string;
            _id: number;
            version: string;
            remarks: string;
            strategy: string;
            videoNum: string;
            shareNum: string;
        }
        export interface ILoginResult {
            accountPass: string;
            accountId: number;
            nickName: string;
            avatarUrl: string;
            openid: string;
            newPlayer: number;
            /**
             * 误触开关开关，1打开，0关闭
             */
            switchTouch: number;
            /**
             * 推送开关
             */
            switchPush: number;
            /**
             * 是否打开日志调试
             */
            switchLog: number;
            /**
             * 登录开关这个开关关闭则不让登录了(禁止该游戏)
             */
            switchLogin: number;
            /**
             * 卖量统计开关
             */
            switchJump: number;
            /**
             * 分享统计开关
             */
            switchShare: number;
            /**
             * 事件统计开关
             */
            switchVideo: number;
            /**
             * 事件统计开关
             */
            switchEvent: number;
            /**
             * 流失统计开关
             */
            switchLayer: number;
            /**
             * 结果统计开关
             */
            switchResult: number;
            /**
             * SDK版本是否过低
             */
            isLowVersion: number;
            /**
             * 标识后台返回的游戏版本号是否是真实的游戏版本号
             */
            isRealVersion: number;
            /**
             * 视频发奖次数上限
             */
            videoFalseLimit: number;
            /**
             * 分享发奖次数上限
             */
            shareFalseLimit: number;
            moduleFalseList: IShareVideoModuleFalse[];
            moduleList: IShareVideoModule[];
        }
    }




    export namespace Statistic {

        export enum EM_STATISTIC_TYPE {
            /**
             * 创建
             */
            CREATE = 0,
            /**
             * 加载成功
             */
            LOAD_SUCCESS = 1,//
            /**
             * 加载失败
             */
            LOAD_FAIL = 2,//
            /**
             * 点击(上报点击)
             */
            CLICK = 3,
            /**
             * 展示
             */
            SHOW = 4,
            /**
             * 关闭
             */
            CLOSE = 5,
            /**
             * 上报曝光
             */
            EXPOSURE = 6,
            /**
             * 播放取消
             */
            PLAY_CANCEL = 7,
            /**
             * 播放完成
             */
            PLAY_FINISH = 8,
        }



        export interface IClickOutRequest {
            /**
             * 卖量图片ID,从侧边栏列表获取
             */
            iconId: number; 
            /**
             * 导出模块
             */
            souce: string;  
            /**
             * 导出游戏的appid
             */
            target: string; 
            /**
             * 用户点击与否['enable':点击,'cancel':取消]
             */
            action: string; 
        }

        export interface IClientLogRequest {
            appid: string;
            version: string;
            language: string;
            system: string;
            model: string;
            brand: string;
            platform: string;
            SDKVersion: string;
            resolution: string;
            window: string;
            ErrStack: any;
            LogStr: any;
            addDate: string;
        }


        export interface IVideoRequest {
            type: number;
            adId: string;
            scene: string;
        }

        export interface IStatisticEventRequest {
            event: string;
            scene: string;
            time: number;
        }

        export interface IApiInfo {
            name: string;  //接口名
            platform: string; //接口所属平台
            time: number;   //接口调用时间
            wholesaleId:number;//批次ID
            count: number; //调用次数
        }

        export interface IStatisticSdkRequest {
            appid: string;
            accountId: string;
            infos: [IApiInfo];
        }

        export interface IStatisticResultInfo {
            layerPath?:string;   //路径，从流失路径列表接口获取
            hasWin?:boolean;     //是否获胜[true:获胜,false:失败]
            source?:number;      //获得分数
            detail?:any;         //其他详情,CP自由发挥
        }

        export interface IStatistiicShareInfo {
            /**
             * 分享图ID ,-1：没有分享图
             */
            sharecardId?:number;
            /**
             * 0:分享图,1:视频分享,2:口令分享(头条需要)
             *
             */
            sType?:number;
            /**
             * 1: 转发到手q通讯录,1:快速转发至来源的聊天窗口,2:快速转发列表,3:转发到空间,4:转发到微信好友,5:转发到微信朋友圈(QQ需要)
             */
            target?:number;
            /**
             * -1:分享-取消,0:分享-不确定,1:分享-确定 
             * (头条有确定回调,微信和QQ都没有)
             */
            real?: number;
        }
    }

    export namespace GameBase {

        //----------------------------------------------------------------
        ///gamebase/config
        /**
         * banner定时刷新配置
         */
        export interface IBannerRefreshConfig {
            /**
             * 是否定时刷新
             */
            IsOn: boolean;
            /**
             * 定时刷新时间/秒
             */
            Interval: number;
            /**
             * 切页面是否强制刷新
             */
            IsForceRefresh: boolean;
            /**
             * 强制刷新最小间隔时间/秒
             */
            MinimumInterval: number;
        }

        /**
         * 体力系统
         */
        export interface IPowerSystemConfig {
            /**
             * 初始体力
             */
            DefaultPowerValue: number;
            /**
             * 体力上限
             */
            UpperLimit: number;
            /**
             * 体力自动恢复时间/秒
             */
            AutoRecoveryTime: number;
            /**
             * 看视频获得体力值
             */
            VideoPowerWeight: number;
            /**
             * 开关
             */
            IsOn: boolean;
        }
        /**
         * 体力监听回调信息
         **/
        export interface IPowerInfo {
            /**
             * 体力改变类型
             */
            Type: EM_POWER_RECOVERY_TYPE;
            /**
             * 玩家当前体力
             */
            PowerNum: number;
            /**
             * 倒计时进度
             */
            CountDownPro: number;
            /**
             * 是否正在倒计时
             */
            OnCountDown: boolean;
        }
        /**
         * 视频解锁关卡
         */
        export interface IVideoUnlockLevelConfig {
            /**
             * 开关
             */
            IsOn: boolean;
            /**
             * 第几关开启
             */
            CustomNumber: number;
            /**
             * 每次解锁间隔几关
             */
            IntervalCount: number;

        }
        /**
         * 深度屏蔽规则
         */
        export interface IDeepSheildRuleConfig {
            /**
             * 类型 0 关闭 1按对局数 2按关卡数
             */
            Type: number;
            /**
             * 总对局数 开启关卡
             */
            CustomNumberCounter: number;
            /**
             * 优质用户开关判断
             */
            ExecellentUserSwitch: boolean;
            /**
             * 观看视频数量
             */
            WatchVideoCounter: number;
            /**
             * 当日对局数 关卡间隔
             */
            DayCustomNumber: number[];
        }
        /**
         * 定时开关误触
         */
        export interface ITimingMisTouchSwitchConfig {
            /**
             * 开关
             */
            IsOn: boolean;
            /**
             * 开始时间小时
             */
            StartTimeHour: number;
            /** 
             * 开始时间分钟
             */
            StartTimeMinute: number;
            /**
             * 结束时间小时
             */
            EndTimeHour: number;
            /**
             * 结束时间分钟
             */
            EndTimeMinute: number;
        }
        /**
         * 开发人员账号
         */
        export interface IDeveloperAccountConfig {
            /**
             * 开关是否开启
             */
            IsOn: boolean;
            /**
             * 白名单
             */
            Accounts: string[];
        }

        export interface IConfig {
            type: string;
            code: string;
            value: string;
        }
        //Config
        //ConfigForce
        export interface IConfigResponse {
            code: number;
            info: string;
            result: IConfig[];
        }

        //----------------------------------------------------------------
        //Request
        //ConfigForce

        // export interface IConfigForceRequest {
        //     appid: string;
        // }

        //----------------------------------------------------------------
        //CustomConfig
        //CustomConfigForce
        export interface ICustomConfigResult {
            _id: number;
            /**
             * 参数名
             */
            name: string;
            version: string;
            /**
             * 类型[1:值配置,2:开关配置]
             */
            type: string;
            /**
             * 值，地区屏蔽状态type==1时value值为空串，type=2时value值为['0':关，'1':开]请CP做好判断
             */
            value: string;
            switchRegionUse: string;
            switchTouchUse: string;
            /**
             * 描述
             */
            desc: string;
        }

        //----------------------------------------------------------------
        //Data Decode
        export interface IDataDecodeRequest {
            platformId: string;
            appid: string;
            code: string;
            encryptedData: string;
            iv: string;
        }

        export interface IDataDecodeResult {
            expiresIn: number;//当前凭证有效时间(毫秒
            accountId: number;//玩家编号
            openid: string;//openid
            appid: string;//appid
            ip: string;//玩家IP
            nano: number;//服务器当前时间戳(纳秒
            time: number;//服务器现在时间戳(毫秒
            version: string;//游戏版本
            platform: string;//平台编号
        }
        export interface IDataDecodeResponse {
            success: false,
            type: string,
            code: string,
            info: string,
            result: IDataDecodeResult,
            time: number;
        }
        //----------------------------------------------------------------
        //GetBoardAward
        // export interface IGetBoardAwardRequest {
        //     module: string;
        //     awardId: number;
        // }

        export interface IAward {
            /**
             * 奖励类型[gold:金币,diamond:钻石,spirit:体力,coupon:券] （类型只是个代号，CP可以将它代表自己的金币系统类型）
             */
            type: string;
            /**
             * 奖励具体数值
             */
            value: string;
        }
        export interface IGetBoardAwardResult {
            id: number;
            status: number;
            award: IAward[];
        }

        //----------------------------------------------------------------
        //Layer
        export interface ILayerInfo {
            appid: string;
            layer: string;
            layerName: string;
            layerPath: string;
            layerPathName: string;
            _id: number;
            addTime: string;
            editTime: string;
        }
        //本地缓存
        export interface ILocalLayerInfo {
            s_layers: string[];
            get_time: number;
        }

        //----------------------------------------------------------------
        //ScoreBoard
        // export interface IScoreBoardRequest {
        //     module: string;
        // }

        export interface IScoreBoardResult {
            _id: 0;
            /**
             * 奖励状态，1表示可领取，0表示已领取
             */
            awardStatus: 0;
            /**
             * 类型 [0：小程序，1:小游戏]
             */
            type: string;
            /**
             * 标题
             */
            title: string;
            /**
             * 图片url
             */
            icon: string;
            /**
             * 跳转appid
             */
            toAppid: string;
            /**
             * 跳转路径
             */
            toUrl: string;
            /**
             * 屏蔽IOS
             */
            shieldIos: number;
            /**
             * 试玩多久得到奖励，单位秒
             */
            playTime: number;
            /**
             * 奖励数据
             */
            awardList: IAward[];
            /**
             * 状态
             */
            status: number;
            /**
             * 该项目的描述信息
             */
            desc: string;
        }


        //----------------------------------------------------------------
        //SideBox


        export interface ISideBoxResult {
            _id: 0;
            /**
             * 该项目类型，0表示小程序，1表示图片
             */
            type: string;
            /**
             * 标题 
             */
            title: string;
            /**
             * 图标url
             */
            icon: string;
            /**
             * 跳转小程序appid  (type=0时)
             */
            toAppid: string;
            /**
             * 跳转小程序appid  (type=0时)
             */
            toAppid2: string;
            /**
             * 跳转小程序path  (type=0时)
             */
            toUrl: string;
            /**
             * 版本号
             */
            version: string;
            /**
             * 屏蔽IOS [ 0:不屏蔽，1:屏蔽 ] (type=0时)
             */
            shieldIos: number;
            /**
             * 图片Url (type=1时)
             */
            showImage: string;
            /**
             * 仿banner图片Url
             */
            bannerImage: string;
            /**
             * 长方形图片Url
             */
            rectangleImage: string;
            /**
             * 合成帧图Url(可用于做动态卖量图的帧资源)
             */
            frameImage: string;
            /**
             * 帧数
             */
            frame: number;
            /**
             * 显示时间
             */
            showTimes: number;
            /**
             * 内部标识
             */
            innerStatus: number;
            /**
             * 
             */
            testStatus: number;
            /**
             * 状态
             */
            status: number;
            /**
             * 该项目的描述信息
             */
            desc: string;
        }

        //----------------------------------------------------------------
        //ShareCard


        export interface IShareCardResult {
            /**
             * 场景名称
             */
            scene: string;
            /**
             * 分享文案
             */
            title: string;
            /**
             * 图片url
             */
            img: string;
            /**
             * 分享卡片id
             */
            id: number;
        }


        //----------------------------------------------------------------
        //StoreValue
        export interface IStoreValueRequest {
            /**
             * 空间名称(后台配置)
             */
            name: string;
            /**
             * 指令(具体请查看文档)
             */
            cmd: string;
            /**
             * 存贮数据(具体请查看文档)
             */
            args: string;
        }

        export interface IStoreValueResult {
            type: string;
            /**
             * 请求操作指令
             */
            cmd: string;
            /**
             * 返回数据(依据空间类型和cmd的操作指令而定，可能是[]数组 {}对象 ""字符 true false 等)
             */
            value: any; 
        }

    }

    export interface ICommonSDK {
        _Platform: IYDHW.ICommonPlatform;
        /**
         * 游戏AppId
         */
        AppId: string;
        /**
         * 游戏AppKey
         */
        AppKey: string;
        /**
         * 游戏包名
         */
        PkgName: string;
        /**
         * 游戏版本
         */
        Version: string;
        /**
         * 玩家账号
         */
        AccountId: number;
        /**
         * 玩家昵称(需要平台授权)
         */
        NickName: string;
        /**
         * 玩家头像(需要平台授权)
         */
        AvatarUrl: string;
        /**
         * 平台登录的Code/Token
         */
        Code: string;
        /**
         * 平台登录OpenID
         */
        OpenID: string;
        /**
         * 玩家SDK登录凭证
         */
        AccountPass: string;
        /**
         * 是否新用户
         */
        IsNewPlayer: boolean;
        /**
         * 邀请人账号(从分享进入的时候才有)
         */
        InviteAccount: string;
        /**
         * 平台进入场景值
         */
        SceneId: number;
        /**
         * 误触开关开关
         */
        SwitchTouch: boolean;
        /**
         * 推送开关
         */
        SwitchPush: boolean;
        /**
         * 是否打开日志调试
         */
        SwitchLog: boolean;
        /**
         * 登录开关这个开关关闭则不让登录了(禁止该游戏)
         */
        SwitchLogin: boolean;
        /**
         * 卖量统计开关
         */
        SwitchJump: boolean;
        /**
         * 分享统计开关
         */
        SwitchShare: boolean;
        /**
         * 事件统计开关
         */
        SwitchVideo: boolean;
        /**
         * 事件统计开关
         */
        SwitchEvent: boolean;
        /**
         * 流失统计开关
         */
        SwitchLayer: boolean;
        /**
         * 结果统计开关
         */
        SwitchResult: boolean;
        /**
         * SDK版本是否过低
         */
        IsLowVersion: boolean;
        /**
         * 标识后台返回的游戏版本号是否是真实的游戏版本号
         */
        IsRealVersion: boolean;
        /**
         * 视频发奖次数上限
         */
        VideoFalseLimit: number;
        /**
         * 分享发奖次数上限
         */
        ShareFalseLimit: number;
        // ModuleFalseList: IShareVideoModuleFalse[];
        // ModuleList: IShareVideoModule[];
        ListCustomConfig: IYDHW.GameBase.ICustomConfigResult[];
        ListBoxConfig: IYDHW.GameBase.ISideBoxResult[];
        ListLayer: IYDHW.GameBase.ILayerInfo[];

        SceneWhiteList: string[]
        BannerAdUnitIdList: string[];//Banner广告
        InterstitialAdUnitIdList: string[];//插屏广告
        SpreadAdUnitIdList: string[];//开屏广告
        NativeAdUnitIdList: string[];//原生广告
        VideoAdUnitIdList: string[];//视频广告

        IsWechat: boolean;
        IsQQ: boolean;
        IsOppo: boolean;
        IsVivo: boolean;
        IsToutiao: boolean;
        IsBaidu: boolean;
        Is4399: boolean;
        IsQutoutiao: boolean;
        Is360: boolean;
        IsMomo: boolean;
        IsXiaomi: boolean;
        IsMeizu: boolean;
        IsUC: boolean;
        IsWeb: boolean;
        IsAlipay: boolean;


        LoginAddress(): string;

        /**
         * SDK登录-必接接口(记得先调用登录接口，很多接口都需要再登录成功后才能访问服务器)
         * 
         * @param caller 
         * @param method 
         */
        Login(caller: any, method: (isOk: boolean) => void): void;

        /**
         * 获取分享信息
         */
        ShareInfo(): IYDHW.User.IShareInfo;

        /**
         * 获取胶囊按钮对齐的左侧信息
         */
        GetLeftTopBtnPosition(): IYDHW.IAdStyle;

        /**
         * Banner统计
         * 
         * @param type  状态
         * @param adId 
         */
        StatisticBanner(type: IYDHW.Statistic.EM_STATISTIC_TYPE, adId: string): void;

        /**
         *  激励视频统计
         * 
         * @param type 
         * @param adId 
         */
        StatisticVideo(type: IYDHW.Statistic.EM_STATISTIC_TYPE, adId: string): void;

        /**
         * 插屏广告统计
         * 
         * @param type 
         * @param adId 
         */
        StatisticInterstitial(type: IYDHW.Statistic.EM_STATISTIC_TYPE, adId: string): void;

        // StatisticSdk(sdksInfo: IYDHW.Statistic.IApiInfo[]): void ;

        /**
         * 结果统计
         * 
         * @param details 对象或数组
         */
        StatisticResult(details: any): void;

        /**
         * 事件统计
         * 
         * @param event 事件名
         * @param scene 场景名
         */
        StatisticEvent(event: string, scene: string): void;

        /**
         *  卖量统计
         * 
         * @param request 
         */
        StatisticClickOut(request: IYDHW.Statistic.IClickOutRequest);

        /**
         * 获取视频 or 分享的策略, type[1:分享， 2:视频]
         * 
         * @param channel 渠道
         * @param module 模块
         * @param caller 
         * @param method 
         */
        ShowShareOrVideo(channel: string, module: string, caller: any, method: (type: number) => void): void;

        /**
         * 使用视频 or 分享的策略, type[1:分享， 2:视频](会消耗次数)
         * @param channel 渠道
         * @param module 模块
         * @param caller 
         * @param method 
         */
        UseShareOrVideoStrategy(channel: string, module: string, caller: any, method: (type: number) => void): void;

        /**
         * 切换页面（是否强制刷新banner）
         * 
         * @param isMisTouched 是否为误触banner
         */
        SwitchView(isMisTouched: boolean): void;

        /**
         * 获取深度误触屏蔽开关状态
         * 
         * @param counter 当前关卡数(如果不是关卡游戏的话，不用传)
         */
        GetDeepTouchInfo(customNumber: number): IYDHW.IDeepTouchInfo;

        /**
         * 获取自定义配置
         * 
         * @param caller 
         * @param method 
         */
        GetCustomConfig(caller: any, method: (result: IYDHW.GameBase.ICustomConfigResult[]) => void): void

        /**
         * 游戏结束
         * 
         * @param index  当前关卡
         */
        GameOver(index: number): void;

        /**
         * 视频解锁 
         * 
         * @param index 当前关卡
         */
        IsUnlockVideo(index: number): boolean;
        
        /**
         * 获取体力信息(后台配置的)
         */
        GetPowerInfo(): IYDHW.GameBase.IPowerSystemConfig;

        /**
         * 体力变化监听
         * 
         * @param caller 
         * @param method 
         */
        ListenOnPowerChanged(caller: any, method: (powerInfo: IYDHW.GameBase.IPowerInfo) => void): void;

        /**
         * 增加体力值
         * 
         * @param type 设置类型(CP手动修改请传0)
         */
        AddPower(type: EM_POWER_RECOVERY_TYPE): void;

        /**
         * 设置体力值
         * 
         * @param power 体力值
         * @param type 设置类型(CP手动修改请传0)
         */
        SetPower(power: number, type: EM_POWER_RECOVERY_TYPE): void;

        /**
         * 获取体力值
         */
        GetPower(): number;

        /**
         * 获取卖量列表
         * 
         * @param caller 
         * @param method 
         */
        GetSideBox(caller: any, method: (result: IYDHW.GameBase.ISideBoxResult[]) => void);

        /**
         * 获取积分墙列表
         * 
         * @param caller 
         * @param method 
         */
        GetScoreBoardList(caller: any, method: (result: IYDHW.GameBase.IScoreBoardResult[]) => void): void;

        /**
         * 领取积分墙奖励
         * 
         * @param id 积分墙ID，从GetScoreBoardList接口获取
         * @param caller 
         * @param method 
         */
        GetScoreBoardAward(id: number, caller: any, method: (result: IYDHW.GameBase.IGetBoardAwardResult) => void): void;

        /**
         * 获取分享图列表
         * 
         * @param scene 场景名(传空串将获取所有场景的分享列表)
         * @param caller 
         * @param method 
         */
        ShareCard(scene: string, caller: any, method: (result: IYDHW.GameBase.IShareCardResult[]) => void): void;
        /**
         * 今天玩的局数
         */
        GetTodayBoutCount(): number;
        /**
         * 总共玩的局数
         */
        GetTotalBoutCount(): number;
        /**
         * 最后一次玩的关卡号码
         */
        GetLastBountNumber(): number;
        /**
         * 总玩过的最大关卡号码
         */
        GetMaxBountNumber(): number;
        /*
         * 获取玩家今天看视频的次数
         */
        GetTodayWatchVideoCounter(): number;
        
        /**
         * 创建banner广告(填充屏幕宽度)
         * 
         * @param isMisTouch 是否为误触Banner
         * @param isShow 是否立马显示
         * @param caller 
         * @param method 
         */
        CreateBannerAd(isMisTouch: boolean, isShow: boolean, caller: any, method: (isOk: boolean) => void): void;
        
        /**
         * 创建banner广告(小的)
         * 
         * @param isMisTouch 是否为误触Banner
         * @param isShow 是否立马显示
         * @param caller 
         * @param method 
         */
        CreateSmallBannerAd(isMisTouch: boolean, isShow: boolean, caller: any, method: (isOk: boolean) => void): void;
        
        /**
         * 创建banner自定义style
         * 
         * @param isMisTouch 是否为误触Banner
         * @param isShow 是否立马显示
         * @param style Style风格
         * @param caller 
         * @param method 
         * @param onResize 
         */
        CreateCustomBannerAd(isMisTouch: boolean, isShow: boolean, style: IYDHW.IAdStyle, caller: any, method: (isOk: boolean) => void, onResize: (result: any) => void): void;
        
        /**
         * 改变Banner的Style
         * 
         * @param style 
         */
        BannerAdChangeSize(style: IYDHW.IAdStyle): void;

        /**
         * 显示banner广告
         */
        ShowBannerAd(): void;

        /**
         * 隐藏 banner广告
         */
        HideBannerAd(): void;

        /**
         * 创建激励视频广告
         * 
         */
        CreateRewardVideoAd(): void;

        /**
         * 播放视频广告
         * 
         * @param unlockCustomNumber 解锁关卡
         * @param isAddPower 看完视频是否增加体力
         * @param caller 
         * @param onClose 
         */
        ShowRewardVideoAd(unlockCustomNumber: number, isAddPower: boolean, caller: any, onClose: (type: EM_VIDEO_PLAY_TYPE) => void): void;

        /**
         * 
         * 获取游戏流失路径列表
         * 
         * @param onReturn 流失路径信息列表
         */
        GetLayerList(onReturn: (layerList: IYDHW.GameBase.ILayerInfo[]) => void): void

        /**
         * 分享图统计（打点统计）
         * @param info  分享参数
         */
        StatisticShareCard(info: IYDHW.Statistic.IStatistiicShareInfo): void;

         /**
          * 小游戏跳转
          * （以下参数从GetSideBox接口获取）
          * @param id 卖量ItemID
          * @param toAppId 跳转AppID
          * @param toUrl 跳转路径
          * @param source 从哪个模块导出的，该字段具体值由调用方自行定义
          * @param caller 
          * @param method 
          */
        NavigateToMiniProgram(id: number, toAppId: string, toUrl: string, source: string, caller: any, method: (isOk: boolean) => void): void;

        /**
         * 创建-用户信息按钮
         * 
         * @param btnInfo 具体格式查看官方文档(目前只支持微信/QQ)
         * @param caller 
         * @param method 
         */
        CreateUserInfoButton(btnInfo:any,caller:any ,onSuccess: (result: any) => void, onError: (error: any) => void): void;

        /**
         * 显示-用户信息按钮
         * 
         */
        ShowUserInfoButton(): void;

        /**
         * 隐藏-用户信息按钮
         */
        HideUserInfoButton(): void;

        /**
         * 销毁-用户信息按钮void;
         */
        DestroyUserInfoButton(): void;

        /**
         * 获取平台用户信息
         * 支持平台:QQ,微信,头条
         *
         * @param caller 
         * @param onSuccess 
         * @param onError 
         */
        GetUserInfo(caller:any ,onSuccess: (result: any) => void, onError: (error: any) => void):void;

        /**
         * 创建插屏广告
         * 
         * @param isShow 是否展示
         * @param caller 
         * @param method 
         */
        CreateInterstitialAd(isShow: boolean, caller: any, onSuccess: () => void, onFail: () => void, onClose: () => void): void;

        /**
         * 显示插屏广告
         */
        ShowInterstitialAd(): void;

        /**
         * 获取假分享策略结果
         * 
         * @param channel 渠道
         * @param module  模块
         */
        GetSharingResults(shareInfo: IYDHW.IShareAppInfo, caller: any, method: (shareBackInfo: IYDHW.IShareBackInfo) => void): void;

        /**
         * 调用流失统计
         * 
         * @param layerPath 流失路径(从GetLayerList接口获取)
         */
        StatisticLayer(layerPath: string): void;

        /**
         * 是否可以发放奖励
         * 如果可以,SDK将自动扣除一次发放奖励次数
         * 
         * @param type 类型
         * 
         * 返回 [true:可以,false:不能(今天已达上限)]
         */
        IsCanRewardByVideoOrShare(type: EM_SHARE_TYPE): boolean;

        /**
         * 获取分享发奖次数上限
         */
        GetShareRewardLimit(): number;

        /**
         * 获取视频发奖次数上限
         */
        GetVideoRewardLimit(): number;

        /**
         * 获取服务器信息
         * 
         * @param caller 
         * @param method 
         */
        GetServerInfo(caller: any, method: (result: IYDHW.User.IMyInfoResult) => void): void;

        Hook(name: string, caller: any, method: (inputObjectList: any[], outputObject: any) => void): void;

        /**
         * 退出游戏
         *  
         */
        ExitGame():void;
        /**
         * 震动-短时
         * 
         * (触发较短时间，持续15ms)
         */
        VibrateShort(): void;

        /**
         * 震动-长时
         * 
         * (触发较长时间震动，持续400ms)
         */
        VibrateLong(): void;

        /** 
         * 创建桌面图标，每次创建都需要用户授权
         * 两次调用之间的间隔时间是120秒以上
         * 
         * @param caller 
         * @param onSuccess 
         * @param onFail 
         * @param onComplete 
         * @param message 权限弹窗上的说明文字，用于向用户解释为什么要创建桌面图标(VIVO可传)
         */
        InstallShortcut(caller: any, onSuccess: () => void,  onFail?: (error: any) => void, onComplete?: () => void,message?:string): void;


        /**
         * 原生广告创建
         */
        CreateNativeAd(caller: any,method: (args: any) => void): void;

        /**
         * 上报广告曝光，一个广告只有一次上报有效
         * 
         * @param nativeId 创建返回的adId
         */
        ShowNativeAd(nativeId: string): void;

        /**
         * 上报广告点击，一个广告只有一次上报有效
         * 
         * @param nativeId  创建返回的adId
         */
        ClickNativeAd(nativeId: string): void;

        /**
         * 是否已经创建桌面图标
         * @param caller 
         * @param onSuccess 
         * @param onFail 
         * @param onComplete  (VIVO平台没有回调)
         */
        HasShortcutInstalled(caller: any, onSuccess: (result: any) => void, onFail?: (error: any) => void, onComplete?: () => void): void; 
        /**
         * 分享信息
         * 
         * @param scene        当前场景
         * @param channel      渠道名
         * @param module       模块名
         * @param inviteType   邀请参数
         * @param caller       上下文
         * @param method       回调函数
         * @param target       回调函数
         */
        ShareAppMessage(scene: string, channel: string, module: string, inviteType: string, caller: any, method: (result: any) => void,target?:EM_SHARE_APP_TYPE): void;
        /**
         * onShow监听回调
         * @param caller 
         * @param method 
         */
        OnShow(caller: any, method: (res:any) => void): void;

        /**
         * onHide监听回调
         * @param caller 
         * @param method 
         */
        OnHide(caller: any, method: (res:any) => void): void;

        /**
         * onError监听回调
         * @param caller 
         * @param method 
         */
        OnError(caller: any, method: (error:any) => void): void;

        /**
         * 自定以存储空间
         * 
         * @param storeInfo  操作参数
         * @param caller 
         * @param method 
         */
        StoreValue(storeInfo: IYDHW.GameBase.IStoreValueRequest, caller?: any, method?: (result: IYDHW.GameBase.IStoreValueResult) => void): void;
    }

    export interface ISystemInfo {
        COREVersion: string;//版本号
        brand: string;//手机品牌
        language: string;//当前环境设置的语言
        model: string;//手机型号
        notchHeight: number;//凹槽高度(刘海屏高度)
        pixelRatio: number;//设备像素比
        platform: string;//客户端平台
        platformVersion: number;//平台版本号
        screenHeight: number;//屏幕高度
        screenWidth: number;//屏幕宽度
        system: string;//操作系统版本
        windowHeight: number;//可使用窗口高度
        windowWidth: number; //可使用窗口宽度
    }

    export enum EM_PLATFORM_TYPE {
        Common = -1,
        Wechat = 0,
        QQ = 1,
        Oppo = 2,
        Vivo = 3,
        Toutiao = 4,
        Baidu = 5,
        P_4399 = 6,
        Qutoutiao = 7,
        P_360 = 8,
        Momo = 9,
        Web = 10,
        Xiaomi = 11,
        Meizu = 12,
        UC = 13,
        Alipay = 14,
    }




    /**
     * 矩形
     */
    export interface IRectangle {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    // 模态窗口成功函数
    type TModalSuc = (res: { confirm: boolean, cancel: boolean }) => void;

    /**
     * 模态窗口
     */
    export interface IModal {
        title: string;          // 标题
        content: string;        // 内容
        showCancel?: boolean;   // 是否显示取消按钮
        cancelText?: string;    // 左边按钮文字
        cancelColor?: string;   // 左边按钮文字颜色
        confirmText?: string;   // 右边按钮文字
        confirmColor?: string;  // 右边按钮文字颜色
        success?: TModalSuc;    // 成功执行回调
        fail?: Function;        // 失败执行回调
    }

    /**
     * 分享参数
     */
    export interface IShareData {
        title: string;          // 分享文案
        imageUrl: string;       // 分享图
        query: string;          // 携带参数
        type?: number;          // 分享类型
        shareTime?: ITimeItem;  // 假策略拉起数据
        isNormal?: boolean;     // 是否普通分享
        aldShare?: boolean;     // 是否是阿拉丁分享
        success?: Function;     // 成功回调
        fail?: Function;        // 失败回调
    }

    /**
     * 提示文本
     */
    export interface ITipRand {
        tips: string[];             // 失败提示文本
        prob: number[];             // 出现的概率
    }


    /**
     * 自定义开关分享参数格式：中的time格式
     */
    export interface ITimeItem {
        times: number[];            // 时间阶段
        rands: number[];            // 对应概率
        tips?: ITipRand;            // 提示文本
    }


    /**
     * 自定义开关分享参数格式
     */
    export interface IShareTime {
        id: number;                 // 策略标识，0~
        times: ITimeItem[];         // 时间阶段
        start: number;              // 策略启动的小时（24小时制）
        end: number;                // 策略结束的小时（24小时制）
        tips: ITimeItem;            // 提示文本
    }


    /**
     * 自定义积分策略
     */
    export interface IScoreStrategy {
        name: string;
        beginScore: number;         // 用户区间开始分数
        endScore: number;           // 用户结束开始分数
        shareTimes: IShareTime[];   // 时间阶段
        failScore: number;          // 分享成功获得的分数
        scceScore: number;          // 分享失败减去的分数
        shareToVideo: number;       // 多少次后切换视频
        maxSubScore: number;        // 当天减分最大数字
        shareType: number;          // 分享卡片类型
    }

    /**
     * 创建视频参数，注：矩形参数传入是游戏内的参数
     */
    export interface IVideoData extends IRectangle {
        src: string;                        // 视频地址
        poster: string;                     // 视频封面
        initialTime?: number;               // 初始播放位置，单位秒，默认0
        playbackRate?: number;              // 视频的播放速率，有效值有 0.5、0.8、1.0、1.25、1.5，默认1
        live?: boolean;                     // 视频是否为直播，默认false
        objectFit?: string;                 // 视频的缩放模式，默认contain
        controls?: boolean;                 // 视频是否显示自带控件，默认true
        autoplay?: boolean;                 // 视频是否自动播放，默认false
        loop?: boolean;                     // 视频是否循环播放，默认false
        muted?: boolean;                    // 视频是否禁音播放，默认false
        enableProgressGesture?: boolean;    // 是否启用手势控制播放进度，默认true
        enablePlayGesture?: boolean;        // 是否开启双击播放的手势，默认false
        showCenterPlayBtn?: boolean;        // 是否显示视频中央的播放按钮，默认true
    }

    /**
     * 视频控件，注：矩形参数是相对于屏幕的参数
     */
    export interface IVideo extends IVideoData {
        /**
         * 监听视频缓冲事件
         */
        OnWaiting(call: Function): void;
        /**
         * 取消监听视频缓冲事件
         */
        OffWaiting(call: Function): void;
        /**
         * 监听视频播放事件
         */
        OnPlay(call: Function): void;
        /**
         * 取消监听视频播放事件
         */
        OffPlay(call: Function): void;
        /**
         * 监听视频暂停事件
         */
        OnPause(call: Function): void;
        /**
         * 取消监听视频暂停事件
         */
        OffPause(call: Function): void;
        /**
         * 监听视频播放结束事件
         */
        OnEnded(call: Function): void;
        /**
         * 取消监听视频播放结束事件
         */
        OffEnded(call: Function): void;
        /**
         * 监听视频播放进度更新事件
         */
        OnTimeUpdate(call: Function): void;
        /**
         * 取消监听视频播放进度更新事件
         */
        OffTimeUpdate(call: Function): void;
        /**
         * 监听视频缓冲事件
         */
        OnError(call: Function): void;
        /**
         * 取消监听视频缓冲事件
         */
        OffError(call: Function): void;
        /**
         * 暂停
         */
        Pause(): void;
        /**
         * 播放
         */
        Play(): void;
        /**
         * 销毁视频
         */
        Destroy(): void;
        /**
         * 跳转
         */
        Seek(sec: number): void;
        /**
         * 是否隐藏
         */
        hide: boolean;
    }

    export interface IAdStyle {
        top: number;
        left: number;
        width: number;
        height?: number;
    }

    export interface IShareAppInfo {
        /**
         * 渠道名称
         */
        channel: string;   
        /**
         * 模块名称
         */
        module: string;    
        /**
         * 分享时长
         */
        showTime: number;  
        /**
         * 分享ID
         */
        shareId: number;   
    }

    export interface IShareBackInfo {
        /**
         * 是否分享成功
         */
        IsSuccess: boolean;
        /**
         * 是否有策略[true:有，false:没有] (分享失败才返回此参数)
         */
        IsHasStrategy: boolean;
        /**
         * 分享话术(分享失败且有策略才返回此参数)
         */
        Tips: IYDHW.User.ITips[];
    }

    export interface IDeepTouchInfo {
        /**
         * 深度误触屏蔽是否开启
         */
        deepTouch: boolean;
        /**
         * 深度误触屏蔽处理完之后的自定配置数据
         */
        ListCustomInfo: IYDHW.GameBase.ICustomConfigResult[];
    }

    export enum EM_SHARE_TYPE {
        /**
         * 无
         */
        None = 0,
        /**
         * 分享
         */
        Share = 1, 
        /**
         * 视频
         */         
        Video = 2,     
    }
    export enum EM_VIDEO_PLAY_TYPE {
        /**
         * 视频广告-播放失败
         */
        VIDEO_PLAY_FAIL = 0,      
        /**
         * 视频广告-播放完成
         */
        VIDEO_PLAY_FINISH = 1,    
        /**
         * 视频广告-播放取消
         */
        VIDEO_PLAY_CANCEL = 2,    
    }
    export enum EM_POWER_RECOVERY_TYPE {
        /**
         * 无
         */
        None = 0,
        /**
        * 看视频恢复体力
        */
        WatchVideo = 1,
        /**
         * 定时恢复体力
         */
        AutoRecovery = 2,
        /**
         * 倒计时
         */
        CountDown = 3,
    }
    export enum EM_SHARE_APP_TYPE {
        QQ = 'qq',                              //转发到手q通讯录
        QQ_FAST_SHARE = 'qqFastShare',          //快速转发至来源的聊天窗口
        QQ_FAST_SHARE_LIST = 'qqFastShareList', //快速转发列表
        QZONE = 'qzone',                        //转发到空间
        WECHARTFRIENDS = 'wechatFriends',       //转发到微信好友
        WECHATMOMENT = 'wechatMoment',          //转发到微信朋友圈
    }

    export interface IPowerSystem {
        Initialize(): void;
        SetPower(power: number, type: EM_POWER_RECOVERY_TYPE): void;
        GetPower(): number;
        ListenOnPowerChange(caller: any, method: (powerInfo: IYDHW.GameBase.IPowerInfo) => void): void;
    }

    export interface IStrategy {
        InitShareConfig(scene: string, configs: IYDHW.GameBase.IShareCardResult[]): void;
        IsHasShareScene(scene: string): boolean;
        GetShareSceneConfig(scene: string): IYDHW.GameBase.IShareCardResult[];
        GetRandomShareConfig():IYDHW.GameBase.IShareCardResult;
        // GetShareStrategy(channel:string, module:string): YDHW.User.IShareVideoModuleFalse;
        GetShareResult(shareAppInfo: IShareAppInfo, caller: any, method: (shareBackInfo: IShareBackInfo) => void): void;
        ShowShareVideo(channel: string, module: string, caller: any, method: (type: EM_SHARE_TYPE) => void): void;
        UseShareVideoStrategy(channel: string, module: string, caller: any, method: (type: EM_SHARE_TYPE) => void): void;
        GetDeepMisTouch(customNumber: number): boolean;
        IsUnlockVideo(index: number): boolean;
    }

    export interface ICache {
        // GetJumpOutInfo():
        /**
         * 买量被点击过就过滤掉
         * @param appid 
         */
        RemoveItemFrom(appid: string): void;
    }

    export interface ICommonPlatform {

        Controller: any;
        Controller2: any;

        SystemInfo: ISystemInfo;
        //BannerAd
        BannerAdId: string;
        BannerAd: any;
        BannerStyle: IYDHW.IAdStyle;
        CallerOnResizeBannerAd: any;
        OnResizeBannerAd: (rsult: any) => void;
        IsMisTouchBannerAd: boolean;
        IsShowBannerAd: boolean;
        //RewardVideoAd
        RewardVideoAdId: string;
        RewardVideoAd: any;
        IsShowRewardVideoAd: boolean;
        //InterstitialAd
        InterstitialAdId: string;
        InterstitialAd: any;
        //GridAd
        GridAdId: string;
        //AppBox
        AppBoxAdId: string;
        //BlockAdId
        BlockAdId: string;
        //UserInfoButton
        UserInfoButton: any;

        IsSimulator: boolean;

        NetType: string;
        PlatformType: EM_PLATFORM_TYPE;

        // Version: string;
        Brand: string;
        Model: string;
        Resolution: string;

        AppName:string;    //字节跳动

        Env: string;

        IsDebug: boolean;

        IsHasVideo: boolean;

        IsWechat: boolean;
        IsQQ: boolean;
        IsOppo: boolean;
        IsVivo: boolean;
        IsToutiao: boolean;
        IsBaidu: boolean;
        Is4399: boolean;
        IsQutoutiao: boolean;
        Is360: boolean;
        IsMomo: boolean;
        IsXiaomi: boolean;
        IsMeizu: boolean;
        IsUC: boolean;
        IsWeb: boolean;
        IsAlipay: boolean;

        IsQGMiniGame: boolean;
        IsQQMiniGame: boolean;



        IsOnMobile: boolean;
        IsOnIOS: boolean;
        IsOnIPhone: boolean;
        IsOnMac: boolean;
        IsOnIPad: boolean;
        IsOnAndroid: boolean;
        IsOnWP: boolean;
        IsOnQQBrowser: boolean;
        IsOnMQQBrowser: boolean;
        IsOnWeiXin: boolean;
        IsOnSafari: boolean;
        IsOnPC: boolean;

        IsCocosEngine: boolean;
        IsLayaEngine: boolean;


        Initialize(): boolean;
        Login(caller: any, onSuccess: (ode: string, token: string, result: any) => void, onError: (error: any) => void): void;
        IsHasAPI(name: string): boolean;
        LaunchInfo(): any;
        GetSystemInfoSync(caller: any, method: (data: any) => void): void;
        OnFrontend(caller: any, method: (res:any) => void): void;
        OnBackend(caller: any, method: (res:any) => void): void;
        OnError(caller: any, method: (error: any) => void): void;
        CreateFeedbackButton(_btnVect: IRectangle, hide?: boolean): void;
        ShowFeedbackButton(visible: boolean): void;
        ExitMiniProgram(): void;
        TriggerGC(): void;
        OnShare(_data: any): void;
        NavigateToMiniProgram(ownAppId: string, toAppId: string, toUrl: string, caller: any, onSuccess: () => void, onFail: () => void): void;
        CreateBannerAd(isSmall: boolean,adUnitId: string, isMisTouch: boolean, style: IAdStyle, caller: any, onResize: (result: any) => void): void;
        RefreshBannerAd(): void
        DestroyBannerAd(): void;
        SetBannerVisible(val: boolean): void;
        ChangeBannerStyle(style: IYDHW.IAdStyle): void;
        CreateRewardVideoAd(adUnitId: string, caller: any, onLoad: () => void, onClose: (result: any) => void, onError: (error: any) => void): void;        
        ShowRewardVideoAd(caller: any, onShow: () => void, onException: (result: any) => void): void;
        CreateRewardVideoAd2(adUnitId: string, caller: any, onClose: (result: any) => void, onError: (error: any) => void): void;        
        ShowRewardVideoAd2(caller: any, onLoad: () => void, onShow: () => void, onException: (result: any) => void): void;
        CreateInterstitialAd(adUnitId: string, caller: any, onLoad: () => void, onClose: (result: any) => void, onError: (error: any) => void): void;
        ShowInterstitialAd(caller: any, method: () => void);
        ClearInterstitialAd(): void;
        CreateUserInfoButton(btnInfo:any,caller:any ,onSuccess: (result: any) => void, onError: (error: any) => void);
        ShowUserInfoButton();
        HideUserInfoButton();
        DestroyUserInfoButton();
        GetUserInfo(caller:any ,onSuccess: (result: any) => void, onError: (error: any) => void):void;

        ExitGame():void;
        VibrateShort(): void;
        VibrateLong(): void;
        CreateNativeAd(adUnitId: string, caller: any,onCreate: () => void,  method: (args: any) => void): void;            
        ShowNativeAd(nativeId: string): void;
        ClickNativeAd(nativeId: string): void;
        HasShortcutInstalled(caller: any, onSuccess: (result: any) => void, onFail?: (error: any) => void, onComplete?: () => void): void;
        InstallShortcut(caller: any, onSuccess: () => void,  onFail?: (error: any) => void, onComplete?: () => void,message?:string): void;
        ShareAppMessage(title: string, imageUrl: string, query: string, caller: any, method: () => void,target?:EM_SHARE_APP_TYPE);
        /**
         * 设置玩家云数据
         * @param _kvDataList 
         */
        SetUserCloudStorage(_kvDataList: {}[]): any;

        /**
         * 向子域推送消息
         * @param _data 
         */
        PostMessage(_data: any): void;

        /**
         * 检查版本更新
         */
        CheckUpdate(): void;

        /**
         * 获取网络状态
         * @param method 
         */
        GetNetworkType(caller: any, method: (type: string) => void): void;

        /**
         * 分包加载
         * @param name 分包名
         * @param update 进度更新函数
         */
        LoadSubpackage(name: string, update?: (prog: number) => void): Promise<void>;

        /**
         * 显示loading
         */
        ShowLoading(): void;

        /**
         * 关闭loading
         */
        HideLoading(): void;

        /**
         * 纯分享，无success和fail回调
         * @param data
         */
        ShowShare(data: IShareData): void;

        /**
         * 显示模态窗口
         * @param modal
         */
        ShowModal(modal: IModal): void;


        Hook(name: string, caller: any, method: (inputObjectList: any[], outputObject: any) => void): void;
    }


    /**
     * 如果想用无差异化全局变量ydhw,请注意如下继承方式，这样其实是会导致A平台接口与B平台某个截图
     */
    export interface ISDK extends
        IManager,
        ICommonSDK,
        IYDHW.Alipay.IAlipaySDK,
        IYDHW.Baidu.IBaiduSDK,
        IYDHW.Meizu.IMeizuSDK,
        IYDHW.Momo.IMomoSDK,
        IYDHW.Oppo.IOppoSDK,
        IYDHW.P360.IP360SDK,
        IYDHW.P4399.IP4399SDK,
        IYDHW.QQ.IQQSDK,
        IYDHW.TT.IToutiaoSDK,
        IYDHW.UC.IUCSDK,
        IYDHW.Vivo.IVivoSDK,
        IYDHW.Web.IWebSDK,                   
        IYDHW.Wechat.IWechatSDK,
        IYDHW.Xiaomi.IXiaomiSDK {
    }


}

declare var ydhw: IYDHW.ISDK;





