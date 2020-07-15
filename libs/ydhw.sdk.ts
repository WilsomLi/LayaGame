//@namespace=YDHW
export namespace YDHW {

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

    export enum EM_SHARE_TYPE {
       /**
         * 无策略
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

    export enum EM_POWER_RECOVERY_TYPE {
        /**
         * 初始化或其他
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

    //@platform=wechat
    export namespace WX {

    }
    //@end=wechat

    //@platform=tt
    export namespace TT {

    }
    //@end=tt

    //@platform=qq
    export namespace QQ {
        export class ShareTempletInfo implements IYDHW.QQ.IShareTempletInfo{
            shareTemplateId: string;         //分享模板ID
            shareTemplateData: SHareTemplateData;   //分享文案
            channel?: string;                //渠道
            module?: string;                 //模块
            inviteType?: EM_SHARE_APP_TYPE;  //邀请类型,可以通过qq.getLaunchOptionsSync() 或 qq.onShow() 获取启动参数中的 query获取到的参数中拿到from参数的值就是该参数的传值，CP可以通过该参数给玩家发奖。
            shareAppType?: string;           //转发目标类型,不设该属性默认拉起手q通讯录，详见官方文档
            entryDataHash?: string;          //监听用户点击页面内转发按钮的，只有带上该参数，才支持快速分享，详见官方文档
        }
    
        export enum EM_SHARE_APP_TYPE {
            QQ = 'qq',                              //转发到手q通讯录
            QQ_FAST_SHARE = 'qqFastShare',          //快速转发至来源的聊天窗口
            QQ_FAST_SHARE_LIST = 'qqFastShareList', //快速转发列表
            QZONE = 'qzone',                        //转发到空间
            WECHARTFRIENDS = 'wechatFriends',       //转发到微信好友
            WECHATMOMENT = 'wechatMoment',          //转发到微信朋友圈
        }
    
        export class SHareTemplateData implements IYDHW.QQ.ISHareTemplateData{
            txt1: string;    //中间文案
            txt2: string;    //底部文案
        }
    
        export class AppMsgInfo implements IYDHW.QQ.IAppMsgInfo{
            tmplIds?: string[];   //需订阅的消息模板的id的集合，一次调用最多可订阅3条消息。
            subscribe: boolean;  //订阅(true)及取消订阅(false)
        }
    
        //增加好友按钮信息
        export class AddFriendButtonInfo implements IYDHW.QQ.IAddFriendButtonInfo{
            type: string;       //按钮的类型 ['text':可以设置背景色和文本的按钮 ,'image':只能设置背景贴图的按钮，背景贴图会直接拉伸到按钮的宽高]
            text?: string;      //按钮上的文本，仅当 type 为 text 时有效
            image?: string;      //按钮的背景图片，仅当 type 为 image 时有效
            openId: string;     //好友的openid
            style: FbStyle;    //按钮的样式
        }
    
        //按钮的样式
        export class FbStyle implements IYDHW.QQ.IFbStyle{
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
        export class BlockAdInfo implements IYDHW.QQ.IBlockAdInfo{
            style: BlockStyle;      //积木广告组件的样式
            size: number;            //范围是1~5，积木广告的个数（展示以实际拉取广告数量为准）
            orientation: string;     //landscape 或者 vertical，积木广告横向展示或者竖向展示
        }
    
        //积木广告组件的样式
        export class BlockStyle implements IYDHW.QQ.IBlockStyle{
            left: number;     //积木广告组件的左上角横坐标
            top: number;      //积木广告组件的左上角纵坐标
        }
    }
    //@end=qq

    export class ClickOutRequest implements IYDHW.Statistic.IClickOutRequest{
        iconId: number; //卖量图片ID,从侧边栏列表获取
        souce: string;  //导出模块
        target: string; //导出游戏的appid
        action: string; //用户点击与否['enable':点击,'cancel':取消]
    }

    export class ShareAppInfo implements IYDHW.IShareAppInfo{
        channel: string;   //渠道名称
        module: string;    //模块名称
        showTime: number;  //分享时长
        shareId: number;   //分享ID
    }

    export class StatisticResultInfo implements IYDHW.Statistic.IStatisticResultInfo {
        layerPath?:string;   //路径，从流失路径列表接口获取
        hasWin?:boolean;     //是否获胜[true:获胜,false:失败]
        source?:number;      //获得分数
        detail?:any;         //其他详情,CP自由发挥
    }

    /**
     * 广告Style
     */
    export class AdStyle implements IYDHW.IAdStyle {
        top: number;    //广告组件的左上角横坐标
        left: number;   //广告组件的左上角纵坐标
        width: number;  //广告组件的宽度
        height?: number;//广告组件的高度
    }

    export class SdkInfo implements IYDHW.Statistic.IApiInfo {
        name: string;  //接口名
        platform: string; //接口所属平台
        time: number;   //接口调用时间
        wholesaleId: number;//批次ID
        count: number; //调用次数
    }
}
//@end=YDHW
