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
rewrite(console, 'info');
rewrite(console, 'warn');
rewrite(console, 'error');

/**
 * 初始化banner
 * @param {String} posId 
 */
var initBanner = function (posId) {
    var control = {};
    var change = false;     // 切换状态完成
    var isShow = false;     // 当前是否显示
    var lastT = 0;
    var banner = qg.createBannerAd({ posId: posId, adUnitId: posId });  // 两个参数是兼容处理
    // 更新
    var update = function () {
        if (!change) {
            // console.log('update change');
            change = true;
            isShow ? banner.show() : banner.hide();
        }
    };
    // 显示
    control.show = function () {
        // console.log('banner show', change);
        isShow = true;
        update();
    };
    // 隐藏
    control.hide = function () {
        // console.log('banner hide', change);
        isShow = false;
        update();
    };
    // 销毁
    control.destroy = function () {
        banner.destroy();
    };
    // 是否显示
    getset(control, 'isShow', { get: function () { return isShow } });
    // 报错机制
    banner.onError(function (err) {
        console.log('banner onError', err);
        // 1秒后认为onShow、onHide没有正常执行
        setTimeout(function () {
            change = false;
        }, 1000);
    });
    // 重写显示监听
    banner.onShow(function () {
        // console.log('banner onShow');
        if (isShow) {
            change = false;
        }
        else {
            // 延迟修改状态，防止修改频繁报错
            setTimeout(function () {
                change = false;
                // 如果当前状态还是隐藏则隐藏
                isShow || update();
            }, 500);
        }
    });
    // 重写隐藏监听
    banner.onHide(function () {
        // console.log('banner onHide');
        if (isShow) {
            // 延迟修改状态，防止修改频繁报错
            setTimeout(function () {
                change = false;
                // 如果当前状态还是显示则显示
                isShow && update();
            }, 500);
        }
        else {
            change = false;
        }
    });
    return control;
};

/**
 * Oppo工具类，最低平台版本1040
 * 首包的体积限制是8MB，超过8MB的资源需要在进入游戏后进行下载
 */
window.platform = new ((function () {

    function QGPlatform() {
        /*****平台配置******************************************** */
        this.platType = 4001;
        this.appId = '30225241';
        this.pkgName = 'ydhw.thyq.nearme.gamecenter';
        this.version = "1.0.3";
        this.hasVideo = true;
        // 视频ID列表
        this.adUnitIds = [
            '144369'
        ];
        this.banners = [
            "144373"
        ];
        /************************************************* */
        qg.setEnableDebug({ enableDebug: false });   // 启动调试，正式时不需要

        this.nativeInfo = null; //原生广告信息

        this.initAd();
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
                let uData = res.data, data = {};
                if (uData) {
                    data.code = 0;
                    data.wxcode = uData.token;
                }
                else {
                    data.code = -1;
                }
                console.log('登陆信息', data);
                call && call(data);
                // call && call({code: 0, wxcode: 'qqq'});
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
    _proto.onShare = function () {
    }

    /**
     * 创建底部banner，oppo单例版
     * @param {String} posId 标识
     * @param {Function} call 显示回调
     */
    _proto.createBannerAd = function (posId, call) {
        var self = this;
        var banner = self.banner;
        if (banner) {
            banner.show();
        }
        else {
            // 兼容处理
            banner = self.banner = initBanner(posId);
            banner.show();
            // 每隔40秒刷新
            setInterval(function () {
                banner.isShow && banner.show();
            }, 40000);
        }
    }

    /**
     * 设置banner显示或隐藏
     * @param {Boolean} bool 
     */
    _proto.setBannerVisible = function (bool) {
        var self = this;
        var banner = self.banner;
        if (banner) {
            bool ? banner.show() : banner.hide();
        }
    }

    /**
     * 刷新banner
     * @param adUnitId 刷新ID，不传则随机
     */
    _proto.refreshBanner = function (adUnitId) {
        var banner = this.banner;
        banner && banner.show();
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
            videoAd = self.videoAd = qg.createRewardedVideoAd({ adUnitId: adUnitId });
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
                    }
                    else {
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
            console.log("createInsertAd", err)
            // test
            // if (err.code == 20003) {
            //     setTimeout(function () { 
            //         self.createInsertAd(call);
            //     }, 2000);
            // }
        };
        var posId = '146069'//'144371';
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
        }
        else
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
        var self = this;
        qg.installShortcut({
            success: function (res) {
                if (call) {
                    // 延缓获取
                    setTimeout(function () {
                        self.hasShortcut(call)
                    }, 500);
                }
            },
            fail: function (res) {
                call && call();
            }
        });
    }

    /**
     * 创建NativeAd
     * @param {Function} call 显示回调
     */
    _proto.createNativeAd = function (call) {
        var self = this;
        var excute = function (nativeAd, info) {
            call && call(nativeAd, info);
        };
        var info = self.nativeInfo;
        if (info) {
            excute(info);
        }
        else {
            let nativeId = self.nativeId;
            if (nativeId) {
                nativeAd = qg.createNativeAd({ adUnitId: nativeId });
                if (nativeAd) {
                    nativeAd.load();
                    nativeAd.onLoad(function (res) {
                        console.log('原生广告加载', res.adList)
                        info = self.nativeInfo = res.adList;
                        excute(nativeAd, info);
                    });
                    nativeAd.onError(function (err) {
                        console.log("原生广告 err", err);
                        excute();
                    });
                }
            }
            else {
                excute();
            }
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

    return QGPlatform;
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