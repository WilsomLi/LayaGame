
declare namespace wx {
    
    /************************************************************* */
    /*****************          影流SDK           ***************** */
    /************************************************************* */

    /**
     * 初始化SDK
     *
     * @param _callback   
     **/
    export function ylInitSDK(callback: Function): void;
    /**
     * 获取侧边栏列表
     *
     * @param _callback
     *
     *
     * 返回参数说明：
     * 参数                  类型                           说明
     * result            JSON数组            侧边栏数据，详细数据见下
     *  |
     *  result:
     *         参数              类型          说明
     *         _id             Integer     项目id
     *         type            Integer     该项目类型，0表示小程序，1表示图片
     *         title           String      标题
     *         icon            String      图标url
     *         toAppid         String      跳转小程序appid  (type=0时)
     *         toAppid         String      跳转小程序appid  (type=0时)
     *         toUrl           String      跳转小程序path  (type=0时)
     *         shieldIos       Integer     是否屏蔽ios，0不屏蔽，1屏蔽  (type=0时)
     *         bannerImage     String      仿banner图片
     *         rectangleImage  String      长方形图片
     *         frameImage      String      合成帧图(可用于做动态卖量图的帧资源)
     *         frame           Integer     帧数
     *         showImage       String      图片url  (type=1时)
     */
    export function ylSideBox(callback: Function): void;

    /**
     * 获取积分墙列表
     *
     * @param _callback
     *
     *
     * 参数返回说明:         
     *  参数名称       参数类型      说明     
     *  result  JSON数组    积分墙数据，详细数据见下 
     *   |
     *  result: 
     *       参数          类型          说明
     *       _id         Integer     项目id，前端按此值从小到大排序
     *       awardStatus String      奖励状态，1表示可领取，0表示已领取
     *       title       String      标题
     *       awardList   JSON数组     奖励数据，具体见下
     *       playTime    Integer     试玩多久得到奖励，单位秒
     *       type        Integer     0表示小程序
     *       icon        String      图标url
     *       desc        String      该项目的描述信息
     *       toAppid     String      跳转小程序appid(type=0时)
     *       toUrl       String      跳转小程序path(type=0时)
     *       shieldIos   Integer     是否屏蔽ios，0不屏蔽，1屏蔽(type=0时)
     *
     *       awardLis:
     *           参数      类型      说明
     *           type    String  奖励类型[gold:金币,diamond:钻石,spirit:体力,coupon:券] 
     *           value   String  奖励具体数值
     */
    export function ylIntegralWall(callback: Function): void;

    /**
     * 领取积分墙奖励
     * @param _id 积分墙ID
     * @param _callback
     *
     *  响应结果
     *   参数名称             参数类型               说明   
     *   award               JSON数组          奖励数据，具体见下
     *    |
     *   award:    对象         类型          说明
     *             type        String      奖励类型
     *             value       String      奖励具体数值
     *
    **/
    export function ylGetBoardAward(_id: any, callback: Function): void;
    /**
     * 结果统计
     * @param detail 用户该局游戏的技能及分数统计详情（每个游戏需要统计的数据不同)
     *               例如，泡泡龙大师：{"total_score": 123 , "rebirth_score": 123, "strategy": "1", "change_score": [123, 123...],"hammer_score": [123, 123, ...]}
     *               total_score 用户在游戏中一句的中分数
     *               rebirth_score 用户在一句中使用复活时的分数
     *               strategy 当前使用的策略，比如："1"
     *               change_score 换一换功能每一次使用时获得的分数
     *               hammer_score 使用锤子功能每一次使用时获得的分数
     * @param _callback
     *
     */
    export function ylStatisticResult(_detail: any, callback: Function): void;
    /**
     * 视频统计(打点统计）
     * @param _type 类型[0:显示视频,1:播放完成]
     * @param _adId 视频广告ID
     * @param _callback
     *
     */
    export function ylStatisticViedo(_type: any, _adId: any, callback: Function): void;
    /**
     * 获取分享图列表
     * @param scene 获取分享图的场景，该值需要与策划在后台管理系统配置的值保持一致
     * @param _callback
     *
     *
     * 返回参数说明:
     * 参数                   类型                  说明
     * result     JSON数组             分享卡片数据，详细数据见下
     *  |
     *  result:
     *   参数      类型      说明
     *   title   String  分享文案
     *   img     String  图片url
     *   id      Integer 分享卡片id
     */
    export function ylShareCard(callback: Function): void;
    /**
        分享
    **/
    export function ylShareAppMessage(callback: Function): void;
    /**
       分享图统计（打点统计）
     * @param share_card_id 分享图id
    **/
    export function ylStatisticShareCard(share_card_id: any): void;
    /**
     * 视频分享策略
     * @param channel 渠道名
     * @param model   模块名
     * @param callback 回调函数 返回值:[0:无策略,1:分享,2:视频] 
    **/
    export function ylShowShareOrVideo(channel: String, module: String, callback: Function): void;
    /**
     * 事件统计
     * @param        参数         类型          说明 
                    eventName   String         事件名
     *
     */
    export function ylEventCount(eventName: any): void;

    /**
     * 获取游戏自定义配置
     * @param callback
     *
     * 返回参数说明：
     * 参数                类型           说明
     *  result     JSON数组  游戏配置列表，详细数据见下
     *       |
     *       result:
     *           参数      类型          说明
     *           _id     Integer     ID
     *           name    String      参数名(尽量用英文，用以前端区分不同功能)
     *           type    String      类型[1:值配置,2:开关配置]
     *           value   String      参数值，type=1时，值为CP后台配置的值，type=2时值为开关状态:["0":关闭，"1":打开]
     *           desc    String      参数描述
     */
    export function ylGetCustom(callback: Function): void;

    /**
    *设置当前场景，方便打点和退出游戏跟踪
    * @param sceneName 场景名称
    *
    **/
    export function ylSetCurScene(sceneName: any): void;
    /**
     * 获取签到列表
     * @param _callback
     * 
     * 返回参数说明：
     * |参数               |类型         |说明
        signconfig        | JSON数组     | 按目前7天一个周期的话，数组里面有7个json格式的值，每个具体值中id表明是第几天，比如1表示第1天，详细数据见下 
            |
            signconfig:
                |参数      |类型         |说明
                id        | Integer      | id表明是第几天，比如1表示第1天 
                state     | String       | 表示状态，"accepted"表示已经领取，"close"表示不可领取，"open"表示可领取 
                award     | JSON数组     | 表示具体是什么奖励，水果的奖励类型是gold（金币）和skin（皮肤），详细数据见下 
                    |
                    award:
                    |参数     |类型         |说明
                    type     | String      | 奖励类型 
                    value    | Integer     | 奖励具体数值 

     * 
     */
    export function ylGetSignData(callback: Function): void;
    /**
     * 领取签到奖励
     * @param _id  第几天，1第1天，2第二天，依此类推
     * @param _callback
     * 
     * 返回参数说明：
     * |参数               |类型         |说明
        ----------        | ----------- | -----------
        id            | Integer      | id表明是第几天，比如1表示第1天
        state    | String      | 表示状态，"accepted"表示已经领取，"close"表示不可领取，"open"表示可领取
        award | JSON数组      | 表示具体是什么奖励，水果的奖励类型是gold（金币）和skin（皮肤），详细数据见下
            |
            award:
              |参数    |类型            |说明
               type    String          奖励类型 
               value   Integer         奖励具体数值 
     * 
     */
    export function ylFetchSign(_id: any, callback: Function): void;

    /**
    * 小游戏跳转
    *
    * @param info   JSON对象 跳转信息
    * 
    *            参数         必选     类型    说明
    *            _id         True    String  item  id
    *            toAppid     True    String  要打开的小程序appId
    *            toUrl       True    String  打开的页面路径
    *            source      True    String  从哪个模块导出的，该字段具体值由调用方自行定义
    *            type        Fase    String  类型(默认为'0')：['0':跳转小游戏,'1':展示图片(用于扫码推广)]
    *            showImage   Fase    String  显示扫码推广图片(type === '1'必传)
    * @param callback
    *
    **/
    export function ylNavigateToMiniProgram(info: any, callback: Function): void;
    /**
     * 获取游戏APPID
    **/
    export function ylGetAppID(): any;
    /**
    * 获取邀请账号
    **/
    export function ylGetInviteAccount(): any;
    /**
    * 获取用户SDK服务器账号信息
    **/
    export function ylGetUserInfo(): any;
    /**
    * 获取开关信息
    **/
    export function ylGetSwitchInfo(): any;
    /**
    * 获取玩家微信账号信息
    **/
    export function ylGetUserWXInfo(): any;
    /**
    * 显示微信获取用户信息的按钮
    **/
    export function ylUserInfoButtonShow(info: any, callback: Function): void;
    /**
    * 隐藏微信获取用户信息的按钮
    **/
    export function ylUserInfoButtonHide(): void;
    /**
    * 创建banner广告(填充屏幕宽度)
    **/
    export function ylBannerAdCreate(show: Boolean): void;
    /**
    * 创建banner广告(小的)
    **/
    export function ylBannerAdCreateSmall(show: Boolean): void;
    /**
    * 显示banner广告
    **/
    export function ylBannerAdShow(): void;
    /**
    * 隐藏 banner广告
    **/
    export function ylBannerAdHide(): void;
    /**
    * 创建视频广告
    **/
    export function ylCreateVideoAd(): void;
    /**
        播放视频广告

        VIDEO_PLAY_FAIL:0    //视频广告-播放失败
        VIDEO_PLAY_FINISH:1  //视频广告-播放完成
        VIDEO_PLAY_CANCEL:2  //视频广告-播放取消
    **/
    export function ylShowVideoAd(callback: Function): void;
    /**
    * 日志输出
    **/
    export function ylLog(logMsg: any, logType: any): void;
    // /**
    // * 获取与微信胶囊按钮对齐的信息
    // **/
    // export function ylGetLeftTopBtnPosition():any;
    /**
    * 创建格子广告
    **/
    export function ylCreateGridAd(info: any): void;
    /**
    * 显示格子广告
    **/
    export function ylShowGridAd(): void;
    /**
    * 隐藏格子广告
    **/
    export function ylHideGridAd(): void;
    /**
    * 创建插屏广告
    **/
    export function ylCreateInterstitialAd(show: Boolean): void;
    /**
    * 显示插屏广告
    **/
    export function ylShowInterstitialAd(): void;
    /**
    * 自定义空间
    * @param info   对象 自定义空间存取参数(具体请查看API文档)
    *           ｜
    *           info:
    *              参数       类型          说明
    *              name      string        空间名称(需与后台配置的一致)
    *              cmd       string        空间操作指令
    *              args      string        操作的值
    *
    *   @param _callback 操作结果返回键听
    *
    *
    *   说明：
    *   name: 由后台配置，该名称决定查找后台配置其对应的类型，
    *         类型有：字符变量、字符数组、字符集合、字符散列、随机数
    *
    *   cmd:  根据name对应的类型，有不的操作指令
    *          字符变量：[
                            get:取值，返回后台配置的默认值或set的值、
                            set:赋值，返回后台是否操作成功 true false
                        ]
    *          字符数组：[
                            all:取值, 返回全部值的数组、
                            get:取值,返回 args 定义下标的值、
                            add:赋值,添加，返回后台是否操作成功 true false、
                            set:赋值,替换 args 为需要赋予的下标和值用逗号"," 分割，例如："2,text"，返回后台是否操作成功 true false、
                            replace:替换， args 为需要赋予的json字符数组、例如："[\"1\",\"2\",\"3\",\"4\",\"5\"]"，返回后台是否操作成功 true false
                            size:取值，返回该数组的值数量、
                            poll:取值，返回该数组的第一个值并从后台删除
                        ]
    *          字符集合：[
                            all：取值，返回全部值的数组
                            exist：取值，args 为需要判断的值，返回该值是否存在 true false
                            add：赋值，args 为需要添加的值，返回后台是否操作成功 true false
                            replace：替换，args 为需要赋予json字符数组，例如： "[\"1\",\"2\",\"3\",\"4\",\"5\"]"，返回后台是否操作成功 true false
                            size：取值操作 value 返回该集合的值数量
                            del：赋值， args 为需要删除的值，返回后台是否操作成功 true false
                        ]
    *          字符散列：[
                            all：取值，返回全部值的散列
                        get：取值，args 为需要获取的键，返回该键对应的值
                        gets：取值，args 为需要获取的键列表用逗号"," 分割 ，例如："key1,key2,key3"，返回全部值的数组
                        values：取值，返回全部值的数组
                        set：赋值，args 为需要赋予的键值用逗号"," 分割 ，例如："key,value"，返回后台是否操作成功 true false
                        replace：替换，args 为需要赋予json字符对象 例如："{\"key1\":\"value1\",\"key2\":\"value2\"}"，返回后台是否操作成功 true false
                        size：取值，返回该散列的值数量
                        del：赋值，args 为需要删除的键，返回后台是否操作成功 true false
                        ]
    *          随机数：无
        args：
    *           字符变量：[
                            get:无
                            set:需要赋予的值
                        ]
    *          字符数组：[
                            all:无
                            get:数组下标
                            add:需要添加的值、
                            set:需要赋予的下标和值用逗号"," 分割，例如："2,text"
                            replace:需要赋予的json字符数组、例如："[\"1\",\"2\",\"3\",\"4\",\"5\"]"
                            size:无
                            poll:无
                        ]
    *          字符集合：[
                            all：无
                            exist：需要判断的值
                            add：需要添加的值
                            replace：需要赋予json字符数组，例如： "[\"1\",\"2\",\"3\",\"4\",\"5\"]"，
                            size：无
                            del：为需要删除的值，
                        ]
    *          字符散列：[
                        all：无
                        get：需要获取的键
                        gets：需要获取的键列表用逗号"," 分割 ，例如："key1,key2,key3"
                        values：无
                        set：需要赋予的键值用逗号"," 分割 ，例如："key,value"
                        replace：需要赋予json字符对象 例如："{\"key1\":\"value1\",\"key2\":\"value2\"}"
                        size：无
                        del：需要删除的键，
                        ]
    *          随机数：无

    *   callback 返回：
    *          字符变量：[
                            get:返回后台配置的默认值或set的值、
                            set:返回后台是否操作成功 true false
                        ]
    *          字符数组：[
                            all:返回全部值的数组、
                            get:返回 args 定义下标的值、
                            add:返回后台是否操作成功 true false、
                            set:返回后台是否操作成功 true false、
                            replace:返回后台是否操作成功 true false
                            size:返回该数组的值数量、
                            poll:返回该数组的第一个值并从后台删除
                        ]
    *          字符集合：[
                            all：返回全部值的数组
                            exist：返回该值是否存在 true false
                            add：返回后台是否操作成功 true false
                            replace：返回后台是否操作成功 true false
                            size：返回该集合的值数量
                            del：返回后台是否操作成功 true false
                        ]
    *          字符散列：[
                            all：返回全部值的散列
                            get：返回该键对应的值
                            gets：返回全部值的数组
                            values：返回全部值的数组
                            set：返回后台是否操作成功 true false
                            replace：返回后台是否操作成功 true false
                            size：返回该散列的值数量
                            del：返回后台是否操作成功 true false
                        ]
    *          随机数：返回同样长度的随机数
    *
    **/
    export function ylStoreValue(info: any, callback: Function): void;
}