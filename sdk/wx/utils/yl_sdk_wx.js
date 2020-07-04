"use strict";
! function () {
    for (var e, n, h = require("./yl_sdk_conf"), _ = require("./yl_sdk"), t = ["ylInitSDK", "ylGetInviteAccount", "ylGetUserInfo", "ylGetSwitchInfo", "ylLog", "ylStatisticViedo", "ylStatisticResult", "ylStoreValue", "ylGetAppID", "ylEventCount", "ylGetCustom", "ylShowShareOrVideo", "ylUseShareOrVideoStrategy", "ylChangeView", "ylGetDeepTouch", "ylOverGame", "ylVideoUnlock", "ylGetPowerInfo", "ylOnPowerChange", "ylSetPower", "ylGetPower", "ylSideBox", "ylIntegralWall", "ylGetBoardAward", "ylShareAppMessage", "ylNavigateToMiniProgram", "ylUserInfoButtonShow", "ylUserInfoButtonHide", "ylBannerAdCreateSmall", "ylGetLeftTopBtnPosition", "ylGetUserWXInfo", "ylBannerAdCreateByStyle", "ylChangeBannerStyle", "ylBannerAdCreate", "ylBannerAdShow", "ylBannerAdHide", "ylCreateVideoAd", "ylShowVideoAd", "ylShowVideoAd2", "ylStatisticShareCard", "ylShareCard", "ylGetPlayCount", "ylGetPlayCustom", "ylGetWatchTvNum", "ylGameLifeListen", "ylCreateGridAd", "ylShowGridAd", "ylHideGridAd", "ylCreateInterstitialAd", "ylShowInterstitialAd", "ylSubscribeSysMsg", "ylSubscribeMsg", "ylGetSetting", "ylRewardByVideoOrShare", "ylGetVSLimit", "ylGetSharingResults", "ylGetLayerList", "ylStatisticLayer", "ylGetServerInfo"], S = {
            bannerAd: null,
            videoAd: null,
            interstitialAd: null,
            gridAd: null,
            bannerTimer: null,
            _timer: null,
            unlockCustomNum: !1,
            userInfoBtn: null,
            onVideoClose: null,
            show_video: !1,
            switchLog: h.ylsdk_debug_model,
            show_share: !1,
            jump_out: !1,
            defaultbTS: 10,
            shareCallBack: null,
            onShare: null,
            hideTime: null,
            VIDEO_PLAY_FAIL: 0,
            VIDEO_PLAY_FINISH: 1,
            VIDEO_PLAY_CANCEL: 2,
            lifeListen: null,
            intstLastTime: 0
        }, o = {
            LD_KEY_AP: "SDK_ACCOUNT_PASS_" + h.ylsdk_app_id,
            LD_KEY_TDPNI: "SDK_TODAY_PLAY_NUMS_ID_" + h.ylsdk_app_id,
            LD_KEY_TTPNI: "SDK_TOTAL_PLAY_NUMS_ID_" + h.ylsdk_app_id,
            LD_KEY_TDWTNI: "SDK_TODAY_WATCH_TV_NUMS_ID_" + h.ylsdk_app_id,
            LD_KEY_LWTI: "SDK_LAST_WATCH_TIME_ID_" + h.ylsdk_app_id,
            LD_KEY_LPTI: "SDK_LAST_PLAY_TIME_ID_" + h.ylsdk_app_id,
            LD_KEY_MCI: "SDK_MAX_CUSTOM_ID_" + h.ylsdk_app_id,
            LD_KEY_LCI: "SDK_LAST_CUSTOM_ID_" + h.ylsdk_app_id,
            LD_KEY_PNI: "SDK_POWER_NUM_ID_" + h.ylsdk_app_id,
            LD_KEY_WTUCI: "SDK_WATCH_TV_UNLOCK_CUSTOMS_ID_" + h.ylsdk_app_id,
            LD_KEY_JI: "SDK_JUMP_ICON_" + h.ylsdk_app_id,
            LD_KEY_AI: "SDK_ACCOUNT_ID_" + h.ylsdk_app_id,
            LD_KEY_STST: "SDK_STATISTICS_" + h.ylsdk_app_id,
            LD_KEY_UPI: "SDK_USER_PLATFORM_INFO_" + h.ylsdk_app_id,
            LD_KEY_VSFL: "VIDEO_SHARE_FALSE_LIMIT" + h.ylsdk_app_id,
            LD_KEY_SCL: "SDK_COUNTED_LIST" + h.ylsdk_app_id
        }, y = 0, f = 1, w = 2, i = 3, A = 4, r = 5, g = {
            ylInitSDK: function (e) {
                S.intstLastTime = (new Date).getTime(), _.login(e)
            },
            ylGetInviteAccount: function () {
                return _.getInviteAccount()
            },
            ylGetUserInfo: function () {
                return _.getUserInfo()
            },
            ylGetSwitchInfo: function () {
                return _.getSwitchInfo()
            },
            ylLog: function (e, n) {
                _.logs(e, n)
            },
            ylStatisticViedo: function (e, n, t) {
                _.statisticViedo(e, n, t)
            },
            ylStatisticResult: function (e, n) {
                _.statisticResult(e, n)
            },
            ylStoreValue: function (e, n) {
                _.storeValue(e, n)
            },
            ylGetAppID: function () {
                return h.ylsdk_app_id
            },
            ylEventCount: function (e, n) {
                _.eventCount(e, n)
            },
            ylGetCustom: function (e) {
                _.getCustom(e)
            },
            ylShowShareOrVideo: function (e, n, t) {
                _.showShareOrVideo(e, n, t)
            },
            ylUseShareOrVideoStrategy: function (e, n, t) {
                _.useShareOrVideoStrategy(e, n, t)
            },
            ylChangeView: function (e) {
                if (S.bannerAd) {
                    var n = _.getGameConfig();
                    if (n && n.bannerTimeSpace && n.bannerTimeSpace.forceOnOff) {
                        var t = n.bannerTimeSpace,
                            o = (new Date).getTime(),
                            i = S.bannerAd.lastTime || o,
                            r = t.forceTimeSpace || S.defaultbTS;
                        if (console.warn("YLSDK ylChangeView-forceTimeSpace:", o - i, " >= ", 1e3 * r), 1e3 * r <= o - i) {
                            var a = !0;
                            if (S.bannerAd.show_banner) {
                                a = S.bannerAd.isSmall || !1;
                                var s = S.bannerAd._onResize || null;
                                L.createBannerAd(a, !0, null, S.bannerAd._style, e, s)
                            } else S.bannerAd.lastTime = o - (1e3 * t.timeSpace + 1e3)
                        }
                    }
                } else S.switchLog && console.warn("YLSDK ylChangeView-pf_data.bannerAd is ", S.bannerAd)
            },
            ylGetDeepTouch: function (e) {
                return _.getDeepTouch(e)
            },
            ylOverGame: function (e) {
                _.overGame(e)
            },
            ylVideoUnlock: function (e) {
                return _.videoUnlock(e)
            },
            ylGetPowerInfo: function (e) {
                _.getPowerInfo(e)
            },
            ylOnPowerChange: function (e) {
                _.onPowerChange(e)
            },
            ylSetPower: function (e) {
                _.setPower(e)
            },
            ylGetPower: function () {
                return _.getPower()
            },
            ylGameLifeListen: function (e) {
                S.lifeListen = e
            },
            ylGetLeftTopBtnPosition: function () {
                if (L.hasFun(wx.getMenuButtonBoundingClientRect, "wx.getMenuButtonBoundingClientRect")) {
                    var e = wx.getMenuButtonBoundingClientRect(),
                        n = cc.director.getWinSize(),
                        t = n.height / m.screenHeight,
                        o = n.width / m.screenWidth,
                        i = e.height * t,
                        r = e.width * o,
                        a = n.height / 2 - (e.top + e.height / 2) * t;
                    return {
                        x: (m.screenWidth - e.right) * o - n.width / 2,
                        y: a,
                        width: r,
                        height: i
                    }
                }
                return null
            },
            ylSideBox: function (e) {
                _.getSideBox(e)
            },
            ylIntegralWall: function (e) {
                _.getIntegralWall(e)
            },
            ylGetBoardAward: function (e, n) {
                _.getBoardAward(e, n)
            },
            ylShareCard: function (e, n) {
                _.shareCard(e, n)
            },
            ylGetPlayCount: function (e) {
                return 1 == e ? L.getLD(o.LD_KEY_TDPNI) : L.getLD(o.LD_KEY_TTPNI)
            },
            ylGetPlayCustom: function (e) {
                return 1 == e ? L.getLD(o.LD_KEY_LCI) : L.getLD(o.LD_KEY_MCI)
            },
            ylGetWatchTvNum: function () {
                return L.getLD(o.LD_KEY_TDWTNI)
            },
            ylBannerAdCreate: function (e, n, t) {
                L.createBannerAd(!1, e, n, null, t, null)
            },
            ylBannerAdCreateSmall: function (e, n, t) {
                L.createBannerAd(!0, e, n, null, t, null)
            },
            ylBannerAdCreateByStyle: function (e, n, t, o, i) {
                L.createBannerAd(!1, n, t, e, o, i)
            },
            ylChangeBannerStyle: function (e) {
                L.changeBannerStyle(e)
            },
            ylBannerAdShow: function () {
                L.showBannerAd()
            },
            ylBannerAdHide: function () {
                L.hideBannerAd()
            },
            ylGetUserWXInfo: function () {
                return L.getUserPlatFormInfo()
            },
            ylCreateVideoAd: function () {
                L.createVideoAd()
            },
            ylShowVideoAd: function (e, n) {
                L.showVideoAd(e, n, null)
            },
            ylShowVideoAd2: function (e) {
                e ? L.showVideoAd(e.callBack, e.unlockCustomNum, e.getPower) : console.warn("YLSDK ylShowVideoAd2 缺少参数")
            },
            ylStatisticShareCard: function (e) {
                _.statisticShareCard(e)
            },
            ylShareAppMessage: function (e, n) {
                L.shareAppMessage_2(e, n)
            },
            ylNavigateToMiniProgram: function (e, n) {
                L.navigateToMiniProgram(e, n)
            },
            ylUserInfoButtonShow: function (e, n) {
                L.showUserInfoButton(e, n)
            },
            ylUserInfoButtonHide: function () {
                L.hideUserInfoButton()
            },
            ylCreateGridAd: function (e) {
                if (L.hasFun(wx.createGridAd, "wx.createGridAd")) {
                    var n = Math.floor(Math.random() * h.ylsdk_grid_ids.length),
                        t = h.ylsdk_grid_ids[n];
                    S.gridAd ? S.gridAd && (S.gridAd.adUnitId = t) : (S.gridAd = wx.createGridAd({
                        adUnitId: t,
                        adTheme: e.adTheme,
                        gridCount: e.gridCount,
                        style: e.style
                    }), _.gridAdTJ({
                        type: y,
                        adId: t
                    }), S.gridAd.onLoad(function () {
                        _.gridAdTJ({
                            type: f,
                            adId: t
                        }), S.switchLog && console.log("YLSDK GridAd.onLoad")
                    }), S.gridAd.onError(function (e) {
                        _.gridAdTJ({
                            type: w,
                            adId: t
                        }), S.switchLog && console.warn("YLSDK GridAd.onError:", e, S.gridAd.adUnitId)
                    })), e.show && g.ylShowGridAd()
                }
            },
            ylShowGridAd: function () {
                S.gridAd && S.gridAd.show().catch(function (e) {
                    _.gridAdTJ({
                        type: A,
                        adId: S.gridAd.adUnitId
                    }), S.switchLog && console.log("YLSDK GridAd.show")
                })
            },
            ylHideGridAd: function () {
                console.log("YLSDK 隐藏格子广告"), S.gridAd && S.gridAd.hide().catch(function (e) {
                    S.switchLog && console.log("YLSDK GridAd.hide")
                })
            },
            ylCreateInterstitialAd: function (e, n) {
                if (console.log("YLSDK ylCreateInterstitialAd-show:", e), L.hasFun(wx.createInterstitialAd, "wx.createInterstitialAd")) {
                    if (!L.canCreateInterstitial()) return void(n && n(0));
                    var t = Math.floor(Math.random() * h.ylsdk_interstitial_ids.length),
                        o = h.ylsdk_interstitial_ids[t];
                    S.interstitialAd && S.interstitialAd.destroy && S.interstitialAd.destroy(), S.interstitialAd = null, S.interstitialAd = wx.createInterstitialAd({
                        adUnitId: o
                    }), _.interstitialAdTJ({
                        type: y,
                        adId: o
                    }), S.interstitialAd.onLoad(function () {
                        _.interstitialAdTJ({
                            type: f,
                            adId: o
                        }), e ? g.ylShowInterstitialAd(n) : n && n(1), S.switchLog && console.log("YLSDK InterstitialAd.onLoad")
                    }), S.interstitialAd.load(), S.interstitialAd.onClose(function (e) {
                        _.interstitialAdTJ({
                            type: r,
                            adId: o
                        }), n && n(2), S.switchLog && console.log("YLSDK InterstitialAd.onClose")
                    }), S.interstitialAd.onError(function (e) {
                        _.interstitialAdTJ({
                            type: w,
                            adId: o
                        }), S.switchLog && console.warn("YLSDK InterstitialAd.onError:", e, S.interstitialAd.adUnitId), n && n(0)
                    })
                }
            },
            ylShowInterstitialAd: function () {
                S.interstitialAd && (S.interstitialAd.show(), _.interstitialAdTJ({
                    type: A,
                    adId: S.interstitialAd.adUnitId
                }))
            },
            ylSubscribeMsg: function (e, n) {
                L.hasFun(wx.requestSubscribeMessage, "wx.requestSubscribeMessage") ? wx.requestSubscribeMessage({
                    tmplIds: e,
                    success: function (e) {
                        S.switchLog && console.log("YLSDK wx.requestSubscribeMessage-success:", JSON.stringify(e)), n && n(e)
                    },
                    fail: function (e) {
                        n && n(!1), S.switchLog && console.log("YLSDK wx.requestSubscribeMessage-fail:", JSON.stringify(e))
                    }
                }) : n && n(!1)
            },
            ylSubscribeSysMsg: function (e, n) {
                L.hasFun(wx.requestSubscribeSystemMessage, "wx.requestSubscribeSystemMessage") ? wx.requestSubscribeSystemMessage({
                    msgTypeList: e,
                    success: function (e) {
                        S.switchLog && console.log("YLSDK wx.requestSubscribeSystemMessage-success:", JSON.stringify(e)), n && n(e)
                    },
                    fail: function (e) {
                        n && n(!1), S.switchLog && console.log("YLSDK wx.requestSubscribeSystemMessage-fail:", JSON.stringify(e))
                    }
                }) : n && n(!1)
            },
            ylGetSetting: function (n, e) {
                L.hasFun(wx.getSetting, "wx.getSetting") && wx.getSetting({
                    withSubscriptions: e || !1,
                    success: function (e) {
                        n && n(e), S.switchLog && console.log("YLSDK wx.getSetting-success:", JSON.stringify(e))
                    },
                    fail: function (e) {
                        n && n(!1), S.switchLog && console.log("YLSDK wx.getSetting-fail:", JSON.stringify(e))
                    }
                })
            },
            ylGetSharingResults: function (e, n) {
                var t = "YLSDK ylGetSharingResults not parameter ";
                e ? e.showTime ? e.channel ? e.module ? _.getSharingResults(e, n) : console.warn(t + "module") : console.warn(t + "channel") : console.warn(t + "showTime") : console.warn(t + "shareInfo")
            },
            ylGetLayerList: function (e) {
                _.getLayerList(e)
            },
            ylStatisticLayer: function (e) {
                _.statisticLayer(e)
            },
            ylRewardByVideoOrShare: function (e) {
                return _.rewardByVideoOrShare(e)
            },
            ylGetVSLimit: function () {
                return _.getVSLimit()
            },
            ylGetServerInfo: function (e) {
                _.getServerInfo(e)
            }
        }, a = 0; a < t.length; a++) n = g[e = t[a]], Object.defineProperty(wx, e, {
        value: n,
        writable: !1,
        enumerable: !0,
        configurable: !0
    });
    var L = {
            canCreateInterstitial: function () {
                var e = ((new Date).getTime() - S.intstLastTime) / 1e3,
                    n = !1;
                (S.switchLog && console.log("YLSDK canCreateInterstitial-time_space:", e), S.interstitialAd) ? n = (h.interstitial_first_show || 0) <= e: n = (h.interstitial_space || 0) <= e;
                return n || S.switchLog && console.warn("YLSDK 创建插屏广告太频繁，请稍后再试"), n
            },
            getLD: function (n) {
                try {
                    var e = null;
                    return L.hasFun(wx.getStorageSync, "wx.getStorageSync") && (e = wx.getStorageSync(n)), null != e && void 0 !== e && "undefined" !== e && "" !== e || (e = ""), e
                } catch (e) {
                    console.error("YLSDK getLocalData error key:" + n + ", e:", e)
                }
                return ""
            },
            loginPF: function (o, i) {
                var e = {
                    success: function (e) {
                        var n = e.code,
                            t = {
                                code: n,
                                needPass: !1,
                                pkgName: m.pkg_name
                            };
                        n || (t.code = e.anonymousCode, t.pkgName = "anonymousCode"), o.loginInfo ? (o.loginInfo.code = n || "", o.loginInfo.token = n || "", o.loginInfo.pkgName = t.pkgName || "") : o.loginInfo = {
                            code: n || "",
                            token: n || "",
                            pkgName: t.pkgName || ""
                        }, _.setLoginInfo(o.loginInfo), S.switchLog && console.log("YLSDK loginInfo:", JSON.stringify(o.loginInfo)), S.switchLog && console.log("YLSDK wx.login-登录成功:", e), _.loginSDKServer(t, i)
                    },
                    fail: function (e) {
                        S.switchLog && console.error("YLSDK wx.login-登录失败", e), i && i(!1)
                    }
                };
                console.warn("----login_info:", e), L.hasFun(wx.login, "wx.login") && wx.login(e)
            },
            saveLD: function (n, e) {
                try {
                    L.hasFun(wx.setStorageSync, "wx.setStorageSync") && wx.setStorageSync(n, e)
                } catch (e) {
                    console.error("YLSDK saveLocalData errorkey:" + n + ", e:", e)
                }
            },
            hasFun: function (e, n) {
                var t = !0;
                return e ? t = !0 : (t = !1, console.warn("YLSDK function " + n + " is ", e)), t
            },
            getLOS: function () {
                var e = null;
                return L.hasFun(wx.getLaunchOptionsSync, "wx.getLaunchOptionsSync") && (e = wx.getLaunchOptionsSync()), e
            },
            removeBannerAd: function () {
                S.bannerAd && (S.bannerTimer && (clearTimeout(S.bannerTimer), S.bannerTimer = null), S.bannerAd.hide(), S.bannerAd.destroy(), S.bannerAd = null)
            },
            createBannerAd: function (t, o, i, r, a, s) {
                if (console.log("YLSDK createBannerAd-isSmall, show, _callback, _style,misToch:", t, o, i, JSON.stringify(r), a), h.ylsdk_banner_ids && 0 != h.ylsdk_banner_ids.length) {
                    var e = Math.floor(Math.random() * h.ylsdk_banner_ids.length),
                        l = h.ylsdk_banner_ids[e];
                    S.bannerAd && L.removeBannerAd();
                    var d = _.getGameConfig(),
                        n = t ? 300 : m.windowWidth,
                        c = {
                            left: (m.windowWidth - n) / 2,
                            top: m.windowHeight - .28695 * m.windowWidth,
                            width: n
                        },
                        u = {
                            adUnitId: l,
                            style: c,
                            adIntervals: 31
                        };
                    r && (u.style = r), S.bannerAd = wx.createBannerAd(u), _.statisticsBanner({
                        type: y,
                        adId: l
                    }), S.bannerAd._onResize = s;
                    var g = d && d.bannerTimeSpace && d.bannerTimeSpace.onOff;
                    g && (S.bannerAd.isSmall = t), S.bannerAd._style = r, S.bannerAd.onLoad(function () {
                        S.switchLog && console.log("YLSDK wx.createBannerAd---onLoad 广告加载成功"), i && i(!0), _.statisticsBanner({
                            type: f,
                            adId: l
                        }), o && !S.bannerAd.hide_banner && (_.statisticsBanner({
                            type: A,
                            adId: l
                        }), L.showBannerAd())
                    }), S.bannerAd.onError(function (e) {
                        if (S.switchLog && console.warn("YLSDK wx.createBannerAd---onError:", e), S.bannerAd = null, _.statisticsBanner({
                                type: w,
                                adId: l
                            }), g) {
                            var n = d.bannerTimeSpace.timeSpace || 10;
                            S.switchLog && console.log("YLSDK 将在" + n + "秒后重新创建banner(调用ylBannerAdHide会取消重试)"), L.delayUpdateBanner(n, t, o, r, a, s), i && i(!1)
                        }
                    }), S.bannerAd.onResize(function (e) {
                        S.bannerAd && (s ? s(e) : r ? S.bannerAd.style = r : (S.bannerAd.style.top = m.windowHeight - e.height, S.bannerAd.style.left = (m.windowWidth - e.width) / 2), S.switchLog && console.log("YLSDK wx.createBannerAd---onResize:", S.bannerAd.style.realWidth, S.bannerAd.style.realHeight, S.bannerAd.style.top))
                    }), S.bannerAd.misToch = a || !1
                } else console.error("YLSDK 请在配置文件中配置banner ID")
            },
            changeBannerStyle: function (e) {
                S.bannerAd && e && (e.left && (S.bannerAd.style.left = e.left), e.top && (S.bannerAd.style.top = e.top), e.width && (S.bannerAd.style.width = e.width), e.height && (S.bannerAd.style.height = e.height), S.bannerAd._style = e)
            },
            delayUpdateBanner: function (e, n, t, o, i, r) {
                S.switchLog && console.log("YLSDK delayUpdateBanner-delay,isSmall,show:", e, n, t), 0 < e && (S.bannerTimer && (clearTimeout(S.bannerTimer), S.bannerTimer = null), S.bannerTimer = setTimeout(function () {
                    S.bannerAd.show_banner && L.createBannerAd(n, t, null, o, i, r)
                }, 1e3 * e))
            },
            showBannerAd: function () {
                S.switchLog && console.log("YLSDK BannerAd.show");
                var e = !0,
                    n = !1,
                    t = !1,
                    o = !1,
                    i = null,
                    r = null,
                    a = S.defaultbTS,
                    s = _.getGameConfig();
                if (s && s.bannerTimeSpace && (t = s.bannerTimeSpace.onOff || !1, a = s.bannerTimeSpace.timeSpace || S.defaultbTS), S.bannerAd) {
                    t && (e = S.bannerAd.isSmall || !1), o = S.bannerAd.misToch, i = S.bannerAd._style, r = S.bannerAd._onResize;
                    var l = (new Date).getTime(),
                        d = S.bannerAd.lastTime || l;
                    t && 1e3 * a <= l - d && (n = !0, S.switchLog && console.log("YLSDK showBannerAd-createBannerAd:", n), L.createBannerAd(e, !0, null, i, o, r)), n || (S.bannerAd.show(), S.bannerAd.show_banner = !0, S.bannerAd.hide_banner = !1), S.bannerAd.lastTime = l
                } else S.switchLog && console.warn("YLSDK not BannerAd");
                !n && t && L.delayUpdateBanner(a, e, !0, i, o, r)
            },
            hideBannerAd: function () {
                S.switchLog && console.log("YLSDK BannerAd.hide"), S.bannerAd && (S.bannerTimer && (clearTimeout(S.bannerTimer), S.bannerTimer = null), S.bannerAd.hide(), S.bannerAd.hide_banner = !0, S.bannerAd.show_banner = !1)
            },
            getUserPlatFormInfo: function () {
                return _.getUserPlatFormInfo()
            },
            createVideoAd: function () {
                var e = Math.floor(Math.random() * h.ylsdk_video_ids.length),
                    n = h.ylsdk_video_ids[e];
                if (S.videoAd) {
                    if (S.videoAd.ad_unit_id === n) return;
                    S.videoAd.ad_unit_id = n
                } else L.hasFun(wx.createRewardedVideoAd, "wx.createRewardedVideoAd") && (S.videoAd = wx.createRewardedVideoAd({
                    adUnitId: n
                }), S.videoAd._ad_id = n, _.statisticViedo(y, n), S.videoAd.ad_unit_id = n, S.getPower = !1, S.videoAd.onClose(function (e) {
                    S.show_video = !1, e && e.isEnded || void 0 === e ? (S.switchLog && console.log("YLSDK 视频播放完成"), S.onVideoClose && S.onVideoClose(S.VIDEO_PLAY_FINISH), S.onVideoClose = null, _.addWatchTVnums(S.unlockCustomNum), S.getPower && _.addPower(1)) : (S.onVideoClose && S.onVideoClose(S.VIDEO_PLAY_CANCEL), S.onVideoClose = null, S.switchLog && console.warn("YLSDK 视频播放取消")), S.unlockCustomNum = null, _.statisticViedo(r, n)
                }), S.videoAd.onError(function (e) {
                    S.switchLog && console.warn("YLSDK RewardedVideoAd.onError:", e), S.onVideoClose && S.onVideoClose(S.VIDEO_PLAY_FAIL), _.statisticViedo(w, n), S.onVideoClose = null, S.unlockCustomNum = null, S.show_video = !1
                }))
            },
            showVideoAd: function (e, n, t) {
                if (S.show_video = !0, S.videoAd || L.createVideoAd(), S.videoAd) {
                    console.log("YLSDK ---showVideoAd"), S.getPower = t || !1, S.unlockCustomNum = n, S.onVideoClose = e;
                    var o = !1;
                    S.videoAd.load().then(function () {
                        _.statisticViedo(f, S.videoAd._ad_id), o || (o = !0, S._timer && (clearTimeout(S._timer), S._timer = null), S.videoAd.show().then(function () {
                            _.statisticViedo(A, S.videoAd._ad_id), S.switchLog && console.log("YLSDK 视频播放成功", S.videoAd._ad_id)
                        }).catch(function (e) {
                            S.switchLog && console.warn("YLSDK 视频播放失败", S.videoAd._ad_id), S.onVideoClose && S.onVideoClose(S.VIDEO_PLAY_FAIL), S.onVideoClose = null, S.show_video = !1
                        }))
                    }).catch(function (e) {
                        S.show_video = !1, o || (S.switchLog && console.warn("YLSDK 视频加载失败啦！", S.videoAd._ad_id), o = !0, S._timer && (clearTimeout(S._timer), S._timer = null), S.onVideoClose && S.onVideoClose(S.VIDEO_PLAY_FAIL), S.onVideoClose = null)
                    }), S._timer || (S._timer = setTimeout(function () {
                        S._timer = null, S.show_video = !1, !o && S.onVideoClose && (S.switchLog && console.log("YLSDK 4秒内无视屏回调，自动回调加载失败"), o = !0, S.onVideoClose && S.onVideoClose(S.VIDEO_PLAY_FAIL), S.onVideoClose = null)
                    }, 4e3))
                }
            },
            shareAppMessage_2: function (e, n) {
                var t = null,
                    o = null,
                    i = null,
                    r = null,
                    a = null;
                n && (o = n.scene, i = n.channel, r = n.module, a = n.inviteType);
                var s = _.setShareScene(o),
                    l = _.getShareConfig();
                if (l && l.has(s) ? t = l.get(s) : S.switchLog && console.warn("YLSDK 当前场景没有分享图,请配置"), t && 0 < t.length) {
                    var d = t[Math.floor(Math.random() * t.length)];
                    a = a || "stage_invite";
                    var c = "account_id=" + _.getAccountId() + "&sharecard_id=" + d.id + "&from=" + a;
                    if (L.hasFun(wx.shareAppMessage, "wx.shareAppMessage")) {
                        var u = {
                            title: d.title,
                            imageUrl: d.img,
                            query: c
                        };
                        wx.shareAppMessage(u), S.show_share = !0, S.shareCallBack = e, S.onShare = {
                            channel: i,
                            module: r,
                            shareId: d.id,
                            showTime: (new Date).getTime()
                        }, g.ylStatisticShareCard(d.id)
                    }
                }
            },
            initShareMenu: function () {
                wx.showShareMenu({
                    success: function () {},
                    fail: function () {},
                    complete: function () {}
                }), wx.onShareAppMessage(function () {
                    S.show_share = !0;
                    var e = _.getShareScene(),
                        n = _.getShareConfig(),
                        t = {},
                        o = null;
                    if (!n) return {
                        title: "快来加入我们吧",
                        imageUrl: ""
                    };
                    if (e && "" != e) n.has(e) ? o = n.get(e) : S.switchLog && console.warn("YLSDK 当前场景没有分享图,请配置");
                    else {
                        var i = !0,
                            r = !1,
                            a = void 0;
                        try {
                            for (var s, l = n.entries()[Symbol.iterator](); !(i = (s = l.next()).done); i = !0) {
                                var d = s.value;
                                if (d[1]) {
                                    o = d[1];
                                    break
                                }
                            }
                        } catch (e) {
                            r = !0, a = e
                        } finally {
                            try {
                                !i && l.return && l.return()
                            } finally {
                                if (r) throw a
                            }
                        }
                    }
                    if (o && 0 < o.length) {
                        var c = o[0],
                            u = "account_id=" + _.getAccountId() + "&sharecard_id=" + c.id + "&from=stage_invite";
                        t.title = c.title, t.imageUrl = c.img, t.query = u
                    }
                    return t
                })
            },
            navigateToMiniProgram: function (e, n) {
                if (e._id) {
                    e.type || (e.type = "0");
                    var t = e.source || "default";
                    if (L.hasFun(wx.navigateToMiniProgram, "wx.navigateToMiniProgram"))
                        if ("" + e.type == "0") {
                            if (!e.toAppid) return void console.error("YLSDK toAppid is null !");
                            wx.navigateToMiniProgram({
                                appId: e.toAppid,
                                path: e.toUrl || "",
                                extraData: {
                                    appid: h.ylsdk_app_id
                                },
                                success: function () {
                                    S.switchLog && console.log("YLSDK 小游戏跳转-跳转成功！"), _.ClickOut(e._id, e.toAppid, t, !0), _.removeItemFrom(e.toAppid), S.jump_out = !0, n && n(!0)
                                },
                                fail: function () {
                                    S.switchLog && console.log("YLSDK 小游戏跳转-跳转失败！"), _.ClickOut(e._id, e.toAppid, t, !1), n && n(!1)
                                }
                            })
                        } else e.showImage || console.error("YLSDK showImage is null !"), _.ClickOut(e._id, e.toAppid, t, !1), wx.previewImage({
                            urls: [e.showImage]
                        })
                } else console.error("YLSDK id is null !")
            },
            showUserInfoButton: function (e, n) {
                S.switchLog && console.log("YLSDK 隐藏获取用户信息按钮"), S.userInfoBtn || (S.userInfoBtn = wx.createUserInfoButton(e)), S.userInfoBtn.onTap(function (e) {
                    S.switchLog && console.log("YLSDK 点击获取用户信息按钮:", e), L.getUserInfo(n)
                }), S.userInfoBtn.show()
            },
            getUserInfo: function (t) {
                wx.getUserInfo({
                    withCredentials: !1,
                    lang: "zh_CN",
                    success: function (e) {
                        if (S.switchLog && console.log("YLSDK wx.getUserInfo--success:", JSON.stringify(e)), e.userInfo) {
                            var n = e.userInfo;
                            _.setUserPlatFormInfo(n)
                        }
                        t && t(_.getUserPlatFormInfo())
                    },
                    fail: function (e) {
                        S.switchLog && console.error("YLSDK wx.getUserInfo--fail:", JSON.stringify(e)), t && t()
                    }
                })
            },
            hideUserInfoButton: function () {
                S.switchLog && console.log("YLSDK 隐藏获取用户信息按钮"), S.userInfoBtn && S.userInfoBtn.hide()
            },
            setSwitchLog: function (e) {
                S.switchLog = e, console.log("YLSDK setSwitchLog:", e)
            }
        },
        m = {};
    try {
        m = wx.getSystemInfoSync(), console.log("YLSDK getSystemInfoSync:", JSON.stringify(m))
    } catch (e) {
        console.log("YLSDK sys--e:", e)
    }
    m.pf_name = "微信", m.pf_num = 0, m.pf_func = L, m.ld_k = o, console.warn("YLSDK 当前设置平台请确认： ", m.pf_name), "" == h.ylsdk_app_id && console.error("YLSDK 请在配置文件中填写您的游戏APPID"), "" == h.ylsdk_version && console.error("YLSDK 请在配置文件中填写您的游戏版本号"), m.pkg_name = h.ylsdk_pkg_name || "", m.s_log = h.ylsdk_debug_model, h.ylsdk_debug_model && console.warn("YLSDK 是否一直通过" + m.pf_name + " code(token)登录: ", h.login_by_code), console.warn("YLSDK 日志开关(本地)-", h.ylsdk_debug_model ? "打开" : "关闭"), h.ylsdk_app_id = h.ylsdk_app_id.replace(/\s/g, ""), h.ylsdk_version = h.ylsdk_version.replace(/\s/g, ""), m.game_config = h, _.init(m), wx.onShow(function (e) {
        S.lifeListen && S.lifeListen("onShow", e), S.switchLog && console.log("YLSDK wx.onShow"), _.getLocalStatistics(), _.registerInterval(), S.jump_out = !1, S.onShare && (S.show_share = !1, _.getSharingResults(S.onShare, function (e) {
            S.switchLog && console.warn("YLSDK 本次分享" + (e.sSuccess ? "成功" : "失败")), S.shareCallBack && S.shareCallBack(e), S.shareCallBack = null
        }), S.onShare = null), _.setLastTime()
    }), wx.onHide(function (e) {
        S.lifeListen && S.lifeListen("onHide", null), S.switchLog && console.log("YLSDK wx.onHide"), S.hideTime = (new Date).getTime(), _.unRegisterInterval(), _.saveStatisticsToLocal(), _.statisticsPlayTime(), _.savePowerLocal(), S.bannerAd && console.warn("YLSDK show_banner:" + S.bannerAd.show_banner + ",show_share:" + S.show_share + ",show_video:" + S.show_video + ",jump_out:" + S.jump_out);
        var n = 0 < arguments.length && void 0 !== e ? e : {};
        !S.bannerAd || !S.bannerAd.show_banner || S.show_share || S.show_video || S.jump_out || n.targetPagePath && (n.targetPagePath.match(/wx.*?\:/) || n.targetPagePath.toLowerCase().includes("nativelandingpages") || n.targetPagePath.includes("http")) && _.statisticsBanner({
            type: i,
            adId: S.bannerAd.adUnitId
        })
    }), wx.onError(function (e) {
        S.lifeListen && S.lifeListen("onError", e);
        var n = JSON.stringify(e);
        S.ERROR_LOG && S.ERROR_LOG === n || (console.error("YLSDK onError:", n), S.ERROR_LOG = n)
    })
}();