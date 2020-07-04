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
 * Oppo工具类，最低平台版本1040
 * 首包的体积限制是8MB，超过8MB的资源需要在进入游戏后进行下载
 */
window.platform = new((function () {

    function QGPlatform() {
        /*****平台配置******************************************** */
        this.platType = 4001;
        this.appId = '30296337';
        this.pkgName = 'ydhw.cjfxcj.nearme.gamecenter';
        this.version = "1.0.1";
        this.hasVideo = true;
        // 视频ID列表
        this.adUnitIds = [
            '192118'
        ];
        this.banners = [
            "192114"
        ];
        /************************************************* */
        qg.setEnableDebug({
            enableDebug: false
        }); // 启动调试，正式时不需要

        this.nativeInfo = null; //原生广告信息

        this.initAd();
        // 原生：147925
        // 视频：148164
        // 开屏：148163
        // 插屏：148162
        // banner：148161
    }

    var _proto = QGPlatform.prototype;

    /**
     * 登录
     * @param {Function} call
     */
    _proto.login = function (call) {
        let self = this
        qg.login({
            success(res) {
                let uData = res.data,
                    data = {};
                if (uData) {
                    data.code = 0;
                    data.wxcode = uData.token;
                } else {
                    data.code = -1;
                }
                console.log('登陆信息', data);
                call && call(data);
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

    /**
     * 获取胶囊位置
     */
    _proto.getMenuButtonBoundingClientRect = qg.getMenuButtonBoundingClientRect


    _proto.initAd = function () {
        var appId = this.appId;
        //登陆成功后初始化广告
        qg.initAdService({
            appId: appId,
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
     * 创建底部banner，oppo单例版
     * @param {String} posId 标识
     * @param {Function} call 显示回调
     */
    _proto.createBannerAd = function (posId, call) {
        var self = this;
        // banner创建过于频繁会报错，因此需要加上延迟
        var banner = self.banner;
        if (banner) {
            self.showBanner = true;
        } else {
            // 兼容处理
            banner = self.banner = qg.createBannerAd({
                posId: posId,
                adUnitId: posId
            });
            if (banner) {
                var error = function (err) {
                        let code = err.code;
                        console.log('banner err', err);
                        // 刷新过于频繁
                        if (code === 20000 || code === 20003) {
                            // 状态切位需要显示
                            // self.showBanner = true;
                            // lastState = false;
                            lastState = !self.showBanner;
                        }
                        // 异常报错
                        else {
                            self.banner = null;
                            clearInterval(interval);
                        }
                    },
                    lastState = false,
                    start = Date.now(),
                    curState, interval;
                self.showBanner = true;
                call && banner.onShow(call);
                banner.onError(error);
                banner.show();
                // 定时器刷新banner状态
                interval = setInterval(function () {
                    curTime = Date.now();
                    curState = self.showBanner;
                    if (lastState !== curState) {
                        start = curTime; // 重置时间
                        lastState = curState;
                        self.setBannerVisible(curState);
                        console.info("banner state change", curState);
                    } else {
                        // 每40秒刷新banner
                        if (curTime - start >= 40000) {
                            start = curTime;
                            curState && banner.show();
                            // console.info("每40秒刷新banner");
                        }
                    }
                }, 1000);
            }
        }
    }

    /**
     * 设置banner显示或隐藏
     * @param {Boolean} bool 
     */
    _proto.setBannerVisible = function (bool) {
        var self = this;
        var banner = self.banner;
        console.log('setBannerVisible', bool);
        if (banner) {
            self.showBanner = bool;
            bool ? banner.show() : banner.hide();
            // console.info("cur banner state:",bool);
        }
    }

    /**
     * 刷新banner
     * @param adUnitId 刷新ID，不传则随机
     */
    _proto.refreshBanner = function (adUnitId) {
        var self = this;
        if (self.$banVisible) {
            self._lastBannerTime = 0;
            self.banner.show();
        }
    }

    /**
     * 视频
     * @param {Number} type 类型，oppo仅一种
     * @param {*} _callback 
     */
    _proto.createRewardedVideoAd = function (type, _callback) {
        var self = this;
        var adUnitId = self.adUnitIds[0];
        if (adUnitId) {
            var videoAd = self.videoAd;
            var call = function (bool) {
                _callback && _callback(bool)
            };
            // 清除旧视频
            if (videoAd) {
                videoAd.destroy()
                self.videoAd = null
            }
            videoAd = self.videoAd = qg.createRewardedVideoAd({
                adUnitId: adUnitId
            });
            if (videoAd) {
                videoAd.load();
                videoAd.onLoad(function () {
                    videoAd.show()
                })
                videoAd.onError(function (err) {
                    console.log("onError err = ", err)
                    call(false)
                })
                videoAd.onClose(function (res) {
                    if (res && res.isEnded) {
                        call(true)
                    } else {
                        call(false)
                    }
                })
            }
        }
    }

    /**
     * 创建插屏广告
     * @param {Function} call 显示回调
     */
    _proto.createInsertAd = function (call) {
        var self = this;
        var banner = self.insertAd;
        if (banner) {
            banner.destroy()
        }
        var error = function (err) {
            console.log("createInsertAd", err);
        };
        var posId = '148162';
        // 兼容处理
        banner = self.insertAd = qg.createInsertAd({
            posId: posId,
            adUnitId: posId
        });
        if (banner) {
            banner.load();
            banner.onLoad(function () {
                console.log("createInsertAd onLoad");
                banner.show();
            });
            banner.onShow(call);
            banner.onError(error);
        } else
            error();
    }


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
     * 跳转其他游戏
     * @param {Object}   dataObj   数据
     */
    _proto.navigateToMiniProgram = function (dataObj) {
        if (dataObj && dataObj.path) {
            qg.navigateToMiniGame({
                pkgName: dataObj.path,
                // pkgName : "ydhw.qwpk2.nearme.gamecenter",
                success: dataObj.success,
                fail: dataObj.fail
            })
        }
    }

    /**
     * 检测是否有安卓桌面图标
     */
    _proto.hasShortcut = function (call) {
        qg.hasShortcutInstalled({
            success: function (res) {
                call && call(res);
            }
        });
    }

    /**
     * 安装桌面图标
     */
    _proto.installShortcut = function (call) {
        qg.installShortcut({
            success: function (res) {
                call && call(res);
            },
            fail: function (res) {
                call();
            }
        });
    }

    /**
     * 创建NativeAd
     * @param {Function} call 显示回调
     */
    _proto.createNativeAd = function (call) {
        let self = this;
        self.nativeAd = qg.createNativeAd({
            adUnitId: '147925'
        });
        if (self.nativeAd) {
            self.nativeAd.load();
            self.nativeAd.onLoad(function (res) {
                console.log('原生广告加载', res.adList)
                self.nativeInfo = res.adList;
                window["NativeMgr"].instance.initNativeInfo(res.adList);
            })
            if (self.nativeInfo) {
                window["NativeMgr"].instance.initNativeInfo(self.nativeInfo); //保留上一次原生广告信息，因为原生广告刷新可能和上一次的信息一样，导致不会进入onload方法
            }
        } else {
            self.nativeAd.onError(function (err) {
                console.log("原生广告 err", err)
            });
        }
    }

    /**
     * 上报原生广告曝光
     */
    _proto.nativeAdShow = function (nativeId) {

        if (this.nativeAd) {
            this.nativeAd.reportAdShow({
                adId: nativeId
            })
            console.log("原生广告 曝光", nativeId)
        }
    }

    /**
     * 上报原生广告点击
     */
    _proto.nativeAdClick = function (nativeId) {
        if (this.nativeAd) {
            this.nativeAd.reportAdClick({
                adId: nativeId
            })
            console.log("原生广告 点击", nativeId)
        }
    }
    /**
     * 进度
     */
    // getset(_proto, 'progress', {
    //     set: function (v) {
    //         qg.setLoadingProgress({ progress: v })
    //     }
    // });

    /**
     * 检测是否添加桌面
     */
    _proto.hasShortcutInstalled = function (_callback, btn) {
        qg.hasShortcutInstalled({
            success: function (res) {
                if (res) {
                    if (btn) {
                        btn.visible = false;
                    }
                } else {
                    if (btn) {
                        btn.visible = true;
                    }
                    _callback && _callback(btn);
                }
            }
        });
    }

    /**
     * 分包加载
     * @param {String} name 包名
     * @param {Function} update 更新函数
     * @returns {Promise<Boolean>}
     */
    _proto.loadSubpackage = function (name, update) {
        var call = qg.loadSubpackage;
        return new Promise(function (resolve) {
            if (call) {
                var task = call({
                    name: name,
                    success: function () {
                        resolve(true);
                    },
                    fail: function () {
                        resolve(false);
                    }
                });
                update && task.onProgressUpdate(function (res) {
                    update(res.progress);
                });
            } else
                resolve(false);
        })
    }

    /**
     * 游戏运行中上报数据，主要监控游戏崩溃等异常, 目前只支持进入到游戏主界面时上报数据。
     * @param {*} name 
     * @param {*} value 
     */
    _proto.reportMonitor = function (name, value) {
        if (this.platformVersion() < 1060) return;
        qg.reportMonitor(name, value)
    }

    /**
     * 平台版本号
     */
    _proto.platformVersion = function () {
        return qg.getSystemInfoSync().platformVersion;
    }

    return QGPlatform;
})());


// // 其它处理

// /**
//  * 参数转字符串
//  * @param {IArguments} array 
//  * @returns {String}
//  */
// var toStr = function (array) {
//     var str = '';
//     if (array.length == 1 && typeof array[0] !== 'object')
//         str += array[0];
//     else
//         str = JSON.stringify(array);
//     return str;
// };

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
// rewrite(console, 'info');
// rewrite(console, 'warn');
// rewrite(console, 'error');