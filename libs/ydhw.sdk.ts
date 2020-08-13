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

        export class OnShareTimelineInfo implements IYDHW.Wechat.IOnShareTimelineInfo {
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

            constructor(imageUrl:string, title?:string, query?:string){
                if(imageUrl) this.imageUrl = imageUrl;
                if(title) this.title = title;
                if(query) this.query = query;
            }
        }

        export class GameRecorderInfo implements IYDHW.Wechat.IGameRecorderInfo{
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

            constructor(fps?:number, duration?:number, bitrate?:number, gop?:number, hookBgm?:boolean){
                if(fps) this.fps = fps;
                if(duration) this.duration = duration;
                if(gop) this.gop = gop;
                if(hookBgm) this.hookBgm = hookBgm;
            }
        }

        /**
         * 创建分享按钮传参
         * 
         * 详情参考官网文档：
         * https://developers.weixin.qq.com/minigame/dev/api/game-recorder/wx.createGameRecorderShareButton.html
         */
        export class GameRecorderBtnInfo implements IYDHW.Wechat.IGameRecorderBtnInfo {
            /**
             * 按钮的样式
             */
            style:IYDHW.Wechat.IGameRecorderBtnStyle;
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
            share:IYDHW.Wechat.IGameRecorderShareInfo;

            constructor(style: IYDHW.Wechat.IGameRecorderBtnStyle, share: IYDHW.Wechat.IGameRecorderShareInfo, icon?: string, image?: string, text?: string){
                if(style) this.style = style;
                if(share) this.share = share;
                if(icon) this.icon = icon;
                if(image) this.image = image;
                if(text) this.text = text;
            }
        }
        export class GameRecorderBtnStyle implements IYDHW.Wechat.IGameRecorderBtnStyle {
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
            constructor(left?:number, top?:number,height?:number,iconMarginRight?:number,fontSize?:number,color?:string,paddingLeft?:number,paddingRight?:number){
                if(left) this.left = left;
                if(top) this.top = top;
                if(height) this.height = height;
                if(iconMarginRight) this.iconMarginRight = iconMarginRight;
                if(fontSize) this.fontSize = fontSize;
                if(color) this.color = color;
                if(paddingLeft) this.paddingLeft = paddingLeft;
                if(paddingRight) this.paddingRight = paddingRight;
            }
        }
        export class GameRecorderShareInfo implements IYDHW.Wechat.IGameRecorderShareInfo {
            /**
             * 分享的对局回放打开后跳转小游戏的 query。
             */
            query:string;
            /**
             * 对局回放的标题。对局回放标题不能随意设置，只能选择预设的文案模版和对应的参数。
             */
            title?:IYDHW.Wechat.IGameRecorderTitle;
            /**
             * 对局回放的按钮。只能选择预设的文案模版
             */
            button?:IYDHW.Wechat.IGameRecorderBotton;
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
            constructor(query:string, bgm:string,title?:IYDHW.Wechat.IGameRecorderTitle,button?:IYDHW.Wechat.IGameRecorderBotton,timeRange?:Array<number>,volume?:number,atempo?:number,audioMix?:boolean){
                if(query) this.query = query;
                if(bgm) this.bgm = bgm;
                if(title) this.title = title;
                if(button) this.button = button;
                if(timeRange) this.timeRange = timeRange;
                if(volume) this.volume = volume;
                if(atempo) this.atempo = atempo;
                if(audioMix) this.audioMix = audioMix;
            }
        }
        export class GameRecorderTitle implements IYDHW.Wechat.IGameRecorderTitle {
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
            data:IYDHW.Wechat.IGameRecorderTitleData;
            constructor(template:string, data:IYDHW.Wechat.IGameRecorderTitleData){
                if(template) this.template = template;
                if(data) this.data = data;
            }
        }
        export class GameRecorderBotton implements IYDHW.Wechat.IGameRecorderBotton {
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
            constructor(template:string){
                if(template) this.template = template;
            }
        }
        /**
         * 该参数根据template选择的模板传对应参数
         */
        export class GameRecorderTitleData implements IYDHW.Wechat.IGameRecorderTitleData {
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

            constructor(score?:number,level?:number,opponent_openid?:string,cost_seconds?:number){
                if(score) this.score = score;
                if(level) this.level = level;
                if(opponent_openid) this.opponent_openid = opponent_openid;
                if(cost_seconds) this.cost_seconds = cost_seconds;
            }
        }
    
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
            inviteType?: IYDHW.QQ.EM_SHARE_APP_TYPE;  //邀请类型,可以通过qq.getLaunchOptionsSync() 或 qq.onShow() 获取启动参数中的 query获取到的参数中拿到from参数的值就是该参数的传值，CP可以通过该参数给玩家发奖。
            shareAppType?: string;           //转发目标类型,不设该属性默认拉起手q通讯录，详见官方文档
            entryDataHash?: string;          //监听用户点击页面内转发按钮的，只有带上该参数，才支持快速分享，详见官方文档
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
        export enum EM_SHARE_APP_TYPE{
            QQ = 'qq',                              //转发到手q通讯录
            QQ_FAST_SHARE = 'qqFastShare',          //快速转发至来源的聊天窗口
            QQ_FAST_SHARE_LIST = 'qqFastShareList', //快速转发列表
            QZONE = 'qzone',                        //转发到空间
            WECHARTFRIENDS = 'wechatFriends',       //转发到微信好友
            WECHATMOMENT = 'wechatMoment',          //转发到微信朋友圈
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

    export class StatistiicShareInfo implements IYDHW.Statistic.IStatistiicShareInfo{
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
        
        constructor(sharecardId?:number,sType?:number,target?:number,real?: number){
            this.sharecardId = sharecardId || -1;
            if(sType != null) this.sType = sType;
            if(target != null) this.target = target;
            this.real = real || 0;
        }
    }

    export class StoreValueRequest implements IYDHW.GameBase.IStoreValueRequest {
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
        /**
         * 
         * @param name 空间名称(后台配置)
         * @param cmd 指令(具体请查看文档)
         * @param args 存贮数据(具体请查看文档)
         */
        constructor(name: string,cmd?: string,args?: string){
            if(name) this.name = name;
            if(cmd) this.cmd = cmd;
            if(args) this.args = args;
        }
    }
    export class EditRequest implements IYDHW.User.IEditRequest {
        nickName: string;
        headimgurl: string;
        gender: number;
        language: string;
        province: string;
        city: string;
        country: string;
        // constructor(nickName: string,headimgurl: string,gender: number,language: string,province: string,city: string,country: string,){
        //     if(nickName) this.nickName = nickName;
        //     if(headimgurl) this.headimgurl = headimgurl;
        //     if(gender) this.gender = gender;
        //     if(province) this.province = province;
        //     if(city) this.city = city;
        //     if(country) this.country = country;
        // }
    }
}
//@end=YDHW
