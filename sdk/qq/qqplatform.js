function QQgamePlatform() {

    /*****平台配置******************************************** */
    this.platType = 3001;
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

    qq.onShareAppMessage(function () {
        return {
            title: '炎炎夏日，你确定不来清凉一夏么？',
            imageUrl: 'wxlocal/share1.jpg'
        }
    });
    //右上角menu转发
    qq.showShareMenu({});

    this.isOpenVibration = true;
    this.shareFailCnt = 0;
    this.adUnitId = null;
}

QQgamePlatform.prototype = {
    constructor: QQgamePlatform,
    /**
     * 微信登陆。
     * 获取code。
     */
    login: function (cb) {
        qq.login({
            success: function (res) {
                var data = {};
                if (res.code) {
                    data.code = 0;
                    data.wxcode = res.code;
                } else {
                    console.log('登录失败！' + res.errMsg);
                    data.code = -1;
                    data.msg = res.errMsg;
                }
                cb && cb(data);

            },

            fail: function (res) {
                var data = {};
                data.code = -1;
                data.msg = res.errMsg;
                cb && cb(data);
            },

            complete: function (res) {
                // console.log('wx.login.complete()!')
                // wx.getUserInfo({
                //     openIdList: ["selfOpenId"],
                //     lang:"zh_CN",
                //     success: res => {
                //         console.log("reqOnwerData success res=>", res);
                //     }
                // })
            }
        });
    },

    /**
     * 获取小游戏启动参数
     */
    launchInfo: function () {
        return qq.getLaunchOptionsSync();
    },

    //获取玩家信息
    getUserInfo: function () {
        return new Promise(function (resolve, reject) {
            qq.getUserInfo({
                withCredentials: true,
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
    },

    //加载
    startLoading: function (_callback) {
        var that = this;
        that._loadingCallback = _callback;
    },
    onLoading: function (_percent) {
        var that = this;
        if (that._loadingCallback) {
            that._loadingCallback(_percent);
            return true;
        }
        return false;
    },

    destroyButton: function () {
        if (this.button) {
            this.button.destroy();
            this.button = null;
        }
        if (this.button1) {
            this.button1.destroy();
            this.button1 = null;
        }
        if (this.feedbackBtn) {
            this.feedbackBtn.destroy();
            this.feedbackBtn = null;
        }
    },

    /**
     * 微信授权窗口
     * 透明的按钮，覆盖到某个节点上(通常是开始按钮)。
     * @param rect  覆盖的节点区域
     * @param cb  回调 
     */
    authorize: function (rect, cb) {
        var _this = this;

        qq.getSystemInfo({
            success: function (res) {
                var ratio = res.windowWidth / Laya.stage.designWidth;
                var px = rect.x * ratio;
                var py = rect.y * ratio;
                var button = qq.createUserInfoButton({
                    type: 'text',
                    text: '',
                    style: {
                        left: px,
                        top: py,
                        width: rect.width * ratio,
                        height: rect.height * ratio,
                        lineHeight: 40,
                        //  backgroundColor: '#ff0000',
                        // color: '#ffffff',
                        textAlign: 'center',
                        fontSize: 30,
                        borderRadius: 4,
                        opacity: 0.1
                    },
                });
                if (_this.button) {
                    _this.button1 = button;
                } else {
                    _this.button = button;
                }

                // button.show();
                button.onTap(function (res) {
                    console.log("授权信息：res = " + JSON.stringify(res));
                    if (res.userInfo) {
                        //授权成功返回头像和名字, 保存到AppConfig.ts
                        var userData = {};
                        userData.name = res.userInfo.nickName;
                        userData.url = res.userInfo.avatarUrl;
                        console.log(' 用户授权成功：' + 'userInfo.nickName = ' + userData.name + '\t' + 'userInfo.avatarUrl = ' + userData.url);
                        cb && cb(true, userData);
                    } else {
                        console.log('微信返回的userInfo 为空 ！');
                        cb && cb(false);
                    }
                    //  button.destroy();
                });
            }

        })
    },

    /**
     *  是否授权获取用户信息
     */
    isAuthorize: function (cb) {
        qq.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    cb && cb(true);
                } else {
                    cb && cb(false);
                }
            }
        });
    },

    hideAuthenticLoginBtn: function () {
        if (this.authenticLoginBtn) {
            this.authenticLoginBtn.hide();
        }
    },

    //投诉建议按钮
    createFeedbackButton: function (_btnVect) {
        var _this = this;
        var systemInfo = qq.getSystemInfoSync();
        var pRatio = systemInfo.windowWidth / 750.0;
        if (qq.createFeedbackButton == null) return;
        var button = qq.createFeedbackButton({
            type: 'image',
            image: 'wxlocal/feedback.png', //打开意见反馈页面
            style: {
                left: _btnVect.x * pRatio,
                top: _btnVect.y * pRatio,
                width: _btnVect.width * pRatio,
                height: _btnVect.height * pRatio,
                lineHeight: 40,
                // backgroundColor: '#ff0000',
                // color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4,
                opacity: 1
            }
        });

        _this.feedbackBtn = button;
    },

    setFeedbackButtonVisible: function (visible) {
        if (!this.feedbackBtn) return;
        if (visible)
            this.feedbackBtn.show();
        else
            this.feedbackBtn.hide();
    },

    //亮屏
    onShow: function (_callback) {
        qq.onShow(function (_param) {
            if (_callback) {
                _callback(_param);
            }
        })
    },
    //黑屏
    onHide: function (_callback) {
        qq.onHide(function (_param) {
            if (_callback) {
                _callback(_param);
            }
        })
    },

    //取两个数之间的随机数
    GetRandomNum: function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    },

    //分享
    onShare: function (_data) {
        var that = this;
        if (that._isSharing) {
            return
        }
        that._isSharing = true;
        setTimeout(function () {
            that._isSharing = false;
        }, 350)

        // 群分享设置withShareTicket:true 
        if (_data.isGroupShare) {
            qq.updateShareMenu({
                withShareTicket: true
            });
        } else {
            qq.updateShareMenu({
                withShareTicket: false
            });
        }

        //转格式：key1=val1&key2=val2 的格式
        var strQuery = '';
        if (typeof _data.query == 'object') {
            var propertys = Object.getOwnPropertyNames(_data.query);
            console.log('propertys = ' + JSON.stringify(propertys));
            for (var i = 0; i < propertys.length; i++) {
                strQuery += (propertys[i] + '=' + _data.query[propertys[i]]);
                if (i + 1 < propertys.length) {
                    strQuery += '&';
                }
            }
            // console.log('分享的query = ' + strQuery);
        }

        //返回立刻回调
        var shareFun = _data.success;
        var shareFailFun = _data.fail;
        var nowTime = (new Date()).getTime();
        that.shareFailTimes = 0;
        that.isShareHide = true;
        that.shareCallback = function (_param) {
            if (that.isShareHide == false) {
                return;
            }
            that.isShareHide = false;

            setTimeout(function () {
                if (that._isShareCancel && _data.forceShare) {
                    qq.showModal({
                        title: '提示',
                        content: '获取失败，换换其他的好友试试吧',
                        cancelText: '知道了',
                        confirmText: '重新获取',
                        success: function (res) {
                            if (res.confirm) {
                                that.onShare(_data);
                            } else if (res.cancel) {
                                // shareFailFun && shareFailFun("换换其他的好友们试试吧！");
                            }
                        }
                    })
                    return;
                }
                // var diffTime = (new Date()).getTime() - nowTime;
                // // 3秒以内 20%成功率 3秒以上90%成功率
                // var randSucceed = 0.9;
                // if (diffTime < 3000) {
                //   randSucceed = 0.2;
                // }
                // var randNum = Math.random();
                // if (randNum < randSucceed) {
                //   console.log("分享成功！", diffTime, randSucceed, randNum);
                //   shareFun && shareFun(_param);
                // } else {
                //   console.log("分享失败！", diffTime, randSucceed, randNum);
                //   var shareHint = "换换其他好友试试吧";
                //   if (Math.random() < 0.5) {
                //     shareHint = "今天这些好友已经帮助过你了哦";
                //   }
                //   shareFailFun && shareFailFun(shareHint);
                // }
                var diffTime = (new Date()).getTime() - nowTime;
                console.log("_data.shareCnt", _data.shareCnt, "diffTime", diffTime);
                if (_data.shareCnt == 1) {
                    //第一次分享永远失败，提示“通讯失败”；
                    shareFailFun && shareFailFun("通讯失败");
                } else if (_data.shareCnt == 2) {
                    //第二次分享超过5秒算成功，如5秒内，提示“请分享给不同的好友”；
                    if (diffTime < 5000) {
                        shareFailFun && shareFailFun("请分享给不同的群");
                    } else {
                        shareFun && shareFun(_param);
                    }
                } else {
                    //第三次分享超过3秒算成功，如3秒内，提示“请不要骚扰同一个好友”
                    if (diffTime < 3000) {
                        shareFailFun && shareFailFun("请不要骚扰同一个好友");
                    } else {
                        shareFun && shareFun(_param);
                    }
                }
                shareFun = null;
                shareFailFun = null;
            }, 100);
            that.shareCallback = null;
        }
        qq.onShow(function () {
            that.shareCallback && that.shareCallback();
        });

        setTimeout(function () {
            that._isShareCancel = false;
            qq.shareAppMessage({
                title: _data.title,
                imageUrl: _data.imageUrl,
                query: strQuery, //"必须是 key1=val1&key2=val2 的格式"
                success: function (res) {},
                fail: function (res) {
                    _data.fail && _data.fail(res)
                },
                complete: function (res) {
                    that._isSharing = true;
                    setTimeout(function () {
                        that._isSharing = false;
                    }, 350)
                },
                cancel: function (res) {
                    that._isShareCancel = true;
                }
            })
        }, 1)
    },

    isSharing: function () {
        return this._isSharing;
    },

    //跳转小程序
    navigateToMiniProgram: function (_data) {
        if (qq.navigateToMiniProgram) {
            qq.navigateToMiniProgram(_data);
        }
    },

    //banner广告
    createBannerAd: function (_adUnitId, _finishCallback) {
        if (qq.createBannerAd == null) {
            return null;
        }

        // if (_adUnitId == this.adUnitId) {
        //   this.setBannerVisible(true);
        //   return;
        // }

        this.closeBannerAd();

        //   var o = Math.floor;
        //   var sysInfo = qq.getSystemInfoSync();
        //   var top;
        //   var r;
        //   var n;
        //   var h = 100;
        //   var bannerAd;
        //   var r = o(1 * sysInfo.windowWidth), n = o((sysInfo.windowWidth - r) / 2), d = sysInfo.screenHeight;
        //   var top = d - o(r / 3.4) - (d - r / 0.5625) / 2;
        //   var scale = sysInfo.windowHeight / sysInfo.windowWidth;
        //   if (scale > 1.8) {
        // console.log('我创建了啊！11111');
        //       //宽铺满
        //       bannerAd = qq.createBannerAd({
        //           adUnitId: _adUnitId,
        //           style: {
        //               left: n,
        //               top: top,
        //               width: r
        //           }
        //       });
        //   }
        //   else {
        //       //宽缩小
        // console.log('我创建了啊！2222222');
        //       var width = sysInfo.windowWidth * 0.85;
        // console.log('我的宽是width = ' + width);
        //       bannerAd = qq.createBannerAd({
        //           adUnitId: _adUnitId,
        //           style: {
        //               left: 0,
        //               top: 0,
        //               width: width
        //           }
        //       });
        //   }
        var o = Math.floor;
        var sysInfo = qq.getSystemInfoSync();

        var r = o(1 * sysInfo.windowWidth),
            n = o((sysInfo.windowWidth - r) / 2),
            d = sysInfo.screenHeight;
        var top = d - o(r / 3.4) - (d - r / 0.5625) / 2 + 10;

        var bannerAd = qq.createBannerAd({
            adUnitId: _adUnitId,
            style: {
                left: n,
                top: top,
                width: r
            }
        });
        bannerAd.onResize(function (e) {
            console.log('我被重新绘制了');
            // if (scale < 2) {
            //     top = sysInfo.windowHeight - e.height;
            // }
            // else {
            //     top = sysInfo.windowHeight - e.height - 32;
            // }
            // if (bannerAd) {
            //     bannerAd.style.top = top;
            //     bannerAd.style.left = (sysInfo.windowWidth - bannerAd.style.realWidth) * 0.5;
            // }
            // bannerAd.hide();
            // window["EventMgr"].instance.event("refreshBanner");
            bannerAd.show().then(() => {
                console.log("show ok");
            }).catch(res => {
                console.log("show error", res);
            });
        });

        bannerAd.onError(function (res) {
            console.log("createBannerAd err", res);
        });
        //bannerAd.show();
        bannerAd.onLoad(function () {
            console.log('banner 广告加载成功', bannerAd.style);
            _finishCallback && _finishCallback();
        });

        this.bannerAd = bannerAd;
        this.adUnitId = _adUnitId;
        return bannerAd;
    },

    closeBannerAd: function () {
        if (!this.bannerAd) return;
        this.bannerAd.destroy();
        this.bannerAd = null;
        this.adUnitId = null;
    },

    setBannerVisible: function (visible) {
        if (!this.bannerAd) return;
        if (visible) {
            this.bannerAd.show();
        } else {
            this.bannerAd.hide();
        }
    },

    //视频广告 preload 是否预加载，预加载不播放视频
    createRewardedVideoAd: function (_adUnitId, _callback, preload) {

        var videoAd = qq.createRewardedVideoAd({
            adUnitId: _adUnitId
        });
        if (videoAd) {
            if (preload) {
                videoAd.onLoad(function (res) {
                    _callback && _callback(res);
                });
                return videoAd;
            }

            var closeCallback = function (res) {
                // 用户点击了关闭广告按钮
                if (res && res.isEnded) {
                    // 正常播放结束，可以下发游戏奖励
                    _callback && _callback(true);
                } else {
                    // 播放中途退出，不下发游戏奖励
                    _callback && _callback(false);
                }
                videoAd.offClose(closeCallback);
            }

            videoAd.onClose(closeCallback);

            videoAd.onError(function (res) {
                console.log("fetch video error:" + res.errMsg);
                _callback && _callback(false, true);
            });

            videoAd.load().then(function () {
                videoAd.show();
            });
        }
        return videoAd;
    },
    //短震动
    vibrateShort: function () {
        if (qq.vibrateShort == null || this.isOpenVibration == false) return;
        qq.vibrateShort({
            success: function () {
                // console.log("vibrateShort success");
            },
            fail: function () {
                console.log("vibrateShort fail");
            },
            complete: function () {
                // console.log("vibrate complete");
            }
        });
    },
    //长震动
    vibrateLong: function () {
        if (qq.vibrateLong == null || this.isOpenVibration == false) return;
        qq.vibrateLong({});
    },

    //客服
    openCustomerServiceConversation: function (_param) {
        if (qq.openCustomerServiceConversation == null) return;
        qq.openCustomerServiceConversation(_param);
    },

    //开放数据
    setUserCloudStorage: function (_kvDataList) {
        qq.setUserCloudStorage({
            KVDataList: _kvDataList,
            success: function (src) {
                console.log("setUserCloudStorage success", src)
            },
            fail: function (src) {
                console.log("setUserCloudStorage fail", src)
            }
        })
    },
    getOpenDataContext: function () {
        if (qq.getOpenDataContext) {
            return qq.getOpenDataContext();
        } else {
            return null;
        }
    },
    postMessage: function (_data) {
        qq.postMessage(_data);
    },

    getSystemInfoSync: function () {
        return qq.getSystemInfoSync();
    },

    //编码（名字表情）
    encode: function (_txt) {
        return escape(_txt);
    },
    //解码（名字表情）
    decode: function (_txt) {
        return unescape(_txt);
    }
};

window.platform = new QQgamePlatform();