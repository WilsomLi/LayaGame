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
    function TTPlatform() {
        let shareFunc = tt.onShareAppMessage;
        shareFunc(() => ({
            title: '冰淇淋大师',
            imageUrl: 'wxlocal/share1.jpg'
        }));

        //右上角menu转发
        tt.showShareMenu({});
        this.isOpenVibration = true; // 是否打开震动
        this.isShowBanner = true; // 是否能显示banner

        this.recorderFlag = "ready"
        this.shareRecorderUrl = ""

        this.timerIns = -1

        this.initId()
    }

    var _proto = TTPlatform.prototype;

    _proto.initId = function () {
        /*****平台配置******************************************** */
        this.platType = 6001;
        this.appId = "tt4c243a99d30e56dc";
        this.version = "1.0.0";
        this.isRelease = true; //是否发布版本
        this.hasVideo = true;
        // 视频ID列表：1延长60秒、2提示、3体力、4离线宝箱
        this.adUnitIds = [
            'bj6eeh13bbkii4t1ao'
        ];
        this.banners = [
            "17qcru3c8v81053jkh"
        ];
        /************************************************* */
    }

    /**
     * 登录
     * @param {Function} call
     */
    _proto.login = function (call) {
        let self = this
        tt.login({
            force: false,
            success(res) {
                console.log('tt.login success', res);
                let uData = res,
                    data = {};
                if (uData) {
                    data.code = 0;
                    data.wxcode = uData.code;
                    data.anonymousCode = uData.anonymousCode;
                    data.isLogin = uData.isLogin;
                } else {
                    data.code = -1;
                }
                call && call(data);
            },

            fail(res) {
                console.log('tt.login fail', res);
                let data = {};
                data.code = -1;
                call && call(data);
            },

            complete(res) {
                console.log('tt.login complete', res);
            }
        });
    }

    //微信音乐暂停回来
    _proto.onAudioEnd = function (call) {
        wx.onAudioInterruptionEnd(function (_param) {
            _callback && _callback(_param);
        });
    }



    //加载
    _proto.startLoading = function (_callback) {
        let that = this;
        that._loadingCallback = _callback;
    }

    _proto.onLoading = function (_percent) {
        let that = this;
        if (that._loadingCallback) {
            that._loadingCallback(_percent);
            return true;
        }
        return false;
    }




    //检查用户当前的 session 状态是否有效
    _proto.checkSession = function (call) {
        tt.checkSession({
            success(res) {
                call(false) //session 没有过期
            },

            fail(res) {
                call(true)
            },
        })
    }

    /**
     * 获取启动参数
     */
    _proto.launchInfo = tt.getLaunchOptionsSync

    /**
     * 跳转小程序
     */
    _proto.navigateToMiniProgram = tt.navigateToMiniProgram

    /**
     * extraData     也有额外参数
     * @param {*} data  
     */
    _proto.navigateBackMiniProgram = function (data) {
        let callback = data.success
        data.success = function (res) {
            if (successCallback && typeof (successCallback) == "function") {
                successCallback(true);
            }
        }

        data.fail = function (res) {
            if (successCallback && typeof (successCallback) == "function") {
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
    _proto.createBannerAd = function (adUnitId, finishCallback) {
        if (tt.createBannerAd == null) {
            return null;
        }
        var self = this;
        var info = tt.getSystemInfoSync();
        var windowWidth = info.windowWidth, windowHeight = info.windowHeight;
        var targetBannerAdWidth = 208;
        this.closeBannerAd();
        // 创建一个居于屏幕底部正中的广告
        var bannerAd = tt.createBannerAd({
            adUnitId: adUnitId,
            style: {
                width: targetBannerAdWidth,
                top: windowHeight - (targetBannerAdWidth / 16 * 9), // 根据系统约定尺寸计算出广告高度
                left: (windowWidth - targetBannerAdWidth) / 2
            },
        });

        // 尺寸调整时会触发回调
        // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！
        bannerAd.onResize(function (size) {
            var style = bannerAd.style;
            style.left = (windowWidth - size.width) / 2;
            style.top = windowHeight - size.height;
        });

        bannerAd.onLoad(() => {
            bannerAd.show().then(() => {
                finishCallback && finishCallback();
            }).catch(err => {
                console.log('广告组件出现问题', err);
            })
        });
        self.bannerAd = bannerAd;
        // 40秒刷新
        clearTimeout(self.$timeout);
        self.$timeout = setTimeout(function () {
            self.$banVisible && self.setBannerVisible(true);
        }, 40000);
        return bannerAd;
    }

    /**
     * 关闭banner
     */
    _proto.closeBannerAd = function () {
        var self = this;
        var bannerAd = self.bannerAd;
        if (bannerAd) {
            bannerAd.destroy();
            self.$banVisible = false;
            self.bannerAd = null;
            clearTimeout(self.$timeout);
        }
    }

    /**
     * 设置是banner状态
     * @param {Boolean} visible 
     */
    _proto.setBannerVisible = function (visible) {
        var self = this;
        var bannerAd = self.bannerAd;
        if (bannerAd) {
            self.$banVisible = visible;
            visible ? bannerAd.show() : bannerAd.hide();
        }
    }

    /**
	 * 创建激励视频
	 * @param type 视频类型
	 * @param finishCall 结束回调
     * @param load 加载回调
	 * @param preload 预加载不显示
	 */
    _proto.createRewardedVideoAd = function (type, finishCall, load) {
        var self = this;
        var createCall = tt.createRewardedVideoAd;
        if (createCall) {
            var adUnitIds = self.adUnitIds;
            var adUnitId = adUnitIds[type] || randInArr(adUnitIds);
            if (adUnitId) {
                var videoAd = createCall({ adUnitId: adUnitId });
                if (videoAd) {
					/**
					 * 结束回调
					 * @param {*} res 
					 */
                    var onClose = function (res) {
                        if (!isClear) {
                            var bool = !!(res && res.isEnded);  // 用户点击了关闭广告按钮
                            finishCall && finishCall(bool);
                            clear();
                        }
                    };
					/**
					 * 错误回调
					 * @param {*} res 
					 */
                    var onError = function (res) {
                        if (!isClear) {
                            var code = res && res.errCode || 1;
                            console.log("video error code:", code, res);
                            self.hasVideo = false;
                            finishCall && finishCall(false, code);
                            // 等待并恢复
                            setTimeout(function () {
                                self.hasVideo = true;
                            }, 10000);
                            clear();
                        }
                    };
					/**
					 * 清理回调
					 */
                    var clear = function () {
                        isClear = true;
                        videoAd.offClose(onClose);
                        videoAd.offError(onError);
                    };
					/**
					 * 是否已清理
					 */
                    var isClear = false;
                    videoAd.onClose(onClose);
                    videoAd.onError(onError);
                    // 加载完自动播放
                    videoAd.load().then(function () {
                        load && load();
                        videoAd.show();
                    }).catch(onError);
                }
                return videoAd;
            }
            else {
                finishCall && finishCall(true);
            }
        }
        else
            self.hasVideo = false;
    }


    /**
     * 授权    暂时只请求授权信息
     * @param {*} call 
     */
    _proto.authorize = function (call) {
        console.log("authorize==========111")

        function p() {
            return new Promise(function (resolve, reject) {
                tt.getSetting({
                    success: function (res) {
                        if (res && res.userInfo) {
                            console.log("has authorize")
                            call && call(true) //已经授权过了
                        } else {
                            resolve()
                        }
                    },
                    fail: function () {
                        console.log("authorize  fail")
                        call && call(false)
                    },
                })
            })
        }
        // let p_setting = 


        p().then(function () {
            tt.authorize({
                scope: 'userInfo', //用户信息，还有其他信息参考文档
                success() {
                    console.log("begin authorize")
                    call && call(true)
                },

                fail() {
                    call && call(false)
                }
            })
        })
    }

    /**
     * 小游戏返回前台
     * @param {Function} call 
     */
    _proto.onShow = function (call) {
        typeof call === 'function' && tt.onShow(call);
    }

    /**
     * 小游戏隐藏到后台
     * @param {Function} call 
     */
    _proto.onHide = function (call) {
        typeof call === 'function' && tt.onHide(call);
    }

    /**
     * 分享
     */
    _proto.onShare = function (data) {
        if (!data)
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
    _proto.vibrateShort = tt.vibrateShort

    /**
     * 常振动
     */
    _proto.vibrateLong = tt.vibrateLong

    /**
     * 获取设备信息
     */
    _proto.getSystemInfoSync = tt.getSystemInfoSync


    //退出头条
    _proto.exitMiniProgram = function (call) {
        var data = {};
        if (call) {
            data.success = function () {
                call(true)
            };
            data.fail = function () {
                call(false)
            };
        }
        tt.exitMiniProgram(data);
    }

    _proto.showLoading = function (title, call) {
        tt.showLoading({
            title: title,
            success() {
                call && call(true)
            },
            fail() {
                call && call(false)
            }
        })
    }

    _proto.hideLoading = function () {
        tt.hideLoading({
            success() { },
            fail() { }
        })
    }


    _proto.createVideo = function () {
        //todo
    }

    _proto.videoHide = function () {
        //todo
    }

    /**
     * 录屏状态
     */
    _proto.getRecordFlag = function () {
        return this.recorderFlag
    }

    _proto.startRecorder = function (call) {
        if (this.timerIns > -1) {
            clearTimeout(this.timerIns)
            this.timerIns = -1
        }

        if (this.recorderFlag === "ready") {
            this.shareRecorderUrl = ""
            const recorder = tt.getGameRecorderManager();
            recorder.onStart(res => {
                console.log('录屏开始');
                call && call("begin")
                this.recorderFlag = "recording"

                this.timerIns = setTimeout(() => {
                    this.timerIns = -1
                }, 3200)
            })

            recorder.onStop(res => {
                console.log('录屏结束');
                console.log(res.videoPath)
                call && call("end")
                this.recorderFlag = "ready"

                if (this.timerIns == -1) {
                    this.shareRecorderUrl = res.videoPath
                } else {
                    tt.showToast({
                        title: "录屏时间太短",
                        duration: 2000,
                        icon: "none"
                    })
                }
            })

            recorder.onPause(res => {
                this.recorderFlag = "pasue"
            })

            recorder.onResume(res => {
                this.recorderFlag = "recording"
            })

            recorder.onError(res => {
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


    _proto.stopRecorder = function () {
        if (this.recorderFlag != "ready") {
            console.log("stopRecorder =======================================")
            const recorder = tt.getGameRecorderManager();
            recorder.stop()
        }
    }


    _proto.pasueRecorder = function () {
        if (this.recorderFlag === "recording") {
            console.log("pasueRecorder =======================================")
            const recorder = tt.getGameRecorderManager();
            recorder.pause()
        }
    }

    _proto.resumeRecorder = function () {
        if (this.recorderFlag === "pasue") {
            console.log("resumeRecorder =======================================")
            const recorder = tt.getGameRecorderManager();
            recorder.resume()
        }
    }

    _proto.shareRecorderVideo = function (call, title = "", topic = "", imageUrl = "", query = "") {
        var url = this.shareRecorderUrl; // 采用影流第三方
        console.log(`shareRecorderVideo =============================== ` + url);
        if (url) {
            tt.shareAppMessage({
                channel: 'video', //转发内容类型
                title: title, //转发标题，不传则默认使用后台配置或当前小游戏的名称。
                imageUrl: imageUrl, //转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径，显示图片长宽比推荐 5:4
                query: query,
                extra: {
                    videoPath: url, // 可用录屏得到的视频地址
                    videoTopics: [topic]
                }, //附加信息
                success() {
                    console.log('分享视频成功');
                    call && call(true)
                    tt.showToast({
                        title: "分享视频成功",
                        duration: 2000,
                        icon: "none"
                    })
                },
                fail(e) {
                    call && call(false)
                    tt.showToast({
                        title: "分享视频失败",
                        duration: 2000,
                        icon: "none"
                    })
                    console.log('分享视频失败');
                }
            })
        }
    }

    /**
     * 获取玩家信息
     */
    _proto.getUserInfo = function (call) {
        let p = new Promise((resolve, reject) => {
            tt.getUserInfo({
                withCredentials: false, //是否需要返回敏感数据
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

        p().then(function (res) {
            console.log("getUserInfo res ==== ", res)
            call && call(res)
        })
    }

    //是否支持录屏
    _proto.isPlatformSupportRecord = function () {
        return true
    }

    //是否支持卖量
    _proto.isGeneralize = function () {
        return false
    }

    //是否仅仅只有视频 没有分享
    _proto.isOnlyVideo = function () {
        return true
    }

    _proto.showMoreGamesModal = function () {
        var systemInfo = tt.getSystemInfoSync();
        // iOS 不支持，建议先检测再使用
        if (systemInfo.platform !== "ios") {
            // 打开互跳弹窗
            tt.showMoreGamesModal({
                appLaunchOptions: [
                    {
                        appId: "tt8d5dfbe01277803a",
                    }
                ]/* ,
                success(res) {
                    console.log("success", res.errMsg);
                },
                fail(res) {
                    console.log("fail", res.errMsg);
                } */
            });
        }
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

// /**
//  * 重写console方法
//  * @param {*} obj 
//  * @param {String} attr 
//  */
// var rewrite = function (obj, attr) {
//     var func = obj[attr];
//     obj[attr] = function () {
//         func.call(obj, toStr(arguments));
//     };
// };
// rewrite(console, 'log');
// rewrite(console, 'warn');
// rewrite(console, 'error');