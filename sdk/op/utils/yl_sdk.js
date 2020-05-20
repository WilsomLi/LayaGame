"use strict";
! function () {
    var y = {
            _SDKversion: "2.1.4",
            ylsdk_pkg_name: "",
            ylsdk_platform_num: "0",
            platform_name: "",
            platform: {},
            domain_online: "https://api.ylxyx.cn/api/collect/v1",
            _AccountId: "",
            login_count: 0,
            accountPass: null,
            user_wx_info: null,
            bannerAd: null,
            videoAd: null,
            recorder: null,
            recorder_status: 0,
            switchInfo: {
                switchTouch: 0,
                switchPush: 0,
                switchLogin: 1,
                switchJump: 1,
                switchShare: 1,
                switchEvent: 1,
                switchLayer: 1,
                switchResult: 1,
                switchVideo: 1
            },
            gameConfig: {
                bannerTimeSpace: {
                    onOff: !1,
                    timeSpace: 15,
                    forceOnOff: !0,
                    forceTimeSpace: 3
                },
                Power: {
                    onOff: !1,
                    defaultPower: 5,
                    powerUpper: 5,
                    recoveryTime: 300,
                    getPower: 1
                },
                VideoUnlockCustoms: {
                    onOff: !1,
                    openCustoms: 5,
                    spaceCustoms: 2
                },
                depthShield: {
                    _type: 0,
                    totalCustoms: 3,
                    goodUserOnOff: !0,
                    watchTvNum: 1,
                    dayCustoms: [3]
                },
                mistouchTimer: {
                    onOff: !1,
                    startTime_h: 9,
                    startTime_m: 30,
                    endTime_h: 23,
                    endTime_m: 59
                },
                toalByTodayNum: 0,
                toalNum: 0,
                watchTvNum: 0,
                maxCustom: 0,
                lastCustom: 0,
                isServerData: !1
            },
            getGameConfig: !1,
            powerRtimer: null,
            userPowerNum: 0,
            banner_time_space: 3,
            switchLog: !1,
            need_statistics_on_show: !0,
            show_video: !1,
            show_share: !1,
            show_banner: !1,
            boxconfig: null,
            boardconfig: null,
            custom: null,
            sharingStrategy: null,
            signConfig: null,
            invite_account: -1,
            loginInfo: null,
            sharecard_config: null,
            sharecard_scene: null,
            is_debug: !1,
            statistics: {
                events: [],
                video: [],
                result: [],
                sharecard: [],
                clickcount: [],
                layer: []
            },
            s_commit_dt: 3e3,
            s_cache_ml: 1e4,
            s_max_post_l: 50,
            s_interval: null,
            layer: null,
            VIDEO_PLAY_FAIL: 0,
            VIDEO_PLAY_FINISH: 1,
            VIDEO_PLAY_CANCEL: 2,
            defaultbTS: 10,
            lifeListen: null
        },
        d = 0,
        a = 1,
        g = 2,
        u = 3,
        f = 4,
        i = 12,
        m = {},
        e = function () {
            try {
                var e = y.platform.getSystemInfoSync();
                m.brand = e.brand, m.model = e.model, m.pixelRatio = e.pixelRatio, m.screenWidth = e.screenWidth, m.screenHeight = e.screenHeight, m.language = e.language, m.COREVersion = e.COREVersion, m.platform = e.osType, m.system = e.system, m.platformVersion = e.platformVersion, console.log("YLSDK getSystemInfoByMEIZU:", JSON.stringify(m))
            } catch (e) {
                console.log("YLSDK exception-meizu:", e)
            }
        },
        o = function () {
            try {
                var e = y.platform.getSystemInfoSync();
                m.brand = e.brand, m.model = e.model, m.screenWidth = e.screenWidth, m.screenHeight = e.screenHeight, m.language = e.language, m.manufacturer = e.manufacturer, m.product = e.product, m.platform = e.osType, m.osVersionName = e.osVersionName, m.osVersionCode = e.osVersionCode, m.platformVersionName = e.platformVersionName, m.platformVersionCode = e.platformVersionCode, m.region = e.region, m.battery = e.battery, m.wifiSignal = e.wifiSignal, console.log("YLSDK getSystemInfoByVIVO:", JSON.stringify(m))
            } catch (e) {
                console.log("YLSDK exception-vivo:", e)
            }
        },
        t = function () {
            try {
                var e = y.platform.getSystemInfoSync();
                m.brand = e.brand, m.model = e.model, m.screenWidth = e.screenWidth, m.screenHeight = e.screenHeight, m.language = e.language, m.pixelRatio = e.pixelRatio, m.windowHeight = e.windowHeight, m.windowWidth = e.windowWidth, m.platform = e.platform, m.system = e.system, m.COREVersion = e.COREVersion, m.platformVersion = e.platformVersion, m.notchHeight = e.notchHeight, console.log("YLSDK getSystemInfoByOPPO:", JSON.stringify(m))
            } catch (e) {
                console.log("YLSDK exception-oppo:", e)
            }
        },
        n = function () {
            try {
                var e = y.platform.getSystemInfoSync();
                m.brand = e.brand, m.model = e.model, m.screenWidth = e.screenWidth, m.screenHeight = e.screenHeight, m.language = e.language, m.pixelRatio = e.pixelRatio, m.windowWidth = e.windowWidth, m.windowHeight = e.windowHeight, m.platform = e.platform, m.system = e.system, m.version = e.version, m.SDKVersion = e.SDKVersion, m.safeArea = e.safeArea, m.statusBarHeight = e.statusBarHeight, m.fontSizeSetting = e.fontSizeSetting, m.benchmarkLevel = e.benchmarkLevel, m.albumAuthorized = e.albumAuthorized, m.cameraAuthorized = e.cameraAuthorized, m.locationAuthorized = e.locationAuthorized, m.microphoneAuthorized = e.microphoneAuthorized, m.notificationAuthorized = e.notificationAuthorized, m.notificationAlertAuthorized = e.notificationAlertAuthorized, m.notificationBadgeAuthorized = e.notificationBadgeAuthorized, m.notificationSoundAuthorized = e.notificationSoundAuthorized, m.bluetoothEnabled = e.bluetoothEnabled, m.locationEnabled = e.locationEnabled, m.wifiEnabled = e.wifiEnabled, console.log("YLSDK getSystemInfoByWX:", JSON.stringify(m))
            } catch (e) {
                console.log("YLSDK exception-wx:", e)
            }
        },
        r = function () {
            try {
                var e = y.platform.getSystemInfoSync();
                m.brand = e.brand, m.model = e.model, m.screenWidth = e.screenWidth, m.screenHeight = e.screenHeight, m.language = e.language, m.pixelRatio = e.pixelRatio, m.windowWidth = e.windowWidth, m.windowHeight = e.windowHeight, m.platform = e.platform, m.system = e.system, m.version = e.version, m.SDKVersion = e.SDKVersion, m.statusBarHeight = e.statusBarHeight, m.fontSizeSetting = e.fontSizeSetting, m.benchmarkLevel = e.benchmarkLevel, m.albumAuthorized = e.albumAuthorized, m.cameraAuthorized = e.cameraAuthorized, m.locationAuthorized = e.locationAuthorized, m.microphoneAuthorized = e.microphoneAuthorized, m.notificationAuthorized = e.notificationAuthorized, m.notificationAlertAuthorized = e.notificationAlertAuthorized, m.notificationBadgeAuthorized = e.notificationBadgeAuthorized, m.notificationSoundAuthorized = e.notificationSoundAuthorized, m.bluetoothEnabled = e.bluetoothEnabled, m.locationEnabled = e.locationEnabled, m.wifiEnabled = e.wifiEnabled, m.navbarPosition = e.navbarPosition, console.log("YLSDK getSystemInfoByQQ:", JSON.stringify(m))
            } catch (e) {
                console.log("YLSDK exception--qq:", e)
            }
        },
        s = function () {
            try {
                var e = y.platform.getSystemInfoSync();
                m.brand = e.brand, m.model = e.model, m.screenWidth = e.screenWidth, m.screenHeight = e.screenHeight, m.pixelRatio = e.pixelRatio, m.windowWidth = e.windowWidth, m.windowHeight = e.windowHeight, m.platform = e.platform, m.system = e.system, m.version = e.version, m.SDKVersion = e.SDKVersion, m.safeArea = e.safeArea, m.appName = e.appName, console.log("YLSDK getSystemInfoByTT:", JSON.stringify(m))
            } catch (e) {
                console.log("YLSDK exception-tt:", e)
            }
        },
        w = window;
    switch ("" == w.ylsdk_app_id && console.error("YLSDK 请在配置文件中填写您的游戏APPID"), "" == w.ylsdk_version && console.error("YLSDK 请在配置文件中填写您的游戏版本号"), y.ylsdk_pkg_name = w.ylsdk_pkg_name || "", y.ylsdk_platform_num = "0", y.ylsdk_platform_num = String(w.ylsdk_platform), y.switchLog = w.ylsdk_debug_model, w.ylsdk_platform) {
        case a:
            qq ? (y.platform = qq, y.platform_name = "QQ", r()) : console.error("YLSDK qq is null");
            break;
        case g:
            window.qg ? (y.platform = window.qg, y.platform_name = "OPPO", t()) : console.error("YLSDK window.qg is null");
            break;
        case u:
            window.qg ? (y.platform = window.qg, y.platform_name = "VIVO", o()) : console.error("YLSDK window.qg is null");
            break;
        case f:
            tt ? (y.platform = tt, y.platform_name = "字节跳动", s()) : console.error("YLSDK tt is null");
            break;
        case i:
            window.qg ? (y.platform = window.qg, y.platform_name = "MEIZU", e()) : console.error("YLSDK window.qg is null");
            break;
        default:
            wx ? (y.ylsdk_platform_num = "0", y.platform_name = "微信", y.platform = wx, n()) : console.error("YLSDK wx is null")
    }

    function c(o) {
        o.url = o.url || "", o.method = o.method || "get", o.data = o.data || "", o.callback = o.callback || "";
        var e = w.ylsdk_platform === g || w.ylsdk_platform === u || w.ylsdk_platform === i;
        e || (o.async = o.async || !0);
        var t = new XMLHttpRequest;
        if (y.switchLog && console.log("YLSDK Request--url:" + o.url + ", menthod:" + o.method + ", data:" + JSON.stringify(o.data)), e ? t.open(o.method, o.url) : t.open(o.method, o.url, o.async), "post" === o.method && t.setRequestHeader("Content-Type", "application/json"), o.needPass) y.accountPass || console.error("YLSDK AccountPass is null !"), t.setRequestHeader("AccountPass", y.accountPass);
        else {
            var n = {
                brand: m.brand || "",
                model: m.model || "",
                platform: m.platform || "",
                version: y._SDKversion
            };
            m.appName && (n.appName = m.appName), n = D.base64_encode(JSON.stringify(n)), t.setRequestHeader("ClientInfo", n)
        }
        t.onerror = function (e) {
            console.error("YLSDK ", e)
        }, t.onabort = function (e) {
            console.exception(e)
        }, t.onprogress = function (e) {}, t.onreadystatechange = function () {
            200 === this.status || console.warn("YLSDK http request status:" + this.status)
        }, t.onload = function () {
            var e = this.responseText;
            o.callback && "function" == typeof o.callback && o.callback(e)
        }, o.data && 0 < o.data.length && y.switchLog && console.log("YLSDK reqType:" + o.method + " url:" + o.url + " data:" + o.data);
        try {
            null == o.data && (o.data = null), e ? t.send(JSON.stringify(o.data)) : t.send(o.data)
        } catch (e) {
            console.exception(o.data)
        }
    }
    console.warn("YLSDK 当前设置平台请确认： ", y.platform_name), w.ylsdk_debug_model && console.warn("YLSDK 是否一直通过平台code(token)登录: ", w.login_by_code), console.warn("YLSDK 日志开关(本地)-", w.ylsdk_debug_model ? "打开" : "关闭"), w.ylsdk_platform !== g && w.ylsdk_platform !== u || "" !== w.ylsdk_pkg_name || console.error("YLSDK 请在配置文件中填写您的包名"), w.ylsdk_app_id = w.ylsdk_app_id.replace(/\s/g, ""), w.ylsdk_version = w.ylsdk_version.replace(/\s/g, "");
    for (var l, h, p = ["ylGetInviteAccount", "ylGetUserInfo", "ylGetSwitchInfo", "ylSetCurScene", "ylLog", "ylStatisticViedo", "ylStatisticResult", "ylStoreValue", "ylGetAppID", "ylInitSDK", "ylEventCount", "ylGetCustom", "ylShowShareOrVideo", "ylChangeView", "ylGetDeepTouch", "ylOverGame", "ylVideoUnlock", "ylGetPowerInfo", "ylOnPowerChange", "ylSetPower", "ylGetPower", "ylGameLifeListen", "ylGetLeftTopBtnPosition", "ylGetUserWXInfo", "ylBannerAdCreate", "ylBannerAdShow", "ylBannerAdHide", "ylCreateVideoAd", "ylShowVideoAd", "ylStatisticShareCard", "ylShareCard", "ylSideBox", "ylIntegralWall", "ylGetBoardAward", "ylGetSignData", "ylFetchSign", "ylShareAppMessage", "ylNavigateToMiniProgram", "ylUserInfoButtonShow", "ylUserInfoButtonHide", "ylBannerAdCreateSmall", "ylBannerAdCreateByStyle", "ylCreateGridAd", "ylShowGridAd", "ylHideGridAd", "ylCreateInterstitialAd", "ylShowInterstitialAd", "ylShareByTemplateId", "ylAddColorSign", "ylSaveAppToDesktop", "ylSubscribeAppMsg", "ylCreateAddFriendButton", "ylShowAddFriendButton", "ylHideAddFriendButton", "ylDestroyAddFriendButton", "ylCreateAppBox", "ylShowAppBox", "ylShareImage", "ylShareVideo", "ylShareToken", "ylShareTemplate", "ylShowMoreGamesModal", "ylcreateMoreGamesButton", "ylGetRecorderStatus", "ylGetVideoPath", "ylRecorderStart", "ylRecorderStop", "ylPause", "ylResume", "ylGetUserTTinfo", "ylNavigateToMiniGame", "ylNativeAdCreate", "ylNativeAdClick", "ylNativeAdShow", "ylGetUserMZinfo"], _ = {
            ylInitSDK: function (e) {
                y.accountPass = D.getAccountPass(), console.log("YLSDK 初始化SDK-accountPass:", y.accountPass), L.initOnShow(), L.initOnHide(), L.initOnError(), v.login(e)
            },
            ylSideBox: function (e) {
                v.SideBox(e)
            },
            ylIntegralWall: function (e) {
                v.IntegralWall(e)
            },
            ylGetBoardAward: function (e, t) {
                e ? c({
                    method: "post",
                    url: y.domain_online + "/gamebase/getboardaward",
                    needPass: !0,
                    data: {
                        module: "scoreboard",
                        awardId: e
                    },
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--getboardaward:", o.code, e), 0 != o.code && 9002 === (o = !1).code && L.loginPlatform(), t && t(o.result.award)
                    }
                }) : console.error("请传领取奖励的积分墙ID")
            },
            ylStatisticResult: function (e, o) {
                var t = {
                    detail: e
                };
                v.statisticResult(t, o)
            },
            ylStatisticViedo: function (e, o, t) {
                var n = {
                    scene: y.layer || "default",
                    adId: o,
                    type: e
                };
                v.statisticViedo(n, t)
            },
            ylShareCard: function (t, n) {
                y.sharecard_config || (y.sharecard_config = new Map), y.switchLog && console.log("YLSDK ylShareCard-scene,layer", n, y.layer), y.share_scene = n || y.layer, y.share_scene ? y.sharecard_config.has(y.share_scene) ? t && t(!0) : c({
                    method: "post",
                    url: y.domain_online + "/gamebase/sharecard",
                    needPass: !0,
                    data: {
                        scene: y.share_scene
                    },
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--sharecard:", o.code, e), 0 == o.code ? (o.result && 0 < o.result.length && (y.sharecard_config.set(y.share_scene, o.result), L.initShareMenu()), t && (y.sharecard_config.has(y.share_scene) ? t(y.sharecard_config.get(y.share_scene)) : t(!1))) : v.sharecardFinal(t, n)
                    }
                }) : y.switchLog && console.error("YLSDK ylShareCard-缺少场景值")
            },
            ylShareAppMessage: function (e, o) {
                var t = null;
                if (y.share_scene = o || y.layer, y.switchLog && console.log("YLSDK ylShareAppMessage-scene,layer", o, y.layer), y.share_scene) {
                    if (y.sharecard_config && y.sharecard_config.has(y.share_scene) ? t = y.sharecard_config.get(y.share_scene) : y.switchLog && console.warn("YLSDK 当前场景没有分享图,请配置"), t && 0 < t.length) {
                        _.ylEventCount("Click-Share");
                        var n = t[Math.floor(Math.random() * t.length)],
                            a = "account_id=" + D.getAccountId() + "&sharecard_id=" + n.id + "&from=stage_invite";
                        y.platform ? (y.platform.shareAppMessage({
                            title: n.title,
                            imageUrl: n.img,
                            query: a
                        }), y.show_share = !0, y.shareCallBack = e, y.onShare = {
                            shareId: n.id,
                            showTime: (new Date).getTime()
                        }, _.ylStatisticShareCard(n.id), _.ylEventCount("share")) : console.error("YLSDK ylShareAppMessage sdk_data.platform is ", y.platform)
                    }
                } else y.switchLog && console.error("YLSDK ylShareAppMessage-缺少场景值")
            },
            ylStatisticShareCard: function (e) {
                var o = {
                    sharecardId: e
                };
                v.statisticShareCard(o)
            },
            ylStoreValue: function (n, a) {
                c({
                    method: "post",
                    url: y.domain_online + "/gamebase/store/value",
                    needPass: !0,
                    data: n,
                    callback: function (e) {
                        var o = JSON.parse(e),
                            t = n.name + (n.cmd ? "-" + n.cmd : "");
                        D.res_log("Response--store/value--" + t + ":", o.code, e), 9002 === o.code && L.loginPlatform(), 0 == o.code && o.result ? a && a(o.result) : a && a(!1)
                    }
                })
            },
            ylShowShareOrVideo: function (a, i, r) {
                if (a)
                    if (i)
                        if (y.moduleList && 0 < y.moduleList.length) {
                            var s = !1;
                            y.moduleList.forEach(function (e) {
                                if (e.channel == a && e.module == i && e && e.logicJson) {
                                    s = !0;
                                    var o = e.logicJson;
                                    if (o.pe && 0 < o.pe.length) {
                                        var t = e.logicJson.pe.shift();
                                        1 == t ? (y.switchLog && console.log("YLSDK 分享", JSON.stringify(o)), r && r(t)) : (y.switchLog && console.log("YLSDK 视频", JSON.stringify(o)), r && r(2))
                                    } else if (o.loop && 0 < o.loop.length && o.time && 0 < o.time) {
                                        var n = o.loop[e.loopIndex];
                                        e.loopIndex += 1, e.loopIndex >= o.loop.length && (e.loopIndex = 0, --e.logicJson.time), 1 == n ? (y.switchLog && console.log("YLSDK 2-分享", JSON.stringify(o)), r && r(n)) : (y.switchLog && console.log("YLSDK 2-视频", JSON.stringify(o)), r && r(2))
                                    } else y.switchLog && console.error("YLSDK 策略已经用完了"), r && r(0)
                                }
                            }), s || (r && r(0), y.switchLog && console.error("YLSDK 没有视频分享策略1"))
                        } else r && r(0), y.switchLog && console.error("YLSDK 没有视频分享策略2");
                else console.error("YLSDK ylShowShareOrVideo--module is null");
                else console.error("YLSDK ylShowShareOrVideo--channel is null")
            },
            ylEventCount: function (e) {
                if (0 !== y.switchInfo.switchEvent) {
                    var o = y.layer ? y.layer : "default";
                    y.statistics.events.push({
                        event: e,
                        scene: o,
                        time: (new Date).getTime()
                    })
                } else y.switchLog && console.warn("YLSDK 停用事件统计接口！")
            },
            ylGetCustom: function (t) {
                y.custom ? t && t(y.custom) : c({
                    method: "get",
                    url: y.domain_online + "/gamebase/customconfig",
                    needPass: !0,
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--customconfig:", o.code, e), 0 == o.code ? (o.result && 0 < o.result.length && (y.custom = o.result, o.result.forEach(function (e) {
                            "sharing_strategy" == e.name && e.value && "" != e.value && (y.sharingStrategy = e, y.sharingStrategy.value = JSON.parse(e.value), y.sharingStrategy.strategy_id = 0, y.sharingStrategy.time_id = 0, y.sharingStrategy.count = 0, y.switchLog && console.log("YLSDK sharing_strategy:", y.sharingStrategy)), "banner_time_space" == e.name && e.value && "" != e.value && (y.banner_time_space = Number(e.value), y.switchLog && console.log("YLSDK banner_time_space:", y.banner_time_space))
                        })), t && t(o.result)) : v.customconfigFinal(t)
                    }
                })
            },
            ylSetCurScene: function (e) {
                y.layer = e, y.switchLog && console.log("---ylSetCurScene-sceneName:", y.layer)
            },
            ylGetSignData: function (e) {
                v.GetSignData(e)
            },
            ylFetchSign: function (e, t) {
                c({
                    method: "get",
                    url: y.domain_online + "/fetchsign",
                    needPass: !0,
                    data: {
                        appid: w.ylsdk_app_id,
                        account_id: y._AccountId,
                        module: "sign",
                        id: e
                    },
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--fetchsign:", o.code, e), 9002 === o.code && L.loginPlatform(), t && t(e)
                    }
                })
            },
            ylNavigateToMiniProgram: function (e, o) {
                if (e._id) {
                    e.type || (e.type = "0");
                    var t = y.layer ? y.layer : "default",
                        n = t + "_" + e.source;
                    if (y.platform) {
                        if ("" + e.type == "0") {
                            if (!e.toAppid) return void console.error("YLSDK toAppid is null !");
                            y.platform.navigateToMiniProgram({
                                appId: e.toAppid,
                                path: e.toUrl || "",
                                extraData: {
                                    appid: w.ylsdk_app_id
                                },
                                success: function () {
                                    y.switchLog && console.log("YLSDK 小游戏跳转-跳转成功！"), v.ClickOut(e._id, e.toAppid, t, !0), D.removeItemFrom(e.toAppid), o && o(!0)
                                },
                                fail: function () {
                                    y.switchLog && console.log("YLSDK 小游戏跳转-跳转失败！"), v.ClickOut(e._id, e.toAppid, t, !1), o && o(!1)
                                }
                            })
                        } else e.showImage || console.error("YLSDK showImage is null !"), v.ClickOut(e._id, e.toAppid, t, !1), y.platform.previewImage({
                            urls: [e.showImage]
                        });
                        _.ylEventCount(n)
                    } else console.error("YLSDK ylNavigateToMiniProgram sdk_data.platform is ", y.platform)
                } else console.error("YLSDK id is null !")
            },
            ylNavigateToMiniGame: function (e, o) {
                if (e._id) {
                    e.type || (e.type = "0");
                    var t = y.layer ? y.layer : "default",
                        n = t + "_" + e.source;
                    if (y.platform) {
                        if ("" + e.type == "0") {
                            if (!e.toUrl) return void console.error("YLSDK toUrl is null !");
                            var a = {
                                pkgName: e.toUrl,
                                success: function () {
                                    y.switchLog && console.log("YLSDK 小游戏跳转-跳转成功！"), v.ClickOut(e._id, e.toAppid, t, !0), D.removeItemFrom(e.toAppid), o && o(!0)
                                },
                                fail: function () {
                                    y.switchLog && console.log("YLSDK 小游戏跳转-跳转失败！"), v.ClickOut(e._id, e.toAppid, t, !1), o && o(!1)
                                }
                            };
                            e.extraData && (a.extraData = e.extraData), y.platform.navigateToMiniGame(a)
                        } else e.showImage || console.error("YLSDK showImage is null !"), v.ClickOut(e._id, e.toAppid, t, !1), y.platform.previewImage({
                            urls: [e.showImage]
                        });
                        _.ylEventCount(n)
                    } else console.error("YLSDK ylNavigateToMiniGame sdk_data.platform is ", y.platform)
                } else console.error("YLSDK id is null !")
            },
            ylGetAppID: function () {
                return w.ylsdk_app_id
            },
            ylGetInviteAccount: function () {
                return y.invite_account
            },
            ylGetUserInfo: function () {
                return y.loginInfo
            },
            ylGetSwitchInfo: function () {
                return y.switchInfo
            },
            ylGetUserTTinfo: function () {
                return L.getUserPlatFormInfo()
            },
            ylGetUserWXInfo: function () {
                return L.getUserPlatFormInfo()
            },
            ylGetUserMZinfo: function () {
                return L.getUserPlatFormInfo()
            },
            ylUserInfoButtonShow: function (e, o) {
                L.showUserInfoButton(e, o)
            },
            ylUserInfoButtonHide: function () {
                L.hideUserInfoButton()
            },
            ylBannerAdCreate: function (e, o, t) {
                L.createBannerAd(!1, e, o, null, t)
            },
            ylBannerAdCreateSmall: function (e, o, t) {
                L.createBannerAd(!0, e, o, null, t)
            },
            ylBannerAdCreateByStyle: function (e, o, t, n) {
                L.createBannerAd(!1, o, t, e, n)
            },
            ylBannerAdShow: function () {
                L.showBannerAd()
            },
            ylBannerAdHide: function () {
                L.hideBannerAd()
            },
            ylCreateVideoAd: function () {
                L.createVideoAd()
            },
            ylShowVideoAd: function (e, o) {
                L.showVideoAd(e, o)
            },
            ylLog: function (e, o) {
                y.switchLog && ("log" === (o = o || "log") ? console.log(e) : "info" === o ? console.info(e) : "error" === o ? console.error(e) : "warn" === o ? console.warn(e) : "debug" === o && console.debug(e))
            },
            ylGetLeftTopBtnPosition: function () {
                if (y.platform) {
                    var e = y.platform.getMenuButtonBoundingClientRect(),
                        o = cc.director.getWinSize(),
                        t = o.height / m.screenHeight,
                        n = o.width / m.screenWidth,
                        a = e.height * t,
                        i = e.width * n,
                        r = o.height / 2 - (e.top + e.height / 2) * t,
                        s = (m.screenWidth - e.right) * n - o.width / 2;
                    return y.switchLog && console.log("YLSDK ylGetLeftTopBtnPosition-height：" + a + ",width：" + i + ",x：" + s + ",y：" + r), {
                        x: s,
                        y: r,
                        width: i,
                        height: a
                    }
                }
                console.error("YLSDK ylGetLeftTopBtnPosition sdk_data.platform is ", y.platform)
            },
            ylChangeView: function (e) {
                if (y.bannerAd) {
                    if (y.gameConfig && y.gameConfig.bannerTimeSpace && y.gameConfig.bannerTimeSpace.forceOnOff) {
                        var o = y.gameConfig.bannerTimeSpace,
                            t = (new Date).getTime(),
                            n = y.bannerAd.lastTime || t,
                            a = o.forceTimeSpace || y.defaultbTS;
                        if (console.warn("YLSDK ylChangeView-forceTimeSpace:", t - n, " >= ", 1e3 * a), 1e3 * a <= t - n) {
                            var i = !0;
                            if (y.bannerAd.show_banner) {
                                i = y.gameConfig.bannerTimeSpace.isSmall || !1;
                                var r = y.gameConfig.bannerTimeSpace._style || null;
                                L.createBannerAd(i, !0, null, r, e)
                            } else y.bannerAd.lastTime = t - (1e3 * o.timeSpace + 1e3)
                        }
                    }
                } else y.switchLog && console.warn("YLSDK ylChangeView-sdk_data.bannerAd is ", y.bannerAd)
            },
            ylGetDeepTouch: function (e) {
                var o = D.getDeepTouch(e);
                y.switchLog && console.log("YLSDK ylGetDeepTouch:", o, e);
                var t = {
                        deepTouch: o ? "1" : "0"
                    },
                    n = [];
                return y.custom && 0 < y.custom.length && y.custom.forEach(function (e) {
                    2 == parseInt(e.type) && (o || (e.value = "0"), n.push(e))
                }), t.customInfo = n, t
            },
            ylOverGame: function (e) {
                D.addPlayNums(e)
            },
            ylVideoUnlock: function (e) {
                return D.getVideoUnlock(e)
            },
            ylGetPowerInfo: function (o) {
                y.gameConfig.isServerData ? o && o(y.gameConfig.Power) : v.getGameConfig(function (e) {
                    y.switchLog && console.log("YLSDK ylGetPowerInfo--res:", e), o && o(y.gameConfig.Power)
                })
            },
            ylOnPowerChange: function (e) {
                y.powerChangeCB = e
            },
            ylSetPower: function (e) {
                if (y.gameConfig.Power.onOff) {
                    if (y.userPowerNum = e, y.gameConfig && y.gameConfig.Power && y.gameConfig.Power.powerUpper) {
                        var o = y.gameConfig.Power.powerUpper,
                            t = y.gameConfig.Power.recoveryTime;
                        y.userPowerNum = y.userPowerNum > o ? o : y.userPowerNum, y.userPowerNum = y.userPowerNum < 0 ? 0 : y.userPowerNum, y.switchLog && console.log("YLSDK ylSetPower-powerUpper,recoveryTime,userPowerNum,powerRtimer:", o, t, y.userPowerNum, y.powerRtimer), y.userPowerNum < o ? !y.powerRtimer && t && D.powerRecoveryTimer(t) : y.powerRtimer && (clearTimeout(y.powerRtimer), y.powerRtimer = null)
                    }
                } else y.switchLog && console.log("YLSDK ylSetPower--onOff is off")
            },
            ylGetPower: function () {
                return y.userPowerNum
            },
            ylGameLifeListen: function (e) {
                y.lifeListen = e
            },
            ylCreateGridAd: function (e) {
                if (y.platform) {
                    var o = Math.floor(Math.random() * w.ylsdk_grid_ids.length),
                        t = w.ylsdk_grid_ids[o];
                    y.gridAd ? y.gridAd && (y.gridAd.adUnitId = t) : (y.gridAd = y.platform.createGridAd({
                        adUnitId: t,
                        adTheme: e.adTheme,
                        gridCount: e.gridCount,
                        style: e.style
                    }), y.gridAd.onLoad(function () {
                        y.switchLog && console.log("YLSDK GridAd.onLoad")
                    }), y.gridAd.onError(function (e) {
                        y.switchLog && console.warn("YLSDK GridAd.onError:", e, y.gridAd.adUnitId)
                    })), e.show && _.ylShowGridAd()
                } else console.error("YLSDK ylCreateGridAd sdk_data.platform is ", y.platform)
            },
            ylShowGridAd: function () {
                y.gridAd && (y.gridAd.show().catch(function (e) {
                    y.switchLog && console.log("YLSDK GridAd.show")
                }), _.ylEventCount("showGridAd"))
            },
            ylHideGridAd: function () {
                console.log("YLSDK 隐藏格子广告"), y.gridAd && y.gridAd.hide().catch(function (e) {
                    y.switchLog && console.log("YLSDK GridAd.hide")
                })
            },
            ylCreateInterstitialAd: function (e, o) {
                if (console.log("YLSDK ylCreateInterstitialAd-show:", e), y.platform) {
                    var t = Math.floor(Math.random() * w.ylsdk_interstitial_ids.length),
                        n = w.ylsdk_interstitial_ids[t];
                    if (w.ylsdk_platform == i)
                        if (y.interstitialAd) y.interstitialAd && (y.interstitialAd.adUnitId = n);
                        else {
                            if (!qg.createInsertAd) return void console.error("YLSDK qg.createInsertAd function is", qg.createInsertAd);
                            y.interstitialAd = qg.createInsertAd({
                                adUnitId: n
                            })
                        }
                    else {
                        if (!y.platform.createInterstitialAd) return void console.error("YLSDK createInterstitialAd is", y.platform.createInterstitialAd);
                        if (w.ylsdk_platform === u && m.platformVersionCode < 1031) return void(y.switchLog && console.warn("YLSDK VIVO平台版本号" + m.platformVersionCode + "< 1031 无法展示插屏广告"));
                        if (w.ylsdk_platform === f && "TOUTIAO" !== m.appName.toUpperCase()) return void(y.switchLog && console.warn("YLSDK 插屏广告仅今日头条安卓客户端支持"));
                        y.interstitialAd && w.ylsdk_platform === a ? y.interstitialAd && (y.interstitialAd.adUnitId = n) : (w.ylsdk_platform !== d && w.ylsdk_platform !== g && w.ylsdk_platform !== f || (console.warn("YLSDK sdk_data.interstitialAd.destroy"), y.interstitialAd && y.interstitialAd.destroy && y.interstitialAd.destroy()), y.interstitialAd = null, y.interstitialAd = y.platform.createInterstitialAd({
                            adUnitId: n
                        }))
                    }
                    y.interstitialAd.onLoad(function () {
                        w.ylsdk_platform !== f && (e ? _.ylShowInterstitialAd(o) : o && o(1)), y.switchLog && console.log("YLSDK InterstitialAd.onLoad")
                    }), w.ylsdk_platform === u || w.ylsdk_platform === i && m.platformVersion < 1064 || (w.ylsdk_platform === f ? y.interstitialAd.load().then(function () {
                        y.switchLog && console.warn("YLSDK interstitialAd.load success-show:", e), e && y.interstitialAd.show()
                    }).catch(function (e) {
                        y.switchLog && console.warn("YLSDK interstitialAd.load error:", e)
                    }) : y.interstitialAd.load()), y.interstitialAd.onClose(function (e) {
                        o && o(2), y.switchLog && console.log("YLSDK InterstitialAd.onClose")
                    }), y.interstitialAd.onError(function (e) {
                        y.switchLog && console.warn("YLSDK InterstitialAd.onError:", e, y.interstitialAd.adUnitId), o && o(0)
                    })
                } else console.error("YLSDK ylCreateInterstitialAd sdk_data.platform is ", y.platform)
            },
            ylShowInterstitialAd: function (o) {
                if (y.interstitialAd) {
                    if (w.ylsdk_platform === u) {
                        var e = y.interstitialAd.show();
                        e && e.then(function () {
                            o && o(1)
                        }).catch(function (e) {
                            y.switchLog && console.warn("YLSDK InterstitialAd.show - err:", e), o && o(0)
                        })
                    } else y.interstitialAd.show();
                    _.ylEventCount("showInterstitialAd")
                }
            },
            ylShareByTemplateId: function (e, o) {
                if (y.platform) {
                    if (y.switchLog) {
                        if (!e) return void console.error("YLSDK 分享模板信息为空！");
                        if (!e.shareTemplateId) return void console.error("YLSDK 分享模板-shareTemplateId为空！");
                        if (!e.shareTemplateData) return void console.error("YLSDK 分享模板-shareTemplateData为空！");
                        e.shareTemplateData.txt1 || (e.shareTemplateData.txt1 = "赶紧进来，就等你了！", console.error("YLSDK 分享模板-txt1为空！")), e.shareTemplateData.txt2 || (e.shareTemplateData.txt2 = "应邀加入", console.error("YLSDK 分享模板-txt2为空！"))
                    }
                    _.ylEventCount("share"), y.platform.shareAppMessage({
                        shareTemplateId: e.shareTemplateId,
                        shareTemplateData: e.shareTemplateData,
                        success: function () {
                            y.switchLog && console.log("YLSDK 分享(邀请类模板)-成功！"), o && o(!0)
                        },
                        fail: function () {
                            y.switchLog && console.log("YLSDK 分享(邀请类模板)-失败！"), o && o(!1)
                        }
                    }), y.shareCallBack = o
                } else console.error("YLSDK ylShareByTemplateId sdk_data.platform is ", y.platform)
            },
            ylAddColorSign: function (e) {
                y.platform ? y.platform.addColorSign({
                    success: function () {
                        y.switchLog && console.log("YLSDK 添加彩签-成功！"), _.ylEventCount("addColorSign-success"), e && e(!0)
                    },
                    fail: function () {
                        y.switchLog && console.log("YLSDK 添加彩签-失败！"), _.ylEventCount("addColorSign-success"), e && e(!1)
                    }
                }) : console.error("YLSDK ylAddColorSign sdk_data.platform is ", y.platform)
            },
            ylSaveAppToDesktop: function (e) {
                y.platform ? y.platform.saveAppToDesktop({
                    success: function () {
                        y.switchLog && console.log("YLSDK 添加桌面快捷-成功！"), _.ylEventCount("SaveAppToDesktop-success"), e && e(!0)
                    },
                    fail: function () {
                        y.switchLog && console.log("YLSDK 添加桌面快捷-失败！"), _.ylEventCount("SaveAppToDesktop-fail"), e && e(!1)
                    }
                }) : console.error("YLSDK ylSaveAppToDesktop sdk_data.platform is ", y.platform)
            },
            ylSubscribeAppMsg: function (e, o) {
                if (y.platform) {
                    var t = e ? "订阅" : "取消订阅",
                        n = e ? "subscribe" : "unsubscribe";
                    y.platform.subscribeAppMsg({
                        subscribe: e,
                        success: function () {
                            console.log("YLSDK " + t + "-成功！"), _.ylEventCount(n + "-fail"), o && o(!0)
                        },
                        fail: function () {
                            console.log("YLSDK " + t + "-失败！"), _.ylEventCount(n + "-fail"), o && o(!1)
                        }
                    })
                } else console.error("YLSDK ylSubscribeAppMsg sdk_data.platform is ", y.platform)
            },
            ylCreateAddFriendButton: function (o, t, n) {
                y.platform ? y.friendBtn ? t && (y.friendBtn.show(), n && n(!0)) : y.platform.getSetting({
                    success: function (e) {
                        e.authSetting["setting.addFriend"] ? (D.createAddFriendButton(o, t), n && n(!0)) : y.platform.authorize({
                            scope: "setting.addFriend",
                            success: function () {
                                D.createAddFriendButton(o, t), n && n(!0)
                            },
                            fail: function () {
                                n && n(!1)
                            }
                        })
                    }
                }) : console.error("YLSDK ylCreateAddFriendButton sdk_data.platform is ", y.platform)
            },
            ylShowAddFriendButton: function () {
                y.friendBtn && y.friendBtn.show()
            },
            ylHideAddFriendButton: function () {
                y.friendBtn && y.friendBtn.hide()
            },
            ylDestroyAddFriendButton: function () {
                y.friendBtn && (y.friendBtn.destroy(), y.friendBtn = null)
            },
            ylCreateAppBox: function (e, o) {
                var t = Math.floor(Math.random() * w.ylsdk_grid_ids.length),
                    n = w.ylsdk_grid_ids[t];
                y.appBox && (y.appBox.destroy(), y.appBox = null), y.appBox = qq.createAppBox({
                    adUnitId: n
                }), y.appBox.onClose(function (e) {
                    o && o(2)
                }), y.appBox.load().then(function () {
                    e && _.ylShowAppBox(o), o && o(1)
                }).catch(function (e) {
                    console.warn("YLSDK appBox.load-fail:", e), o && o(0)
                })
            },
            ylShowAppBox: function (o) {
                y.appBox ? y.appBox.show().then(function () {
                    o && o(1)
                }).catch(function (e) {
                    console.warn("YLSDK appBox.show-fail:", e), o && o(0)
                }) : console.warn("YLSDK sdk_data.appBox is null")
            },
            ylShareImage: function (e, o) {
                if (y.share_scene = o || y.layer, y.share_scene) {
                    var t = null;
                    y.sharecard_config && y.sharecard_config.has(y.share_scene) ? t = y.sharecard_config.get(y.share_scene) : y.switchLog && console.warn("YLSDK 当前场景没有分享图,请配置");
                    var n = null,
                        a = null,
                        i = null;
                    if (t && 0 < t.length) n = t[Math.floor(Math.random() * t.length)], a = "account_id=" + D.getAccountId() + "&sharecard_id=" + n.id + "&from=stage_invite";
                    var r = {};
                    if (n && (r.title = n.title, r.imageUrl = n.img, i = n.id), w.ylsdk_template_id && 0 < w.ylsdk_template_id.length) {
                        var s = Math.floor(Math.random() * w.ylsdk_template_id.length);
                        r.templateId = w.ylsdk_template_id[s]
                    }
                    a && (r.query = a), L.shareAppMessage("image_", r, e, i)
                } else y.switchLog && console.error("YLSDK ylShareImage-缺少场景值")
            },
            ylShareVideo: function (e, o) {
                if (y.videoPath || (y.switchLog && console.warn("---ylShareVideo 没有录屏资源"), o && o(!1)), e || (e = {
                        title: "",
                        desc: "",
                        query: "",
                        extra: {
                            videoTopics: [""]
                        }
                    }, y.switchLog && console.warn("---ylShareVideo info is null")), e.channel = "video", e.extra || (e.extra = {}), e.extra.videoPath = y.videoPath, w.ylsdk_template_id && 0 < w.ylsdk_template_id.length) {
                    var t = Math.floor(Math.random() * w.ylsdk_template_id.length);
                    e.templateId = w.ylsdk_template_id[t]
                }
                L.shareAppMessage("video_", e, o)
            },
            ylShareTemplate: function (e) {
                var o = {};
                if (w.ylsdk_template_id && 0 < w.ylsdk_template_id.length) {
                    var t = Math.floor(Math.random() * w.ylsdk_template_id.length);
                    o.templateId = w.ylsdk_template_id[t], y.switchLog && console.log("---ylShareTemplate templateId:", o.templateId)
                } else y.switchLog && console.warn("---ylShareTemplate 没有模板ID,请在yl_sdk_conf.js中配置"), e && e(!1);
                L.shareAppMessage("template_", o, e)
            },
            ylShareToken: function (e, o) {
                if (e || (e = {
                        title: "",
                        desc: "",
                        query: ""
                    }, y.switchLog && console.warn("---ylShareToken info is null")), e.channel = "token", w.ylsdk_template_id && 0 < w.ylsdk_template_id.length) {
                    var t = Math.floor(Math.random() * w.ylsdk_template_id.length);
                    e.templateId = w.ylsdk_template_id[t]
                }
                L.shareAppMessage("token_", e, o)
            },
            ylShowMoreGamesModal: function (e) {
                L.showMoreGamesModal(e)
            },
            ylcreateMoreGamesButton: function (e, o) {
                L.createMoreGamesButton(e, o)
            },
            ylRecorderStart: function (e, o) {
                y.switchLog && console.log("YLSDK 录屏-RecorderStart-duration:" + e + ",recorder:" + y.recorder), e <= 3 && (y.switchLog && console.warn("YLSDK 录屏-录屏时长必须 >3 秒"), e = 15), 300 < e && (y.switchLog && console.warn("YLSDK 录屏-录屏时长必须 <=300 秒"), e = 300), y.platform ? (y.recorder ? console.warn("YLSDK 录屏-正在录屏中") : (y.recorder = y.platform.getGameRecorderManager(), y.recorder.onStart(function (e) {
                    y.switchLog && console.log("YLSDK 录屏-监听-开始"), y.recorder_status = 1, o && o(y.recorder_status)
                }), y.recorder.onInterruptionBegin(function () {
                    y.switchLog && console.log("YLSDK 录屏-监听-录屏中断开始")
                }), y.recorder.onInterruptionEnd(function () {
                    y.switchLog && console.log("YLSDK 录屏-监听-录屏中断结束")
                }), y.recorder.onError(function (e) {
                    y.switchLog && console.error("YLSDK 录屏-监听-录屏错误事件-error:" + e)
                }), y.recorder.onStop(function (e) {
                    y.switchLog && console.log("YLSDK 录屏-监听-录屏结束事件-videoPath:" + e.videoPath), y.videoPath = e.videoPath, y.recorder_status = 0, y.recorder_cb && (y.recorder_cb(y.videoPath), y.recorder_cb = null), o && o(y.recorder_status)
                }), y.recorder.onResume(function (e) {
                    y.switchLog && console.log("YLSDK 录屏-监听-继续"), y.recorder_status = 1, o && o(y.recorder_status)
                }), y.recorder.onPause(function (e) {
                    y.switchLog && console.log("YLSDK 录屏-监听-暂停"), y.recorder_status = 2, o && o(y.recorder_status)
                })), y.recorder.start({
                    duration: e
                })) : console.error("YLSDK ylRecorderStart sdk_data.platform is ", y.platform)
            },
            ylRecorderStop: function (e) {
                y.recorder && (y.switchLog && console.log("YLSDK 录屏--停止-----"), y.recorder_cb = e, y.recorder.stop(), y.recorder_status = 0, y.recorder = null)
            },
            ylPause: function () {
                y.recorder && (y.switchLog && console.log("YLSDK 录屏--暂停-----"), y.recorder.pause(), y.recorder_status = 2)
            },
            ylResume: function () {
                y.recorder && (y.switchLog && console.error("YLSDK 录屏--继续-----"), y.recorder.resume(), y.recorder_status = 1)
            },
            ylGetRecorderStatus: function () {
                return y.recorder_status
            },
            ylGetVideoPath: function () {
                return y.videoPath
            },
            ylNativeAdCreate: function (e, o) {
                L.nativeAdCreate(e, o)
            },
            ylNativeAdShow: function (e) {
                L.nativeAdShow(e)
            },
            ylNativeAdClick: function (e) {
                L.nativeAdClick(e)
            }
        }, S = 0; S < p.length; S++) h = _[l = p[S]], Object.defineProperty(y.platform, l, {
        value: h,
        writable: !1,
        enumerable: !0,
        configurable: !0
    });
    var L = {
            getUserPlatFormInfo: function () {
                var e = y.user_wx_info;
                return e = e || D.getUserPlatformInfo(), console.log("YLSDK getUserPlatFormInfo:", e), y.user_wx_info
            },
            saveLocalData: function (e, o) {
                try {
                    w.ylsdk_platform === g || w.ylsdk_platform === i ? localStorage.setItem(e, o) : w.ylsdk_platform === u ? y.platform.setStorage({
                        key: e,
                        value: o,
                        success: function () {
                            console.log("platform.setStorage-handling success")
                        },
                        fail: function () {
                            console.log("platform.setStorage-handling fail, code = ${code}")
                        }
                    }) : y.platform.setStorageSync(e, o)
                } catch (e) {
                    console.error("YLSDK saveLocalData error:", e)
                }
            },
            getLocalData: function (o) {
                try {
                    var e = null;
                    if (w.ylsdk_platform === g || w.ylsdk_platform === i) e = localStorage.getItem(o);
                    else if (w.ylsdk_platform === u) try {
                        e = y.platform.getStorageSync({
                            key: o
                        })
                    } catch (e) {
                        console.error("YLSDK getLocalData error key:" + o + ", e:", e)
                    } else try {
                        e = y.platform.getStorageSync(o)
                    } catch (e) {
                        console.error("YLSDK getLocalData error key:" + o + ", e:", e)
                    }
                    return null != e && void 0 !== e && "undefined" !== e && "" !== e || (e = ""), e
                } catch (e) {
                    console.error("YLSDK getLocalData error key:" + o + ", e:", e)
                }
                return ""
            },
            loginPlatform: function (n) {
                if (w.ylsdk_platform === u) L.loginVIVO(n);
                else if (w.ylsdk_platform == i) w.login_by_visitor ? L.getIMEI(n) : L.loginMZ(n);
                else {
                    var e = {
                        success: function (e) {
                            var o = w.ylsdk_platform === g || w.ylsdk_platform === u ? e.data.token : e.code,
                                t = {
                                    code: o,
                                    needPass: !1,
                                    pkgName: y.ylsdk_pkg_name
                                };
                            o || (t.code = e.anonymousCode, t.pkgName = "anonymousCode"), y.loginInfo ? (y.loginInfo.code = o || "", y.loginInfo.token = o || "", y.loginInfo.pkgName = t.pkgName || "") : y.loginInfo = {
                                code: o || "",
                                token: o || "",
                                pkgName: t.pkgName || ""
                            }, y.switchLog && console.log("YLSDK loginInfo:", JSON.stringify(y.loginInfo)), y.switchLog && console.log("YLSDK platform.login-登录成功:", e), v.loginSDKServer(t, n)
                        },
                        fail: function (e) {
                            y.switchLog && console.error("YLSDK platform.login-登录失败", e), n && n(!1)
                        }
                    };
                    w.ylsdk_platform === f && (e.force = !1), console.warn("----login_info:", e), y.platform.login(e)
                }
            },
            loginVIVO: function (t) {
                console.error("----loginVIVO---platformVersionCode:", m.platformVersionCode), 1053 <= m.platformVersionCode ? y.platform.login().then(function (e) {
                    if (e.data.token) {
                        var o = {
                            code: e.data.token,
                            needPass: !1,
                            pkgName: y.ylsdk_pkg_name
                        };
                        y.loginInfo ? y.loginInfo.token = e.data.token || "" : y.loginInfo = {
                            token: e.data.token || ""
                        }, y.switchLog && console.log("YLSDK loginVIVO-登录成功:", JSON.stringify(e)), v.loginSDKServer(o, t)
                    }
                }, function (e) {
                    y.switchLog && console.error("YLSDK loginVIVO-登录失败", JSON.stringify(res)), t && t(!1)
                }) : y.platform.authorize({
                    type: "token",
                    success: function (e) {
                        var o = {
                            code: e.accessToken,
                            needPass: !1,
                            pkgName: y.ylsdk_pkg_name
                        };
                        y.loginInfo ? y.loginInfo.token = e.accessToken || "" : y.loginInfo = {
                            token: e.accessToken || ""
                        }, y.switchLog && console.log("YLSDK loginVIVO-authorize-登录成功:", JSON.stringify(e)), v.loginSDKServer(o, t)
                    },
                    fail: function (e, o) {
                        y.switchLog && console.log("YLSDK loginVIVO-authorize-登录失败-data:", JSON.stringify(e), JSON.stringify(o)), t && t(!1)
                    }
                })
            },
            loginMZ: function (n) {
                mz.login({
                    success: function (e) {
                        var o = JSON.stringify(e);
                        if (console.warn("YLSDK login success data = " + o), e.token) {
                            var t = {
                                code: e.token,
                                needPass: !1,
                                pkgName: y.ylsdk_pkg_name
                            };
                            y.loginInfo ? y.loginInfo.token = e.token || "" : y.loginInfo = {
                                token: e.token || ""
                            }, y.switchLog && console.log("YLSDK YLSDK loginMZ-登录成功:", JSON.stringify(e)), v.loginSDKServer(t, n), y.user_wx_info = e, D.saveUserPlatfromInfo(JSON.stringify(y.user_wx_info)), L.getTokenMZ()
                        }
                    },
                    fail: function (e) {
                        4 == e.code || e.code;
                        var o = JSON.stringify(e);
                        console.warn("YLSDK login fail data = " + o), L.getIMEI(n)
                    },
                    complete: function () {
                        console.warn("YLSDK login complete")
                    }
                })
            },
            getTokenMZ: function () {
                mz.getToken({
                    success: function (e) {
                        var o = JSON.stringify(e);
                        console.log("YLSDK getToken success data = " + o), y.user_wx_info.token = e.token, y.user_wx_info.uid = e.uid, D.saveUserPlatfromInfo(JSON.stringify(y.user_wx_info))
                    },
                    fail: function (e) {
                        var o = JSON.stringify(e);
                        console.log("YLSDK getToken fail data = " + o), e.code
                    },
                    complete: function () {
                        console.log("YLSDK getToken complete")
                    }
                })
            },
            getIMEI: function (n) {
                mz.getIMEI({
                    success: function (e) {
                        console.log("YLSDK  mz.getIMEI:" + e.imei);
                        var o = e.imei,
                            t = {
                                code: o,
                                needPass: !1,
                                pkgName: "anonymousCode"
                            };
                        y.loginInfo ? (y.loginInfo.code = o || "", y.loginInfo.token = o || "", y.loginInfo.pkgName = y.ylsdk_pkg_name) : y.loginInfo = {
                            code: o || "",
                            token: o || "",
                            pkgName: y.ylsdk_pkg_name || ""
                        }, y.switchLog && console.log("YLSDK loginInfo:", JSON.stringify(y.loginInfo)), y.switchLog && console.log("YLSDK getIMEI-登录成功:", JSON.stringify(e)), v.loginSDKServer(t, n), y.user_wx_info = e, D.saveUserPlatfromInfo(JSON.stringify(y.user_wx_info))
                    },
                    fail: function () {
                        console.log("YLSDK  mz.getIMEI fail !"), n && n(!1)
                    }
                })
            },
            getLaunchOptionsSync: function () {
                var e = y.platform.getLaunchOptionsSync();
                return y.switchLog && console.log("YLSDK platform.getLaunchOptionsSync：", JSON.stringify(e)), e
            },
            showUserInfoButton: function (e, o) {
                y.switchLog && console.log("YLSDK 隐藏获取用户信息按钮"), y.userInfoBtn || (y.userInfoBtn = y.platform.createUserInfoButton(e)), y.userInfoBtn.onTap(function (e) {
                    y.switchLog && console.log("YLSDK 点击获取用户信息按钮:", e), L.getUserInfo(o)
                }), y.userInfoBtn.show()
            },
            hideUserInfoButton: function () {
                y.switchLog && console.log("YLSDK 隐藏获取用户信息按钮"), y.userInfoBtn && y.userInfoBtn.hide()
            },
            getUserInfo: function (o) {
                y.platform.getUserInfo({
                    withCredentials: !1,
                    lang: "zh_CN",
                    success: function (e) {
                        y.switchLog && console.log("YLSDK platform.getUserInfo--success:", JSON.stringify(e)), e.userInfo && (y.user_wx_info = e.userInfo, D.saveUserPlatfromInfo(JSON.stringify(y.user_wx_info)), v.Edit(y.user_wx_info)), o && o(y.user_wx_info)
                    },
                    fail: function (e) {
                        y.switchLog && console.error("YLSDK platform.getUserInfo--fail:", JSON.stringify(e)), o && o()
                    }
                })
            },
            createBannerAd: function (t, n, a, i, e) {
                if (console.log("YLSDK createBannerAd-isSmall, show, _callback, _style,misToch:", t, n, a, JSON.stringify(i), e), m.appName && "DOUYIN" === m.appName.toUpperCase()) console.error("YLSDK 抖音暂不支持banner广告");
                else if (w.ylsdk_banner_ids && 0 != w.ylsdk_banner_ids.length) {
                    var o = Math.floor(Math.random() * w.ylsdk_banner_ids.length),
                        r = w.ylsdk_banner_ids[o];
                    y.bannerAd && L.removeBannerAd();
                    var s = y.gameConfig && y.gameConfig.bannerTimeSpace && y.gameConfig.bannerTimeSpace.onOff;
                    if (s && (y.gameConfig.bannerTimeSpace.isSmall = t), y.gameConfig.bannerTimeSpace._style = i, w.ylsdk_platform === u) {
                        if (m.platformVersionCode < 1031) return void(y.switchLog && console.warn("YLSDK VIVO平台版本号" + m.platformVersionCode + "< 1031 无法展示banner广告"));
                        y.bannerAd = y.platform.createBannerAd({
                            posId: r,
                            style: {}
                        }), y.switchLog && console.log("YLSDK qg.createBannerAd:", r), y.bannerAd.onLoad(function () {
                            y.switchLog && console.log("YLSDK qg.createBannerAd---onLoad 广告加载成功-show:", n), a && a(!0), n && L.showBannerAd()
                        }), y.bannerAd.onError(function (e) {
                            if (y.switchLog && console.warn("YLSDK qg.createBannerAd---onError:", e), s) {
                                var o = y.gameConfig.bannerTimeSpace.timeSpace || y.defaultbTS;
                                y.switchLog && console.warn("YLSDK 将在" + o + "秒后重新创建banner(调用ylBannerAdHide会取消重试)"), L.delayUpdateBanner(o, t, n, i)
                            } else L.removeBannerAd();
                            a && a(!1)
                        }), y.bannerAd.onSize(function (e) {
                            y.switchLog && console.log("YLSDK qg.createBannerAd---onSize-res:", e)
                        })
                    } else {
                        if (w.ylsdk_platform === g && m.platformVersion < 1051) return void(y.switchLog && console.warn("YLSDK OPPO平台版本号" + m.platformVersion + "< 1051 无法展示banner广告"));
                        if (!y.platform.createBannerAd) return void(y.switchLog && console.warn("function createBannerAd is undefined"));
                        var l = t ? 300 : m.windowWidth,
                            c = {
                                adUnitId: r,
                                style: {
                                    left: (m.windowWidth - l) / 2,
                                    top: m.windowHeight - .28695 * m.windowWidth,
                                    width: l
                                }
                            };
                        w.ylsdk_platform !== f && w.ylsdk_platform !== d || (c.adIntervals = 31), i && (c.style = i), console.log("YLSDK createBannerAd-bannerInfo.style:", JSON.stringify(c.style)), y.bannerAd = y.platform.createBannerAd(c), w.ylsdk_platform === g ? (y.bannerAd.onLoad(function () {
                            y.switchLog && console.log("YLSDK platform.createBannerAd---onLoad 广告显示成功")
                        }), a && a(!0), n && L.showBannerAd()) : y.bannerAd.onLoad(function () {
                            y.switchLog && console.log("YLSDK platform.createBannerAd---onLoad 广告加载成功"), a && a(!0), n && L.showBannerAd()
                        }), y.bannerAd.onError(function (e) {
                            if (y.switchLog && console.warn("YLSDK platform.createBannerAd---onError:", e), s) {
                                var o = y.gameConfig.bannerTimeSpace.timeSpace || 10;
                                y.switchLog && console.log("YLSDK 将在" + o + "秒后重新创建banner(调用ylBannerAdHide会取消重试)"), L.delayUpdateBanner(o, t, n, i), a && a(!1)
                            } else L.removeBannerAd()
                        }), y.bannerAd.onResize(function (e) {
                            y.bannerAd && (i ? y.bannerAd.style = i : (y.bannerAd.style.top = m.windowHeight - e.height, y.bannerAd.style.left = (m.windowWidth - e.width) / 2), y.switchLog && console.log("YLSDK platform.createBannerAd---onResize:", y.bannerAd.style.realWidth, y.bannerAd.style.realHeight, y.bannerAd.style.top))
                        })
                    }
                    y.bannerAd.misToch = e || !1
                } else console.error("YLSDK 请在配置文件中配置banner ID")
            },
            delayUpdateBanner: function (e, o, t, n) {
                y.switchLog && console.log("YLSDK delayUpdateBanner-delay,isSmall,show:", e, o, t), 0 < e && (y.bannerTimer && (clearTimeout(y.bannerTimer), y.bannerTimer = null), y.bannerTimer = setTimeout(function () {
                    L.createBannerAd(o, t, null, n)
                }, 1e3 * e))
            },
            showBannerAd: function () {
                y.switchLog && console.log("YLSDK BannerAd.show");
                var e = !0,
                    o = !1,
                    t = !1,
                    n = y.defaultbTS;
                y.gameConfig && y.gameConfig.bannerTimeSpace && (t = y.gameConfig.bannerTimeSpace.onOff || !1, n = y.gameConfig.bannerTimeSpace.timeSpace || y.defaultbTS), t && (e = y.gameConfig.bannerTimeSpace.isSmall || !1);
                var a = y.gameConfig.bannerTimeSpace._style || null;
                if (y.bannerAd) {
                    var i = (new Date).getTime(),
                        r = y.bannerAd.lastTime || i;
                    if (t && 1e3 * n <= i - r && (o = !0, y.switchLog && console.log("YLSDK showBannerAd-createBannerAd:", o), L.createBannerAd(e, !0, null, a)), !o)
                        if (w.ylsdk_platform === u) {
                            var s = y.bannerAd.show();
                            s && s.then(function () {
                                y.bannerAd.show_banner = !0
                            }).catch(function (e) {
                                y.switchLog && console.warn("YLSDK banner广告展示失败", e)
                            })
                        } else y.bannerAd.show(), y.bannerAd.show_banner = !0;
                    y.bannerAd.lastTime = i, _.ylEventCount("showBannerAd")
                } else y.switchLog && console.warn("YLSDK not BannerAd");
                !o && t && L.delayUpdateBanner(n, e, !0)
            },
            hideBannerAd: function () {
                if (y.switchLog && console.log("YLSDK BannerAd.hide"), y.bannerAd) {
                    if (w.ylsdk_platform === u) {
                        var e = y.bannerAd.hide();
                        e && e.then(function () {}).catch(function (e) {
                            y.switchLog && console.warn("YLSDK banner广告隐藏失败", e)
                        })
                    } else y.bannerAd.hide();
                    y.bannerTimer && (clearTimeout(y.bannerTimer), y.bannerTimer = null), y.bannerAd.show_banner = !1
                }
            },
            removeBannerAd: function () {
                if (y.switchLog && console.log("YLSDK BannerAd.destroy"), y.bannerAd) {
                    if (y.bannerTimer && (clearTimeout(y.bannerTimer), y.bannerTimer = null), y.bannerAd.hide(), w.ylsdk_platform === u) {
                        var e = y.bannerAd.destroy();
                        e && e.then(function () {
                            y.switchLog && console.log("banner广告销毁成功")
                        }).catch(function (e) {
                            y.switchLog && console.warn("banner广告销毁失败", e)
                        })
                    } else y.bannerAd.destroy();
                    y.bannerAd = null
                }
            },
            createVideoAd: function () {
                var e = Math.floor(Math.random() * w.ylsdk_video_ids.length),
                    o = w.ylsdk_video_ids[e];
                if (w.ylsdk_platform === g && m.platformVersion < 1051) y.switchLog && console.warn("YLSDK OPPO平台版本号" + m.platformVersion + "< 1051 无法展示激励视频广告");
                else if (w.ylsdk_platform === i && m.platformVersion < 1064) y.switchLog && console.warn("YLSDK 魅族平台版本号" + m.platformVersion + "< 1064 无法展示激励视频广告");
                else if (w.ylsdk_platform === u && m.platformVersionCode < 1041) y.switchLog && console.warn("YLSDK VIVO平台版本号" + m.platformVersionCode + "< 1041 无法展示激励视频广告");
                else if (y.platform.createRewardedVideoAd) {
                    if (console.warn("YLSDK ------createVideoAd-sdk_data.videoAd:", y.videoAd), y.videoAd) {
                        if (y.videoAd.ad_unit_id === o) return;
                        y.videoAd.ad_unit_id = o
                    } else w.ylsdk_platform === u ? y.videoAd = y.platform.createRewardedVideoAd({
                        posId: o
                    }) : y.videoAd = y.platform.createRewardedVideoAd({
                        adUnitId: o
                    }), y.videoAd.ad_unit_id = o, y.videoAd.onClose(function (e) {
                        y.show_video = !1, e && e.isEnded || void 0 === e ? (y.switchLog && console.log("YLSDK 视频播放完成"), y.onVideoClose && y.onVideoClose(y.VIDEO_PLAY_FINISH), D.addWatchTVnums(y.unlockCustomNum), D.addPower(1), y.videoAd.ad_unit_id && _.ylStatisticViedo(1, y.videoAd.ad_unit_id)) : (y.onVideoClose && y.onVideoClose(y.VIDEO_PLAY_CANCEL), y.switchLog && console.warn("YLSDK 视频播放取消")), y.unlockCustomNum = null
                    }), y.videoAd.onError(function (e) {
                        y.switchLog && console.warn("YLSDK RewardedVideoAd.onError:", e), y.onVideoClose && y.onVideoClose(y.VIDEO_PLAY_FAIL), y.unlockCustomNum = null, y.show_video = !1
                    });
                    console.warn("YLSDK ------ad_unit_id:", y.videoAd.ad_unit_id)
                } else console.warn("YLSDK createRewardedVideoAd function is ", y.platform.createRewardedVideoAd)
            },
            showVideoAd: function (o, e) {
                if (y.show_video = !0, y.videoAd || L.createVideoAd(), y.videoAd) {
                    y.videoAd.ad_unit_id && _.ylStatisticViedo(0, y.videoAd.ad_unit_id), y.unlockCustomNum = e, y.onVideoClose = o;
                    var t = !1;
                    if (w.ylsdk_platform === u) {
                        var n = y.videoAd.load();
                        n && n.catch(function (e) {
                            y.show_video = !1, t || (y.switchLog && console.warn("YLSDK 视频加载失败啦！"), t = !0, y._timer && (clearTimeout(y._timer), y._timer = null), o && o(y.VIDEO_PLAY_FAIL))
                        }), y.videoAd.onLoad(function () {
                            if (y.switchLog && console.log("YLSDK RewardedVideoAd.onLoad"), !t) {
                                t = !0, y._timer && (clearTimeout(y._timer), y._timer = null);
                                var e = y.videoAd.show();
                                e && e.catch(function (e) {
                                    y.switchLog && console.warn("YLSDK 视频播放失败"), o && o(y.VIDEO_PLAY_FAIL), y.show_video = !1
                                })
                            }
                        })
                    } else w.ylsdk_platform === i || w.ylsdk_platform === g ? (y.videoAd.onLoad(function () {
                        y.switchLog && console.log("YLSDK RewardedVideoAd.onLoad"), t || (t = !0, y._timer && (clearTimeout(y._timer), y._timer = null), y.videoAd.show())
                    }), y.videoAd.load && y.videoAd.load()) : y.videoAd.load().then(function () {
                        t || (t = !0, y._timer && (clearTimeout(y._timer), y._timer = null), y.videoAd.show().then(function () {
                            y.switchLog && console.log("YLSDK 视频播放成功", y.videoAd.adUnitId)
                        }).catch(function (e) {
                            y.switchLog && console.warn("YLSDK 视频播放失败", y.videoAd.adUnitId), o && o(y.VIDEO_PLAY_FAIL), y.show_video = !1
                        }))
                    }).catch(function (e) {
                        y.show_video = !1, t || (y.switchLog && console.warn("YLSDK 视频加载失败啦！", y.videoAd.adUnitId), t = !0, y._timer && (clearTimeout(y._timer), y._timer = null), o && o(y.VIDEO_PLAY_FAIL))
                    });
                    y._timer || (y._timer = setTimeout(function () {
                        y._timer = null, y.show_video = !1, t || (y.switchLog && console.log("YLSDK 4秒内无视屏回调，自动回调加载失败"), t = !0, o && o(y.VIDEO_PLAY_FAIL))
                    }, 4e3)), _.ylEventCount("showVideoAd")
                } else y.switchLog && console.warn("YLSDK 视频不存在！")
            },
            initShareMenu: function () {
                y.platform.showShareMenu({
                    success: function () {},
                    fail: function () {},
                    complete: function () {}
                }), y.platform.onShareAppMessage(function () {
                    y.show_share = !0;
                    var t = y.share_scene ? y.share_scene : y.layer,
                        e = {};
                    if (4 === y.ylsdk_platform_num && (e = {
                            success: function () {
                                y.show_share = !1;
                                var e = y.sharecard_config.get(t);
                                if (e && 0 < e.length) {
                                    var o = e[0];
                                    _.ylStatisticShareCard(o.id)
                                }
                                _.ylEventCount("share_menu_success")
                            },
                            fail: function () {
                                y.show_share = !1, _.ylEventCount("share_menu_fail")
                            }
                        }), !y.layer || !y.sharecard_config) return e;
                    var o = y.sharecard_config.get(t);
                    if (o && 0 < o.length) {
                        var n = o[0],
                            a = "account_id=" + D.getAccountId() + "&sharecard_id=" + n.id + "&from=stage_invite";
                        e.title = n.title, e.imageUrl = n.img, e.query = a
                    }
                    return _.ylEventCount("share_menu"), e
                })
            },
            initOnShow: function () {
                y.platform ? y.platform.onShow(function (e) {
                    if (y.lifeListen && y.lifeListen("onShow", e), y.switchLog && console.log("YLSDK platform.onShow"), y.statistics = D.getLocalStatistics(), D.registerInterval(), y.bannerAd && console.log("YLSDK show_banner,misToch,show_share,show_video:", y.bannerAd.show_banner, y.bannerAd.misToch, y.show_share, y.show_video), y.bannerAd && y.bannerAd.show_banner && y.bannerAd.misToch && !y.show_share && !y.show_video) {
                        var o = (new Date).getTime();
                        y.hideTime && o - y.hideTime <= 1e3 * y.banner_time_space && D.statisticsBannerClick()
                    }
                    if ((0 === y.ylsdk_platform_num || 1 === y.ylsdk_platform_num) && y.onShare) {
                        y.show_share = !1;
                        var t = (new Date).getTime() - y.onShare.showTime;
                        D.getSharingResults(t, function (e) {
                            y.switchLog && console.warn("YLSDK 本次分享" + (e ? "成功" : "失败")), y.shareCallBack && y.shareCallBack(e), y.shareCallBack = null
                        }), y.onShare = null
                    }
                    y.accountPass ? y.lastTime = (new Date).getTime() : y.need_statistics_on_show = !0
                }) : console.error("YLSDK onShow sdk_data.platform is ", y.platform)
            },
            initOnHide: function () {
                y.platform ? y.platform.onHide(function () {
                    y.lifeListen && y.lifeListen("onHide", null), y.switchLog && console.log("YLSDK platform.onHide"), y.hideTime = (new Date).getTime(), D.unRegisterInterval(), D.saveStatisticsToLocal(), v.commitStaticsLayer(), D.statisticsPlayTime()
                }) : console.error("YLSDK onHide sdk_data.platform is ", y.platform), D.savePowerLocal()
            },
            initOnError: function () {
                y.platform ? y.platform.onError(function (e) {
                    y.lifeListen && y.lifeListen("onError", e);
                    var o = JSON.stringify(e);
                    y.ERROR_LOG && y.ERROR_LOG === o || (console.error("YLSDK onError:", o), y.ERROR_LOG = o)
                }) : console.error("YLSDK onError sdk_data.platform is ", y.platform)
            },
            showMoreGamesModal: function () {
                y.platform.onMoreGamesModalClose(function (e) {
                    _.ylEventCount("onMoreGamesModalClose")
                }), y.platform.onNavigateToMiniProgram(function (e) {
                    D.setJumpEventCount("MoreGames", e.errCode)
                });
                var o = new Array;
                m.platform && "ios" !== m.platform && (y.boxconfig && y.boxconfig.forEach(function (e) {
                    "0" == e.type && o.push({
                        appId: e.toAppid,
                        query: e.toUrl,
                        extraData: {
                            appid: w.ylsdk_app_id
                        }
                    })
                }), y.platform.showMoreGamesModal({
                    appLaunchOptions: o,
                    success: function () {
                        _.ylEventCount("showMoreGamesModal_success")
                    },
                    fail: function () {
                        _.ylEventCount("showMoreGamesModal_fail")
                    }
                }))
            },
            createMoreGamesButton: function (e) {
                var o = new Array;
                y.boxconfig && y.boxconfig.forEach(function (e) {
                    "0" == e.type && o.push({
                        appId: e.toAppid,
                        query: e.toUrl,
                        extraData: {
                            appid: w.ylsdk_app_id
                        }
                    })
                }), y.platform.createMoreGamesButton({
                    type: e.type,
                    image: e.image,
                    style: e.style,
                    appLaunchOptions: o,
                    onNavigateToMiniGame: function (e) {
                        D.setJumpEventCount("MoreGames", e.errCode)
                    }
                }).onTap(function () {
                    _.ylEventCount("Click_MoreGames")
                })
            },
            shareAppMessage: function (e, o, t, n) {
                y.show_share = !0;
                var a = {
                         extra: {
                  videoPath: y.videoPath, // 可替换成录屏得到的视频地址
                  videoTopics:[]
                },
                    success: function () {
                        n && _.ylStatisticShareCard(n), _.ylEventCount(e + "share_success"), y.show_share = !1, t && t(!0)
                    },
                    fail: function () {
                        _.ylEventCount(e + "share_fail"), y.show_share = !1, t && t(!1)
                    }
                };
                o.templateId && (a.templateId = o.templateId), o.desc && (a.desc = o.desc), o.imageUrl && (a.imageUrl = o.imageUrl), o.title && (a.title = o.title), /*o.extra && (a.extra = o.extra),*/ o.channel && (a.channel = o.channel), o.query && (a.query = o.query), y.switchLog && console.log("---shareAppMessage--info:", JSON.stringify(a)), y.platform.shareAppMessage(a)
            },
            nativeAdCreate: function (o) {
                if (w.ylsdk_platform === g && m.platformVersion < 1051) y.switchLog && console.warn("YLSDK OPPO平台版本号" + m.platformVersion + "< 1051 无法展示原生广告");
                else {
                    y.nativeAd && (y.nativeAd.destroy(), y.nativeAd = null);
                    var e = Math.floor(Math.random() * w.ylsdk_native_ids.length),
                        t = w.ylsdk_native_ids[e];
                    qg.createNativeAd ? (y.nativeAd = qg.createNativeAd({
                        adUnitId: t
                    }), y.nativeAd.onLoad(function (e) {
                        y.switchLog && console.log("YLSDK 原生广告加载完成", JSON.stringify(e)), e.adList && 0 < e.adList.length ? o && o(e.adList) : o && o(!1)
                    }), y.nativeAd.onError(function (e) {
                        o && o(!1), y.switchLog && console.warn("YLSDK 原生广告加载异常", e)
                    }), y.nativeAd.load()) : (o && o(!1), y.switchLog && console.warn("YLSDK not qg.createNativeAd function"))
                }
            },
            nativeAdShow: function (e) {
                y.nativeAd ? y.nativeAd.reportAdShow({
                    adId: e
                }) : y.switchLog && console.warn("YLSDK sdk_data.nativeAd is null")
            },
            nativeAdClick: function (e) {
                y.nativeAd ? y.nativeAd.reportAdClick({
                    adId: e
                }) : y.switchLog && console.warn("YLSDK sdk_data.nativeAd is null")
            }
        },
        v = {
            statisticsEvents: function (n, a) {
                var e = {
                    events: n
                };
                c({
                    method: "post",
                    url: y.domain_online + "/statistics/event",
                    needPass: !0,
                    data: e,
                    callback: function (e) {
                        var o = JSON.parse(e);
                        if (D.res_log("Response--event:", o.code, e), 0 === o.code) a && D.clearLocalStatisticsEvents();
                        else
                            for (var t = 0; t < n.length; t++) y.statistics.events.unshift(n.pop());
                        9002 === o.code && L.loginPlatform()
                    }
                })
            },
            statisticViedo: function (t, n) {
                0 !== y.switchInfo.switchVideo ? c({
                    method: "post",
                    url: y.domain_online + "/statistics/video",
                    needPass: !0,
                    data: t,
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--video:", o.code, e), 0 != o.code && y.statistics.video.push(t), 9002 === o.code && L.loginPlatform(), n && n(e)
                    }
                }) : y.switchLog && console.warn("YLSDK 停用视频统计接口！")
            },
            statisticResult: function (t, n) {
                0 !== y.switchInfo.switchResult ? c({
                    method: "post",
                    url: y.domain_online + "/statistics/result",
                    needPass: !0,
                    data: t,
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--result:", o.code, e), 0 != o.code && y.statistics.result.push(t), 9002 === o.code && L.loginPlatform(), n && n(0 === o.code)
                    }
                }) : y.switchLog && console.warn("YLSDK 停用结果统计接口！")
            },
            GetSignData: function (t) {
                y.signConfig ? t && t(y.signConfig) : c({
                    method: "get",
                    url: y.domain_online + "/gamebase/getsigndata",
                    needPass: !0,
                    data: {
                        appid: w.ylsdk_app_id,
                        account_id: y._AccountId,
                        module: "sign"
                    },
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--getsigndata:", o.code, e), 9002 === o.code && L.loginPlatform(), 0 == o.code && o.signconfig && (y.signConfig = o), t && t(o)
                    }
                })
            },
            loginSDKServer: function (t, n) {
                v.loginServer(t, function (e) {
                    var o = JSON.parse(e);
                    0 === o.code ? (y.switchLog = 1 === o.result.switchLog, w.ylsdk_debug_model && console.warn("YLSDK 日志开关(云控)-", y.switchLog ? "打开" : "关闭"), y.loginInfo = {
                        accountId: o.result.accountId,
                        nickName: o.result.nickName || "",
                        avatarUrl: o.result.avatarUrl || "",
                        newPlayer: 0 !== o.result.newPlayer ? 1 : 0,
                        openid: o.result.openid || "",
                        code: t.code || "",
                        token: t.code || "",
                        pkgName: t.pkgName || ""
                    }, y.switchLog && console.log("YLSDK loginInfo:", JSON.stringify(y.loginInfo)), o.result.accountId && D.SetAccountID(o.result.accountId), o.result.accountPass && D.SetAccountPass(o.result.accountPass), o.result.isLowVersion && 1 === o.result.isLowVersion && (console.error("/*****************************************/"), console.error("**  YLSDK 您的SDK版本过低，请尽快升级SDK  **"), console.error("/*****************************************/")), y.switchInfo = {
                        switchTouch: o.result.switchTouch || 0,
                        switchPush: o.result.switchPush || 0,
                        switchLog: o.result.switchLog || 0
                    }, y.switchTouchAll = o.result.switchTouch || 0, y.switchInfo.switchLogin = 0 === o.result.switchLogin ? o.result.switchLogin : 1, y.switchInfo.switchJump = 0 === o.result.switchJump ? o.result.switchJump : 1, y.switchInfo.switchShare = 0 === o.result.switchShare ? o.result.switchShare : 1, y.switchInfo.switchEvent = 0 === o.result.switchEvent ? o.result.switchEvent : 1, y.switchInfo.switchLayer = 0 === o.result.switchLayer ? o.result.switchLayer : 1, y.switchInfo.switchResult = 0 === o.result.switchResult ? o.result.switchResult : 1, y.switchInfo.switchVideo = 0 === o.result.switchVideo ? o.result.switchVideo : 1, y.need_statistics_on_show && (y.lastTime = (new Date).getTime(), y.need_statistics_on_show = !1), o.result.moduleList && 0 < o.result.moduleList.length && (y.moduleList = o.result.moduleList, y.moduleList.forEach(function (e) {
                        e.loopIndex = 0, e.logicJson && (e.logicJson = JSON.parse(e.logicJson))
                    })), console.log("YLSDK SDK初始化完成-switchInfo:", y.switchInfo), n && n(!0)) : y.login_count < 3 ? (D.SetAccountPass(""), v.login(n)) : (console.error("YLSDK SDK初始化失败"), n && n(!1)), v.getGameConfig(n)
                })
            },
            loginServer: function (e, t) {
                var o = {};
                if (w.ylsdk_platform !== g && w.ylsdk_platform !== u && w.ylsdk_platform !== i) {
                    var n = L.getLaunchOptionsSync();
                    n.scene && (o.scene = n.scene), n.query && (o.query = JSON.stringify(n.query), 1005 != parseInt(n.scene) && 1006 != parseInt(n.scene) && 1037 != parseInt(n.scene) && 1035 != parseInt(n.scene) && "{}" != o.query && (n.query.sharecard_id && (o.sharecardId = n.query.sharecard_id), n.query.account_id && (o.accountId = n.query.account_id, y.invite_account = n.query.account_id), n.query.from && (o.from = n.query.from)))
                }
                var a = {
                    platform: y.ylsdk_platform_num || "0",
                    appid: w.ylsdk_app_id,
                    version: w.ylsdk_version,
                    shareInfo: o
                };
                e.code && (a.code = e.code), w.ylsdk_platform !== g && w.ylsdk_platform !== u && w.ylsdk_platform !== i || !e.pkgName || (a.pkgName = e.pkgName), y.switchLog && console.log("YLSDK 登录SDK服务器-请求:", JSON.stringify(a)), c({
                    method: "post",
                    url: y.domain_online + "/user/login",
                    needPass: e.needPass,
                    data: a,
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--login:", o.code, e), t && t(e)
                    }
                })
            },
            login: function (e) {
                y.login_count += 1;
                var o = y.accountPass;
                if (0 !== y.switchInfo.switchLogin)
                    if (w.login_by_code || !o || "" === o) y.switchLog && console.log("YLSDK 通过 " + y.platform_name + " code(token)登录"), L.loginPlatform(e);
                    else {
                        y.accountPass = o, y.switchLog && console.log("YLSDK 通过accountPass登录");
                        v.loginSDKServer({
                            needPass: !0
                        }, e)
                    }
                else y.switchLog && console.warn("YLSDK 该游戏被禁止！")
            },
            Edit: function (e) {
                c({
                    method: "post",
                    url: y.domain_online + "/user/info/edit",
                    needPass: !0,
                    data: {
                        nickName: e.nickName,
                        headimgurl: e.avatarUrl,
                        gender: e.gender,
                        language: e.language,
                        province: e.province,
                        city: e.city,
                        country: e.country
                    },
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--edit：", o.code, e), 9002 === o.code && L.loginPlatform()
                    }
                })
            },
            SideBox: function (l) {
                y.boxconfig ? l && l(y.boxconfig) : c({
                    method: "get",
                    url: y.domain_online + "/gamebase/sidebox",
                    needPass: !0,
                    callback: function (e) {
                        var o = JSON.parse(e);
                        if (D.res_log("Response--sidebox:", o.code, e), 0 === o.code && o.result) {
                            D.checkJumpOutTime(), y.boxconfig = o.result;
                            var t = D.getJumpOutInfo(),
                                n = !(!t || "" === t) && JSON.parse(t);
                            if (n && n.list && 0 < n.list.length)
                                for (var a = 0; a < n.list.length; a++)
                                    for (var i = n.list[a].appid, r = 0; r < y.boxconfig.length; r++) {
                                        var s = y.boxconfig[r].toAppid;
                                        s == i && (y.switchLog && console.log("YLSDK 删除已经点过的卖量项:", y.boxconfig[r]._id, s), y.boxconfig.splice(r, 1))
                                    }
                            l && l(y.boxconfig)
                        } else v.newestsideboxFinal(l)
                    }
                })
            },
            newestsideboxFinal: function (l) {
                c({
                    method: "get",
                    url: y.domain_online + "/gamebase/sidebox/final?appid=" + w.ylsdk_app_id + "&version=" + w.ylsdk_version,
                    needPass: !1,
                    callback: function (e) {
                        var o = JSON.parse(e);
                        if (D.res_log("Response--sidebox-final:", o.code, e), 9002 === o.code && L.loginPlatform(), D.checkJumpOutTime(), 0 === o.code && o.result) {
                            y.boxconfig = o.result;
                            var t = D.getJumpOutInfo(),
                                n = !(!t || "" === t) && JSON.parse(t);
                            if (n && n.list && 0 < n.list.length)
                                for (var a = 0; a < n.list.length; a++)
                                    for (var i = n.list[a].appid, r = 0; r < y.boxconfig.length; r++) {
                                        var s = y.boxconfig[r].toAppid;
                                        s == i && (y.switchLog && console.log("YLSDK 删除已经点过的卖量项-final:", y.boxconfig[r]._id, s), y.boxconfig.splice(r, 1))
                                    }
                        }
                        l && l(y.boxconfig)
                    }
                })
            },
            IntegralWall: function (t) {
                c({
                    method: "post",
                    url: y.domain_online + "/gamebase/scoreboard",
                    needPass: !0,
                    data: {
                        module: "scoreboard"
                    },
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--scoreboard:", o.code, e), 0 == o.code && o.result ? (o.result && (y.boardconfig = o.result), t && t(y.boardconfig)) : v.newestscoreboardFinal(t)
                    }
                })
            },
            newestscoreboardFinal: function (t) {
                c({
                    method: "get",
                    url: y.domain_online + "/gamebase/scoreboard/final?appid=" + w.ylsdk_app_id + "&version=" + w.ylsdk_version + "&module=scoreboard",
                    needPass: !1,
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--scoreboard-final:", o.code, e), 9002 === o.code && L.loginPlatform(), 0 == o.code && o.result && o.result && (y.boardconfig = o.result), t && t(o)
                    }
                })
            },
            customconfigFinal: function (t) {
                c({
                    method: "get",
                    url: y.domain_online + "/gamebase/customconfig/final?appid=" + w.ylsdk_app_id + "&version=" + w.ylsdk_version,
                    needPass: !1,
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--customconfig-final:", o.code, e), 9002 === o.code && L.loginPlatform(), 0 == o.code && o.result && 0 < o.result.length && (y.custom = o.result, o.result.forEach(function (e) {
                            "sharing_strategy" == e.name && e.value && "" != e.value && (y.sharingStrategy = e, y.sharingStrategy.value = JSON.parse(e.value), y.sharingStrategy.strategy_id = 0, y.sharingStrategy.time_id = 0, y.sharingStrategy.count = 0, y.switchLog && console.log("YLSDK sharing_strategy:", y.sharingStrategy))
                        })), t && t(o.result)
                    }
                })
            },
            sharecardFinal: function (t, e) {
                y.switchLog && console.log("YLSDK sharecardFinal-scene,layer", e, y.layer), y.share_scene = e || y.layer, y.share_scene ? c({
                    method: "get",
                    url: y.domain_online + "/gamebase/sharecard/final?appid=" + w.ylsdk_app_id + "&version=" + w.ylsdk_version + "&scene=" + y.share_scene,
                    needPass: !1,
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--sharecard-final:", o.code, e), 9002 === o.code && L.loginPlatform(), 0 == o.code && o.result && 0 < o.result.length && (y.sharecard_config.set(y.share_scene, o.result), L.initShareMenu()), t && (y.sharecard_config.has(y.share_scene) ? t(y.sharecard_config.get(y.share_scene)) : t(!1))
                    }
                }) : y.switchLog && console.error("YLSDK sharecardFinal-缺少场景值")
            },
            commitStaticsLayer: function () {
                if (y._AccountId) {
                    y.layer || console.warn("YLSDK yl_sdk-ccommitStaticsLayer : layer is null !");
                    var e = {
                        layer: y.layer || "default"
                    };
                    v.statisticsLayer(e)
                } else console.error("YLSDK yl_sdk-commitStaticsLayer : _AccountId is null !")
            },
            statisticsLayer: function (t) {
                0 !== y.switchInfo.switchLayer ? c({
                    method: "post",
                    url: y.domain_online + "/statistics/layer",
                    needPass: !0,
                    data: t,
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--layer:", o.code, e), 0 != o.code && y.statistics.layer.push(t), 9002 === o.code && L.loginPlatform()
                    }
                }) : y.switchLog && console.warn("YLSDK 停用流失统计接口！")
            },
            commitStaticsErrStack: function (e, o) {
                var t = {
                    appid: w.ylsdk_app_id,
                    version: w.ylsdk_version,
                    language: m.language,
                    system: m.system,
                    model: m.model,
                    brand: m.brand,
                    platform: m.platform,
                    SDKVersion: y._SDKversion,
                    resolution: m.screenWidth + "x" + m.screenHeight,
                    window: m.windowWidth + "x" + m.windowHeight,
                    ErrStack: e,
                    LogStr: o
                };
                c({
                    method: "post",
                    url: y.domain_online + "/statistics/clientlog",
                    needPass: !1,
                    data: t,
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--clientlog:", o.code, e), 9002 === o.code && L.loginPlatform()
                    }
                })
            },
            ClickOut: function (e, o, t, n, a) {
                if (e)
                    if (o) {
                        var i = {
                            iconId: e,
                            source: t,
                            target: o,
                            action: !0 === n ? "enable" : "cancel"
                        };
                        v.statisticsClickOut(i, a)
                    } else console.error("YLSDK toAppId is null !");
                else console.error("YLSDK iconId is null !")
            },
            statisticsClickOut: function (t, n) {
                0 !== y.switchInfo.switchJump ? c({
                    method: "post",
                    url: y.domain_online + "/statistics/clickcount",
                    needPass: !0,
                    data: t,
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--clickcount:", o.code, e), 0 != o.code && y.statistics.clickcount.push(t), 9002 === o.code && L.loginPlatform(), n && n(e)
                    }
                }) : y.switchLog && console.warn("YLSDK 停用卖量统计接口！")
            },
            statisticShareCard: function (t) {
                0 !== y.switchInfo.switchShare ? c({
                    method: "post",
                    url: y.domain_online + "/statistics/sharecard",
                    needPass: !0,
                    data: t,
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--sharecard:", o.code, e), 0 != o.code && y.statistics.sharecard.push(t), 9002 === o.code && L.loginPlatform()
                    }
                }) : y.switchLog && console.warn("YLSDK 停用分享图统计接口！")
            },
            getGameConfig: function (t) {
                c({
                    method: "get",
                    url: y.domain_online + "/gamebase/config",
                    needPass: !0,
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--config:", o.code, e), 0 === o.code ? D.parseGameConfig(o.result, t) : v.getGameConfigFinal(t)
                    }
                })
            },
            getGameConfigFinal: function (t) {
                c({
                    method: "get",
                    url: y.domain_online + "/gamebase/config/final?appid=" + w.ylsdk_app_id + "&version=" + w.ylsdk_version,
                    needPass: !1,
                    callback: function (e) {
                        var o = JSON.parse(e);
                        D.res_log("Response--config-final:", o.code, e), 0 === o.code ? D.parseGameConfig(o.result, t) : 9002 === o.code && (L.loginPlatform(), t && t("config_fail"))
                    }
                })
            }
        },
        D = {
            registerInterval: function () {
                D.unRegisterInterval(), y.switchLog && console.log("YLSDK 注册-事件上传-定时器"), y.s_interval = setInterval(function () {
                    D.sendStatistics()
                }, y.s_commit_dt, null)
            },
            unRegisterInterval: function () {
                y.switchLog && console.log("YLSDK 注销-事件上传-定时器"), y.s_interval && clearInterval(y.s_interval), y.s_interval = null
            },
            sendStatistics: function () {
                if (y.statistics && y.accountPass) {
                    if (y.statistics.events) {
                        var e = y.statistics.events;
                        if (0 !== e.length)
                            if (e.length >= y.s_max_post_l) {
                                for (var o = [], t = 0; t < y.s_max_post_l; t++) o.push(e.shift());
                                v.statisticsEvents(o)
                            } else v.statisticsEvents(e, !0)
                    }
                    y.statistics.video && 0 < y.statistics.video.length && v.statisticViedo(y.statistics.video.pop()), y.statistics.sharecard && 0 < y.statistics.sharecard.length && v.statisticShareCard(y.statistics.sharecard.pop()), y.statistics.clickcount && 0 < y.statistics.clickcount.length && v.statisticsClickOut(y.statistics.clickcount.pop()), y.statistics.result && 0 < y.statistics.result.length && v.statisticResult(y.statistics.result.pop()), y.statistics.layer && 0 < y.statistics.layer.length && v.statisticsLayer(y.statistics.layer.pop())
                }
            },
            saveStatisticsToLocal: function () {
                if (y.statistics.events && y.statistics.events.length > y.s_cache_ml)
                    for (var e = y.s_cache_ml; e < y.statistics.events.length; e++) y.statistics.events.shift();
                try {
                    y.platform.setStorageSync("ylsdk_statistics" + w.ylsdk_app_id, JSON.stringify(y.statistics))
                } catch (e) {}
            },
            getLocalStatistics: function () {
                try {
                    var e = L.getLocalData("ylsdk_statistics" + w.ylsdk_app_id);
                    return e && 0 !== e.length ? JSON.parse(e) : {
                        events: [],
                        video: [],
                        result: [],
                        sharecard: [],
                        clickcount: [],
                        layer: []
                    }
                } catch (e) {}
            },
            clearLocalStatistics: function () {
                try {
                    y.platform.setStorageSync("ylsdk_statistics" + w.ylsdk_app_id, "")
                } catch (e) {}
                y.statistics = {
                    events: [],
                    video: [],
                    result: [],
                    sharecard: [],
                    clickcount: [],
                    layer: []
                }
            },
            clearLocalStatisticsEvents: function () {
                try {
                    y.statistics.events = [], y.platform.setStorageSync("ylsdk_statistics" + w.ylsdk_app_id, JSON.stringify(y.statistics))
                } catch (e) {}
            },
            randomProbability: function (e) {
                if (y.switchLog && console.log("YLSDK 获取概率结果---概率:" + e), 100 == e) return !0;
                if (0 == e) return !1;
                var o = Math.floor(100 * Math.random());
                return y.switchLog && console.log("YLSDK 获取概率结果---随机概率值:" + o), o <= e
            },
            getNextStrategy: function (e) {
                var o = e + 1;
                y.switchLog && console.log("YLSDK nextStrategyId:", o), o >= y.sharingStrategy.value.length && (o = 0);
                var t = y.sharingStrategy.value[o];
                return 0 == t.num && (y.switchLog && console.log("YLSDK num:", t.num, o), o = D.getNextStrategy(o)), o
            },
            SetAccountID: function (e) {
                y._AccountId = e, D.saveAccountId(e)
            },
            SetAccountPass: function (e) {
                y.accountPass = e, D.saveAccountPass(e)
            },
            res_log: function (e, o, t) {
                0 != o ? console.error("YLSDK ", e + " " + t) : y.switchLog && console.log("YLSDK ", e + " " + t)
            },
            removeItemFrom: function (e) {
                var o = D.getJumpOutInfo(),
                    t = !(!o || "" === o) && JSON.parse(o);
                if (y.boxconfig && 0 < y.boxconfig.length && w.side_min_num < y.boxconfig.length) {
                    for (var n = 0; n < y.boxconfig.length; n++) {
                        var a = y.boxconfig[n];
                        if (a.toAppid === e && 0 == a.innerStatus) {
                            y.switchLog && console.log("YLSDK 隐藏对应appid的所有icon--id:", a._id), y.boxconfig.splice(n, 1);
                            var i = !1,
                                r = new Date;
                            if (t && t.list && 0 < t.list.length)
                                for (var s = 0; s < t.list.length; s++) t.list[s].appid == e && (i = !0);
                            else t = {
                                list: []
                            };
                            i || t.list.push({
                                appid: e
                            }), t.date = r.getTime()
                        }
                    }
                    D.saveJumpOutInfo(JSON.stringify(t))
                }
            },
            saveAccountPass: function (e) {
                L.saveLocalData("SDK_ACCOUNT_PASS" + w.ylsdk_app_id, "" + e), y.switchLog && console.log("YLSDK 设置缓存AccountPass:", e)
            },
            getAccountPass: function () {
                var e = L.getLocalData("SDK_ACCOUNT_PASS" + w.ylsdk_app_id);
                return y.switchLog && console.log("YLSDK 获取缓存AccountPass:", e), e
            },
            saveAccountId: function (e) {
                y.switchLog && console.log("YLSDK 设置缓存account_id:", e), L.saveLocalData("SDK_ACCOUNT_ID" + w.ylsdk_app_id, "" + e)
            },
            getAccountId: function () {
                var e = L.getLocalData("SDK_ACCOUNT_ID" + w.ylsdk_app_id);
                return y.switchLog && console.log("YLSDK 获取缓存account_id:", e), e
            },
            saveJumpOutInfo: function (e) {
                L.saveLocalData("SDK_JUMP_ICON" + w.ylsdk_app_id, e), y.switchLog && console.log("YLSDK 设置卖量跳转记录:", e)
            },
            getJumpOutInfo: function () {
                var e = L.getLocalData("SDK_JUMP_ICON" + w.ylsdk_app_id);
                return y.switchLog && console.log("YLSDK 获取卖量跳转记录:", e), e
            },
            saveUserPlatfromInfo: function (e) {
                L.saveLocalData("SDK_USER_PLATFORM_INFO" + w.ylsdk_app_id, e), y.switchLog && console.log("YLSDK 设置用户" + y.platform_name + "平台信息本地缓存:", e)
            },
            getUserPlatformInfo: function () {
                var e = L.getLocalData("SDK_USER_PLATFORM_INFO" + w.ylsdk_app_id);
                return y.switchLog && console.log("YLSDK 获取用户" + y.platform_name + "平台信息本地缓存:", e), e = "" == e ? null : JSON.parse(e)
            },
            checkJumpOutTime: function () {
                var e = new Date,
                    o = e.getDate(),
                    t = e.getMonth(),
                    n = e.getFullYear(),
                    a = D.getJumpOutInfo(),
                    i = "" !== a && JSON.parse(a);
                if (i && i.date) {
                    var r = new Date(i.date),
                        s = r.getDate(),
                        l = r.getMonth();
                    n == r.getFullYear() && t == l && s == o || D.saveJumpOutInfo("")
                }
            },
            getSharingResults: function (e, o) {
                if (shareSuccess = !1, y.sharingStrategy) {
                    var t = y.sharingStrategy.strategy_id,
                        n = y.sharingStrategy.value[t],
                        a = y.sharingStrategy.time_id;
                    if (y.switchLog && console.log("YLSDK 策略:[" + t + " - " + a + "],time_space:" + e, JSON.stringify(n)), n.time && a < n.time.length) {
                        var i = n.time[a],
                            r = n.prob[a];
                        if (i && 1 < i.length)
                            for (var s = 1; s < i.length; s++)
                                if (e >= i[s - 1] && e <= i[s]) {
                                    var l = r[s - 1];
                                    shareSuccess = D.randomProbability(l)
                                } else if (s == i.length - 1 && e > i[s]) {
                            var c = r[s];
                            shareSuccess = D.randomProbability(c)
                        }
                    }
                    a += 1, shareSuccess || a >= n.time.length ? (y.sharingStrategy.time_id = 0, y.sharingStrategy.count += 1) : y.sharingStrategy.time_id = a, y.sharingStrategy.count >= n.num && (y.sharingStrategy.count = 0, y.sharingStrategy.strategy_id = D.getNextStrategy(t))
                }
                o && o(shareSuccess)
            },
            base64_encode: function (e) {
                for (var o, t, n, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", i = 0, r = e.length, s = ""; i < r;) {
                    if (o = 255 & e.charCodeAt(i++), i == r) {
                        s += a.charAt(o >> 2), s += a.charAt((3 & o) << 4), s += "==";
                        break
                    }
                    if (t = e.charCodeAt(i++), i == r) {
                        s += a.charAt(o >> 2), s += a.charAt((3 & o) << 4 | (240 & t) >> 4), s += a.charAt((15 & t) << 2), s += "=";
                        break
                    }
                    n = e.charCodeAt(i++), s += a.charAt(o >> 2), s += a.charAt((3 & o) << 4 | (240 & t) >> 4), s += a.charAt((15 & t) << 2 | (192 & n) >> 6), s += a.charAt(63 & n)
                }
                return s
            },
            statisticsPlayTime: function () {
                var e = (new Date).getTime();
                y.lastTime || (y.lastTime = e);
                var o = e - y.lastTime,
                    t = {
                        event: "play_time",
                        scene: y.layer ? y.layer : "default",
                        tp: o,
                        time: e
                    };
                v.statisticsEvents([t])
            },
            statisticsBannerClick: function () {
                var e = (new Date).getTime(),
                    o = {
                        event: "banner_click",
                        scene: y.layer ? y.layer : "default",
                        time: e
                    };
                v.statisticsEvents([o])
            },
            createAddFriendButton: function (e, o) {
                y.platform ? (y.friendBtn = y.platform.createAddFriendButton(e), y.friendBtn.onTap(function (e) {
                    console.warn("onTap:" + e)
                }), o && y.friendBtn.show()) : console.error("YLSDK createAddFriendButton sdk_data.platform is ", y.platform)
            },
            setJumpEventCount: function (e, o) {
                var t = "";
                switch (o) {
                    case 0:
                        t = "_success";
                        break;
                    case 1:
                        t = "_fail";
                        break;
                    case 2:
                        t = "_cancel"
                }
                _.ylEventCount(e + t)
            },
            parseGameConfig: function (e, o) {
                if (0 < e.length) {
                    var t = y.gameConfig;
                    e.forEach(function (e) {
                        var o = null;
                        e.value && (o = JSON.parse(e.value)), "b_t_s" === e.code ? (t.bannerTimeSpace = {}, t.bannerTimeSpace.onOff = 1 === o[0], t.bannerTimeSpace.timeSpace = o[1] || 10, o[1] || 0 === o[1] ? w.ylsdk_platform === u && o[1] < 10 && (y.switchLog && console.warn("YLSDK banner定时刷新配置-VIVO平台定时刷新时间不能小于10秒"), t.bannerTimeSpace.timeSpace = 10) : y.switchLog && console.error("YLSDK banner定时刷新配置-定时刷新时间不存在"), t.bannerTimeSpace.forceOnOff = 1 === o[2], t.bannerTimeSpace.forceTimeSpace = o[3] || 3, o[3] || 0 === o[3] || y.switchLog && console.error("YLSDK banner定时刷新配置-强制刷新最小间隔时间不存在")) : "power" === e.code ? (t.Power = {}, t.Power.defaultPower = o[0] || 5, o[0] || 0 === o[0] || y.switchLog && console.error("YLSDK 体力系统-初始体力不存在"), t.Power.powerUpper = o[1] || 5, o[1] || 0 === o[1] || y.switchLog && console.error("YLSDK 体力系统-体力上限不存在"), t.Power.recoveryTime = o[2] || 300, o[2] || 0 === o[2] || y.switchLog && console.error("YLSDK 体力系统-体力自动恢复时间不存在"), t.Power.getPower = o[3] || 1, o[3] || 0 === o[3] || y.switchLog && console.error("YLSDK 体力系统-看视频获得体力值不存在"), t.Power.onOff = 1 === o[4]) : "v_u_c" === e.code ? (t.VideoUnlockCustoms = {}, t.VideoUnlockCustoms.onOff = 1 === o[0], t.VideoUnlockCustoms.openCustoms = o[1] || 2, o[1] || 0 === o[1] || y.switchLog && console.error("YLSDK 视频解锁关卡-第几关开启值不存在"), t.VideoUnlockCustoms.spaceCustoms = o[2] || 0, o[2] || 0 === o[2] || y.switchLog && console.error("YLSDK 视频解锁关卡-每日关卡数不存在")) : "dp_s" === e.code ? (t.depthShield = {}, t.depthShield._type = o[0] || 0, t.depthShield.totalCustoms = o[1] || 5, o[1] || 0 === o[1] || y.switchLog && console.error("YLSDK 深度屏蔽规则-总关卡数不存在"), t.depthShield.goodUserOnOff = 1 === o[2], o[2] || 0 === o[2] || y.switchLog && console.error("YLSDK 深度屏蔽规则-优质用户判断开关不存在"), t.depthShield.watchTvNum = o[3] || 2, o[3] || 0 === o[3] || y.switchLog && console.error("YLSDK 深度屏蔽规则-观看视频数量不存在"), t.depthShield.dayCustoms = o[4] || 0, o[4] || 0 === o[4] || y.switchLog && console.error("YLSDK 深度屏蔽规则-关卡间隔数/对局数组不存在")) : "m_t" === e.code && (t.mistouchTimer = {}, t.mistouchTimer.onOff = 1 === o[0], t.mistouchTimer.startTime_h = o[1] || 0, o[1] || 0 === o[1] || y.switchLog && console.error("YLSDK 定时开关误触-开始时间“时”不存在"), t.mistouchTimer.startTime_m = o[2] || 0, o[2] || 0 === o[2] || y.switchLog && console.error("YLSDK 定时开关误触-开始时间“分”不存在"), t.mistouchTimer.endTime_h = o[3] || 23, o[3] || 0 === o[3] || y.switchLog && console.error("YLSDK 定时开关误触-结束时间“时”不存在"), t.mistouchTimer.endTime_m = o[4] || 59, o[4] || 0 === o[4] || y.switchLog && console.error("YLSDK 定时开关误触-结束时间“分”不存在"))
                    }), y.gameConfig = t, y.gameConfig.isServerData = !0
                }
                D.initTodayPlayNums(), D.initPower(), y.switchLog && console.log("YLSDK sdk_data.gameConfig:", JSON.stringify(y.gameConfig)), o && o("config_success")
            },
            checkMistouchTimer: function () {
                if (y.gameConfig && y.gameConfig.mistouchTimer) {
                    if (y.gameConfig.mistouchTimer.onOff) {
                        var e = y.gameConfig.mistouchTimer,
                            o = e.startTime_h || 0,
                            t = e.startTime_m || 0,
                            n = e.endTime_h || 23,
                            a = e.endTime_m || 59,
                            i = new Date,
                            r = i.getHours(),
                            s = i.getMinutes();
                        return y.switchLog && console.log("YLSDK checkMistouchTimer- " + o + ":" + t + " > " + r + ":" + s + " < " + n + ":" + a), !!(r < o || r == o && s <= t || n < r || r == n && a <= s)
                    }
                    return !0
                }
                return !1
            },
            getDeepTouch: function (e) {
                if (1 != y.switchTouchAll) return !1;
                if (!D.checkMistouchTimer()) return !1;
                if (y.gameConfig && y.gameConfig.depthShield) {
                    var o = y.gameConfig.depthShield,
                        t = o.totalCustoms || 0;
                    return y.switchLog && console.log("YLSDK getDeepTouch-depthShield._type:", o._type), 0 !== o._type ? 1 == o._type ? (y.switchLog && console.log("YLSDK getDeepTouch-toalNum,toalByTodayNum:", y.gameConfig.toalNum, y.gameConfig.toalByTodayNum), y.switchLog && console.log("YLSDK getDeepTouch-totalCustoms,dayCustoms:", o.totalCustoms, o.dayCustoms[0]), (!o.totalCustoms || y.gameConfig.toalNum > o.totalCustoms) && ((!o.dayCustoms || y.gameConfig.toalByTodayNum > o.dayCustoms[0]) && D.checkGoodUser(o))) : (y.switchLog && console.log("YLSDK getDeepTouch-customNum:", e), y.switchLog && console.log("YLSDK getDeepTouch-totalCustoms,SpaceCustom:", o.totalCustoms, o.dayCustoms[0]), e || 0 === e ? t <= e && (o.dayCustoms && 0 != o.dayCustoms.length ? (e == t || (e - t) % (o.dayCustoms[0] + 1) == 0) && D.checkGoodUser(o) : (y.switchLog && console.log("YLSDK getDeepTouch-depthShield.dayCustoms is null or empty"), !1)) : (y.switchLog && console.log("YLSDK getDeepTouch-customNum is ", e), !1)) : D.checkGoodUser(o)
                }
            },
            isGoodUser: function () {
                var e = !1;
                return e = !y.gameConfig.depthShield.watchTvNum && 0 !== y.gameConfig.depthShield.watchTvNum || (y.switchLog && console.log("YLSDK isGoodUser--" + y.gameConfig.watchTvNum + " > " + y.gameConfig.depthShield.watchTvNum), y.gameConfig.watchTvNum > y.gameConfig.depthShield.watchTvNum), y.switchLog && console.log("YLSDK isGoodUser:", e), e
            },
            checkGoodUser: function (e) {
                return y.switchLog && console.log("YLSDK checkGoodUser:", e.goodUserOnOff), !e.goodUserOnOff || !D.isGoodUser()
            },
            initTodayPlayNums: function () {
                var e = L.getLocalData("SDK_TODAY_PLAY_NUMS_ID_" + w.ylsdk_app_id),
                    o = L.getLocalData("SDK_TOTAL_PLAY_NUMS_ID_" + w.ylsdk_app_id),
                    t = L.getLocalData("SDK_TODAY_WATCH_TV_NUMS_ID_" + w.ylsdk_app_id),
                    n = L.getLocalData("SDK_LAST_WATCH_TIME_ID_" + w.ylsdk_app_id),
                    a = L.getLocalData("SDK_LAST_PLAY_TIME_ID_" + w.ylsdk_app_id),
                    i = L.getLocalData("SDK_MAX_CUSTOM_ID_" + w.ylsdk_app_id),
                    r = L.getLocalData("SDK_LAST_CUSTOM_ID_" + w.ylsdk_app_id),
                    s = new Date;
                e = "" == e ? 0 : parseInt(e), o = "" == o ? 0 : parseInt(o), t = "" == t ? 0 : parseInt(t), i = "" == i ? 0 : parseInt(i), r = "" == r ? 0 : parseInt(r), y.switchLog && console.log("YLSDK initTodayPlayNums-nowTime:" + s.getTime() + ",lastWatch:" + n + ",lastPlay:" + a), "" == n ? (n = s.getTime(), L.saveLocalData("SDK_LAST_WATCH_TIME_ID_" + w.ylsdk_app_id, n)) : n = parseInt(n), "" == a ? (a = s.getTime(), L.saveLocalData("SDK_LAST_PLAY_TIME_ID_" + w.ylsdk_app_id, a)) : a = parseInt(a);
                var l = s.getFullYear(),
                    c = s.getMonth() + 1,
                    d = s.getDate(),
                    g = new Date(n),
                    u = g.getFullYear(),
                    f = g.getMonth() + 1,
                    m = g.getDate(),
                    h = new Date(a),
                    p = h.getFullYear(),
                    _ = h.getMonth() + 1,
                    S = h.getDate();
                y.switchLog && console.log("YLSDK initTodayPlayNums-now:" + l + "-" + c + "-" + d + " ,lwatch:" + u + "-" + f + "-" + m + " ,lplay:" + p + "-" + _ + "-" + S), l == u && c == f && d == m || (t = 0, n = s.getTime(), L.saveLocalData("SDK_TODAY_WATCH_TV_NUMS_ID_" + w.ylsdk_app_id, y.gameConfig.watchTvNum), L.saveLocalData("SDK_LAST_WATCH_TIME_ID_" + w.ylsdk_app_id, n)), l == p && c == _ && d == S || (e = 0, a = s.getTime(), L.saveLocalData("SDK_TODAY_PLAY_NUMS_ID_" + w.ylsdk_app_id, y.gameConfig.toalByTodayNum), L.saveLocalData("SDK_LAST_PLAY_TIME_ID_" + w.ylsdk_app_id, a)), y.gameConfig.toalByTodayNum = e, y.gameConfig.toalNum = o, y.gameConfig.watchTvNum = t, y.gameConfig.maxCustom = i, y.gameConfig.lastCustom = r
            },
            addPlayNums: function (e) {
                if (e) try {
                    e = parseInt(e), y.gameConfig.lastCustom = e;
                    var o = L.getLocalData("SDK_MAX_CUSTOM_ID_" + w.ylsdk_app_id);
                    (o = "" == o ? 0 : parseInt(o)) < e && (o = e, L.saveLocalData("SDK_MAX_CUSTOM_ID_" + w.ylsdk_app_id, o), y.gameConfig.maxCustom = o), L.saveLocalData("SDK_LAST_CUSTOM_ID_" + w.ylsdk_app_id, e), y.switchLog && console.log("YLSDK addPlayNums-customNum,maxCustom:", e, o)
                } catch (e) {
                    console.error("YLSDK addPlayNums error e:", e)
                }
                y.gameConfig.toalByTodayNum += 1, y.gameConfig.toalNum += 1, y.switchLog && console.log("YLSDK addPlayNums-toalNum,toalByTodayNum:", y.gameConfig.toalNum, y.gameConfig.toalByTodayNum), L.saveLocalData("SDK_TODAY_PLAY_NUMS_ID_" + w.ylsdk_app_id, y.gameConfig.toalByTodayNum), L.saveLocalData("SDK_TOTAL_PLAY_NUMS_ID_" + w.ylsdk_app_id, y.gameConfig.toalNum), L.saveLocalData("SDK_LAST_PLAY_TIME_ID_" + w.ylsdk_app_id, (new Date).getTime())
            },
            addWatchTVnums: function (e) {
                y.gameConfig.watchTvNum += 1, L.saveLocalData("SDK_TODAY_WATCH_TV_NUMS_ID_" + w.ylsdk_app_id, y.gameConfig.watchTvNum), L.saveLocalData("SDK_LAST_WATCH_TIME_ID_" + w.ylsdk_app_id, (new Date).getTime()), e && D.addVideoUnlockCustoms(e)
            },
            getVideoUnlock: function (o) {
                var t = !1;
                if (y.gameConfig && y.gameConfig.VideoUnlockCustoms) {
                    var e = y.gameConfig.VideoUnlockCustoms,
                        n = e.openCustoms || 0,
                        a = e.spaceCustoms || 0;
                    if (e.onOff)
                        if (o == n) t = !0;
                        else if (n < o && (o - n) % (a + 1) == 0) t = !0;
                    else {
                        var i = D.getVideoUnlockCustoms();
                        i && 0 < i.length && i.forEach(function (e) {
                            o == e && (t = !0)
                        })
                    }
                    y.switchLog && console.log("YLSDK getVideoUnlock-customNum,openCustoms,spaceCustoms,unlock:", o, n, a, t)
                }
                return t
            },
            initPower: function () {
                if (y.gameConfig.Power.onOff) {
                    var e = 0;
                    y.switchLog && console.log("YLSDK initPower-Power:", JSON.stringify(y.gameConfig.Power)), y.gameConfig && y.gameConfig.Power && y.gameConfig.Power.defaultPower && (e = y.gameConfig.Power.defaultPower || 0);
                    var o = L.getLocalData("SDK_POWER_NUM_ID_" + w.ylsdk_app_id);
                    o = "" == o ? e : parseInt(o), y.switchLog && console.log("YLSDK initPower-powerNum:", o), _.ylSetPower(o)
                } else y.switchLog && console.log("YLSDK initPower--onOff is off")
            },
            savePowerLocal: function () {
                L.saveLocalData("SDK_POWER_NUM_ID_" + w.ylsdk_app_id, y.userPowerNum), y.switchLog && console.log("YLSDK savePowerLocal-powerNum:", y.userPowerNum)
            },
            addPower: function (e) {
                if (y.gameConfig.Power.onOff) {
                    if (y.gameConfig && y.gameConfig.Power) {
                        var o = _.ylGetPower();
                        if (1 == e) {
                            var t = y.gameConfig.Power.getPower;
                            t && (o += t)
                        } else 2 == e && (o += 1);
                        y.powerChangeCB && y.powerChangeCB(e), _.ylSetPower(o)
                    }
                } else y.switchLog && console.log("YLSDK addPower--onOff is off")
            },
            powerRecoveryTimer: function (e) {
                y.switchLog && console.log("YLSDK powerRecoveryTimer-delay:", e), 0 < e && (y.powerRtimer && (clearTimeout(y.powerRtimer), y.powerRtimer = null), y.powerRtimer = setTimeout(function () {
                    L.removeBannerAd(), D.powerRecoveryTimer(e), D.addPower(2)
                }, 1e3 * e))
            },
            getVideoUnlockCustoms: function () {
                var e = L.getLocalData("SDK_WATCH_TV_UNLOCK_CUSTOMS_ID_" + w.ylsdk_app_id);
                return e = e && "0" != e && "" != e ? JSON.parse(e) : new Array, y.switchLog && console.log("YLSDK getVideoUnlockCustoms-sUnlockNum:", e), e
            },
            addVideoUnlockCustoms: function (o) {
                var e = D.getVideoUnlockCustoms(),
                    t = !1;
                e && 0 < e.length && e.forEach(function (e) {
                    e == o && (t = !0)
                }), t || e.push(o);
                var n = JSON.stringify(e);
                y.switchLog && console.log("YLSDK addVideoUnlockCustoms-unlockCustomNum:", o, n), L.saveLocalData("SDK_WATCH_TV_UNLOCK_CUSTOMS_ID_" + w.ylsdk_app_id, n)
            }
        }
}();