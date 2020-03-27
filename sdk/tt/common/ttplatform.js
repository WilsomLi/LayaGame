/**
 * 添加get set 方法
 * @param {*} obj 
 * @param {String} attr 
 * @param {{get:Function, set:Function}} value 
 */
var getset = function (obj, attr, value) {
    Object.defineProperty(obj, attr, {
        get: value.get,
        set: value.set,
        enumerable: false,
        configurable: true
    });
};

window.platform = new ((function () {
    function TTPlatform() 
    {
        let shareFunc = tt.onShareAppMessage;
        shareFunc(() =>  ({
            title: '炎炎夏日，你确定不来清凉一夏么？',
            imageUrl: 'wxlocal/share1.jpg'
        }));
        
        //右上角menu转发
        tt.showShareMenu({});
        this.isOpenVibration = true;    // 是否打开震动
        this.isShowBanner = true;      // 是否能显示banner

        this.recorderFlag = "ready"
        this.shareRecorderUrl = ""

        this.timerIns = -1

        this.initId()
    }

    var _proto = TTPlatform.prototype;

    _proto.initId = function()
    {
         /*****平台配置******************************************** */
        this.AppID = "tt786c0ed1e746e897";
        this.NormalAdunits = [
            "cfleuiehht1f0ns2ji",
            "cfnhf13783p587811b",
            "6kka56q5f6m15o0n8k",
            "42j62hf023b53cnqjc",
            "76bcom814ke34kqmc4",
            "4a6dv5tw17bipjm3nl",
            "2r52m5qjtqt19p9b41",
            "1mo2plfjrvak6npbah",
            "371u47tev0bmmmpb28",
        ];
        this.OtherAdunits = [
            "cfleuiehht1f0ns2ji",
            "cfnhf13783p587811b",
            "6kka56q5f6m15o0n8k",
            "42j62hf023b53cnqjc",
            "76bcom814ke34kqmc4",
            "4a6dv5tw17bipjm3nl",
            "2r52m5qjtqt19p9b41",
            "1mo2plfjrvak6npbah",
            "371u47tev0bmmmpb28",
        ];

        this.VideoAd1 = "2qkpem6bmfi89k5gk5";  //主页-金币获取
        this.VideoAd2 = "2693a824j6b1338dnk";  //离线金币-双倍
        this.VideoAd3 = "16b5d3122c04j8e9fi";  //主页-复活布获取
        this.VideoAd4 = "7817a78l2h8ljcbgk5";  //签到-双倍领取
        this.VideoAd5 = "210dncc318jje3p31p";  //签到-再来一份
        this.VideoAd6 = "3qe1nlalw7r2eacj7h";  //时装-看视频解锁
        this.VideoAd7 = "200ggbe745cd533kbv";  //皮肤试用
        this.VideoAd8 = "2a6l1517liehlqp5fb";  //时装-金币获取
        this.VideoAd9 = "2pjloo72jif4vstapv";  //任务-观看视频
        this.VideoAd10 = "o1ywcjkd555bntn20h"; //转盘-获取抽奖
        this.VideoAd11 = "397mnh7yvm48k6uq0x"; //转盘-双倍领取
        this.VideoAd12 = "j40jjjcbc2f58e7pr2"; //合并-银币获取
        this.VideoAd13 = "418pe7lw6w32fdio0f"; //宝箱-正常打开宝箱
        this.VideoAd14 = "44bsgtt1jb759l39e9"; //宝箱-溢出宝箱打开
        this.VideoAd15 = "89kg8c3i8kcf77h50m"; //复活
        this.VideoAd16 = "1004gombggrb4ba13r"; //失败-三倍结算
        this.VideoAd17 = "43p0lm242a24fjg5a4"; //胜利结算-赢20倍
        this.VideoAd18 = "1j4h8e74fa7523igd5"; //胜利结算-领取多倍
        this.VideoAd19 = "8rrlst0k09c4olqe0r"; //淘汰赛-再次挑战
        /************************************************* */
    }

    /**
     * 登录
     * @param {Function} call
     */
    _proto.login = function (call) {
        let self = this
        tt.login({
            force : false,
            success(res) {
                let uData = res.data, data = {};
                if (uData) {
                    data.code = 0;
                    data.wxcode = uData.code;
                    data.anonymousCode = uData.anonymousCode;
                    data.isLogin = uData.isLogin
                }   
                else {
                    data.code = -1;
                }
            },

            fail(res) {
                let data = {};
                data.code = -1;
                call && call(data);
            },

            complete(res) {
                console.log('complete', res);
            }
        });
    }

    //检查用户当前的 session 状态是否有效
    _proto.checkSession = function(call)
    {
        tt.checkSession({
            success(res) {
                call(false)     //session 没有过期
            },

            fail(res) {
                call(true)
            },
        })
    }

    /**
     * 获取启动参数
     */
    _proto.launchInfo = function()
    {
        tt.getLaunchOptionsSync()
    }

    /**
     * 跳转小程序
     */
    _proto.navigateToMiniProgram = function(data) 
    {
        if (tt.navigateToMiniProgram) 
        {
            let successCallback = data.success;
            data.success = function (res) {
                if (successCallback && typeof (successCallback) == "function") 
                {
                    successCallback(res);
                }
            }

            tt.navigateToMiniProgram(_data);
        }
    }

    /**
     * extraData     也有额外参数
     * @param {*} data  
     */
    _proto.navigateBackMiniProgram = function(data)
    {
        let callback = data.success
        data.success = function (res) {
            if (successCallback && typeof (successCallback) == "function") 
            {
                successCallback(true);
            }
        }

        data.fail = function (res) {
            if (successCallback && typeof (successCallback) == "function") 
            {
                successCallback(false);
            }
        }

        tt.navigateBackMiniProgram(data);
    }



/**
     * 创建底部banner，粗略版
     * @param {String} adUnitId 标识
     * @param {Function} finishCallback 显示回调
     */
    _proto.createBannerAd = function (adUnitId, finishCallback) 
    {
        if (tt.createBannerAd==null) 
        {
            return null;
        }

        if (this.bannerAd) {
            this.bannerAd.destroy();
        }


        const {
            windowWidth,
            windowHeight,
        } = tt.getSystemInfoSync();

        console.log("windowWidth = ", windowWidth)
        console.log("windowHeight = ", windowHeight)

        let self = this
        var targetBannerAdWidth = 208;

        // 创建一个居于屏幕底部正中的广告
        let bannerAd = tt.createBannerAd({
            adUnitId: adUnitId,
            style: {
                width: targetBannerAdWidth,
                top: windowHeight - (targetBannerAdWidth / 16 * 9), // 根据系统约定尺寸计算出广告高度
            },
        });

        // 也可以手动修改属性以调整广告尺寸
        bannerAd.style.left = (windowWidth - targetBannerAdWidth) / 2;

        // 尺寸调整时会触发回调
        // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！
        bannerAd.onResize(size => {
            console.log(size.width, size.height);

            // 如果一开始设置的 banner 宽度超过了系统限制，可以在此处加以调整
            if (targetBannerAdWidth != size.width) {
                targetBannerAdWidth = size.width;
                bannerAd.style.top = windowHeight - (targetBannerAdWidth / 16 * 9);
                bannerAd.style.left = (windowWidth - targetBannerAdWidth) / 2;
            }
        });

        bannerAd.onLoad(() => {
            bannerAd.show().then(()=>{
                    finishCallback && finishCallback();
                }).catch(err => {
                    console.log('广告组件出现问题', err);
                })

                console.log('拉取banner成功！');
                console.log("tt createBannerA4444444")
        });


        this.bannerAd = bannerAd
        return bannerAd
    }

    _proto.closeBannerAd = function() 
    {
        if (!this.bannerAd) return;
        this.bannerAd.destroy();
        this.bannerAd = null;
    }

    _proto.setBannerVisible = function(visible) 
    {
        if (!this.bannerAd) return;

        if (visible) {
            this.bannerAd.show();
        } else {
            this.bannerAd.hide();
        }
    }

    //视频广告 preload 是否预加载，预加载不播放视频
    _proto.createRewardedVideoAd = function(adUnitId, callback) {
        console.log("tt createRewardedVideoAd111")
        if (!tt.createRewardedVideoAd) return;
        console.log("tt createRewardedVideoAd22")
        let onLoad = function()
        {
            console.log('加载成功');
        }

        let onError = function(errCode, errMsg)
        {
            console.log(`createRewardedVideoAd  errCode = ${errCode}, ${errMsg}`)
            callback && callback(false)
        }

        let onClose = function(res)
        {
            if(res && res.isEnded)
            {
                console.log("视频看完了，发放奖励")
                window["TaskAchMgr"].instance.refreshProgress(1, 2, 1);
                callback && callback(true)
            }
            else
            {
                console.log("视频没看完")
                callback && callback(false)
            }
        }

        if(!this.videoAdInfo)
        {
            this.videoAdInfo = {}
            this.videoAdInfo.ins = tt.createRewardedVideoAd({adUnitId: adUnitId})
        }
        else
        {
            this.videoAdInfo.ins.offError(this.videoAdInfo.error)
            this.videoAdInfo.ins.offLoad(this.videoAdInfo.load)
            this.videoAdInfo.ins.offClose(this.videoAdInfo.close)
        }

        this.videoAdInfo.error = onError
        this.videoAdInfo.load = onLoad
        this.videoAdInfo.close = onClose

        let videoAd = this.videoAdInfo.ins;
        if (videoAd) 
        {
            videoAd.show().then(() => {
                console.log('广告显示成功');
            })
            .catch(err => {
                console.log('广告组件出现问题 重新加载一次', err);
                // 可以手动加载一次
                videoAd.load()
                    .then(onLoad);
            });

            videoAd.onError(onError)
            videoAd.onClose(onClose)
        }

        return videoAd;
    }


    /**
     * 授权    暂时只请求授权信息
     * @param {*} call 
     */
    _proto.authorize = function(call)
    {
        console.log("authorize==========111")
        function p()
        {
            return new Promise(function(resolve, reject){
                tt.getSetting({
                    success:function(res){
                        if(res && res.userInfo)
                        {
                            console.log("has authorize")
                            call && call(true)      //已经授权过了
                        }
                        else
                        {
                            resolve()
                        }
                    },
                    fail:function(){
                        console.log("authorize  fail")
                        call && call(false)
                    },
                })
            })
        }
        // let p_setting = 


        p().then(function(){
            tt.authorize({
                scope:'userInfo',              //用户信息，还有其他信息参考文档
                success()
                {
                    console.log("begin authorize")
                    call && call(true)
                },
    
                fail()
                {
                    call && call(false)
                }
            })
        })
    }

    /**
     * 小游戏返回前台
     * @param {Function} call 
     */
    _proto.onShow = function (call) 
    {
        typeof call === 'function' && tt.onShow(call);
    }

    /**
     * 小游戏隐藏到后台
     * @param {Function} call 
     */
    _proto.onHide = function (call)
    {
        typeof call === 'function' && tt.onHide(call);
    }

    /**
     * 分享
     */
    _proto.onShare = function (data) 
    {
        if(!data)
            return 

        tt.shareAppMessage({
            channel: 'article',
            title: data.title,
            imageUrl: data.imageUrl,
            query: data.query,
            success(res) {
                console.log('分享视频成功');
                data.success && data.success()
            },
            fail(e) {
                console.log('分享视频失败', e);
                data.fail && data.fail()
            }
        })
    }


    /**
     * 短振动
     */
    _proto.vibrateShort = function()
    {
        tt.vibrateShort()
    }

    /**
     * 常振动
     */
    _proto.vibrateLong = function()
    {
        tt.vibrateLong()
    }

    /**
     * 获取设备信息
     */
    _proto.getSystemInfoSync = function()
    {
        tt.getSystemInfoSync()
    }


    //退出头条
    _proto.exitMiniProgram = function(call) 
    {
        tt.exitMiniProgram({
            success(){
                call && call(true)
            },
            fail(){
                call && call(false)
            }
        });
    }

    _proto.showLoading = function(title, call) 
    {
        tt.showLoading({
            title: title,
            success(){
                call && call(true)
            },
            fail(){
                call && call(false)
            }
        })
    }

    _proto.hideLoading = function() 
    {
        tt.hideLoading({
            success(){
            },
            fail(){
            }
        })
    }


    _proto.createVideo = function()
    {
        //todo
    }

    _proto.videoHide = function()
    {
        //todo
    }

    /**
     * 录屏状态
     */
    _proto.getRecordFlag = function()
    {
        return this.recorderFlag
    }

    _proto.startRecorder = function(call)
    {
        if(this.timerIns > -1)
        {
            clearTimeout(this.timerIns)
            this.timerIns = -1
        }

        if(this.recorderFlag === "ready")
        {
            this.shareRecorderUrl = ""
            const recorder = tt.getGameRecorderManager();
            recorder.onStart(res =>{
                console.log('录屏开始');
                call && call("begin")
                this.recorderFlag = "recording"

                this.timerIns = setTimeout(()=>{
                    this.timerIns = -1
                }, 3200)
            })

            recorder.onStop(res =>{
                console.log('录屏结束');
                console.log(res.videoPath)
                call && call("end")
                this.recorderFlag = "ready"

                if(this.timerIns == -1)
                {
                    this.shareRecorderUrl = res.videoPath
                }
                else
                {
                    tt.showToast({
                        title:"录屏时间太短",
                        duration:2000,
                        icon:"none"
                    })
                }
            })

            recorder.onPause(res =>{
                this.recorderFlag = "pasue"
            })

            recorder.onResume(res =>{
                this.recorderFlag = "recording"
            })

            recorder.onError(res =>{
                console.log('录屏错误');
                console.log(res.errMsg)

                call && call("error")
                this.recorderFlag = "ready"
            })
              
            recorder.start({
                duration: 100,
            })
        }
    }


    _proto.stopRecorder = function()
    {
        if(this.recorderFlag != "ready")
        {
            console.log("stopRecorder =======================================")
            const recorder = tt.getGameRecorderManager();
            recorder.stop()
        }
    }


    _proto.pasueRecorder = function()
    {
        if(this.recorderFlag === "recording")
        {
            console.log("pasueRecorder =======================================")
            const recorder = tt.getGameRecorderManager();
            recorder.pause()
        }
    }

    _proto.resumeRecorder = function()
    {
        if(this.recorderFlag === "pasue")
        {
            console.log("resumeRecorder =======================================")
            const recorder = tt.getGameRecorderManager();
            recorder.resume()
        }
    }

    _proto.shareRecorderVideo = function(call, title = "", imageUrl = "", query = "")
    {
        console.log(`shareRecorderVideo ===============================  this.shareRecorderUrl  ${this.shareRecorderUrl}`)
        if(this.shareRecorderUrl != "")
        {
            tt.shareAppMessage({
                channel: 'video',
                title: title,
                imageUrl: imageUrl,
                query: query,
                extra: {
                    videoPath: this.shareRecorderUrl, // 可用录屏得到的视频地址
                    videoTopics: [title]
                },
                success() {
                    console.log('分享视频成功');
                    call && call(true)
                    tt.showToast({
                        title:"分享视频成功",
                        duration:2000,
                        icon:"none"
                    })
                },
                fail(e) {
                    call && call(false)
                    tt.showToast({
                        title:"分享视频失败",
                        duration:2000,
                        icon:"none"
                    })
                    console.log('分享视频失败');
                }
            })
        }
    }




    /**
     * 获取玩家信息
    */
   _proto.getUserInfo = function(call)
   {
        let p = new Promise((resolve, reject) => {
            tt.getUserInfo({
                withCredentials: false,                       //是否需要返回敏感数据
                success: function (res) {
                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    var province = userInfo.province
                    var city = userInfo.city
                    var country = userInfo.country
                    resolve(userInfo);
                }
            })
        })

        p().then(function(res){
            console.log("getUserInfo res ==== ", res)
            call && call(res)
        })
    }

    //是否支持录屏
    _proto.isPlatformSupportRecord = function()
    {
        return true
    }

    //是否支持卖量
    _proto.isGeneralize = function()
    {
        return false
    }

    //是否仅仅只有视频 没有分享
    _proto.isOnlyVideo = function()
    {
        return true
    }

    return TTPlatform
})());




// 其它处理

/**
 * 参数转字符串
 * @param {IArguments} array 
 * @returns {String}
 */
var toStr = function (array) {
    var str = '';
    if (array.length == 1 && typeof array[0] !== 'object')
        str += array[0];
    else
        str = JSON.stringify(array);
    return str;
};

/**
 * 重写console方法
 * @param {*} obj 
 * @param {String} attr 
 */
var rewrite = function (obj, attr) {
    var func = obj[attr];
    obj[attr] = function () {
        func.call(obj, toStr(arguments));
    };
};
rewrite(console, 'log');
rewrite(console, 'warn');
rewrite(console, 'error');
