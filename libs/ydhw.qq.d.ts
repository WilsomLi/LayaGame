declare namespace IYDHW {
    export namespace QQ {
        export interface IQQSDK {
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
             * 分享(邀请类模板)
             * 
             * @param shareInfo 
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

            /**
             * 添加桌面图标
             * 
             * @param caller 
             * @param method 
             */
            SaveAppToDesktop(caller: any, method: (success: boolean) => void): void;

            /**
             * 主动订阅
             * 
             * @param appMsgInfo 
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
             * @param adInfo 
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
            ShareAppMessage(title: string, imageUrl: string, query: string, caller: any, method: () => void);
            _ShareByTemplateId(shareInfo: IYDHW.QQ.IShareTempletInfo,queryData:string, caller: any, method: (result: any) => void);
            _AddColorSign(caller:any ,onSuccess: (result: any) => void, onError: (error: any) => void);
            _SaveAppToDesktop(caller:any ,onSuccess: (result: any) => void, onError: (error: any) => void);
            _SubscribeAppMsg(appMsgInfo:IYDHW.QQ.IAppMsgInfo,caller: any, onSuccess: (result: any) => void, onError: (error: any) => void);
            _CreateAddFriendButton(btnInfo: IYDHW.QQ.IAddFriendButtonInfo,caller:any ,onSuccess: (result: any) => void, onError: (error: any) => void);
            _ShowAddFriendButton();
            _HideAddFriendButton();
            _DestroyAddFriendButton();
            _CreateAppBox(adId: string,caller:any ,hasCreated:()=>void,onCreate:(success:boolean)=>void,onLoad:(success:boolean)=>void,onClose:()=>void);
            _ShowAppBox(caller:any ,onSuccess: () => void, onError: (error: any) => void);
            _CreateBlockAd(_adId: string,adInfo:IYDHW.QQ.IBlockAdInfo,caller: any,onCreate:(success:boolean)=>void,onLoad:(success:boolean)=>void,onResize:()=>void);   
            _ShowBlockAd(caller: any, show: (adId:string) => void);
            _HideBlockAd();
            _DestroyBlockAd();
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

        export enum EM_SHARE_APP_TYPE{
            QQ = 'qq',                              //转发到手q通讯录
            QQ_FAST_SHARE = 'qqFastShare',          //快速转发至来源的聊天窗口
            QQ_FAST_SHARE_LIST = 'qqFastShareList', //快速转发列表
            QZONE = 'qzone',                        //转发到空间
            WECHARTFRIENDS = 'wechatFriends',       //转发到微信好友
            WECHATMOMENT = 'wechatMoment',          //转发到微信朋友圈
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

        export interface ISDK extends IQQSDK, ICommonSDK { }
        export interface IPlatform extends IQQPlatform, ICommonPlatform { }
    }
}

declare var ydhw_qq: IYDHW.QQ.ISDK;