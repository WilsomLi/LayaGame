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

/**
 * Vivo工具类，最低平台版本1040
 * 发布rpk包最大体积限制为4M
 */
window.platform = new((function () {
    function VVPlatform() {
        /*****平台配置******************************************** */
        this.platType = 5001;
        this.appId = "wxf07987d7a3f6538e";
        this.version = "1.3.1";
        this.isRelease = true; //是否发布版本
        this.hasVideo = true;
        // 视频ID列表：1延长60秒、2提示、3体力、4离线宝箱
        this.adUnitIds = [
            'adunit-afe38169f410439e',
            'adunit-b4741e219db92aac',
            'adunit-611a2225335787d4',
            'adunit-d50a21f513ce7eff'
        ];
        this.banners = [
            "adunit-6fe28b64c05f9c61",
            "adunit-93288e7fa7b6d9ee",
            "adunit-44fd1e8c18fa6b31",
            "adunit-a56d47bb7980b988",
            "adunit-5f27930cc65cffb0",
            "adunit-36b657e0a91a2feb"
        ];
        /************************************************* */

        //qg.setEnableDebug({ enableDebug: false });   // 启动调试，正式时不需要
        this.isOpenVibration = true; // 是否打开震动
        this.isShowBanner = true; // 是否能显示banner
        this.banner = null;
        this.isCloseVideoAd = false; //是否已经关闭了视频
        // this.initAd();

        // this.progress = 0;
    }
    var _proto = VVPlatform.prototype;

    /**
     * 登录
     * @param {Function} call
     */
    _proto.login = function (call) {
        let self = this;
        qg.authorize({
            type: "code",
            success: function (data) {
                //qg.showToast({
                //  message: "handling success, code: " + data.code
                //})
                data.code = 0;
                call && call({
                    code: 0,
                    wxcode: 'qqq'
                });
            },
            fail: function (data, code) {
                // qg.showToast({
                //   message: "handling fail, fail code: " + code
                //})
                data.code = -1;
                call && call({
                    code: 0,
                    wxcode: 'qqq'
                });
            }
        })
        /* qg.login({
             success(res) {
                 let uData = res.data, data = {};
                 if (uData) {
                     data.code = 0;
                     data.wxcode = uData.token;
                 }
                 else {
                     data.code = -1;
                 }
                 // call && call(data);
                 call && call( { code: 0, wxcode: 'qqq' });
                
                 console.log("login success  initAd")
             },
             fail(res) {
                 let data = {};
                 data.code = -1;
                 // data.msg = res.errMsg;
                 call && call(data);
             },
             complete(res) {
                 console.log('complete', res);
             }
         });*/
    }

    _proto.initAd = function () {
        //登陆成功后初始化广告

        console.log("initAd===================================")
        qg.initAdService({
            appId: "30140667",
            isDebug: true,
            success: function (res) {
                console.log("initAdService success");
            },
            fail: function (res) {
                console.log("initAdService fail:" + res.code + res.msg);
            },
            complete: function (res) {
                console.log("initAdService complete");
            }
        })
    }

    /**
     * 获取启动参数
     */
    _proto.launchInfo = qg.getLaunchOptionsSync

    /**
     * 小游戏返回前台
     * @param {Function} call 
     */
    _proto.onShow = function (call) {
        typeof call === 'function' && qg.onShow(call);
    }

    /**
     * 小游戏隐藏到后台
     * @param {Function} call 
     */
    _proto.onHide = function (call) {
        typeof call === 'function' && qg.onHide(call);
    }

    /**
     * 分享，*不支持
     */
    _proto.onShare = function () {}

    /**
     * 小程序跳转，*待定
     */
    _proto.navigateToMiniProgram = function () {}

    _proto.createBannerAd = function (bannerId, call) {
        console.log("createBannerAd  11");
        var self = this;
        if (self.isShowBanner) {
            console.log("createBannerAd  33");
            var banner = self.banner;
            var error = function (err) {
                console.log("createBannerAd  44 = ", err);
                // self.isShowBanner = false;
            };

            banner && banner.destroy();
            banner = self.banner = qg.createBannerAd({
                posId: bannerId,
                style: {}
            });
            if (banner) {
                console.log("createBannerAd  55");
                // banner.onLoad(call);
                banner.onLoad(function () {
                    console.log('Banner onLoad success');
                    banner.show();
                })
                banner.onError(error);
            } else
                error();
        }
    }

    /**
     * 设置banner显示或隐藏
     * @param {Boolean} bool 
     */
    _proto.setBannerVisible = function (bool) {
        console.log("vivo setBannerVisible bool = ", bool);
        var banner = this.banner;
        banner && (bool ? banner.show() : banner.hide());
    }



    /**
     * 视频
     * @param {*} _adUnitId string 视频广告位标识，需在 OPPO 联盟后台申请
     * @param {*} _callback 
     */
    _proto.createRewardedVideoAd = function (_adUnitId, _callback) {
        let self = this;
        console.log("_proto createRewardedVideoAd 2=====================", _adUnitId)
        if (this.videoAd) {
            this.videoAd.load(() => {
                console.log("激励视频广告加载成功");
                self.videoAd.show(() => {
                    console.log(" videoAd.show success");
                })
            })

            this.videoAd.onError(function (err) {
                console.log("onError err = ", err);
                _callback && _callback(false);
                self.videoAd.offError();
                self.videoAd.offClose();
            })

            this.videoAd.onClose(function (res) {
                self.videoAd.offClose();
                self.videoAd.offError();
                console.log("this.isCloseVideoAd = ", self.isCloseVideoAd);
                if (self.isCloseVideoAd) {
                    return;
                }
                //  self.isCloseVideoAd = true;
                if (res && res.isEnded) {
                    console.log("success play video")
                    console.log("_callback==================video=======================>", _callback);
                    // let event = window.EventMgr;
                    //event && event.instance.event("Task_Video");
                    _callback && _callback(true);
                } else {
                    _callback && _callback(false);
                    console.warn("fail play video")
                }
                //videoAd.offClose();
            })
            // this.videoAd.destroy()
            //this.videoAd = null
            return;
        }

        var videoAd = this.videoAd = qg.createRewardedVideoAd({
            posId: _adUnitId
        })


        if (videoAd) {
            console.log("videoAd init success ");
            //this.isCloseVideoAd = false;
            console.log("createRewardedVideoAd isCloseVideoAd = ", this.isCloseVideoAd = false);
            videoAd.load().then(() => {
                console.log("videoAd.load success");
            }).catch(err => {
                console.log("videoAd.load fail = ", err);
            });

            videoAd.onLoad(() => {
                console.log("videoAd.onLoad");
                self.videoAd.show().then(() => {
                    console.log(" videoAd.show success");
                }).catch(err => {
                    console.log("videoAd.show fail = ", err);
                });
            });




            /*videoAd.load()
            videoAd.onLoad(function(){
                console.log("onLoad success ")
                videoAd.show()
            })*/

            videoAd.onError(function (err) {
                console.log("onError err = ", err);
                _callback && _callback(false);
                self.videoAd.offError();
                self.videoAd.offClose();
            })

            videoAd.onClose(function (res) {
                console.log("this.isCloseVideoAd = ", self.isCloseVideoAd);
                self.videoAd.offClose();
                self.videoAd.offError();
                if (self.isCloseVideoAd) {
                    return;
                }
                //  self.isCloseVideoAd = true;
                if (res && res.isEnded) {
                    console.log("success play video")
                    console.log("_callback==================video=======================>", _callback);
                    // let event = window.EventMgr;
                    //event && event.instance.event("Task_Video");
                    _callback && _callback(true);
                } else {
                    _callback && _callback(false);
                    console.warn("fail play video")
                }

            });
        }
    }

    /**
     * 创建插屏广告
     * @param {String} posId 标识
     * @param {Function} call 显示回调
     */
    _proto.createInsertAd = function (posId, call) {
        console.log("createInsertAd  11");
        var banner = null;
        var error = function (err) {
            console.log("createInsertAd", err);
            if (banner) {
                banner.destroy();
            }
        };

        banner = qg.createInterstitialAd({
            posId
        });
        if (banner) {
            // banner.load()
            banner.onLoad(function () {
                console.log("onLoad success ");
                banner.show()
            })

            banner.onShow(call);
            banner.onError(error);
        } else
            error();
    }

    /**
     * 设置插屏广告显示或隐藏
     * @param {Boolean} bool 
     */
    // _proto.setInsertAdVisible = function (bool) {
    //     var banner = this.insertAd;
    //     banner && (bool ? banner.show() : banner.hide());
    // }


    /**
     * 短振动
     */
    _proto.vibrateShort = qg.vibrateShort

    /**
     * 常振动
     */
    _proto.vibrateLong = qg.vibrateLong

    /**
     * 获取设备信息
     */
    _proto.getSystemInfoSync = qg.getSystemInfoSync

    /**
     * 进度
     */
    getset(_proto, 'progress', {
        set: function (v) {
            qg.setLoadingProgress({
                progress: v
            })
        }
    });

    /**
     * 跳转其他游戏
     * @param {Object}   dataObj   数据
     */
    _proto.navigateToMiniProgram = function (dataObj) {
        if (dataObj && dataObj.path) {
            qg.navigateToMiniGame({
                pkgName: dataObj.path,
                // pkgName : "ydhw.qwpk2.nearme.gamecenter",
                success: function () {
                    dataObj.success && dataObj.success(true)
                },
                fail: function (res) {
                    console.log("navigateToMiniGame fail res = ", res)
                    dataObj.fail && dataObj.fail()
                }
            })
        }
    }

    return VVPlatform;
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