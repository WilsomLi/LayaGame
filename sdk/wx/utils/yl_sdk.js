"use strict";
var _s_d, _utils;

function _defineProperty(e, s, t) {
    return s in e ? Object.defineProperty(e, s, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[s] = t, e
}
var pc = {
        WX: 0,
        QQ: 1,
        OPPO: 2,
        VIVO: 3,
        TT: 4,
        BD: 5,
        SSJJ: 6,
        QTT: 7,
        SLL: 8,
        WEB: 10,
        MM: 9,
        MZ: 12,
        UC: 13
    },
    def_tj = {
        events: [],
        video: [],
        blockAd: [],
        customAd: [],
        appBoxAd: [],
        gridAd: [],
        interstitialAd: [],
        nativeAd: [],
        sdkLog: [],
        result: [],
        sharecard: [],
        clickcount: [],
        layer: []
    },
    r_url = "https://api.ylxyx.cn",
    s_d = (_defineProperty(_s_d = {
        _SDKversion: "2.2.0",
        pf_num: 0,
        pf_name: "",
        platform: {},
        s_url: r_url + "/api/collect/v1",
        _AccountId: "",
        login_count: 0,
        accountPass: null,
        u_pt_info: null,
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
        gConf: {
            bannerTimeSpace: {
                onOff: !1,
                timeSpace: 15,
                forceOnOff: !0,
                forceTimeSpace: 3
            },
            Power: {
                onOff: !1,
                defaultPower: 0,
                powerUpper: 5,
                recoveryTime: 300,
                getPower: 0,
                onCountDown: !1,
                countDownTime: 0,
                lastTime: null,
                powerNum: null
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
            developAccount: {
                onOff: !1,
                account: []
            },
            toalByTodayNum: 0,
            toalNum: 0,
            watchTvNum: 0,
            maxCustom: 0,
            lastCustom: 0,
            isServerData: !1
        },
        getGameConfig: !1,
        pRtimer: null,
        uPnum: 0,
        banner_time_space: 3,
        switchLog: !1,
        need_tj_on_show: !0,
        show_video: !1,
        show_share: !1,
        show_banner: !1,
        boxconfig: null,
        boardconfig: null,
        custom: null,
        moduleFalseList: null,
        invite_account: -1,
        loginInfo: null,
        sharecard_config: null,
        sharecard_scene: null,
        is_debug: !1,
        tj: def_tj,
        s_commit_dt: 3e3,
        s_cache_ml: 1e4,
        s_max_post_l: 50,
        s_interval: null,
        layer: null,
        defaultbTS: 10,
        currentstrategy: [],
        videoShareLimit: {
            videoFalseLimit: 0,
            shareFalseLimit: 0
        },
        moduleList: null
    }, "moduleFalseList", null), _defineProperty(_s_d, "gameLayerInfo", {
        layerList: null,
        pathList: null,
        local_info: {
            s_layers: null,
            get_time: null
        }
    }), _s_d),
    sys = {},
    g = null,
    is_platform_phone = !1,
    p_f = null;

function request(s) {
    s.url = s.url || "", s.method = s.method || "get", s.data = s.data || "", s.callback = s.callback || "", is_platform_phone || (s.async = s.async || !0);
    var e = new XMLHttpRequest;
    if (utils.sdk_log("Request--url:" + s.url + ", menthod:" + s.method + ", data:" + JSON.stringify(s.data)), is_platform_phone ? e.open(s.method, s.url) : e.open(s.method, s.url, s.async), "post" === s.method && e.setRequestHeader("Content-Type", "application/json"), s.needPass) s_d.accountPass || console.error("YLSDK AccountPass is null !"), e.setRequestHeader("AccountPass", s_d.accountPass);
    else {
        var t = "";
        sys.screenWidth && sys.screenHeight && (t = sys.screenWidth + "x" + sys.screenHeight);
        var o = {
            brand: sys.brand || "",
            model: sys.model || "",
            platform: sys.platform || "",
            version: s_d._SDKversion,
            resolution: sys.resolution || t
        };
        sys.appName && (o.appName = sys.appName), o = utils.base64_encode(JSON.stringify(o)), e.setRequestHeader("ClientInfo", o)
    }
    e.onerror = function (e) {
        console.error("YLSDK ", e)
    }, e.onabort = function (e) {
        console.exception(e)
    }, e.onprogress = function (e) {}, e.onreadystatechange = function () {
        200 === this.status || console.warn("YLSDK http request status:" + this.status)
    }, e.onload = function () {
        var e = this.responseText;
        s.callback && "function" == typeof s.callback && s.callback(e)
    }, s.data && 0 < s.data.length && s_d.switchLog && console.log("YLSDK reqType:" + s.method + " url:" + s.url + " data:" + s.data);
    try {
        null == s.data && (s.data = null), is_platform_phone ? e.send(JSON.stringify(s.data)) : e.send(s.data)
    } catch (e) {
        console.exception(s.data)
    }
}
var nets = {
        login: function (e) {
            s_d.login_count += 1;
            var s = s_d.accountPass;
            if (0 !== s_d.switchInfo.switchLogin)
                if (g.login_by_code || !s || "" === s) utils.sdk_log("login by " + s_d.pf_name + " code/token"), p_f.loginPF(s_d, e);
                else {
                    s_d.accountPass = s, utils.sdk_log("login by accountPass");
                    nets.loginSDKServer({
                        needPass: !0
                    }, e)
                }
            else utils.sdk_log("该游戏被禁止！", "warn")
        },
        loginSDKServer: function (i, a) {
            nets.loginServer(i, function (e) {
                var s = JSON.parse(e);
                if (0 === s.code) {
                    var t = s.result;
                    s_d.switchLog = 1 === t.switchLog, p_f.setSwitchLog(s_d.switchLog), g.ylsdk_debug_model && console.warn("YLSDK switchLog(online)-", s_d.switchLog ? "oppen" : "close"), s_d.loginInfo = {
                        accountId: t.accountId,
                        nickName: t.nickName || "",
                        avatarUrl: t.avatarUrl || "",
                        newPlayer: "" + t.newPlayer != "0" ? 1 : 0,
                        openid: t.openid || "",
                        code: i.code || "",
                        token: i.code || "",
                        pkgName: i.pkgName || ""
                    }, utils.sdk_log("loginInfo:" + JSON.stringify(s_d.loginInfo)), t.accountId && utils.SetAccountID(t.accountId), t.accountPass && utils.SetAccountPass(t.accountPass), t.isLowVersion && 1 === t.isLowVersion && (console.warn("/*****************************************/"), console.warn("**  YLSDK 您的SDK版本过低，请尽快升级SDK  **"), console.warn("/*****************************************/")), s_d.switchInfo = {
                        switchTouch: t.switchTouch || 0,
                        switchPush: t.switchPush || 0,
                        switchLog: t.switchLog || 0
                    }, s_d.switchTouchAll = t.switchTouch || 0, s_d.switchInfo.switchLogin = 0 === t.switchLogin ? t.switchLogin : 1, s_d.switchInfo.switchJump = 0 === t.switchJump ? t.switchJump : 1, s_d.switchInfo.switchShare = 0 === t.switchShare ? t.switchShare : 1, s_d.switchInfo.switchEvent = 0 === t.switchEvent ? t.switchEvent : 1, s_d.switchInfo.switchLayer = 0 === t.switchLayer ? t.switchLayer : 1, s_d.switchInfo.switchResult = 0 === t.switchResult ? t.switchResult : 1, s_d.switchInfo.switchVideo = 0 === t.switchVideo ? t.switchVideo : 1;
                    var o = new Date;
                    if (s_d.need_tj_on_show && (s_d.lastTime = o, s_d.need_tj_on_show = !1), utils.initVideoShareLimit(t, o), t.moduleList && 0 < t.moduleList.length && (s_d.moduleList = t.moduleList, s_d.moduleList.forEach(function (e) {
                            e.loopIndex = 0, e.logicJson && (e.logicJson = JSON.parse(e.logicJson))
                        })), t.moduleFalseList && 0 < t.moduleFalseList.length) {
                        var n = t.moduleFalseList;
                        s_d.moduleFalseList = [], n.forEach(function (e) {
                            e.strategyjson && (e.value = JSON.parse(e.strategyjson)), e.strategy_id = 0, e.time_id = 0, e.count = 0, s_d.moduleFalseList.push(e)
                        })
                    }
                    utils.sdk_log("moduleFalseList:" + JSON.stringify(s_d.moduleFalseList)), utils.sdk_log("init SDK finish"), nets.getGameConfig(a), a && a(!0)
                } else s_d.login_count < 3 ? (utils.SetAccountPass(""), nets.login(a)) : (utils.sdk_log("init SDK fail", "warn"), nets.getGameConfig(a), a && a(!1))
            })
        },
        loginServer: function (e, t) {
            var s = {};
            if (s_d.pf_num !== pc.OPPO && s_d.pf_num !== pc.VIVO && s_d.pf_num !== pc.MZ) {
                var o = p_f.getLOS();
                utils.sdk_log("getLaunchOptionsSync：" + JSON.stringify(o)), o.scene && (s.scene = o.scene), o.query && (s.query = JSON.stringify(o.query), 1005 != parseInt(o.scene) && 1006 != parseInt(o.scene) && 1037 != parseInt(o.scene) && 1035 != parseInt(o.scene) && "{}" != s.query && (o.query.sharecard_id && (s.sharecardId = o.query.sharecard_id), o.query.account_id && (s.accountId = o.query.account_id, s_d.invite_account = o.query.account_id), o.query.from && (s.from = o.query.from)))
            }
            var n = {
                platform: "" + s_d.pf_num,
                appid: g.ylsdk_app_id,
                version: g.ylsdk_version,
                shareInfo: s
            };
            e.code && (n.code = e.code), n.pkgName = e.pkgName, utils.sdk_log("loginServer-data:" + JSON.stringify(n)), request({
                method: "post",
                url: s_d.s_url + "/user/login",
                needPass: e.needPass,
                data: n,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("login:", s.code, e), t && t(e)
                }
            }), utils.sdkLog("user", "login")
        },
        getGameConfig: function (t) {
            request({
                method: "get",
                url: s_d.s_url + "/gamebase/config",
                needPass: !0,
                callback: function (e) {
                    if (utils.res_log("config:", e), e) {
                        var s = JSON.parse(e);
                        0 === s.code ? utils.parseGameConfig(s.result, t) : nets.getGameConfigFinal(t)
                    } else nets.getGameConfigFinal(t)
                }
            }), utils.sdkLog("gamebase", "config")
        },
        getGameConfigFinal: function (t) {
            request({
                method: "get",
                url: s_d.s_url + "/gamebase/config/final?appid=" + g.ylsdk_app_id + "&version=" + g.ylsdk_version,
                needPass: !1,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("config-final:", s.code, e), 9002 === s.code && p_f.loginPF(s_d), 0 === s.code ? utils.parseGameConfig(s.result, t) : t && t("config_fail")
                }
            }), utils.sdkLog("gamebase", "config-final")
        },
        storeValue: function (o, n) {
            request({
                method: "post",
                url: s_d.s_url + "/gamebase/store/value",
                needPass: !0,
                data: o,
                callback: function (e) {
                    var s = JSON.parse(e),
                        t = o.name + (o.cmd ? "-" + o.cmd : "");
                    utils.res_log("store/value--" + t + ":", s.code, e), 9002 === s.code && p_f.loginPF(s_d), 0 == s.code && s.result ? n && n(s.result) : n && n(!1)
                }
            }), utils.sdkLog("gamebase", "store-value")
        },
        getCustom: function (t) {
            s_d.custom ? t && t(s_d.custom) : (request({
                method: "get",
                url: s_d.s_url + "/gamebase/customconfig",
                needPass: !0,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("customconfig:", s.code, e), 0 == s.code ? (s.result && 0 < s.result.length && (s_d.custom = s.result), t && t(s.result)) : nets.customconfigFinal(t)
                }
            }), utils.sdkLog("gamebase", "customconfig"))
        },
        customconfigFinal: function (t) {
            request({
                method: "get",
                url: s_d.s_url + "/gamebase/customconfig/final?appid=" + g.ylsdk_app_id + "&version=" + g.ylsdk_version,
                needPass: !1,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("customconfig-final:", s.code, e), 9002 === s.code && p_f.loginPF(), 0 == s.code && s.result && 0 < s.result.length && (s_d.custom = s.result), t && t(s.result)
                }
            }), utils.sdkLog("gamebase", "customconfig-final")
        },
        SideBox: function (l) {
            s_d.boxconfig ? l && l(s_d.boxconfig) : (request({
                method: "get",
                url: s_d.s_url + "/gamebase/sidebox",
                needPass: !0,
                callback: function (e) {
                    var s = JSON.parse(e);
                    if (utils.res_log("sidebox:", s.code, e), 0 === s.code && s.result) {
                        utils.checkJumpOutTime(), s_d.boxconfig = s.result;
                        var t = utils.getJumpOutInfo(),
                            o = !(!t || "" === t) && JSON.parse(t);
                        if (o && o.list && 0 < o.list.length)
                            for (var n = 0; n < o.list.length; n++)
                                for (var i = o.list[n].appid, a = 0; a < s_d.boxconfig.length; a++) {
                                    var r = s_d.boxconfig[a].toAppid;
                                    r == i && (utils.sdk_log("remove clicked item-_id:" + s_d.boxconfig[a]._id + ",appid:" + r), s_d.boxconfig.splice(a, 1))
                                }
                        l && l(s_d.boxconfig)
                    } else nets.newestsideboxFinal(l)
                }
            }), utils.sdkLog("gamebase", "sidebox"))
        },
        newestsideboxFinal: function (l) {
            request({
                method: "get",
                url: s_d.s_url + "/gamebase/sidebox/final?appid=" + g.ylsdk_app_id + "&version=" + g.ylsdk_version,
                needPass: !1,
                callback: function (e) {
                    var s = JSON.parse(e);
                    if (utils.res_log("sidebox-final:", s.code, e), 9002 === s.code && p_f.loginPF(), utils.checkJumpOutTime(), 0 === s.code && s.result) {
                        s_d.boxconfig = s.result;
                        var t = utils.getJumpOutInfo(),
                            o = !(!t || "" === t) && JSON.parse(t);
                        if (o && o.list && 0 < o.list.length)
                            for (var n = 0; n < o.list.length; n++)
                                for (var i = o.list[n].appid, a = 0; a < s_d.boxconfig.length; a++) {
                                    var r = s_d.boxconfig[a].toAppid;
                                    r == i && (utils.sdk_log("remove clicked item-final-_id:" + s_d.boxconfig[a]._id + ",appid:" + r), s_d.boxconfig.splice(a, 1))
                                }
                    }
                    l && l(s_d.boxconfig)
                }
            }), utils.sdkLog("gamebase", "sidebox-final")
        },
        IntegralWall: function (t) {
            request({
                method: "post",
                url: s_d.s_url + "/gamebase/scoreboard",
                needPass: !0,
                data: {
                    module: "scoreboard"
                },
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("scoreboard:", s.code, e), 0 == s.code && s.result ? (s.result && (s_d.boardconfig = s.result), t && t(s_d.boardconfig)) : nets.newestscoreboardFinal(t)
                }
            }), utils.sdkLog("gamebase", "scoreboard")
        },
        newestscoreboardFinal: function (t) {
            request({
                method: "get",
                url: s_d.s_url + "/gamebase/scoreboard/final?appid=" + g.ylsdk_app_id + "&version=" + g.ylsdk_version + "&module=scoreboard",
                needPass: !1,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("scoreboard-final:", s.code, e), 9002 === s.code && p_f.loginPF(), 0 == s.code && s.result && s.result && (s_d.boardconfig = s.result), t && t(s_d.boardconfig)
                }
            }), utils.sdkLog("gamebase", "scoreboard-final")
        },
        getBoardAward: function (e, t) {
            e ? (request({
                method: "post",
                url: s_d.s_url + "/gamebase/getboardaward",
                needPass: !0,
                data: {
                    module: "scoreboard",
                    awardId: e
                },
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("getboardaward:", s.code, e), 0 != s.code && 9002 === (s = !1).code && p_f.loginPF(), t && t(s.result.award)
                }
            }), utils.sdkLog("gamebase", "getboardaward")) : console.error("getBoardAward need _id")
        },
        shareCard: function (t, o) {
            o = o || "", s_d.sharecard_config || (s_d.sharecard_config = new Map), utils.sdk_log("shareCard-scene:" + o), (s_d.share_scene = o) && s_d.sharecard_config.has(o) ? t && t(!0) : (request({
                method: "post",
                url: s_d.s_url + "/gamebase/sharecard",
                needPass: !0,
                data: {
                    scene: o
                },
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("sharecard:", s.code, e), 0 == s.code ? (s.result && 0 < s.result.length && (utils.pushShareInfoMap(s, o), p_f.initShareMenu()), t && ("" == o ? t(s_d.sharecard_config) : s_d.sharecard_config.has(o) ? t(s_d.sharecard_config.get(o)) : t(!1))) : nets.sharecardFinal(t, o)
                }
            }), utils.sdkLog("gamebase", "sharecard"))
        },
        sharecardFinal: function (t, o) {
            utils.sdk_log("sharecardFinal-scene:" + o), s_d.share_scene ? (request({
                method: "get",
                url: s_d.s_url + "/gamebase/sharecard/final?appid=" + g.ylsdk_app_id + "&version=" + g.ylsdk_version + "&scene=" + o,
                needPass: !1,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("sharecard-final:", s.code, e), 9002 === s.code && p_f.loginPF(), 0 == s.code && s.result && 0 < s.result.length && (utils.pushShareInfoMap(s, o), p_f.initShareMenu()), t && ("" == o ? t(s_d.sharecard_config) : s_d.sharecard_config.has(o) ? t(s_d.sharecard_config.get(o)) : t(!1))
                }
            }), utils.sdkLog("gamebase", "sharecard-final")) : utils.sdk_log("sharecardFinal-need scene", "warn")
        },
        shareCardTJ: function (t) {
            0 !== s_d.switchInfo.switchShare ? (request({
                method: "post",
                url: s_d.s_url + "/statistics/sharecard",
                needPass: !0,
                data: t,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("st-sharecard:", s.code, e), 0 != s.code && s_d.tj.sharecard.push(t), 9002 === s.code && p_f.loginPF()
                }
            }), utils.sdkLog("statistics", "sharecard")) : utils.sdk_log("停用分享图统计接口！", "warn")
        },
        ClickOut: function (e, s, t, o, n) {
            if (e)
                if (s) {
                    var i = {
                        iconId: e,
                        source: t,
                        target: s,
                        action: !0 === o ? "enable" : "cancel"
                    };
                    nets.clickOutTJ(i, n)
                } else console.error("YLSDK toAppId is null !");
            else console.error("YLSDK iconId is null !")
        },
        clickOutTJ: function (t, o) {
            0 !== s_d.switchInfo.switchJump ? (request({
                method: "post",
                url: s_d.s_url + "/statistics/clickcount",
                needPass: !0,
                data: t,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("st-clickcount:", s.code, e), 0 != s.code && s_d.tj.clickcount.push(t), 9002 === s.code && p_f.loginPF(), o && o(e)
                }
            }), utils.sdkLog("statistics", "clickcount")) : utils.sdk_log("停用卖量统计接口！", "warn")
        },
        commitTJlayer: function (e) {
            if (s_d._AccountId) {
                e || console.warn("YLSDK yl_sdk-ccommitTJlayer : layerPath is null !");
                var s = {
                    layer: e || "default"
                };
                nets.layerTJ(s)
            } else console.error("YLSDK yl_sdk-commitTJlayer : _AccountId is null !")
        },
        layerTJ: function (t) {
            0 !== s_d.switchInfo.switchLayer ? (request({
                method: "post",
                url: s_d.s_url + "/statistics/layer",
                needPass: !0,
                data: t,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("st-layer:", s.code, e), 0 != s.code && s_d.tj.layer.push(t), 9002 === s.code && p_f.loginPF()
                }
            }), utils.sdkLog("statistics", "layer")) : utils.sdk_log("停用流失统计接口！", "warn")
        },
        layerList: function (i) {
            0 !== s_d.switchInfo.switchLayer ? s_d.gameLayerInfo.layerList ? i && i(s_d.gameLayerInfo.layerList) : (request({
                method: "post",
                url: s_d.s_url + "/gamebase/layer",
                needPass: !0,
                callback: function (e) {
                    var s = JSON.parse(e);
                    if (9002 === s.code && p_f.loginPF(), utils.res_log("gamebase-layer:", s.code, e), 0 == s.code && s.result) {
                        var t = new Array;
                        s.result.forEach(function (e) {
                            t.push(e.layerPath)
                        }), s_d.gameLayerInfo.layerList = s.result, s_d.gameLayerInfo.pathList = t;
                        var o = p_f.getLD(sys.ld_k.LD_KEY_SCL);
                        if (o && "" != o) {
                            var n = JSON.parse(o);
                            s_d.gameLayerInfo.local_info = n
                        }
                    }
                    i && i(s_d.gameLayerInfo.layerList)
                }
            }), utils.sdkLog("gamebase", "layer")) : utils.sdk_log("停用流失统计接口！", "warn")
        },
        eventsTJ: function (o, n) {
            var e = {
                events: o
            };
            request({
                method: "post",
                url: s_d.s_url + "/statistics/event",
                needPass: !0,
                data: e,
                callback: function (e) {
                    var s = JSON.parse(e);
                    if (utils.res_log("st-event:", s.code, e), 0 === s.code) n && utils.clearTJEvents();
                    else
                        for (var t = 0; t < o.length; t++) s_d.tj.events.unshift(o.pop());
                    9002 === s.code && p_f.loginPF()
                }
            }), utils.sdkLog("statistics", "event")
        },
        sdkLogTJ: function (t, o) {
            var e = {
                infos: t
            };
            request({
                method: "post",
                url: s_d.s_url + "/statistics/sdk",
                needPass: !0,
                data: e,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("st-sdk:", s.code, e), 0 === s.code ? o && utils.clearTJSdkLogs() : nets.sdkLogFinalTJ(t, o), 9002 === s.code && p_f.loginPF()
                }
            })
        },
        sdkLogFinalTJ: function (o, n) {
            var e = {
                appid: g.ylsdk_app_id,
                accountId: 0,
                infos: o
            };
            request({
                method: "post",
                url: s_d.s_url + "/statistics/sdk/final",
                needPass: !1,
                data: e,
                callback: function (e) {
                    var s = JSON.parse(e);
                    if (utils.res_log("st-sdk:", s.code, e), 0 === s.code) n && utils.clearTJSdkLogs();
                    else
                        for (var t = 0; t < o.length; t++) s_d.tj.sdkLog.unshift(o.pop());
                    9002 === s.code && p_f.loginPF()
                }
            })
        },
        viedoTJ: function (t, o) {
            0 !== s_d.switchInfo.switchVideo ? (request({
                method: "post",
                url: s_d.s_url + "/statistics/video",
                needPass: !0,
                data: t,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("st-video:", s.code, e), 0 != s.code && s_d.tj.video.push(t), 9002 === s.code && p_f.loginPF(s_d), o && o(e)
                }
            }), utils.sdkLog("statistics", "video")) : utils.sdk_log("停用视频统计接口！", "warn")
        },
        blockAdTJ: function (t) {
            request({
                method: "get",
                url: s_d.s_url + "/statistics/block?type=" + t.type + "&AccountPass=" + s_d.accountPass + "&adId=" + t.adId,
                needPass: !1,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("st-block:", s.code, e), 0 != s.code && s_d.tj.blockAd.push(s), 9002 === s.code && p_f.loginPF(s_d), t.callback && t.callback(e)
                }
            })
        },
        customAdTJ: function (t) {
            request({
                method: "get",
                url: s_d.s_url + "/statistics/custom?type=" + t.type + "&AccountPass=" + s_d.accountPass + "&adId=" + t.adId,
                needPass: !1,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("st-custom:", s.code, e), 0 != s.code && s_d.tj.customAd.push(s), 9002 === s.code && p_f.loginPF(s_d), t.callback && t.callback(e)
                }
            })
        },
        appBoxAdTJ: function (t) {
            request({
                method: "get",
                url: s_d.s_url + "/statistics/box?type=" + t.type + "&AccountPass=" + s_d.accountPass + "&adId=" + t.adId,
                needPass: !1,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("st-box:", s.code, e), 0 != s.code && s_d.tj.appBoxAd.push(s), 9002 === s.code && p_f.loginPF(s_d), t.callback && t.callback(e)
                }
            })
        },
        gridAdTJ: function (t) {
            request({
                method: "get",
                url: s_d.s_url + "/statistics/grid?type=" + t.type + "&AccountPass=" + s_d.accountPass + "&adId=" + t.adId,
                needPass: !1,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("st-grid:", s.code, e), 0 != s.code && s_d.tj.gridAd.push(s), 9002 === s.code && p_f.loginPF(s_d), t.callback && t.callback(e)
                }
            })
        },
        interstitialAdTJ: function (t) {
            request({
                method: "get",
                url: s_d.s_url + "/statistics/interstitial?type=" + t.type + "&AccountPass=" + s_d.accountPass + "&adId=" + t.adId,
                needPass: !1,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("st-interstitial:", s.code, e), 0 != s.code && s_d.tj.interstitialAd.push(s), 9002 === s.code && p_f.loginPF(s_d), t.callback && t.callback(e)
                }
            })
        },
        nativeAdTJ: function (t) {
            request({
                method: "get",
                url: s_d.s_url + "/statistics/native?type=" + t.type + "&AccountPass=" + s_d.accountPass + "&adId=" + t.adId,
                needPass: !1,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("st-native:", s.code, e), 0 != s.code && s_d.tj.nativeAd.push(s), 9002 === s.code && p_f.loginPF(s_d), t.callback && t.callback(e)
                }
            })
        },
        resultTJ: function (t, o) {
            0 !== s_d.switchInfo.switchResult ? (request({
                method: "post",
                url: s_d.s_url + "/statistics/result",
                needPass: !0,
                data: t,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("st-result:", s.code, e), 0 != s.code && s_d.tj.result.push(t), 9002 === s.code && p_f.loginPF(), o && o(0 === s.code)
                }
            }), utils.sdkLog("statistics", "result")) : utils.sdk_log("停用结果统计接口！", "warn")
        },
        bannerTJ: function (e) {
            request({
                method: "get",
                url: s_d.s_url + "/statistics/banner?type=" + e.type + "&AccountPass=" + s_d.accountPass + "&adId=" + e.adId,
                needPass: !1,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("st-banner:", s.code, e)
                }
            })
        },
        durationTJ: function (e) {
            request({
                method: "get",
                url: s_d.s_url + "/statistics/duration?type=" + e.type + "&AccountPass=" + s_d.accountPass + "&duration=" + e.duration,
                needPass: !1,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("st-duration:", s.code, e)
                }
            })
        },
        Edit: function (e) {
            request({
                method: "post",
                url: s_d.s_url + "/user/info/edit",
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
                    var s = JSON.parse(e);
                    utils.res_log("edit：", s.code, e), 9002 === s.code && p_f.loginPF()
                }
            })
        },
        commitStaticsErrStack: function (e, s) {
            var t = {
                appid: g.ylsdk_app_id,
                version: g.ylsdk_version,
                language: sys.language,
                system: sys.system,
                model: sys.model,
                brand: sys.brand,
                platform: sys.platform,
                SDKVersion: s_d._SDKversion,
                resolution: sys.screenWidth + "x" + sys.screenHeight,
                window: sys.windowWidth + "x" + sys.windowHeight,
                ErrStack: e,
                LogStr: s
            };
            request({
                method: "post",
                url: s_d.s_url + "/statistics/clientlog",
                needPass: !1,
                data: t,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("st-clientlog:", s.code, e), 9002 === s.code && p_f.loginPF()
                }
            })
        },
        getServerInfo: function (t) {
            request({
                method: "get",
                url: s_d.s_url + "/user/my/info",
                needPass: !0,
                callback: function (e) {
                    var s = JSON.parse(e);
                    utils.res_log("st-my-info:", e), 9002 === s.code && p_f.loginPF(), 0 == s.code ? t && t(s.result) : t && t(!1)
                }
            }), utils.sdkLog("user", "my-info")
        }
    },
    utils = (_defineProperty(_utils = {
        parseResponse: function (e, s) {
            try {
                var t = JSON.parse(back_data);
                s && s(t)
            } catch (e) {
                console.error("http error:", e)
            }
        },
        getAccountPass: function () {
            return p_f.getLD(sys.ld_k.LD_KEY_AP)
        },
        SetAccountID: function (e) {
            s_d._AccountId = e, utils.saveAccountId(e)
        },
        saveAccountId: function (e) {
            utils.sdk_log("saveAccountId:" + e), p_f.saveLD(sys.ld_k.LD_KEY_AI, "" + e)
        },
        SetAccountPass: function (e) {
            s_d.accountPass = e, utils.saveAccountPass(e)
        },
        saveAccountPass: function (e) {
            p_f.saveLD(sys.ld_k.LD_KEY_AP, "" + e), utils.sdk_log("saveAccountPass:" + e)
        },
        base64_encode: function (e) {
            for (var s, t, o, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", i = 0, a = e.length, r = ""; i < a;) {
                if (s = 255 & e.charCodeAt(i++), i == a) {
                    r += n.charAt(s >> 2), r += n.charAt((3 & s) << 4), r += "==";
                    break
                }
                if (t = e.charCodeAt(i++), i == a) {
                    r += n.charAt(s >> 2), r += n.charAt((3 & s) << 4 | (240 & t) >> 4), r += n.charAt((15 & t) << 2), r += "=";
                    break
                }
                o = e.charCodeAt(i++), r += n.charAt(s >> 2), r += n.charAt((3 & s) << 4 | (240 & t) >> 4), r += n.charAt((15 & t) << 2 | (192 & o) >> 6), r += n.charAt(63 & o)
            }
            return r
        },
        res_log: function (e, s, t) {
            0 != s ? console.warn("YLSDK Response--", e + " " + t) : s_d.switchLog && console.log("YLSDK Response--", e + " " + t)
        },
        sdk_log: function (e, s) {
            utils.logs("YLSDK " + e, s || "log")
        },
        logs: function (e, s) {
            s_d.switchLog && ("log" === (s = s || "log") ? console.log(e) : "info" === s ? console.info(e) : "error" === s ? console.error(e) : "warn" === s ? console.warn(e) : "debug" === s && console.debug(e))
        },
        parseGameConfig: function (e, s) {
            if (0 < e.length) {
                var l = s_d.gConf;
                e.forEach(function (e) {
                    var s = null;
                    if (e.value && (s = JSON.parse(e.value)), s)
                        if ("b_t_s" === e.code) {
                            var t = {};
                            t.onOff = 1 === s[0], t.timeSpace = s[1] || 10, (s[1] || 0 === s[1]) && s_d.pf_num === pc.VIVO && s[1] < 10 && (t.timeSpace = 10), t.forceOnOff = 1 === s[2], t.forceTimeSpace = s[3] || 3, l.bannerTimeSpace = t
                        } else if ("power" === e.code) l.Power.defaultPower = s[0] || 0, l.Power.powerUpper = s[1] || 5, l.Power.recoveryTime = s[2] || 300, l.Power.getPower = s[3] || 0, l.Power.onOff = 1 === s[4];
                    else if ("v_u_c" === e.code) {
                        var o = {};
                        o.onOff = 1 === s[0], o.openCustoms = s[1] || 2, o.spaceCustoms = s[2] || 0, l.VideoUnlockCustoms = o
                    } else if ("dp_s" === e.code) {
                        var n = {};
                        n._type = s[0] || 0, n.totalCustoms = s[1] || 5, n.goodUserOnOff = 1 === s[2], n.watchTvNum = s[3] || 2, n.dayCustoms = s[4] || 0, l.depthShield = n
                    } else if ("m_t" === e.code) {
                        var i = {};
                        i.onOff = 1 === s[0], i.startTime_h = s[1] || 0, i.startTime_m = s[2] || 0, i.endTime_h = s[3] || 23, i.endTime_m = s[4] || 0, l.mistouchTimer = i
                    } else if ("d_a" === e.code) {
                        var a = {};
                        if (a.onOff = 1 === s[0], a.account = [], 1 < s.length)
                            for (var r = 1; r < s.length; r++) a.account.push(s[r]);
                        l.developAccount = a
                    }
                }), s_d.gConf = l, s_d.gConf.isServerData = !0
            }
            utils.initTodayPlayNums(), utils.initPower(), utils.sdk_log("s_d.gameConfig:" + JSON.stringify(s_d.gConf)), s && s("config_success")
        },
        initTodayPlayNums: function () {
            var e = p_f.getLD(sys.ld_k.LD_KEY_TDPNI),
                s = p_f.getLD(sys.ld_k.LD_KEY_TTPNI),
                t = p_f.getLD(sys.ld_k.LD_KEY_TDWTNI),
                o = p_f.getLD(sys.ld_k.LD_KEY_LWTI),
                n = p_f.getLD(sys.ld_k.LD_KEY_LPTI),
                i = p_f.getLD(sys.ld_k.LD_KEY_MCI),
                a = p_f.getLD(sys.ld_k.LD_KEY_LCI),
                r = new Date;
            e = "" == e ? 0 : parseInt(e), s = "" == s ? 0 : parseInt(s), t = "" == t ? 0 : parseInt(t), i = "" == i ? 0 : parseInt(i), a = "" == a ? 0 : parseInt(a), utils.sdk_log("initTodayPlayNums-nowTime:" + r.getTime() + ",lastWatch:" + o + ",lastPlay:" + n), "" == o ? (o = r.getTime(), p_f.saveLD(sys.ld_k.LD_KEY_LWTI, o)) : o = parseInt(o), "" == n ? (n = r.getTime(), p_f.saveLD(sys.ld_k.LD_KEY_LPTI, n)) : n = parseInt(n);
            var l = r.getFullYear(),
                d = r.getMonth() + 1,
                c = r.getDate(),
                u = new Date(o),
                _ = u.getFullYear(),
                g = u.getMonth() + 1,
                f = u.getDate(),
                m = new Date(n),
                p = m.getFullYear(),
                h = m.getMonth() + 1,
                v = m.getDate();
            utils.sdk_log("initTodayPlayNums-now:" + l + "-" + d + "-" + c + " ,lwatch:" + _ + "-" + g + "-" + f + " ,lplay:" + p + "-" + h + "-" + v), l == _ && d == g && c == f || (t = 0, o = r.getTime(), p_f.saveLD(sys.ld_k.LD_KEY_TDWTNI, t), p_f.saveLD(sys.ld_k.LD_KEY_LWTI, o)), l == p && d == h && c == v || (e = 0, n = r.getTime(), p_f.saveLD(sys.ld_k.LD_KEY_TDPNI, e), p_f.saveLD(sys.ld_k.LD_KEY_LPTI, n)), s_d.gConf.toalByTodayNum = e, s_d.gConf.toalNum = s, s_d.gConf.watchTvNum = t, s_d.gConf.maxCustom = i, s_d.gConf.lastCustom = a
        },
        initPower: function () {
            if (s_d.gConf.Power.onOff) {
                utils.sdk_log("initPower--------");
                var e = p_f.getLD(sys.ld_k.LD_KEY_PNI);
                utils.sdk_log("initPower-getLD-powerInfo:", e), "" != e && (e = JSON.parse(e), s_d.gConf.Power.lastTime = e.lastTime || null, s_d.gConf.Power.powerNum = e.powerNum || 0, s_d.gConf.Power.onCountDown = !1, s_d.gConf.Power.countDownTime = e.countDownTime || 0), utils.sdk_log("initPower-powerInfo:" + JSON.stringify(s_d.gConf.Power));
                var s = s_d.gConf.Power.powerUpper,
                    t = s_d.gConf.Power.recoveryTime,
                    o = s_d.gConf.Power.powerNum || s_d.gConf.Power.defaultPower,
                    n = s_d.gConf.Power.lastTime;
                if (o < s) {
                    if (n) {
                        var i = (new Date).getTime(),
                            a = Math.floor((i - n) / 1e3);
                        a = a < 0 ? 0 : a;
                        var r = Math.floor(a / t);
                        o = s < (o += r) ? s : o, console.log("YLSDK -----timeSpace,getPowerNum,powerNum:", a, r, o)
                    }
                    s_d.gConf.Power.lastTime = null
                }
                utils.setPower(o, 0)
            } else utils.sdk_log("initPower--onOff is off")
        },
        setPower: function (e, s) {
            if (s_d.gConf.Power.onOff) {
                var t = s_d.gConf.Power.powerNum,
                    o = s_d.gConf.Power.powerUpper,
                    n = s_d.gConf.Power.recoveryTime,
                    i = o < e ? o : e < 0 ? 0 : e;
                if (s_d.gConf.Power.powerNum = i, utils.savePowerLocal(), utils.sdk_log("setPower-powerUpper:" + o + ",recoveryTime:" + n + ",userPowerNum:" + i + ",powerRtimer:" + s_d.pRtimer), i < o) {
                    var a = s_d.gConf.Power.onCountDown;
                    if (utils.sdk_log("setPower-onCountDown:" + a), !a && 0 < n) {
                        s_d.gConf.Power.onCountDown = !0;
                        var r = s_d.gConf.Power.countDownTime;
                        s_d.gConf.Power.countDownTime = 0 < r ? s_d.gConf.Power.countDownTime : n, utils.powerRecoveryTimer()
                    }
                } else s_d.pRtimer && (clearTimeout(s_d.pRtimer), s_d.pRtimer = null), s_d.gConf.Power.onCountDown = !1, s_d.gConf.Power.countDownTime = 0, s_d.gConf.Power.lastTime = null;
                var l = t != i;
                s_d.powerChangeCB && l && 0 !== s && s_d.powerChangeCB({
                    type: s,
                    powerNum: i,
                    countDownTime: s_d.gConf.Power.countDownTime,
                    onCountDown: s_d.gConf.Power.onCountDown
                })
            } else utils.sdk_log("setPower--onOff is off")
        },
        powerRecoveryTimer: function () {
            utils.sdk_log("powerRecoveryTimer"), s_d.pRtimer && (clearTimeout(s_d.pRtimer), s_d.pRtimer = null), s_d.pRtimer = setTimeout(function () {
                var e = s_d.gConf.Power.countDownTime,
                    s = s_d.gConf.Power.onCountDown,
                    t = (new Date).getTime();
                console.log("YLSDK -----powerRecoveryTimer-_lastTime:", t), e = 0 < --e ? e : 0, s_d.gConf.Power.countDownTime = e, s_d.gConf.Power.lastTime = t, e <= 0 && (s = s_d.gConf.Power.onCountDown = !1), s_d.powerChangeCB && s_d.powerChangeCB({
                    type: 4,
                    powerNum: s_d.gConf.Power.powerNum,
                    countDownTime: e,
                    onCountDown: s,
                    lastTime: t
                }), 0 < e ? (utils.savePowerLocal(), utils.powerRecoveryTimer()) : (utils.addPower(2), utils.sdk_log("powerRecoveryTimer-addPower"))
            }, 1e3)
        },
        eventCount: function (e, s) {
            if (0 !== s_d.switchInfo.switchEvent) {
                var t = s || "default";
                s_d.tj.events.push({
                    event: e,
                    scene: t,
                    time: (new Date).getTime()
                })
            } else utils.sdk_log("停用事件统计接口！", "warn")
        },
        sdkLog: function (e, s) {
            s_d.tj.sdkLog.push({
                type: e,
                code: s,
                time: (new Date).getTime()
            })
        },
        showShareOrVideo: function (i, a, r) {
            var l = "showShareOrVideo ";
            if (i)
                if (a) {
                    s_d.currentstrategy && r && r(s_d.currentstrategy);
                    var e = utils.getUnUseStrategy(i, a, !1);
                    if (e && r) r(e.type);
                    else if (s_d.moduleList && 0 < s_d.moduleList.length) {
                        var d = !1;
                        s_d.moduleList.forEach(function (e) {
                            if (e && e.channel == i && e.module == a && e.logicJson) {
                                d = !0;
                                var s = e.logicJson,
                                    t = {
                                        channel: i,
                                        module: a
                                    };
                                if (s.pe && 0 < s.pe.length) {
                                    var o = e.logicJson.pe.shift();
                                    t.type = o, utils.sdk_log(l + (1 == o ? "share " : "video ") + JSON.stringify(s)), r && r(o), s_d.currentstrategy.push(t)
                                } else if (s.loop && 0 < s.loop.length && s.time && 0 < s.time) {
                                    var n = s.loop[e.loopIndex];
                                    e.loopIndex += 1, e.loopIndex >= s.loop.length && (e.loopIndex = 0, --e.logicJson.time), t.type = n, utils.sdk_log(l + (1 == n ? "2-share " : "2-video ") + JSON.stringify(s)), r && r(n), s_d.currentstrategy.push(t)
                                } else utils.sdk_log(l + "no strategy", "warn"), r && r(0)
                            }
                        }), d || (r && r(0), utils.sdk_log(l + "no strategy_1", "warn"))
                    } else r && r(0), utils.sdk_log(l + "no strategy_2", "warn")
                } else console.error("YLSDK " + l + "--module is null");
            else console.error("YLSDK " + l + "--channel is null")
        },
        getUnUseStrategy: function (e, s, t) {
            if (s_d.currentstrategy && 0 < s_d.currentstrategy.length)
                for (var o = 0; o < s_d.currentstrategy.length; o++) {
                    var n = s_d.currentstrategy[o];
                    if (n.channel == e && n.module == s) return t ? s_d.currentstrategy.splice(o, 1) : n
                }
            return null
        },
        useShareOrVideoStrategy: function (e, s, t) {
            var o = utils.getUnUseStrategy(e, s, !0);
            o && t ? t(o.type) : t && t(0)
        },
        getDTinfo: function (e) {
            var s = utils.getDeepTouch(e);
            utils.sdk_log("getDeepTouchInfo-deepTouch:" + s + ",customNum:" + e);
            var t = {
                    deepTouch: s ? "1" : "0"
                },
                o = [];
            return s_d.custom && 0 < s_d.custom.length && s_d.custom.forEach(function (e) {
                2 == parseInt(e.type) && (s || (e.value = "0"), o.push(e))
            }), t.customInfo = o, t
        },
        getDeepTouch: function (e) {
            if (1 != s_d.switchTouchAll) return !1;
            if (s_d.gConf && s_d.gConf.developAccount.onOff && 0 < s_d.gConf.developAccount.account.length)
                for (var s = s_d.gConf.developAccount.account, t = 0; t < s.length; t++)
                    if (s[t] == s_d._AccountId) return utils.sdk_log("getDeepTouch is bai ming dan:" + s[t]), !0;
            if (!utils.checkMistouchTimer()) return !1;
            if (s_d.gConf && s_d.gConf.depthShield) {
                var o = s_d.gConf,
                    n = o.depthShield,
                    i = n.totalCustoms || 0;
                return utils.sdk_log("getDeepTouch-depthShield._type:" + n._type), 0 !== n._type ? 1 == n._type ? (utils.sdk_log("toalNum > totalCustoms: " + o.toalNum + " > " + n.totalCustoms), (!n.totalCustoms || o.toalNum > n.totalCustoms) && (utils.sdk_log("toalByTodayNum > dayCustoms: " + o.toalByTodayNum + " > " + n.dayCustoms[0]), (!n.dayCustoms || o.toalByTodayNum > n.dayCustoms[0]) && utils.checkGoodUser(n))) : e || 0 === e ? (utils.sdk_log("customNum >= totalCustoms: " + e + " >= " + i), i <= e && (n.dayCustoms && 0 != n.dayCustoms.length ? (utils.sdk_log(e + " == " + i + " || ((" + e + " > " + i + ") && ((" + e + " - " + i + ") % (" + n.dayCustoms[0] + " + 1)) == 0)"), (e == i || i < e && (e - i) % (n.dayCustoms[0] + 1) == 0) && utils.checkGoodUser(n)) : (utils.sdk_log("depthShield.dayCustoms is null or empty"), !1))) : (utils.sdk_log("customNum is " + e), !1) : utils.checkGoodUser(n)
            }
        },
        checkMistouchTimer: function () {
            if (s_d.gConf && s_d.gConf.mistouchTimer) {
                if (s_d.gConf.mistouchTimer.onOff) {
                    var e = s_d.gConf.mistouchTimer,
                        s = e.startTime_h || 0,
                        t = e.startTime_m || 0,
                        o = e.endTime_h || 23,
                        n = e.endTime_m || 59,
                        i = new Date,
                        a = i.getHours(),
                        r = i.getMinutes();
                    return utils.sdk_log("checkMistouchTimer- " + s + ":" + t + " > " + a + ":" + r + " < " + o + ":" + n), !!(a < s || a == s && r <= t || o < a || a == o && n <= r)
                }
                return !0
            }
            return !1
        },
        checkGoodUser: function (e) {
            return utils.sdk_log("checkGoodUser:" + e.goodUserOnOff), !e.goodUserOnOff || !utils.isGoodUser(e)
        },
        isGoodUser: function (e) {
            var s = !1;
            return s = !e.watchTvNum && 0 !== e.watchTvNum || (utils.sdk_log("isGoodUser--" + s_d.gConf.watchTvNum + " > " + e.watchTvNum), s_d.gConf.watchTvNum > e.watchTvNum), utils.sdk_log("isGoodUser:" + s), s
        },
        addPlayNums: function (e) {
            if (e) try {
                e = parseInt(e), s_d.gConf.lastCustom = e;
                var s = p_f.getLD(sys.ld_k.LD_KEY_MCI);
                (s = "" == s ? 0 : parseInt(s)) < e && (s = e, p_f.saveLD(sys.ld_k.LD_KEY_MCI, s), s_d.gConf.maxCustom = s), p_f.saveLD(sys.ld_k.LD_KEY_LCI, e), utils.sdk_log("addPlayNums-customNum:" + e + ",maxCustom:" + s)
            } catch (e) {
                console.error("YLSDK addPlayNums error e:", e)
            }
            s_d.gConf.toalByTodayNum += 1, s_d.gConf.toalNum += 1, utils.sdk_log("addPlayNums-toalNum:" + s_d.gConf.toalNum + ",toalByTodayNum:" + s_d.gConf.toalByTodayNum), p_f.saveLD(sys.ld_k.LD_KEY_TDPNI, s_d.gConf.toalByTodayNum), p_f.saveLD(sys.ld_k.LD_KEY_TTPNI, s_d.gConf.toalNum), p_f.saveLD(sys.ld_k.LD_KEY_LPTI, (new Date).getTime())
        },
        initVideoShareLimit: function (e, s) {
            e.videoFalseLimit && (s_d.videoShareLimit.videoFalseLimit = e.videoFalseLimit), e.shareFalseLimit && (s_d.videoShareLimit.shareFalseLimit = e.shareFalseLimit), s_d.videoShareLimit.lastDate = s.getTime();
            var t = utils.getVideoShareLimit(),
                o = !0;
            if (t && "" !== t) {
                var n = JSON.parse(t);
                if (n.lastDate) {
                    var i = new Date(n.lastDate),
                        a = i.getFullYear(),
                        r = i.getMonth() + 1,
                        l = i.getDate(),
                        d = s.getFullYear(),
                        c = s.getMonth() + 1,
                        u = s.getDate();
                    console.warn("YLSDK initVideoShareLimit-" + d + " == " + a + " && " + c + " == " + r + " && " + u + " == " + l), d == a && c == r && u == l && (s_d.videoShareLimit = n, o = !1)
                }
            }
            o && p_f.saveLD(sys.ld_k.LD_KEY_VSFL, JSON.stringify(s_d.videoShareLimit))
        },
        rewardByVideoOrShare: function (e) {
            var s = !1,
                t = s_d.videoShareLimit;
            return e ? t.videoFalseLimit && 0 < t.videoFalseLimit && (s = !0, --t.videoFalseLimit, t.videoFalseLimit = t.videoFalseLimit < 0 ? 0 : t.videoFalseLimit, s_d.videoShareLimit.videoFalseLimit = t.videoFalseLimit) : t.shareFalseLimit && 0 < t.shareFalseLimit && (s = !0, --t.shareFalseLimit, t.shareFalseLimit = t.shareFalseLimit < 0 ? 0 : t.shareFalseLimit, s_d.videoShareLimit.shareFalseLimit = t.shareFalseLimit), console.warn("YLSDK rewardByVideoOrShare-videoShareLimit:", JSON.stringify(s_d.videoShareLimit)), s && p_f.saveLD(sys.ld_k.LD_KEY_VSFL, JSON.stringify(s_d.videoShareLimit)), s
        },
        getVideoShareLimit: function () {
            return p_f.getLD(sys.ld_k.LD_KEY_VSFL)
        },
        getVideoUnlock: function (s) {
            var t = !1;
            if (s_d.gConf && s_d.gConf.VideoUnlockCustoms) {
                var e = s_d.gConf.VideoUnlockCustoms,
                    o = e.openCustoms || 0,
                    n = e.spaceCustoms || 0;
                if (e.onOff)
                    if (s == o) t = !0;
                    else if (o < s && (s - o) % (n + 1) == 0) t = !0;
                else {
                    var i = utils.getVideoUnlockCustoms();
                    i && 0 < i.length && i.forEach(function (e) {
                        s == e && (t = !0)
                    })
                }
                utils.sdk_log("getVideoUnlock-customNum:" + s + ",openCustoms:" + o + ",spaceCustoms:" + n + ",unlock:" + t)
            }
            return t
        },
        getVideoUnlockCustoms: function () {
            var e = p_f.getLD(sys.ld_k.LD_KEY_WTUCI);
            return e = e && "0" != e && "" != e ? JSON.parse(e) : new Array, utils.sdk_log("getVideoUnlockCustoms-sUnlockNum:" + e), e
        },
        getPowerInfo: function (s) {
            s_d.gConf.isServerData ? s && s(s_d.gConf.Power) : nets.getGameConfig(function (e) {
                utils.sdk_log("ylGetPowerInfo--res:" + e), s && s(s_d.gConf.Power)
            })
        },
        checkJumpOutTime: function () {
            var e = new Date,
                s = e.getDate(),
                t = e.getMonth(),
                o = e.getFullYear(),
                n = utils.getJumpOutInfo(),
                i = "" !== n && JSON.parse(n);
            if (i && i.date) {
                var a = new Date(i.date),
                    r = a.getDate(),
                    l = a.getMonth();
                o == a.getFullYear() && t == l && r == s || utils.saveJumpOutInfo("")
            }
        },
        getJumpOutInfo: function () {
            var e = p_f.getLD(sys.ld_k.LD_KEY_JI);
            return utils.sdk_log("获取卖量跳转记录:" + e), e
        },
        addPower: function (e) {
            if (s_d.gConf.Power.onOff) {
                if (s_d.gConf && s_d.gConf.Power) {
                    var s = yl_sdk.getPower();
                    if (1 == e) {
                        var t = s_d.gConf.Power.getPower;
                        t && (s += t)
                    } else 2 == e && (s += 1);
                    utils.setPower(s, e)
                }
            } else utils.sdk_log("addPower--onOff is off")
        },
        getAccountId: function () {
            var e = p_f.getLD(sys.ld_k.LD_KEY_AI);
            return utils.sdk_log("getAccountId:" + e), e
        },
        registerInterval: function () {
            utils.unRegisterInterval(), utils.sdk_log("registerInterval"), s_d.s_interval = setInterval(function () {
                utils.sendStatistics()
            }, s_d.s_commit_dt, null)
        },
        unRegisterInterval: function () {
            utils.sdk_log("unRegisterInterval"), s_d.s_interval && clearInterval(s_d.s_interval), s_d.s_interval = null
        },
        sendStatistics: function () {
            if (s_d.tj && s_d.accountPass) {
                if (s_d.tj.events) {
                    var e = s_d.tj.events;
                    if (0 !== e.length)
                        if (e.length >= s_d.s_max_post_l) {
                            for (var s = [], t = 0; t < s_d.s_max_post_l; t++) s.push(e.shift());
                            nets.eventsTJ(s)
                        } else nets.eventsTJ(e, !0)
                }
                if (s_d.tj.sdkLog) {
                    var o = s_d.tj.sdkLog;
                    if (0 !== o.length)
                        if (o.length >= s_d.s_max_post_l) {
                            var n = [];
                            for (t = 0; t < s_d.s_max_post_l; t++) n.push(o.shift());
                            nets.sdkLogTJ(n)
                        } else nets.sdkLogTJ(o, !0)
                }
                s_d.tj.video && 0 < s_d.tj.video.length && nets.viedoTJ(s_d.tj.video.pop()), s_d.tj.blockAd && 0 < s_d.tj.blockAd.length && nets.blockAdTJ(s_d.tj.blockAd.pop()), s_d.tj.customAd && 0 < s_d.tj.customAd.length && nets.customAdTJ(s_d.tj.customAd.pop()), s_d.tj.appBoxAd && 0 < s_d.tj.appBoxAd.length && nets.appBoxAdTJ(s_d.tj.appBoxAd.pop()), s_d.tj.gridAd && 0 < s_d.tj.gridAd.length && nets.gridAdTJ(s_d.tj.gridAd.pop()), s_d.tj.interstitialAd && 0 < s_d.tj.interstitialAd.length && nets.interstitialAdTJ(s_d.tj.interstitialAd.pop()), s_d.tj.nativeAd && 0 < s_d.tj.nativeAd.length && nets.nativeAdTJ(s_d.tj.nativeAd.pop()), s_d.tj.sharecard && 0 < s_d.tj.sharecard.length && nets.shareCardTJ(s_d.tj.sharecard.pop()), s_d.tj.clickcount && 0 < s_d.tj.clickcount.length && nets.clickOutTJ(s_d.tj.clickcount.pop()), s_d.tj.result && 0 < s_d.tj.result.length && nets.resultTJ(s_d.tj.result.pop()), s_d.tj.layer && 0 < s_d.tj.layer.length && nets.layerTJ(s_d.tj.layer.pop())
            }
        },
        saveTJtoLocal: function () {
            if (s_d.tj.events && s_d.tj.events.length > s_d.s_cache_ml)
                for (var e = s_d.s_cache_ml; e < s_d.tj.events.length; e++) s_d.tj.events.shift();
            p_f.saveLD(sys.ld_k.LD_KEY_STST, JSON.stringify(s_d.tj))
        },
        getLocalTJ: function () {
            try {
                var e = p_f.getLD(sys.ld_k.LD_KEY_STST);
                return e && 0 !== e.length ? JSON.parse(e) : def_tj
            } catch (e) {}
        },
        clearAllTJ: function () {
            p_f.saveLD(sys.ld_k.LD_KEY_STST, ""), s_d.tj = def_tj
        },
        clearTJEvents: function () {
            try {
                s_d.tj.events = [], p_f.saveLD(sys.ld_k.LD_KEY_STST, JSON.stringify(s_d.tj))
            } catch (e) {}
        },
        clearTJSdkLogs: function () {
            try {
                s_d.tj.sdkLog = [], p_f.saveLD(sys.ld_k.LD_KEY_STST, JSON.stringify(s_d.tj))
            } catch (e) {}
        },
        removeItemFrom: function (e) {
            var s = utils.getJumpOutInfo(),
                t = !(!s || "" === s) && JSON.parse(s);
            if (s_d.boxconfig && 0 < s_d.boxconfig.length && g.side_min_num < s_d.boxconfig.length) {
                for (var o = 0; o < s_d.boxconfig.length; o++) {
                    var n = s_d.boxconfig[o];
                    if (n.toAppid === e && 0 == n.innerStatus) {
                        utils.sdk_log("remove clicked item icon--id:" + n._id), s_d.boxconfig.splice(o, 1);
                        var i = !1,
                            a = new Date;
                        if (t && t.list && 0 < t.list.length)
                            for (var r = 0; r < t.list.length; r++) t.list[r].appid == e && (i = !0);
                        else t = {
                            list: []
                        };
                        i || t.list.push({
                            appid: e
                        }), t.date = a.getTime()
                    }
                }
                utils.saveJumpOutInfo(JSON.stringify(t))
            }
        },
        savePowerLocal: function () {
            var e = JSON.stringify(s_d.gConf.Power);
            p_f.saveLD(sys.ld_k.LD_KEY_PNI, e), utils.sdk_log("savePowerLocal-powerInfo:" + e)
        },
        getSharingResults: function (e, s) {
            var t = !1,
                o = {
                    sSuccess: !0
                },
                n = (new Date).getTime() - e.showTime,
                i = utils.getSharingStrategy(e);
            if (i) {
                var a = i.strategy_id,
                    r = i.value[a],
                    l = i.time_id;
                if (s_d.switchLog && console.log("YLSDK 假分享策略:[" + a + " - " + l + "],time_space:" + n, JSON.stringify(r)), r.time && l < r.time.length) {
                    var d = r.time[l],
                        c = r.prob[l];
                    if (d && 1 < d.length)
                        for (var u = 1; u < d.length; u++)
                            if (n >= d[u - 1] && n <= d[u]) {
                                var _ = c[u - 1];
                                t = utils.randomProbability(_)
                            } else if (u == d.length - 1 && n > d[u]) {
                        var g = c[u];
                        t = utils.randomProbability(g)
                    }
                }
                l += 1, t ? (i.time_id = 0, i.count += 1) : (l >= r.time.length ? (i.time_id = 0, i.count += 1) : i.time_id = l, o = {
                    sSuccess: !1,
                    hasStrategy: !0,
                    trickJson: i.trickJson
                }), i.count >= r.num && (i.count = 0, i.strategy_id = utils.getNextStrategy(i, a)), utils.setSharingStategy(i)
            } else s_d.switchLog && console.log("YLSDK 真分享(time_space > 3000)?:", n), 3e3 < n ? t = !0 : o = {
                sSuccess: !1,
                hasStrategy: !1
            };
            s && s(o)
        },
        getSharingStrategy: function (e) {
            var t = null;
            return s_d.moduleFalseList && 0 < s_d.moduleFalseList.length && e.channel && e.module && s_d.moduleList && 0 < s_d.moduleList.length && (s_d.switchLog && console.log("YLSDK getSharingStrategy-channel,module:", e.channel, e.module), s_d.moduleList.forEach(function (s) {
                s.type && s.channel && s.module && s.channel == e.channel && s.module == e.module && s_d.moduleFalseList.forEach(function (e) {
                    if (e._id == s.type) return t = e
                })
            })), t
        },
        setSharingStategy: function (e) {
            for (var s = 0; s < s_d.moduleFalseList.length; s++) {
                if (s_d.moduleFalseList[s]._id && e._id) {
                    s_d.moduleFalseList[s] = e;
                    break
                }
            }
        },
        pushShareInfoMap: function (e, s) {
            "" !== s ? s_d.sharecard_config.set(s, e.result) : e.result.forEach(function (e) {
                if (s_d.sharecard_config.has(e.scene)) {
                    for (var s = s_d.sharecard_config.get(e.scene), t = !1, o = 0; o < s.length; o++) {
                        if (s[o].id == e.id) {
                            t = !0;
                            break
                        }
                    }
                    t || s.push(e), s_d.sharecard_config.set(e.scene, s)
                } else {
                    var n = [];
                    n.push(e), s_d.sharecard_config.set(e.scene, n)
                }
            })
        },
        randomProbability: function (e) {
            if (utils.sdk_log("randomProbability---pro:" + e), 100 == e) return !0;
            if (0 == e) return !1;
            var s = Math.floor(100 * Math.random());
            return utils.sdk_log("randomProbability---random pro:" + s), s <= e
        },
        getNextStrategy: function (e, s) {
            var t = s + 1;
            utils.sdk_log("nextStrategyId:" + t), t >= e.value.length && (t = 0);
            var o = e.value[t];
            return 0 == o.num && (utils.sdk_log("num:" + o.num), t = utils.getNextStrategy(e, t)), t
        }
    }, "getAccountPass", function () {
        var e = p_f.getLD(sys.ld_k.LD_KEY_AP);
        return utils.sdk_log("获取缓存AccountPass:" + e), e
    }), _defineProperty(_utils, "saveJumpOutInfo", function (e) {
        p_f.saveLD(sys.ld_k.LD_KEY_JI, e), utils.sdk_log("saveJumpOutInfo:" + e)
    }), _defineProperty(_utils, "savePTinfo", function (e) {
        p_f.saveLD(sys.ld_k.LD_KEY_UPI, e), utils.sdk_log("savePTinfo:" + e)
    }), _defineProperty(_utils, "getPTinfo", function () {
        var e = p_f.getLD(sys.ld_k.LD_KEY_UPI);
        return utils.sdk_log("getPTinfo:" + e), e
    }), _defineProperty(_utils, "addWatchTVnums", function (e) {
        s_d.gConf.watchTvNum += 1, p_f.saveLD(sys.ld_k.LD_KEY_TDWTNI, s_d.gConf.watchTvNum), p_f.saveLD(sys.ld_k.LD_KEY_LWTI, (new Date).getTime()), e && utils.addVideoUnlockCustoms(e)
    }), _defineProperty(_utils, "addVideoUnlockCustoms", function (s) {
        var e = utils.getVideoUnlockCustoms(),
            t = !1;
        e && 0 < e.length && e.forEach(function (e) {
            e == s && (t = !0)
        }), t || e.push(s);
        var o = JSON.stringify(e);
        utils.sdk_log("addVideoUnlockCustoms-unlockCustomNum:" + s + ",sUnlockNum:" + o), p_f.saveLD(sys.ld_k.LD_KEY_WTUCI, o)
    }), _defineProperty(_utils, "isToday", function (e) {
        var s = new Date,
            t = s.getFullYear(),
            o = s.getMonth() + 1,
            n = s.getDate(),
            i = new Date(e),
            a = i.getFullYear(),
            r = i.getMonth() + 1,
            l = i.getDate();
        return t == a && o == r && n == l
    }), _utils),
    yl_sdk = {
        init: function (e) {
            sys = e, s_d.pf_name = sys.pf_name, s_d.pf_num = sys.pf_num, s_d.switchLog = sys.s_log, g = e.game_config, p_f = e.pf_func, is_platform_phone = s_d.pf_num === pc.OPPO || s_d.pf_num === pc.VIVO || s_d.pf_num === pc.MZ || s_d.pf_num === pc.UC || s_d.pf_num === pc.WEB, s_d.accountPass = utils.getAccountPass()
        },
        login: function (e) {
            nets.login(e)
        },
        loginSDKServer: function (e, s) {
            nets.loginSDKServer(e, s)
        },
        getInviteAccount: function () {
            return s_d.invite_account
        },
        getUserInfo: function () {
            return s_d.loginInfo
        },
        getSwitchInfo: function () {
            return s_d.switchInfo
        },
        logs: function (e, s) {
            utils.logs(e, s)
        },
        statisticViedo: function (e, s, t, o) {
            var n = {
                scene: t,
                adId: s,
                type: e
            };
            nets.viedoTJ(n, o)
        },
        statisticResult: function (e, s) {
            var t = {
                detail: e
            };
            nets.resultTJ(t, s)
        },
        storeValue: function (e, s) {
            nets.storeValue(e, s)
        },
        eventCount: function (e, s) {
            utils.eventCount(e, s)
        },
        getCustom: function (e) {
            nets.getCustom(e)
        },
        getSideBox: function (e) {
            nets.SideBox(e)
        },
        getIntegralWall: function (e) {
            nets.IntegralWall(e)
        },
        getBoardAward: function (e, s) {
            nets.getBoardAward(e, s)
        },
        shareCard: function (e, s) {
            nets.shareCard(e, s)
        },
        showShareOrVideo: function (e, s, t) {
            utils.showShareOrVideo(e, s, t)
        },
        useShareOrVideoStrategy: function (e, s, t) {
            utils.useShareOrVideoStrategy(e, s, t)
        },
        getDeepTouch: function (e) {
            return utils.getDTinfo(e)
        },
        overGame: function (e) {
            utils.addPlayNums(e)
        },
        videoUnlock: function (e) {
            return utils.getVideoUnlock(e)
        },
        onPowerChange: function (e) {
            s_d.powerChangeCB = e
        },
        setPower: function (e) {
            utils.setPower(e, 3)
        },
        getPower: function () {
            return s_d.gConf.Power.powerNum
        },
        getUserPlatFormInfo: function () {
            var e = s_d.u_pt_info;
            return e = e || ("" == (e = utils.getPTinfo()) ? null : JSON.parse(e)), s_d.u_pt_info = e, s_d.u_pt_info
        },
        setUserPlatFormInfo: function (e) {
            s_d.u_pt_info = e, utils.savePTinfo(JSON.stringify(s_d.u_pt_info)), nets.Edit(s_d.u_pt_info)
        },
        getGameConfig: function () {
            return s_d.gConf
        },
        getShareConfig: function () {
            return s_d.sharecard_config
        },
        statisticShareCard: function (e) {
            var s = {
                sharecardId: e
            };
            nets.shareCardTJ(s)
        },
        getShareScene: function () {
            return s_d.share_scene || ""
        },
        setShareScene: function (e) {
            return e || utils.sdk_log("setShareScene-need scene", "warn"), s_d.share_scene = e || "", s_d.share_scene
        },
        setLastTime: function () {
            s_d.accountPass ? s_d.lastTime = (new Date).getTime() : s_d.need_tj_on_show = !0
        },
        getBannerTimeSpace: function () {
            return s_d.banner_time_space
        },
        getLocalStatistics: function () {
            s_d.tj = utils.getLocalTJ(), s_d.tj.events || (s_d.tj.events = []), s_d.tj.video || (s_d.tj.video = []), s_d.tj.blockAd || (s_d.tj.blockAd = []), s_d.tj.customAd || (s_d.tj.customAd = []), s_d.tj.appBoxAd || (s_d.tj.appBoxAd = []), s_d.tj.gridAd || (s_d.tj.gridAd = []), s_d.tj.interstitialAd || (s_d.tj.interstitialAd = []), s_d.tj.nativeAd || (s_d.tj.nativeAd = []), s_d.tj.sdkLog || (s_d.tj.sdkLog = []), s_d.tj.result || (s_d.tj.result = []), s_d.tj.sharecard || (s_d.tj.sharecard = []), s_d.tj.clickcount || (s_d.tj.clickcount = []), s_d.tj.layer || (s_d.tj.layer = [])
        },
        addPower: function () {
            utils.addPower(1)
        },
        addWatchTVnums: function (e) {
            return utils.addWatchTVnums(e)
        },
        getAccountId: function () {
            return utils.getAccountId()
        },
        removeItemFrom: function (e) {
            utils.removeItemFrom(e)
        },
        ClickOut: function (e, s, t, o) {
            nets.ClickOut(e, s, t, o)
        },
        registerInterval: function () {
            utils.registerInterval()
        },
        unRegisterInterval: function () {
            utils.unRegisterInterval()
        },
        savePowerLocal: function () {
            utils.savePowerLocal()
        },
        statisticsPlayTime: function () {
            var e = (new Date).getTime();
            s_d.lastTime || (s_d.lastTime = e);
            var s = e - s_d.lastTime;
            nets.durationTJ({
                type: 0,
                duration: s
            })
        },
        saveStatisticsToLocal: function () {
            utils.saveTJtoLocal()
        },
        getSharingResults: function (e, s) {
            utils.getSharingResults(e, s)
        },
        statisticsBanner: function (e) {
            nets.bannerTJ(e)
        },
        getBoxConfig: function () {
            return s_d.boxconfig
        },
        setLoginInfo: function (e) {
            s_d.loginInfo = e
        },
        getPowerInfo: function (e) {
            utils.getPowerInfo(e)
        },
        getVSLimit: function () {
            return s_d.videoShareLimit
        },
        rewardByVideoOrShare: function (e) {
            return utils.rewardByVideoOrShare(e)
        },
        getLayerList: function (e) {
            nets.layerList(e)
        },
        statisticLayer: function (e) {
            var s = (new Date).getTime(),
                t = s_d.gameLayerInfo.local_info.get_time;
            t && utils.isToday(t) || (s_d.gameLayerInfo.local_info.get_time = null, s_d.gameLayerInfo.local_info.s_layers = null);
            var o = s_d.gameLayerInfo.local_info,
                n = !1;
            o && o.s_layers && (n = 0 < o.s_layers.indexOf(e));
            if (!n) {
                var i = s_d.gameLayerInfo.pathList,
                    a = i.indexOf(e);
                if (0 <= a) {
                    var r = s_d.gameLayerInfo.local_info;
                    if (r.get_time && r.s_layers) nets.commitTJlayer(e), r.s_layers || (s_d.gameLayerInfo.local_info.s_layers = new Array), s_d.gameLayerInfo.local_info.s_layers.push(e);
                    else {
                        r.s_layers || (s_d.gameLayerInfo.local_info.s_layers = new Array);
                        for (var l = 0; l <= a; l++) nets.commitTJlayer(i[l]), s_d.gameLayerInfo.local_info.s_layers.push(i[l])
                    }
                    s_d.gameLayerInfo.local_info.get_time = s, p_f.saveLD(sys.ld_k.LD_KEY_SCL, JSON.stringify(s_d.gameLayerInfo.local_info))
                } else utils.sdk_log("statisticLayer-layerPath not found", "warn")
            }
        },
        getServerInfo: function (e) {
            nets.getServerInfo(e)
        },
        interstitialAdTJ: function (e) {
            nets.interstitialAdTJ(e)
        },
        gridAdTJ: function (e) {
            nets.gridAdTJ(e)
        },
        blockAdTJ: function (e) {
            nets.blockAdTJ(e)
        },
        nativeAdTJ: function (e) {
            nets.nativeAdTJ(e)
        },
        customAdTJ: function (e) {
            nets.customAdTJ(e)
        },
        appBoxAdTJ: function (e) {
            nets.appBoxAdTJ(e)
        }
    };
module.exports = yl_sdk;