(function () {
    'use strict';

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var EventMgr = new Laya.EventDispatcher;

    var ESMessage;
    (function (ESMessage) {
        ESMessage[ESMessage["C2S_SWITCH"] = 0] = "C2S_SWITCH";
        ESMessage[ESMessage["C2S_RM_SIDES"] = 1] = "C2S_RM_SIDES";
        ESMessage[ESMessage["C2S_RM_BOARDS"] = 2] = "C2S_RM_BOARDS";
        ESMessage[ESMessage["C2S_REMOVE"] = 3] = "C2S_REMOVE";
        ESMessage[ESMessage["C2S_RESET"] = 4] = "C2S_RESET";
        ESMessage[ESMessage["S2C_REMOVE"] = 5] = "S2C_REMOVE";
        ESMessage[ESMessage["S2C_CLICK_BTN"] = 6] = "S2C_CLICK_BTN";
        ESMessage[ESMessage["S2C_CANCEL"] = 7] = "S2C_CANCEL";
        ESMessage[ESMessage["S2C_DOT_SERVER"] = 8] = "S2C_DOT_SERVER";
        ESMessage[ESMessage["S2C_DOT_ALD"] = 9] = "S2C_DOT_ALD";
        ESMessage[ESMessage["S2C_DOT_EVENT"] = 10] = "S2C_DOT_EVENT";
        ESMessage[ESMessage["S2S_REMOVE"] = 11] = "S2S_REMOVE";
        ESMessage[ESMessage["S2S_REMOVE1"] = 12] = "S2S_REMOVE1";
        ESMessage[ESMessage["S2S_COMPLETE"] = 13] = "S2S_COMPLETE";
        ESMessage[ESMessage["S2S_COMPLETE1"] = 14] = "S2S_COMPLETE1";
    })(ESMessage || (ESMessage = {}));
    var SideMsg = (function () {
        function SideMsg() {
        }
        SideMsg.$register = function (key, obj) {
            var isReg = key && key.length > 0;
            if (isReg) {
                var self_1 = SideMsg;
                var targets = self_1.$targets;
                var target = targets[key] || (targets[key] = []);
                target.push(obj);
                self_1.$removeLater(key);
            }
            return isReg;
        };
        SideMsg.$removeLater = function (key) {
            var self = SideMsg;
            var laters = self.$laters;
            var params = laters[key];
            if (params !== void 0) {
                delete laters[key];
                self.$notice(key, params);
            }
        };
        SideMsg.$notice = function (key, params) {
            var self = SideMsg;
            params.unshift(ESMessage[key]);
            self.notice.apply(self, params);
        };
        SideMsg.register = function (msg, call, thisObj, once) {
            return SideMsg.$register(ESMessage[msg], [call, thisObj, once]);
        };
        SideMsg.notice = function (msg) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            var array = SideMsg.$targets[ESMessage[msg]];
            if (array) {
                array = array.concat();
                for (var i = 0, len = array.length; i < len; i++) {
                    var target = array[i];
                    target[0].apply(target[1], params);
                    if (target[2]) {
                        array.splice(i, 1);
                        i--;
                        len--;
                    }
                }
            }
        };
        SideMsg.remove = function (msg, call, thisObj) {
            var array = SideMsg.$targets[ESMessage[msg]];
            if (array) {
                for (var i = 0, len = array.length; i < len; i++) {
                    var target = array[i];
                    if (target[0] === call && target[1] === thisObj) {
                        array.splice(i, 1);
                        break;
                    }
                }
            }
        };
        SideMsg.removeAll = function (msg) {
            delete SideMsg.$targets[ESMessage[msg]];
        };
        SideMsg.hasRegister = function (msg) {
            return !!SideMsg.$targets[ESMessage[msg]];
        };
        SideMsg.clear = function () {
            var self = SideMsg;
            self.$targets = {};
            self.$laters = {};
        };
        SideMsg.noticeLater = function (msg) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            var self = SideMsg;
            var key = ESMessage[msg];
            if (self.hasRegister(msg))
                self.$notice(key, params);
            else
                self.$laters[key] = params;
        };
        SideMsg.$targets = {};
        SideMsg.$laters = {};
        return SideMsg;
    }());

    var SideNewMgr = (function () {
        function SideNewMgr() {
            this._boxDatas = [];
        }
        Object.defineProperty(SideNewMgr, "ins", {
            get: function () {
                if (this._ins == void 0) {
                    this._ins = new SideNewMgr();
                    this._ins.init();
                }
                return this._ins;
            },
            enumerable: true,
            configurable: true
        });
        SideNewMgr.prototype.init = function () {
        };
        Object.defineProperty(SideNewMgr.prototype, "boxDatas", {
            set: function (boxs) {
                this._boxDatas = boxs;
            },
            enumerable: true,
            configurable: true
        });
        SideNewMgr.prototype.getBoxDatas = function () {
            (this._boxDatas.length <= 0) && (console.warn('warn, side box null!!!!!!'));
            return this._boxDatas;
        };
        SideNewMgr.prototype.getBoxDatasSync = function (func) {
            var _this = this;
            if (this._boxDatas.length > 0) {
                func && func(this._boxDatas);
            }
            else {
                (window.ydhw_wx) && (window.ydhw.GetSideBox(this, function (info) {
                    _this._boxDatas = info;
                    func && func(_this._boxDatas);
                }));
            }
        };
        SideNewMgr.prototype.hasSide = function () {
            return this._boxDatas && this._boxDatas.length > 0;
        };
        SideNewMgr.prototype.showMore = function () {
            SideMsg.notice(ESMessage.S2C_CANCEL);
        };
        SideNewMgr._ins = null;
        return SideNewMgr;
    }());

    var spScenes = [1011, 1017, 1047];
    var misScenes = [1005, 1006, 1007, 1008, 1011, 1012, 1013, 1017, 1027, 1042, 1047];
    var GameConst = {
        CDN: "https://txext.ylxyx.cn/youdianhaowan/",
        ResVersion: "1.0",
        NetLog: false,
        Log: true,
        Env: "online",
        BonusSwitch: false,
        ShareSwitch: false,
        SideSwitch: false,
        SceneSwitch: false,
        MisTouchSwitch: false,
        GDMisTouchSwitch: false,
        ScoreSwitch: false,
        Openid: "",
        SessionId: "",
        ExtraData: "",
        Channel: "",
        Scene: 0,
        NetType: "",
        banner_switch: [1, 1.3],
        banner_rf_time: [10, 15],
        gamebanner: true,
        BarViewSate: 0,
        SwitchYS: false,
        InsertBannerDelayTime: 700,
        InsertbannerInterval: 10,
        SwitchInsertBanner: false,
        SwitchSkinTry: false,
        WCBox: false,
        BannerShowTime: 1000,
        BtnReSize: 1300,
        BigBox: false,
        logAllSwitch: function () {
            console.log('----------GameConst----------');
            for (var key in GameConst) {
                if (typeof (GameConst[key]) == 'boolean') {
                    console.log(key, GameConst[key]);
                }
            }
        },
        isSpecialScene: function () {
            return spScenes.indexOf(this.Scene) > -1;
        },
        isMisScene: function () {
            return misScenes.indexOf(this.Scene) > -1;
        },
        canShare: function () {
            return GameConst.ShareSwitch;
        },
        openGDMistouch: function () {
            return GameConst.GDMisTouchSwitch;
        },
        openMisScene: function () {
            return GameConst.SceneSwitch && GameConst.isMisScene();
        },
        openMisTouch: function () {
            return GameConst.MisTouchSwitch;
        },
        openSide: function () {
            return GameConst.SideSwitch && (!GameConst.SceneSwitch || !GameConst.isSpecialScene()) && !platform.isOppo && !platform.isVivo;
        }
    };

    var EventType = {
        EnterLoading: "EnterLoading",
        ResProgress: "ResProgress",
        SubpkgProgress: "SubpkgProgress",
        LoadingSuc: "LoadingSuc",
        OpenUI: "OpenUI",
        CloseUI: "CloseUI",
        CheckNewDay: "CheckNewDay",
        RefreshCacheData: "RefreshCacheData",
        RefreshScoreSV: "RefreshScoreSV",
        AddDesktopSuccess: "AddDesktopSuccess",
        RefreshGold: "RefreshGold",
        RefreshLevel: "RefreshLevel",
        RefreshSkin: "RefreshSkin",
        CloseSide: "CloseSide",
        ChangeRoleModel: "ChangeRoleModel",
    };

    var outCode = 0, valCode = 0, timeout = {}, interval = {};
    var clear = function (data, key) {
        var info = data[key];
        if (info) {
            delete data[key];
            Laya.timer.clear(null, info);
        }
    };
    var TimeUtils = (function () {
        function TimeUtils() {
        }
        TimeUtils.formatTen = function (num) {
            return (num > 9 ? '' : '0') + num;
        };
        TimeUtils.formatHour = function (second, sufix) {
            if (sufix === void 0) { sufix = ':'; }
            var ten = TimeUtils.formatTen;
            var hour = second / 3600 | 0;
            var min = (second / 60 | 0) % 60;
            var sec = second % 60;
            return ten(hour) + sufix + ten(min) + sufix + ten(sec);
        };
        TimeUtils.getDay = function (time) {
            return (time / 3600000 + 8) / 24 | 0;
        };
        TimeUtils.isSameDay = function (time0, time1) {
            var get = TimeUtils.getDay;
            return get(time0) == get(time1);
        };
        TimeUtils.setTimeout = function (call, thisObj, delay) {
            var param = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                param[_i - 3] = arguments[_i];
            }
            var curc = ++outCode;
            var func = timeout[curc] = function () {
                call.apply(thisObj, param);
                delete timeout[curc];
            };
            Laya.timer.once(delay, null, func);
            return curc;
        };
        TimeUtils.clearTimeout = function (key) {
            clear(timeout, key);
        };
        ;
        TimeUtils.setInterval = function (call, thisObj, delay) {
            var param = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                param[_i - 3] = arguments[_i];
            }
            var curc = ++valCode;
            var func = interval[curc] = function () {
                call.apply(thisObj, param);
            };
            Laya.timer.loop(delay, null, func);
            return curc;
        };
        TimeUtils.clearInterval = function (key) {
            clear(interval, key);
        };
        ;
        return TimeUtils;
    }());

    var Vector3 = Laya.Vector3;
    var Utils = (function () {
        function Utils() {
        }
        ;
        Utils.cloneArray = function (source) {
            var result = [];
            for (var i = 0; i < source.length; i++) {
                result.push(source[i]);
            }
            return result;
        };
        Utils.DistanceSquared = function (x1, y1, x2, y2) {
            var offx = x1 - x2;
            var offy = y1 - y2;
            return offx * offx + offy * offy;
        };
        Utils.MapDistanceSquared = function (pos1, pos2) {
            var offx = pos1.x - pos2.x;
            var offz = pos1.z - pos2.z;
            var dist = offx * offx + offz * offz;
            return dist;
        };
        Utils.GetAngle = function (dx, dy) {
            if (dy == 0) {
                return dx > 0 ? 0 : 180;
            }
            var angle = Math.atan(dx / dy) * 180 / Math.PI;
            if (dy < 0) {
                if (dx < 0)
                    angle = 180 + Math.abs(angle);
                else
                    angle = 180 - Math.abs(angle);
            }
            angle = 90 - angle;
            return angle;
        };
        Utils.parseInt = function (_strNum) {
            if (_strNum == null || _strNum == "undefined") {
                return 0;
            }
            var intNum = parseFloat(_strNum);
            if (intNum) {
                return Math.floor(intNum);
            }
            return 0;
        };
        Utils.isEmpty = function (obj) {
            if (typeof obj == "undefined" || obj == null || obj == "") {
                return true;
            }
            else {
                return false;
            }
        };
        Utils.isEqual = function (a, b) {
            var offVal = a - b;
            return Utils.nearZero(offVal);
        };
        Utils.nearZero = function (val) {
            return val >= -0.001 && val <= 0.001;
        };
        Utils.equalVec = function (vecA, vecB) {
            return this.isEqual(vecA.x, vecB.x) && this.isEqual(vecA.y, vecB.y) && this.isEqual(vecA.z, vecB.z);
        };
        Utils.vec3NearZero = function (vec) {
            return this.nearZero(vec.x) && this.nearZero(vec.y) && this.nearZero(vec.z);
        };
        Utils.SmoothDamp = function (current, target, currentVelocity, smoothTime, maxSpeed, deltaTime, output) {
            if (maxSpeed === void 0) { maxSpeed = -1; }
            if (maxSpeed == -1) {
                maxSpeed = Number.MAX_VALUE;
            }
            smoothTime = Math.max(0.0001, smoothTime);
            var omega = 2.0 / smoothTime;
            var x = omega * deltaTime;
            var exp = 1.0 / (1.0 + x + 0.48 * x * x + 0.235 * x * x * x);
            Vector3.subtract(current, target, Utils._changeVec);
            target.cloneTo(Utils._originalTo);
            var maxChange = maxSpeed * smoothTime;
            Utils.ClampMagnitude(Utils._changeVec, maxChange);
            Vector3.subtract(current, Utils._changeVec, target);
            Vector3.scale(Utils._changeVec, omega, Utils._tmpVec);
            Vector3.add(currentVelocity, Utils._tmpVec, Utils._tmpVec);
            Vector3.scale(Utils._tmpVec, deltaTime, Utils._tmpVec);
            Vector3.scale(Utils._tmpVec, omega, Utils._tmpVec2);
            Vector3.subtract(currentVelocity, Utils._tmpVec2, Utils._tmpVec2);
            Vector3.scale(Utils._tmpVec2, exp, currentVelocity);
            Vector3.add(Utils._changeVec, Utils._tmpVec, Utils._tmpVec);
            Vector3.scale(Utils._tmpVec, exp, Utils._tmpVec);
            Vector3.add(target, Utils._tmpVec, output);
            Vector3.subtract(Utils._originalTo, current, Utils._tmpVec);
            Vector3.subtract(output, Utils._originalTo, Utils._tmpVec2);
            if (Vector3.dot(Utils._tmpVec, Utils._tmpVec2) > 0) {
                Utils._originalTo.cloneTo(output);
                Vector3.subtract(output, Utils._originalTo, Utils._tmpVec);
                Vector3.scale(Utils._tmpVec, 1 / deltaTime, currentVelocity);
            }
        };
        Utils.ClampMagnitude = function (vec, maxLength) {
            if (Vector3.scalarLengthSquared(vec) > maxLength * maxLength) {
                Vector3.normalize(vec, vec);
                Vector3.scale(vec, maxLength, vec);
            }
        };
        Utils.Range = function (min, max) {
            return min + Math.random() * (max - min);
        };
        Utils.IntRange = function (min, max) {
            return Math.round(Utils.Range(min, max));
        };
        Utils.DegToRad = function (deg) {
            return deg * Math.PI / 180;
        };
        Utils.RadToDeg = function (rad) {
            return rad * 180 / Math.PI;
        };
        Utils.getGravity = function (height, time) {
            var gravity = 2 * height / (time * time);
            return gravity;
        };
        Utils.RotatePos = function (pos, centerPos, eulerY, outPos) {
            var rad = Utils.DegToRad(eulerY - 180);
            var cos = Math.cos(rad);
            var sin = Math.sin(rad);
            var x = (pos.x - centerPos.x) * cos + (pos.z - centerPos.z) * sin + centerPos.x;
            var z = -(pos.x - centerPos.x) * sin + (pos.z - centerPos.z) * cos + centerPos.z;
            outPos.setValue(x, 0, z);
        };
        Utils.formatTimestamp = function (time) {
            var str;
            var hour;
            var min;
            var sec;
            var hourStr;
            var minStr;
            var secStr;
            hour = Math.floor(time / 3600);
            min = Math.floor((time % 3600) / 60);
            sec = Math.floor((time % 3600) % 60);
            hourStr = (hour >= 10) ? hour.toString() : ('0' + hour);
            minStr = (min >= 10) ? min.toString() : ('0' + min);
            secStr = (sec >= 10) ? sec.toString() : ("0" + sec);
            str = hourStr + ":" + minStr + ":" + secStr;
            return str;
        };
        Utils.formatTime = function (time) {
            var str;
            var min;
            var sec;
            var secStr;
            min = Math.floor(time / 60);
            sec = Math.floor(time % 60);
            secStr = (sec >= 10) ? sec.toString() : ("0" + sec);
            str = min + ":" + secStr;
            return str;
        };
        Utils.formatNum = function (num) {
            var str = num.toString();
            if (str.length == 1) {
                str = "00" + num;
            }
            else if (str.length == 2) {
                str = "0" + num;
            }
            return str;
        };
        Utils.log = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var str = Utils.formatDate(new Date(), "[hh:mm:ss.S]");
            params.forEach(function (element) {
                str += " " + JSON.stringify(element);
            });
            console.log(str);
        };
        Utils.formatDate = function (date, fmt) {
            var o = {
                "Y+": date.getFullYear(),
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "S": date.getMilliseconds()
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
        Utils.checkPhoneIsBangs = function () {
            var systemInfo = platform.getSystemInfoSync();
            return systemInfo ? systemInfo.windowHeight / systemInfo.windowWidth >= 2.1 : false;
        };
        Utils.addRedPoint = function (btn, isRed, top, right) {
            if (top === void 0) { top = 8; }
            if (right === void 0) { right = 1; }
            var _redPoint = btn.getChildByName("redPoint");
            if (_redPoint) {
                _redPoint.visible = isRed;
            }
            else if (isRed) {
                _redPoint = new Laya.Image("game/game_redPoint.png");
                _redPoint.name = "redPoint";
                btn.addChild(_redPoint);
                _redPoint.top = top;
                _redPoint.right = right;
            }
        };
        Utils.shuffle = function (arr) {
            var len = arr.length;
            for (var i = 0; i < len - 1; i++) {
                var index = Math.floor(Math.random() * (len - i));
                var temp = arr[index];
                arr[index] = arr[len - i - 1];
                arr[len - i - 1] = temp;
            }
            return arr;
        };
        Utils.getTodayDate = function () {
            var myDate = new Date();
            var year = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            var date = myDate.getDate();
            var today = '' + year + '_' + month + '_' + date;
            return today;
        };
        Utils.mathSinCos = function (attr, angle) {
            return Math[attr](angle * Math.PI / 180);
        };
        Utils.sin = function (angle) {
            return Utils.mathSinCos('sin', angle);
        };
        Utils.cos = function (angle) {
            return angle % 180 == 90 ? 0 : Utils.mathSinCos('cos', angle);
        };
        Utils.initNativeFiles = function (path, files) {
            var adpters = [Laya.MiniAdpter, Laya.VVMiniAdapter];
            var hasChange = false;
            for (var i in adpters) {
                var adpter = adpters[i];
                if (adpter) {
                    adpter.AutoCacheDownFile = true;
                    adpter.nativefiles = files;
                    hasChange = true;
                }
            }
            if (hasChange) {
                var fileMgr = Laya['MiniFileMgr'];
                if (fileMgr) {
                    var pLen_1 = path.length, fLen_1 = files.length, i_1, file_1, sIdx_1;
                    fileMgr.isLocalNativeFile = function (url) {
                        sIdx_1 = url.indexOf(path) == 0 ? pLen_1 : 0;
                        if (url[0] !== '/') {
                            for (i_1 = 0; i_1 < fLen_1; i_1++) {
                                file_1 = files[i_1];
                                if (url.indexOf(file_1, sIdx_1) == sIdx_1 && url[sIdx_1 + file_1.length] == '/') {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };
                }
                Laya.URL.basePath = Laya.URL['_basePath'] = path;
            }
        };
        Utils.initCDNFiles = function (path, files) {
            var adpters = [Laya.MiniAdpter, Laya.VVMiniAdapter];
            var hasChange = false;
            for (var i in adpters) {
                if (adpters[i]) {
                    hasChange = true;
                }
            }
            if (hasChange) {
                var url = Laya.URL;
                var fuc_1 = url.customFormat;
                var format_1, index_1;
                url.customFormat = function (url) {
                    url = fuc_1(url);
                    index_1 = url.indexOf('/');
                    if (index_1 > 0) {
                        format_1 = url.substr(0, index_1);
                        for (var i in files) {
                            if (files[i] === format_1) {
                                url = path + url;
                                break;
                            }
                        }
                    }
                    return url;
                };
            }
        };
        Utils.memset = function (length, value) {
            return Array.apply(null, Array(length)).map(function (v, i) { return value; });
        };
        Utils.memset2 = function (length, create) {
            return Array.apply(null, Array(length)).map(function (v, i) {
                return create(i);
            });
        };
        Utils.randomInArray = function (array, item) {
            var length = array.length, splice = length;
            if (length > 1 && item != void 0) {
                var index = array.indexOf(item);
                if (index > -1) {
                    length--;
                    splice = index;
                }
            }
            var rndIdx = Math.random() * length | 0;
            if (rndIdx >= splice)
                rndIdx++;
            return array[rndIdx];
        };
        Utils.randomSort = function (array) {
            return array.sort(function (a, b) {
                return Math.random() - 0.5;
            });
        };
        Utils.rmSplice = function (array) {
            var len = array.length;
            var index = Math.random() * len | 0;
            return array.splice(index, 1)[0];
        };
        Utils.removeItem = function (array, rmFun) {
            if (array) {
                for (var i = 0, len = array.length; i < len; i++) {
                    if (rmFun(array[i])) {
                        array.splice(i, 1);
                        i--;
                        len--;
                    }
                }
            }
        };
        Utils.formatStringReg = function (reg, str, args) {
            for (var i in args) {
                var arg = args[i];
                if (reg.test(str))
                    str = str.replace(reg, args[i]);
                else
                    break;
            }
            return str;
        };
        Utils.formatString = function (str) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            str = str.replace(/%%/g, '%');
            return Utils.formatStringReg(/%d|%s/i, str, args);
        };
        Utils.drawRoundRect = function (graphics, width, height, round) {
            var paths = [
                ['moveTo', round, 0],
                ['lineTo', width - round, 0],
                ['arcTo', width, 0, width, round, round],
                ['lineTo', width, height - round],
                ['arcTo', width, height, width - round, height, round],
                ['lineTo', round, height],
                ['arcTo', 0, height, 0, height - round, round],
                ['lineTo', 0, round],
                ['arcTo', 0, 0, round, 0, round]
            ];
            graphics.drawPath(0, 0, paths, { fillStyle: "#0" });
        };
        Utils.screenToStage = function (pixel) {
            var info = platform.getSystemInfoSync();
            var scale = Laya.stage.height / info.screenHeight;
            return pixel * scale;
        };
        Utils.uiEnableCall = function (view, call, thisObj) {
            var params = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                params[_i - 3] = arguments[_i];
            }
            if (view['_getBit'](Laya.Const.AWAKED)) {
                call.apply(thisObj, params);
            }
            else {
                var func_1 = view.onEnable;
                view.onEnable = function () {
                    func_1.call(view);
                    view.onEnable = func_1;
                    call.apply(thisObj, params);
                };
            }
        };
        Utils.getRes = function (url, type) {
            return new Promise(function (resolve) {
                var loader = Laya.loader;
                var res = loader.getRes(url);
                if (res)
                    resolve(res);
                else
                    loader.load(url, Laya.Handler.create(null, resolve), null, type);
            });
        };
        Utils.isIPhone = function () {
            var systemInfo = platform.getSystemInfoSync();
            if (systemInfo != null) {
                var system = systemInfo.system.toLowerCase();
                return system.indexOf('ios') > -1;
            }
            return false;
        };
        Utils.multipleClick = function (view, multiple, distance, call, thisObj) {
            var count = 0, lastTime, curTime, timeout;
            view.on(Laya.Event.CLICK, this, function () {
                curTime = Date.now();
                if (curTime - lastTime > distance)
                    count = 0;
                lastTime = curTime;
                if (++count >= multiple) {
                    count = 0;
                    call && call.call(thisObj);
                }
                TimeUtils.clearTimeout(timeout);
                timeout = TimeUtils.setTimeout(function () {
                    count = 0;
                }, null, distance);
            });
        };
        Utils.loadingTask = function (task, call) {
            var timeout = TimeUtils.setTimeout(platform.showLoading, platform, 1000);
            var clear = function () {
                platform.hideLoading();
                TimeUtils.clearTimeout(timeout);
                TimeUtils.clearTimeout(timeout1);
            };
            var timeout1 = TimeUtils.setTimeout(clear, null, 5000);
            task.then(function (res) {
                clear();
                call && call(res);
            }).catch(function () {
                clear();
            });
        };
        Utils.copy = function (obj) {
            var ret;
            if (typeof obj === 'object') {
                ret = obj instanceof Array ? [] : Object.create(null);
                for (var i in obj) {
                    ret[i] = Utils.copy(obj[i]);
                }
            }
            else
                ret = obj;
            return ret;
        };
        Utils.copyAttrs = function (attrs, target, source) {
            for (var i = 0, len = attrs.length; i < len; i++) {
                var attr = attrs[i];
                target[attr] = source[attr];
            }
        };
        Utils.globalToLocal = function (sprite, x, y) {
            var temp = Laya.Point.TEMP;
            temp.setTo(x, y);
            sprite.globalToLocal(temp);
            return temp;
        };
        Utils._originalTo = new Vector3();
        Utils._changeVec = new Vector3();
        Utils._tmpVec = new Vector3();
        Utils._tmpVec2 = new Vector3();
        return Utils;
    }());

    var Timer = (function () {
        function Timer(call, thisObj, delay, isTime, isStop) {
            if (delay === void 0) { delay = 1; }
            this.$runTime = 0;
            this.$runCount = 0;
            this.$call = call;
            this.$thisObj = thisObj;
            isStop || this.start();
            Laya.timer[isTime ? 'loop' : 'frameLoop'](delay, this, this.update);
        }
        Timer.prototype.update = function () {
            var self = this;
            if (self.$running) {
                self.$runCount++;
                self.$call.call(self.$thisObj);
            }
            else {
                var aTime = self.$awaitTime;
                if (aTime && aTime <= Date.now()) {
                    self.start();
                }
            }
        };
        Timer.prototype.start = function () {
            var self = this;
            if (!self.$running) {
                self.$lastTime = Date.now();
                self.$running = true;
                self.$awaitTime = null;
            }
        };
        Timer.prototype.stop = function () {
            var self = this;
            if (self.$running) {
                var nowT = Date.now();
                self.$runTime += nowT - self.$lastTime;
                self.$lastTime = nowT;
                self.$running = false;
                self.$awaitTime = null;
            }
        };
        Timer.prototype.await = function (time) {
            var self = this;
            if (time > 0) {
                self.stop();
                self.$awaitTime = Date.now() + time;
            }
            else {
                self.start();
            }
        };
        Object.defineProperty(Timer.prototype, "running", {
            get: function () {
                return this.$running;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timer.prototype, "runTime", {
            get: function () {
                var self = this;
                return self.$runTime + (self.running ?
                    Date.now() - self.$lastTime : 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timer.prototype, "runCount", {
            get: function () {
                return this.$runCount;
            },
            enumerable: true,
            configurable: true
        });
        Timer.prototype.reset = function () {
            var self = this;
            self.$runTime = self.$runCount = 0;
            self.$lastTime = Date.now();
        };
        Timer.prototype.clear = function () {
            var self = this;
            Laya.timer.clear(self, self.update);
            self.$call = self.$thisObj = null;
        };
        return Timer;
    }());

    var sign = 'LTween', cache = '$' + sign;
    var removeAt = function (array, item) {
        var index = array.indexOf(item);
        index > -1 && array.splice(index, 1);
    };
    var Tween = (function () {
        function Tween() {
        }
        Tween.prototype.$init = function (target, props) {
            var self = this;
            var tweens = target[cache] || (target[cache] = []);
            tweens.push(self);
            self.$target = target;
            self.$frame = props.frame;
            self.$loop = props.loop;
            self.$once = props.once !== false;
            self.$frameCall = props.frameCall;
            self.$frameObj = props.frameObj;
            self.$curTime = 0;
            self.$needCopy = true;
            self.$steps = [];
            self.$cSteps = [];
            self.$timer = new Timer(self.$update, self, 1, false, true);
        };
        Object.defineProperty(Tween.prototype, "$runTime", {
            get: function () {
                var timer = this.$timer;
                return this.$frame ? timer.runCount : timer.runTime;
            },
            enumerable: true,
            configurable: true
        });
        Tween.prototype.$update = function () {
            var self = this;
            var steps = self.$steps, cSteps = self.$cSteps;
            if (self.$needCopy) {
                self.$needCopy = false;
                cSteps.push.apply(cSteps, steps);
            }
            var runTime = self.$runTime, remove = 0;
            for (var i = 0, len = steps.length; i < len; i++) {
                var step = steps[i];
                if (step.startTime > runTime)
                    break;
                self.$runStep(step);
                if (step.endTime <= runTime)
                    remove++;
            }
            remove > 0 && steps.splice(0, remove);
            var call = self.$frameCall;
            call && call.call(self.$frameObj);
            steps = self.$steps;
            if (steps && steps.length == 0) {
                if (self.$loop) {
                    self.$timer.reset();
                    self.$steps = cSteps.concat();
                }
                else {
                    self.$once ? self.clear() : self.$pause();
                }
            }
        };
        Tween.prototype.$pause = function () {
            var self = this;
            var timer = self.$timer;
            self.$needCopy = true;
            self.$curTime = 0;
            self.$steps = [];
            timer.stop();
            timer.reset();
        };
        Tween.prototype.$addStep = function (type, duration, param) {
            var self = this;
            var startTime = self.$curTime;
            var endTime = self.$curTime = startTime + duration;
            self.$steps.push({ type: type, startTime: startTime, endTime: endTime, param: param });
            self.$timer.start();
        };
        Tween.prototype.$getIncrement = function (start, end) {
            var copy = {};
            var keys = Object.keys(end);
            var hasv = function (obj) {
                return !!obj || (obj != null && obj != void 0);
            };
            for (var i in keys) {
                var key = keys[i];
                var value = start[key];
                if (hasv(value))
                    copy[key] = end[key] - value;
            }
            return copy;
        };
        Tween.prototype.$runStep = function (step) {
            var self = this;
            var type = step.type;
            switch (type) {
                case 0:
                    self.$to(step);
                    break;
                case 1:
                    self.$set(step.param);
                    break;
                case 2:
                    break;
                case 3:
                    self.$call(step.param);
                    break;
                case 4:
                    self.$form(step);
                    break;
            }
        };
        Tween.prototype.$to = function (step) {
            var self = this;
            var start = step.startTime;
            var ratio = Math.min((self.$runTime - start) / (step.endTime - start), 1);
            var param = step.param;
            var ease = param[0];
            ease && (ratio = ease(ratio));
            var target = self.$target, endp = param[1], dstp = param[2] || (param[2] = self.$getIncrement(target, endp));
            for (var i in dstp) {
                target[i] = endp[i] - dstp[i] * (1 - ratio);
            }
        };
        Tween.prototype.$set = function (props) {
            var self = this;
            var target = self.$target;
            for (var i in props)
                target[i] = props[i];
        };
        Tween.prototype.$call = function (param) {
            param[0].apply(param[1], param[2]);
        };
        Tween.prototype.$form = function (step) {
            var self = this, props = step.param, target = self.$target, start = step.startTime, ratio = Math.min((self.$runTime - start) / (step.endTime - start), 1);
            for (var i in props) {
                target[i] = props[i](ratio);
            }
        };
        Tween.prototype.to = function (props, duration, ease) {
            var self = this;
            if (isNaN(duration) || duration <= 0) {
                self.set(props);
            }
            else {
                self.$addStep(0, duration, [ease, props]);
            }
            return self;
        };
        Tween.prototype.set = function (props) {
            var self = this;
            self.$addStep(1, 0, props);
            return self;
        };
        Tween.prototype.wait = function (delay) {
            var self = this;
            delay > 0 && self.$addStep(2, delay);
            return self;
        };
        Tween.prototype.call = function (call, thisObj, params) {
            var self = this;
            call && self.$addStep(3, 0, [call, thisObj, params]);
            return self;
        };
        Tween.prototype.form = function (props, duration) {
            var self = this;
            if (isNaN(duration) || duration <= 0) {
                var obj = {};
                for (var i in props) {
                    obj[i] = props[i](1);
                }
                self.set(obj);
            }
            else {
                self.$addStep(4, duration, props);
            }
            return self;
        };
        Tween.prototype.repeat = function (repeat, step) {
            var self = this;
            if (repeat > 0 && self.$timer) {
                var steps = self.$cSteps.concat().concat(self.$steps), len = steps.length;
                if (len > 0) {
                    if (!(step > 0) || step > len)
                        step = len;
                    var startI = len - step;
                    for (var i = 0; i < repeat; i++) {
                        for (var j = 0; j < step; j++) {
                            var step_1 = steps[startI + j];
                            self.$addStep(step_1.type, step_1.endTime - step_1.startTime, step_1.param);
                        }
                    }
                }
            }
            return self;
        };
        Tween.prototype.stop = function () {
            var timer = this.$timer;
            timer && timer.stop();
        };
        Tween.prototype.resume = function () {
            var timer = this.$timer;
            timer && timer.start();
        };
        Tween.prototype.clear = function () {
            var self = this;
            if (self.$timer) {
                var target = self.$target;
                var tweens = target[cache];
                if (tweens instanceof Array) {
                    removeAt(tweens, self);
                    tweens.length == 0 && (delete target[cache]);
                }
                self.$timer.clear();
                self.$timer = self.$steps = self.$cSteps = self.$target = self.$frameCall = self.$frameObj = null;
                Laya.Pool.recover(sign, self);
            }
        };
        Tween.get = function (target, props) {
            var tween = Laya.Pool.getItemByClass(sign, Tween);
            tween.$init(target, props || {});
            return tween;
        };
        Tween.once = function (target, props) {
            Tween.clear(target);
            return Tween.get(target, props);
        };
        Tween.clear = function (target) {
            if (target) {
                var tweens = target[cache];
                if (tweens instanceof Array) {
                    for (var i = 0, len = tweens.length; i < len; i++) {
                        var tween = tweens[i];
                        tween instanceof Tween && tween.clear();
                    }
                }
                delete target[cache];
            }
        };
        Tween.clearAll = function (root) {
            Tween.clear(root);
            for (var i = 0, len = root.numChildren; i < len; i++) {
                Tween.clearAll(root.getChildAt(i));
            }
        };
        Tween.turnEase = function (ease) {
            return function (t) {
                return ease(t, 0, 1, 1);
            };
        };
        return Tween;
    }());

    var TipView = (function (_super) {
        __extends(TipView, _super);
        function TipView() {
            var _this = _super.call(this) || this;
            var width = 800, height = 80;
            var img = new Laya.Image("common/blank.png");
            img.width = width;
            img.height = height;
            var txt = new Laya.Text();
            _this._txt = txt;
            txt.fontSize = 36;
            txt.wordWrap = true;
            txt.color = "#FFFFFF";
            txt.width = width;
            txt.height = height;
            txt.align = "center";
            txt.valign = "middle";
            _this.addChild(img);
            _this.addChild(txt);
            _this.width = width;
            _this.height = height;
            return _this;
        }
        Object.defineProperty(TipView.prototype, "text", {
            set: function (text) {
                this._txt.text = text;
            },
            enumerable: true,
            configurable: true
        });
        TipView.prototype.play = function (call, thisObj) {
            var self = this;
            self.scale(.8, .8);
            self.alpha = 1;
            Tween.get(self).
                to({
                scaleX: 1, scaleY: 1
            }, 200, Tween.turnEase(Laya.Ease.backOut)).
                wait(400).
                to({ alpha: 0 }, 400).
                call(call, thisObj);
        };
        return TipView;
    }(Laya.View));
    var randomBanner = function () {
        var banners = platform.banners;
        return banners && banners[Math.random() * banners.length | 0];
    };
    var UIMgr = (function () {
        function UIMgr() {
        }
        UIMgr.checkView = function (ui) {
            if (ui.setCloseCall === void 0) {
                ui.setCloseCall = function (call, obj) {
                    var ond = ui.onDisable;
                    ui.onDisable = function () {
                        ond.call(ui);
                        ui.onDisable = ond;
                        call && call.call(obj);
                    };
                };
            }
            if (ui.onShow === void 0) {
                ui.onShow = function () { };
            }
            if (ui.onHide === void 0) {
                ui.onHide = function () { };
            }
        };
        UIMgr.checkBanner = function (ui, bool) {
            var _this = this;
            var uiConfig = ui.$uiConfig;
            if (bool && uiConfig.banner) {
                var misTouchInfo = YLSDK.getBtnMisData();
                var isMisTouchView_1 = misTouchInfo.switch && uiConfig.misTouch;
                var moveTime = misTouchInfo.bannerTime;
                var time_1 = moveTime || 0;
                window.ydhw_wx && (ydhw.CreateBannerAd(false, false, this, function () {
                    if (time_1 > 0 && isMisTouchView_1) {
                        Laya.timer.once(time_1, _this, function () {
                            if (ui == UIMgr.topUI()) {
                                ydhw.ShowBannerAd();
                                ui.$showBanner = true;
                            }
                        });
                    }
                    else {
                        ydhw.ShowBannerAd();
                        ui.$showBanner = true;
                    }
                }));
                return;
            }
            ui.$showBanner = false;
            window.ydhw_wx && (ydhw.HideBannerAd());
        };
        UIMgr.checkMask = function (ui) {
            var config = ui.$uiConfig;
            config && config.mask ? UIMgr.showMaskBg(ui) : UIMgr.hideMaskBg();
        };
        UIMgr.checkTop = function (topUI) {
            var curTop = UIMgr.topUI();
            if (topUI == curTop && curTop) {
                UIMgr.checkBanner(topUI, true);
                UIMgr.checkMask(topUI);
                curTop.onShow();
            }
        };
        UIMgr.showSideList = function (ui) {
        };
        UIMgr.hideSideList = function () {
        };
        UIMgr.onUIClose = function (ui) {
            var config = ui.$uiConfig;
            var tween = config && config.tween;
            if (tween) {
                UIMgr.hideTween(ui);
            }
            else {
                UIMgr.destroyUI(ui);
            }
        };
        UIMgr.destroyUI = function (ui) {
            var list = ui._aniList;
            UIMgr.checkBanner(ui, false);
            if (list) {
                for (var i = 0, len = list.length; i < len; i++) {
                    var ani = list[i];
                    if (ani instanceof Laya.AnimationBase)
                        ani.clear();
                }
                ui._aniList = null;
            }
            Laya.timer.clearAll(ui);
            Laya.stage.removeChild(ui);
            Tween.clearAll(ui);
            ui.close();
            ui.destroy(true);
        };
        UIMgr.showTween = function (ui) {
            Utils.uiEnableCall(ui, UIMgr.onShowTween, UIMgr, ui);
        };
        UIMgr.onShowTween = function (ui) {
            var stage = Laya.stage;
            if (isNaN(ui.anchorX)) {
                ui.anchorX = .5;
                ui.x += ui.width / 2;
            }
            if (isNaN(ui.anchorY)) {
                ui.anchorY = .5;
                ui.y += ui.height / 2;
            }
            ui.scale(0, 0);
            stage.mouseEnabled = false;
            Tween.get(ui).to({ scaleX: 1, scaleY: 1 }, 300, Tween.turnEase(Laya.Ease.backOut)).call(function () {
                stage.mouseEnabled = true;
            });
        };
        UIMgr.hideTween = function (ui) {
            var stage = Laya.stage;
            UIMgr.showMaskBg(ui);
            stage.mouseEnabled = false;
            Tween.get(ui).to({ scaleX: 0, scaleY: 0 }, 300, Tween.turnEase(Laya.Ease.backIn)).call(function () {
                UIMgr.hideMaskBg();
                stage.mouseEnabled = true;
                UIMgr.destroyUI(ui);
            });
        };
        UIMgr.showMaskBg = function (ui) {
            var mask = UIMgr._maskBg;
            var stage = Laya.stage;
            if (!mask) {
                mask = UIMgr._maskBg = new Laya.Image("common/blank_2.png");
                mask.sizeGrid = "2,2,2,2";
                mask.size(stage.width + 20, stage.height + 20);
                mask.pos(-10, -10);
                mask.alpha = .7;
                mask.on(Laya.Event.MOUSE_DOWN, UIMgr, UIMgr.onStMask);
            }
            stage.addChild(mask);
            mask.zOrder = ui.zOrder;
            stage.setChildIndex(mask, stage.getChildIndex(ui));
        };
        UIMgr.hideMaskBg = function () {
            var mask = UIMgr._maskBg;
            mask && mask.removeSelf();
        };
        UIMgr.onStMask = function (e) {
            e.stopPropagation();
        };
        UIMgr.openUI = function (uiConfig, data, visible, isKeep) {
            if (isKeep === void 0) { isKeep = false; }
            if (uiConfig) {
                var old = UIMgr.findUI(uiConfig);
                if (old) {
                    console.error('so quick');
                    return;
                }
                var clzz = Laya.ClassUtils.getRegClass(uiConfig.class);
                if (clzz && clzz.prototype instanceof Laya.Sprite) {
                    var ui = new clzz;
                    var top_1 = UIMgr.topUI();
                    if (data != null) {
                        ui.dataSource = data;
                    }
                    if (isKeep) {
                        ui.zOrder = UIMgr._keepZOrder;
                    }
                    else {
                        ui.zOrder = UIMgr._zOrder++;
                    }
                    ui.visible = visible !== false;
                    ui.$uiConfig = uiConfig;
                    Laya.stage.addChild(ui);
                    UIMgr._uiArray.push(ui);
                    UIMgr.checkBanner(ui, true);
                    UIMgr.checkMask(ui);
                    UIMgr.checkView(ui);
                    top_1 && top_1.onHide();
                    uiConfig.tween && UIMgr.showTween(ui);
                    ui.eventCount && ui.eventCount();
                    EventMgr.event(EventType.CloseUI, uiConfig);
                    return ui;
                }
                else
                    console.error("openUI error", uiConfig);
            }
        };
        UIMgr.openUIs = function (views, call) {
            var _loop_1 = function (i) {
                var view = views[i];
                var old = call;
                call = function () {
                    UIMgr.openUI(view[0], view[1]).setCloseCall(old);
                };
            };
            for (var i = views.length - 1; i >= 0; i--) {
                _loop_1(i);
            }
            call && call();
        };
        UIMgr.closeUI = function (uiConfig) {
            var isTop = false;
            if (uiConfig) {
                var _uiArray = UIMgr._uiArray;
                for (var endi = _uiArray.length - 1, i = endi; i >= 0; i--) {
                    var ui = _uiArray[i];
                    if (ui.$uiConfig == uiConfig) {
                        _uiArray.splice(i, 1);
                        UIMgr.onUIClose(ui);
                        isTop = i == endi;
                        break;
                    }
                }
            }
            if (isTop) {
                Laya.timer.frameOnce(2, UIMgr, UIMgr.checkTop, [UIMgr.topUI()]);
            }
            EventMgr.event(EventType.OpenUI, uiConfig);
        };
        UIMgr.updateUI = function (uiConfig, data) {
            var view = UIMgr.findUI(uiConfig);
            if (view) {
                UIMgr.setTop(uiConfig);
            }
            else
                UIMgr.openUI(uiConfig, data);
        };
        UIMgr.toUI = function (uiConfig, data) {
            var array = UIMgr._uiArray, oldUI;
            for (var i = array.length - 1; i >= 0; i--) {
                var ui = array[i];
                if (ui.$uiConfig != uiConfig) {
                    if (ui.zOrder != UIMgr._keepZOrder) {
                        UIMgr.onUIClose(ui);
                        array.splice(i, 1);
                    }
                }
                else {
                    oldUI = ui;
                    data !== void 0 && (ui.dataSource = data);
                }
            }
            if (oldUI) {
                UIMgr.checkTop(oldUI);
            }
            else {
                oldUI = UIMgr.openUI(uiConfig, data);
            }
            return oldUI;
        };
        UIMgr.showBanner = function (uiConfig, bool) {
            var view = UIMgr.topUI();
            if (view && view.$uiConfig == uiConfig) {
                UIMgr.checkBanner(view, bool);
            }
        };
        UIMgr.showTips = function (msg) {
            var tips = UIMgr._tipViews;
            if (tips == null) {
                var box = new Laya.Box();
                tips = UIMgr._tipViews = [];
                Laya.stage.addChild(box);
                box.zOrder = UIMgr._tZOrder;
                for (var i = 0; i < 3; i++) {
                    var subBox = new TipView;
                    subBox.alpha = 0;
                    box.addChild(subBox);
                    subBox.anchorX = subBox.anchorY = 0.5;
                    subBox.x = 400;
                    subBox.visible = false;
                    tips.push(subBox);
                }
                box.width = 800;
                box.centerX = 0;
                box.centerY = -20;
            }
            if (tips.length == 0)
                return;
            var txt = tips.shift();
            txt.text = msg;
            txt.visible = true;
            txt.play(function () {
                tips.push(txt);
                txt.visible = false;
            });
        };
        UIMgr.findUI = function (uiConfig) {
            if (uiConfig) {
                var _uiArray = UIMgr._uiArray;
                for (var i = _uiArray.length - 1; i >= 0; i--) {
                    var ui = _uiArray[i];
                    if (ui.$uiConfig == uiConfig)
                        return ui;
                }
            }
            return null;
        };
        UIMgr.setTop = function (uiConfig) {
            var ui = UIMgr.findUI(uiConfig);
            if (ui) {
                var _uiArray = UIMgr._uiArray;
                var index = _uiArray.indexOf(ui);
                _uiArray.splice(index, 1);
                _uiArray.push(ui);
                ui.visible = true;
                ui.zOrder = UIMgr._zOrder++;
                UIMgr.checkTop(ui);
            }
        };
        UIMgr.topUI = function () {
            var array = UIMgr._uiArray;
            var length = array.length;
            if (length > 0)
                return array[length - 1];
        };
        UIMgr.setVisible = function (uiConfig, bool, isKeep) {
            var ui = UIMgr.findUI(uiConfig);
            if (bool && !ui) {
                ui = UIMgr.openUI(uiConfig, null, bool, isKeep);
            }
            ui && (ui.visible = bool);
            return ui;
        };
        Object.defineProperty(UIMgr, "topZOrder", {
            get: function () {
                return UIMgr._tZOrder - 1;
            },
            enumerable: true,
            configurable: true
        });
        UIMgr._zOrder = 1000;
        UIMgr._keepZOrder = 80000;
        UIMgr._tZOrder = 100000;
        UIMgr._uiArray = [];
        return UIMgr;
    }());

    var EYLCustomSwitch;
    (function (EYLCustomSwitch) {
        EYLCustomSwitch[EYLCustomSwitch["Record_screen_popup"] = 0] = "Record_screen_popup";
        EYLCustomSwitch[EYLCustomSwitch["Video_Unlock_lvl"] = 1] = "Video_Unlock_lvl";
        EYLCustomSwitch[EYLCustomSwitch["Check_box"] = 2] = "Check_box";
        EYLCustomSwitch[EYLCustomSwitch["Insert_screen"] = 3] = "Insert_screen";
        EYLCustomSwitch[EYLCustomSwitch["Native_Ads"] = 4] = "Native_Ads";
        EYLCustomSwitch[EYLCustomSwitch["Skin_trial"] = 5] = "Skin_trial";
        EYLCustomSwitch[EYLCustomSwitch["Lucky_wheel"] = 6] = "Lucky_wheel";
        EYLCustomSwitch[EYLCustomSwitch["Game_scene_banner"] = 7] = "Game_scene_banner";
        EYLCustomSwitch[EYLCustomSwitch["Button_mistake"] = 8] = "Button_mistake";
        EYLCustomSwitch[EYLCustomSwitch["Baoxiang"] = 9] = "Baoxiang";
        EYLCustomSwitch[EYLCustomSwitch["Button_to_banner"] = 10] = "Button_to_banner";
        EYLCustomSwitch[EYLCustomSwitch["Text_button"] = 11] = "Text_button";
        EYLCustomSwitch[EYLCustomSwitch["False_close_button"] = 12] = "False_close_button";
        EYLCustomSwitch[EYLCustomSwitch["End_page_style"] = 13] = "End_page_style";
        EYLCustomSwitch[EYLCustomSwitch["Game_name"] = 14] = "Game_name";
        EYLCustomSwitch[EYLCustomSwitch["More_games"] = 15] = "More_games";
        EYLCustomSwitch[EYLCustomSwitch["Game_scene_elect"] = 16] = "Game_scene_elect";
        EYLCustomSwitch[EYLCustomSwitch["Pendant_8_elect"] = 17] = "Pendant_8_elect";
    })(EYLCustomSwitch || (EYLCustomSwitch = {}));
    var sdkSuport = typeof (ydhw) != "undefined";
    var YLSDK = (function () {
        function YLSDK() {
        }
        Object.defineProperty(YLSDK, "isWX", {
            get: function () {
                return typeof (ydhw_wx) != "undefined";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(YLSDK, "isTT", {
            get: function () {
                return typeof (ydhw_tt) != "undefined";
            },
            enumerable: true,
            configurable: true
        });
        YLSDK.init = function () {
            var _this = this;
            if (!sdkSuport)
                return;
            ydhw.Login(this, function (isOK) {
                if (isOK) {
                    SideNewMgr.ins.getBoxDatasSync();
                    GameConst.MisTouchSwitch = window.ydhw.SwitchTouch;
                    ydhw.GetCustomConfig(_this, function (res) {
                        YLSDK.initCustomSwitch(res);
                    });
                    ydhw.GetLayerList(function (layerList) {
                        for (var i = 0; i < layerList.length; i++) {
                            var info = layerList[i];
                            if (!_this._fuckAwayPaths[info.layer]) {
                                _this._fuckAwayPaths[info.layer] = [];
                            }
                            _this._fuckAwayPaths[info.layer].push(info);
                        }
                    });
                }
            });
        };
        YLSDK.initCustomSwitch = function (datas) {
            if (!datas) {
                console.warn("未获取到自定义开关配置数据");
                return;
            }
            for (var index = 0; index < datas.length; index++) {
                var e = datas[index];
                if (EYLCustomSwitch[e.name] == void 0) {
                    console.warn('Warn：请在枚举中 添加对应的自定义开关  e.name = ', e.name);
                }
                else {
                    this._customSwitch[EYLCustomSwitch[e.name]] = e.value;
                }
            }
        };
        YLSDK.getCustomSwitch = function (type) {
            return this._customSwitch[type];
        };
        YLSDK.getBtnMisData = function () {
            if (this._customSwitch[EYLCustomSwitch.Button_mistake]) {
                var serverInfo = this._customSwitch[EYLCustomSwitch.Button_mistake];
                var datas = serverInfo.split(',');
                this._btnMisTouchInfo.switch = Number(datas[0]);
                this._btnMisTouchInfo.bannerTime = Number(datas[1]);
                this._btnMisTouchInfo.btnTime = Number(datas[2]);
            }
            return this._btnMisTouchInfo;
        };
        YLSDK.getInsertScreenData = function () {
            if (this._customSwitch[EYLCustomSwitch.Insert_screen]) {
                var serverInfo = this._customSwitch[EYLCustomSwitch.Insert_screen];
                var datas = serverInfo.split(',');
                this._insertScreenInfo.switch = Number(datas[0]);
                this._insertScreenInfo.firstDelayTime = Number(datas[1]);
                this._insertScreenInfo.spaceTime = Number(datas[2]);
                this._insertScreenInfo.delayPopTime = Number(datas[3]);
            }
            return this._insertScreenInfo;
        };
        YLSDK.getFuckAwayData = function (layer) {
            return this._fuckAwayPaths[layer];
        };
        YLSDK.shortcut = function () {
            var _this = this;
            if (ydhw_oppo) {
                ydhw.HasShortcutInstalled(this, function (res) {
                    var foolState = false;
                    var timedelay = 0;
                    if (_this._shortcuttime === 0) {
                        _this._shortcuttime = Date.now();
                        foolState = true;
                    }
                    else {
                        timedelay = Date.now() - _this._shortcuttime;
                        if (timedelay > 60 * 1000) {
                            _this._shortcuttime = Date.now();
                            foolState = true;
                        }
                    }
                    if (res == false && foolState) {
                        ydhw.InstallShortcut(_this, function () {
                            Laya.timer.once(500, _this, function () {
                                EventMgr.event(EventType.AddDesktopSuccess);
                            });
                        }, function () {
                        }, function () {
                        });
                    }
                    else {
                        console.log("用户有添加 游戏");
                    }
                }, function (err) {
                    console.log(err);
                }, function () {
                });
            }
        };
        YLSDK.createInserstitialAd = function () {
            var _this = this;
            var insertData = this.getInsertScreenData();
            if (!insertData.switch)
                return;
            if (this._canShowInsertBanner === false) {
                var curtimeInterval = Date.now() - this._insertBannerShowTime;
                if (curtimeInterval > 1000 * insertData.firstDelayTime) {
                    this._canShowInsertBanner = true;
                }
                console.log("插屏  时间判断", curtimeInterval);
            }
            if (this._insertBanerLastShowTime !== 0) {
                var curtimeLasttime = Date.now() - this._insertBanerLastShowTime;
                if (curtimeLasttime < insertData.spaceTime) {
                    console.log("插屏展示时间加个太短  ");
                    return;
                }
            }
            if (window.ydhw_wx && this._canShowInsertBanner && insertData.switch) {
                Laya.timer.once(GameConst.InsertBannerDelayTime, this, function () {
                    ydhw.CreateInterstitialAd(true, _this, function () {
                        ydhw.ShowInterstitialAd();
                        ydhw.HideBannerAd();
                        _this._insertBanerLastShowTime = Date.now();
                    }, function () {
                    }, function () {
                        if (_this._isNativeAdShow) { }
                        else {
                            ydhw.ShowBannerAd();
                        }
                    });
                });
            }
        };
        YLSDK.createNative = function (index, _callback) {
            var _this = this;
            if (ydhw_oppo) {
                ydhw.CreateNativeAd(this, function (list) {
                    if (list) {
                        _this._isNativeAdShow = true;
                        var data = list[0];
                        _this._nativeData[index] = list;
                        _callback && _callback(data);
                    }
                    else {
                        _this._isNativeAdShow = false;
                    }
                });
            }
        };
        Object.defineProperty(YLSDK, "nativeData", {
            get: function () {
                return this._nativeData;
            },
            enumerable: true,
            configurable: true
        });
        YLSDK.clickNativeAd = function (index) {
            if (ydhw_oppo) {
                var list = this._nativeData[index];
                if (list) {
                }
            }
        };
        Object.defineProperty(YLSDK, "shortcuttime", {
            set: function (time) {
                this._shortcuttime = time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(YLSDK, "insertBannerShowTime", {
            set: function (time) {
                this._insertBannerShowTime = time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(YLSDK, "isNativeAdShow", {
            get: function () {
                return this._isNativeAdShow;
            },
            enumerable: true,
            configurable: true
        });
        YLSDK.showRewardVideoAd = function (callFun) {
            if (!sdkSuport) {
                callFun(true);
                return;
            }
            ydhw.ShowRewardVideoAd(0, true, this, function (type) {
                console.log("video play state", type);
                var isOk = true;
                if (type == 2) {
                    UIMgr.showTips("您的视频还没看完，无法获得奖励!");
                    isOk = false;
                }
                else if (type == 0) {
                    UIMgr.showTips("广告拉取繁忙，稍后再试!");
                    isOk = false;
                }
                callFun(isOk);
            });
        };
        YLSDK.statisResult = function (name, param) {
            if (param === void 0) { param = null; }
            if (!sdkSuport)
                return;
            var fuckAwayLists = YLSDK.getFuckAwayData(name);
            fuckAwayLists && ydhw.StatisticResult(param);
        };
        YLSDK.statisEvent = function (name, scene) {
            if (!sdkSuport)
                return;
            ydhw.StatisticEvent(name, scene);
        };
        YLSDK.RecorderStart = function () {
            if (!sdkSuport || !YLSDK.isTT || this._recordStartTime > 0)
                return;
            this._recordStartTime = new Date().getTime();
            console.log("-------------RecorderStart--------:", this._recordStartTime);
            var duration = 100;
            ydhw_tt.RecorderStart(duration, function (result) {
                console.log("YLSDK -RecorderStart-onStart:", JSON.stringify(result));
            }, function (result) {
                console.log("YLSDK -RecorderStart-onError:", JSON.stringify(result));
            });
        };
        YLSDK.RecorderStop = function () {
            if (!sdkSuport || !YLSDK.isTT || this._recordStartTime == 0)
                return;
            this._recordStartTime = 0;
            this.recorderTime = (new Date().getTime() - this._recordStartTime) * 0.001;
            console.log("-------------RecorderStop--------:", this.recorderTime);
            ydhw_tt.RecorderStop();
        };
        YLSDK.ShareVideo = function (title, desc, query, success) {
            if (!sdkSuport || !YLSDK.isTT) {
                success && success();
                return;
            }
            ydhw_tt.ShareVideo(title, desc, query, function (isOk) {
                console.log("分享回调", isOk);
                if (isOk) {
                    success && success();
                }
                else {
                    console.log(isOk);
                    UIMgr.showTips("分享视频失败!");
                }
            });
        };
        YLSDK._customSwitch = [];
        YLSDK._shortcuttime = 0;
        YLSDK._insertBannerShowTime = 0;
        YLSDK._insertBanerLastShowTime = 0;
        YLSDK._canShowInsertBanner = false;
        YLSDK._isNativeAdShow = false;
        YLSDK._nativeData = [];
        YLSDK._btnMisTouchInfo = {};
        YLSDK._insertScreenInfo = {};
        YLSDK._fuckAwayPaths = {};
        YLSDK._recordStartTime = 0;
        return YLSDK;
    }());

    var addRoot = function (obj, root) {
        for (var i in obj) {
            obj[i] = root + obj[i];
        }
    };
    var AtlasRoot = "nativescene/res/";
    var SceneRoot = "nativescene/scene/Conventional/";
    var SkinRoot = SceneRoot + "Assets/Resources/Texture2D/";
    var SoundRoot = "nativescene/sound/";
    var MapRoot = "nativescene/map/";
    var JsonRoot = "nativescene/";
    var EAtlas = {
        Game: "game.atlas",
    };
    addRoot(EAtlas, AtlasRoot);
    var ESprite3D = {
        MainCamera: "MainCamera.lh",
        DirectionalLight: "DirectionalLight.lh",
        Effect: "Effect.lh",
    };
    addRoot(ESprite3D, SceneRoot);
    var EJson = {
        Configs: "configs.json"
    };
    var ECfg = {
        GlobalCfg: "globalcfg",
        LevelCfg: "level",
        Player: "player",
        ShopCfg: "shop",
    };
    addRoot(EJson, JsonRoot);
    var ESound = {
        Bgm: "bgmusic.mp3",
        BtnClick: "click.mp3"
    };
    addRoot(ESound, SoundRoot);

    var SoundMgr = (function () {
        function SoundMgr() {
        }
        SoundMgr.init = function () {
            var self = this;
            var getItem = Laya.LocalStorage.getItem;
            self.$openMusic = getItem(self.$cacheMusic) !== '0';
            self.$openSound = getItem(self.$cacheSound) !== '0';
            self.$openVibrate = getItem(self.$cacheVibrate) !== '0';
            Laya.SoundManager.autoStopMusic = true;
        };
        Object.defineProperty(SoundMgr, "openMusic", {
            get: function () {
                return this.$openMusic;
            },
            set: function (open) {
                var self = this;
                if (self.$openMusic != open) {
                    self.$openMusic = open;
                    if (open)
                        self.playBGM();
                    else
                        self.stopBGM();
                    Laya.LocalStorage.setItem(self.$cacheMusic, Number(open) + '');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundMgr, "openSound", {
            get: function () {
                return this.$openSound;
            },
            set: function (open) {
                var self = this;
                if (self.$openSound != open) {
                    self.$openSound = open;
                    Laya.LocalStorage.setItem(self.$cacheSound, Number(open) + '');
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundMgr, "openVibrate", {
            get: function () {
                return this.$openVibrate;
            },
            set: function (open) {
                var self = this;
                if (self.$openVibrate != open) {
                    self.$openVibrate = open;
                    Laya.LocalStorage.setItem(self.$cacheVibrate, Number(open) + '');
                }
            },
            enumerable: true,
            configurable: true
        });
        SoundMgr.playBGM = function () {
            var self = this;
            if (self.openMusic) {
                if (!self.$channel) {
                    self.$channel = Laya.SoundManager.playMusic(ESound.Bgm);
                }
                self.setMusicVolume(0.2);
            }
        };
        SoundMgr.stopBGM = function () {
            this.setMusicVolume(0);
        };
        SoundMgr.playBtnClick = function () {
            this.playSound(ESound.BtnClick);
        };
        SoundMgr.playSound = function (url, loops) {
            if (this.openSound) {
                Laya.SoundManager.playSound(url, loops);
            }
        };
        SoundMgr.setMusicVolume = function (val) {
            Laya.SoundManager.setMusicVolume(val);
        };
        SoundMgr.setSoundVolume = function (val) {
            Laya.SoundManager.setSoundVolume(val);
        };
        SoundMgr.playVibrate = function (isLong) {
            if (this.openVibrate) {
                if (isLong) {
                    platform.vibrateLong();
                }
                else {
                    platform.vibrateShort();
                }
            }
        };
        SoundMgr.$cacheMusic = 'cacheMusic';
        SoundMgr.$cacheSound = "cacheSound";
        SoundMgr.$cacheVibrate = 'cacheVibrate';
        return SoundMgr;
    }());

    var UIUtils = (function () {
        function UIUtils() {
        }
        UIUtils.getCell = function (list, index) {
            return list.getCell(index);
        };
        UIUtils.globalToLocal = function (sprite, x, y) {
            var temp = Laya.Point.TEMP;
            temp.setTo(x, y);
            sprite.globalToLocal(temp);
            return temp;
        };
        UIUtils.centerChild = function (parent, num, dist) {
            if (dist === void 0) { dist = 0; }
            var len = parent.numChildren;
            if (len > 0) {
                var sum = 0, i = void 0, j = 0, arr = [];
                num === void 0 && (num = len);
                for (i = 0; i < len; i++) {
                    var csi = parent.getChildAt(i);
                    if (csi.visible) {
                        sum += csi.width;
                        arr.push(csi);
                        if (++j >= num) {
                            break;
                        }
                    }
                }
                len = arr.length;
                sum = (parent.width - sum - (len - 1) * dist) / 2;
                for (i = 0; i < len; i++) {
                    arr[i].x = sum;
                    sum += arr[i].width + dist;
                }
            }
        };
        UIUtils.initVSBtn = function (btn, module, childIdx, format) {
            var bool = false, config = 0;
            if (module) {
                bool = config > 0;
                if (bool && !(childIdx < 0)) {
                    var child_1 = (childIdx > -1 && btn.getChildAt(childIdx) || btn);
                    var skin = Utils.formatString((format || 'main/icon_%s.png'), (config == 2 ? 'video' : 'share'));
                    if (child_1 instanceof Laya.Image)
                        child_1.skin = skin;
                    else {
                        Utils.getRes(skin).then(function (res) {
                            child_1.texture = res;
                        });
                    }
                    child_1.visible = true;
                }
            }
            if (!bool) {
                var child = btn.getChildAt(childIdx);
                if (child) {
                    child.visible = false;
                    UIUtils.centerChild(btn, 1);
                }
            }
            return config;
        };
        UIUtils.showMisTouch = function (view, time, offsetY, later) {
            if (offsetY === void 0) { offsetY = 0; }
            if (!GameConst.openMisTouch())
                return;
            if (later) {
                var arg = arguments;
                arg[arg.length - 1] = false;
                Laya.timer.frameOnce(2, UIUtils, UIUtils.showMisTouch, arg, false);
            }
            else {
                var height_1 = view.height;
                var parent_1 = view.parent;
                var oldY_1 = view.y, anchorY_1 = view.anchorY || 0;
                var point = UIUtils.globalToLocal(parent_1, 0, 1180 / 1334 * Laya.stage.height);
                view.y = point.y + ((parent_1.anchorY || 0) * parent_1.height) + (anchorY_1 - 0.5) * height_1 + offsetY;
                time = time || GameConst.BtnReSize;
                Laya.timer.once(time, null, function () {
                    var offY = 0;
                    view.y = oldY_1 + ((view.anchorY || 0) - anchorY_1) * height_1 - offY;
                });
            }
        };
        UIUtils.addClick = function (node, func, thisObj, once, data, time) {
            if (time === void 0) { time = 300; }
            var fun = once ? "once" : "on", clickTime = 0, params = [], evtIdx;
            node.offAll();
            if (data !== void 0) {
                params.push(data);
                evtIdx = 1;
            }
            node[fun](Laya.Event.CLICK, thisObj, function (e) {
                var now = Date.now();
                e.stopPropagation();
                if (now - clickTime < time) {
                    return;
                }
                params[evtIdx] = e;
                SoundMgr.playBtnClick();
                func.apply(thisObj, params);
                clickTime = now;
            });
            var oldsx = node.scaleX, oldsy = node.scaleY;
            if (node instanceof Laya.UIComponent) {
                if (isNaN(node.anchorX)) {
                    node.anchorX = 0.5;
                    node.x += node.width * 0.5 * oldsx;
                }
                if (isNaN(node.anchorY)) {
                    node.anchorY = 0.5;
                    node.y += node.height * 0.5 * oldsy;
                }
            }
            else {
                if (node instanceof Laya.Sprite) {
                    if (node.pivotX == 0) {
                        node.pivotX = node.width * 0.5 * oldsx;
                        node.x += node.width * 0.5 * oldsx;
                    }
                    if (node.pivotY == 0) {
                        node.pivotY = node.height * 0.5 * oldsy;
                        node.y += node.height * 0.5 * oldsy;
                    }
                }
            }
            var isTouch = false;
            var nextx = oldsx + (oldsx > 0 ? 1 : -1) * 0.05;
            var nexty = oldsy + (oldsy > 0 ? 1 : -1) * 0.05;
            var tOnce = Tween.once;
            var onDown = function (e) {
                isTouch = true;
                e.stopPropagation();
                tOnce(node).to({ scaleX: nextx, scaleY: nexty }, 200);
            };
            var onOut = function (e) {
                if (isTouch) {
                    isTouch = false;
                    e.stopPropagation();
                    tOnce(node).to({ scaleX: oldsx, scaleY: oldsy }, 200);
                }
            };
            node.on(Laya.Event.MOUSE_DOWN, thisObj, onDown);
            node.on(Laya.Event.MOUSE_UP, thisObj, onOut);
            node.on(Laya.Event.MOUSE_OUT, thisObj, onOut);
        };
        UIUtils.adapterTop = function (topBox) {
            var menu = platform.getMenuButtonBoundingClientRect();
            if (menu) {
                var temp = Laya.Point.TEMP;
                var info = platform.getSystemInfoSync();
                temp.y = menu.top * Laya.stage.height / info.screenHeight;
                if (Utils.checkPhoneIsBangs() && temp.y < 44) {
                    temp.y = 44;
                }
                if (!isNaN(topBox.top)) {
                    topBox.top = temp.y;
                }
                else {
                    topBox.parent.globalToLocal(temp);
                    topBox.y = temp.y;
                }
            }
            if (platform.isOppo) {
                topBox.top = 50;
            }
        };
        UIUtils.drawTexture = function (camera, sp) {
            var renderTarget = camera.renderTarget;
            var rederTex = new Laya.Texture(renderTarget, Laya.Texture.DEF_UV);
            sp.graphics.drawTexture(rederTex);
        };
        UIUtils.getRightTop = function (node) {
            var p = new Laya.Point(node.width, 0);
            return p;
        };
        UIUtils.addClick2 = function (target, call, thisObj) {
            target.on(Laya.Event.CLICK, thisObj, call);
        };
        return UIUtils;
    }());

    var UIBaseView = (function (_super) {
        __extends(UIBaseView, _super);
        function UIBaseView() {
            var _this = _super.call(this) || this;
            _this.$events = {};
            _this.$calls = [];
            _this.$btnMisTouch = null;
            _this._misTouchBtnPos = new Laya.Vector2();
            return _this;
        }
        UIBaseView.init = function () {
            Laya.UIBaseView = UIBaseView;
        };
        UIBaseView.prototype.onEnable = function () {
            this.showMisTouchBtn();
        };
        UIBaseView.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            var self = this, eventMgr = EventMgr, events = self.$events;
            for (var name_1 in events) {
                eventMgr.off(name_1, self, events[name_1]);
            }
            self.$events = null;
            var calls = self.$calls, param = self.closeParam;
            for (var i in calls) {
                var data = calls[i];
                data[0].call(data[1], param);
            }
            self.timer.clearAll(this);
            self.offAll();
            self.$calls = self.closeParam = null;
        };
        UIBaseView.prototype.regEvent = function (eventName, func) {
            var self = this;
            self.$events[eventName] = func;
            EventMgr.on(eventName, self, func);
        };
        UIBaseView.prototype.regClick = function (node, func, once, data, time) {
            UIUtils.addClick(node, func, this, once, data, time);
        };
        UIBaseView.prototype.onShow = function () {
        };
        UIBaseView.prototype.onHide = function () {
        };
        UIBaseView.prototype.setCloseCall = function (call, thisObj) {
            this.$calls.push([call, thisObj]);
        };
        UIBaseView.prototype.clearCloseCall = function () {
            if (this.$calls) {
                this.$calls.length = 0;
            }
        };
        UIBaseView.prototype.eventCount = function () {
            if (this.$uiConfig) {
                window.ydhw_wx && ydhw.StatisticEvent('ui', this.$uiConfig.name);
            }
        };
        UIBaseView.prototype.showMisTouchBtn = function () {
            var _this = this;
            var misTouchInfo = YLSDK.getBtnMisData();
            var moveTime = misTouchInfo.btnTime;
            var time = moveTime || 0;
            var buttonName = this.$uiConfig ? this.$uiConfig.misTouch : '';
            if (misTouchInfo.switch && buttonName && time && this[buttonName]) {
                var misTouchBtn_1 = this[buttonName];
                this._misTouchBtnPos.setValue(misTouchBtn_1.x, misTouchBtn_1.y);
                misTouchBtn_1.bottom = 60;
                Laya.timer.once(time, this, function () {
                    misTouchBtn_1.bottom = NaN;
                    var x = _this._misTouchBtnPos.x + misTouchBtn_1.width * (misTouchBtn_1.anchorX || 0);
                    var y = _this._misTouchBtnPos.y + misTouchBtn_1.height * (misTouchBtn_1.anchorY || 0);
                    misTouchBtn_1.pos(x, y);
                });
            }
        };
        return UIBaseView;
    }(Laya.View));

    var SideView = (function (_super) {
        __extends(SideView, _super);
        function SideView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.$btnMisTouch = null;
            _this._misTouchBtnPos = new Laya.Vector2();
            return _this;
        }
        SideView.init = function () {
            Laya.SideView = SideView;
        };
        SideView.prototype.onEnable = function () {
            var self = this;
            self.showView(false);
            self.callLater(self.initSide);
        };
        SideView.prototype.initSide = function () {
            var self = this;
            SideNewMgr.ins.getBoxDatasSync(function (datas) {
                if (self.parent) {
                    if (datas && datas.length > 0) {
                        self.once(Laya.Event.UNDISPLAY, self, self.onClear);
                        SideMsg.register(ESMessage.S2S_REMOVE, self.onRemoved, self);
                        self.showView(true);
                        self.showMisTouchBtn();
                        self.initView(datas);
                    }
                    else {
                        self.onClose();
                    }
                }
            });
        };
        SideView.prototype.showView = function (bool) {
            for (var i = 0, len = this.numChildren; i < len; i++) {
                var sp = this.getChildAt(i);
                if (sp) {
                    sp.visible = bool;
                }
            }
        };
        SideView.prototype.initView = function (datas) {
        };
        SideView.prototype.onClear = function () {
            var self = this;
            SideMsg.remove(ESMessage.S2S_REMOVE, self.onRemoved, self);
        };
        SideView.prototype.onClose = function () {
            this.removeSelf();
        };
        SideView.prototype.bind = function (img, data, datas) {
            var self = this, type = Laya.Event.CLICK;
            var old = img.dataSource;
            img.skin = data.icon;
            img.dataSource = data;
            if (datas && old) {
                datas.push(old);
            }
            img.off(type, self, self.onClick);
            img.on(type, self, self.onClick, [data]);
        };
        SideView.prototype.onClick = function (side) {
            var self = this;
            SideMsg.notice(ESMessage.S2C_CLICK_BTN);
            if (side) {
                var appId = side.toAppid;
                if (appId) {
                    var event_1 = self.$event;
                    var event1 = self.$event1;
                    var reqC2SClick_1 = function (enable) {
                        event_1 && SideMsg.notice(ESMessage.S2C_DOT_SERVER, event_1, side, enable);
                    };
                    window.ydhw_wx && window.ydhw.NavigateToMiniProgram(side._id, side.toAppid, side.toUrl, "", this, function (success) {
                        if (success) {
                            self.onSuccess(side);
                            reqC2SClick_1(true);
                        }
                        else {
                            self.onCancel(side);
                            reqC2SClick_1(false);
                        }
                    });
                    if (event_1) {
                        var param = { iconId: side._id };
                        SideMsg.notice(ESMessage.S2C_DOT_ALD, event_1, param);
                    }
                    if (event1) {
                        SideMsg.notice(ESMessage.S2C_DOT_EVENT, event1, self.paramId);
                    }
                }
            }
        };
        SideView.prototype.onSuccess = function (data) {
            SideMsg.notice(ESMessage.S2C_REMOVE, data);
        };
        SideView.prototype.onCancel = function (data) {
        };
        SideView.prototype.onRemoved = function (data) {
        };
        SideView.prototype.setAldEvent = function (event, event1) {
            this.$event = event;
            this.$event1 = event1;
        };
        SideView.prototype.showMisTouchBtn = function () {
            var _this = this;
            var misTouchInfo = YLSDK.getBtnMisData();
            var moveTime = misTouchInfo.btnTime;
            var time = moveTime || 0;
            var buttonName = this.$uiConfig ? this.$uiConfig.misTouch : '';
            if (misTouchInfo.switch && buttonName && time && this[buttonName]) {
                var misTouchBtn_1 = this[buttonName];
                this._misTouchBtnPos.setValue(misTouchBtn_1.x, misTouchBtn_1.y);
                misTouchBtn_1.bottom = 60;
                Laya.timer.once(time, this, function () {
                    misTouchBtn_1.bottom = NaN;
                    var x = _this._misTouchBtnPos.x + misTouchBtn_1.width * (misTouchBtn_1.anchorX || 0);
                    var y = _this._misTouchBtnPos.y + misTouchBtn_1.height * (misTouchBtn_1.anchorY || 0);
                    misTouchBtn_1.pos(x, y);
                });
            }
        };
        return SideView;
    }(Laya.View));

    UIBaseView.init();
    SideView.init();
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var view;
        (function (view) {
            var DebugViewUI = (function (_super) {
                __extends(DebugViewUI, _super);
                function DebugViewUI() {
                    return _super.call(this) || this;
                }
                DebugViewUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadScene("view/DebugView");
                };
                return DebugViewUI;
            }(Laya.UIBaseView));
            view.DebugViewUI = DebugViewUI;
            REG("ui.view.DebugViewUI", DebugViewUI);
            var FailViewUI = (function (_super) {
                __extends(FailViewUI, _super);
                function FailViewUI() {
                    return _super.call(this) || this;
                }
                FailViewUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadScene("view/FailView");
                };
                return FailViewUI;
            }(Laya.UIBaseView));
            view.FailViewUI = FailViewUI;
            REG("ui.view.FailViewUI", FailViewUI);
            var HomeSellViewUI = (function (_super) {
                __extends(HomeSellViewUI, _super);
                function HomeSellViewUI() {
                    return _super.call(this) || this;
                }
                HomeSellViewUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadScene("view/HomeSellView");
                };
                return HomeSellViewUI;
            }(Laya.UIBaseView));
            view.HomeSellViewUI = HomeSellViewUI;
            REG("ui.view.HomeSellViewUI", HomeSellViewUI);
            var HomeViewUI = (function (_super) {
                __extends(HomeViewUI, _super);
                function HomeViewUI() {
                    return _super.call(this) || this;
                }
                HomeViewUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadScene("view/HomeView");
                };
                return HomeViewUI;
            }(Laya.UIBaseView));
            view.HomeViewUI = HomeViewUI;
            REG("ui.view.HomeViewUI", HomeViewUI);
            var LoadingViewUI = (function (_super) {
                __extends(LoadingViewUI, _super);
                function LoadingViewUI() {
                    return _super.call(this) || this;
                }
                LoadingViewUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadScene("view/LoadingView");
                };
                return LoadingViewUI;
            }(Laya.UIBaseView));
            view.LoadingViewUI = LoadingViewUI;
            REG("ui.view.LoadingViewUI", LoadingViewUI);
            var RankingViewUI = (function (_super) {
                __extends(RankingViewUI, _super);
                function RankingViewUI() {
                    return _super.call(this) || this;
                }
                RankingViewUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadScene("view/RankingView");
                };
                return RankingViewUI;
            }(Laya.UIBaseView));
            view.RankingViewUI = RankingViewUI;
            REG("ui.view.RankingViewUI", RankingViewUI);
            var ResultViewUI = (function (_super) {
                __extends(ResultViewUI, _super);
                function ResultViewUI() {
                    return _super.call(this) || this;
                }
                ResultViewUI.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);
                    this.loadScene("view/ResultView");
                };
                return ResultViewUI;
            }(Laya.UIBaseView));
            view.ResultViewUI = ResultViewUI;
            REG("ui.view.ResultViewUI", ResultViewUI);
        })(view = ui.view || (ui.view = {}));
    })(ui || (ui = {}));
    (function (ui) {
        var view;
        (function (view) {
            var item;
            (function (item) {
                var BigBoxItem0UI = (function (_super) {
                    __extends(BigBoxItem0UI, _super);
                    function BigBoxItem0UI() {
                        return _super.call(this) || this;
                    }
                    BigBoxItem0UI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/item/BigBoxItem0");
                    };
                    return BigBoxItem0UI;
                }(Laya.View));
                item.BigBoxItem0UI = BigBoxItem0UI;
                REG("ui.view.item.BigBoxItem0UI", BigBoxItem0UI);
                var BigBoxItem1UI = (function (_super) {
                    __extends(BigBoxItem1UI, _super);
                    function BigBoxItem1UI() {
                        return _super.call(this) || this;
                    }
                    BigBoxItem1UI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/item/BigBoxItem1");
                    };
                    return BigBoxItem1UI;
                }(Laya.View));
                item.BigBoxItem1UI = BigBoxItem1UI;
                REG("ui.view.item.BigBoxItem1UI", BigBoxItem1UI);
                var MoreGameItem1UI = (function (_super) {
                    __extends(MoreGameItem1UI, _super);
                    function MoreGameItem1UI() {
                        return _super.call(this) || this;
                    }
                    MoreGameItem1UI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/item/MoreGameItem1");
                    };
                    return MoreGameItem1UI;
                }(Laya.View));
                item.MoreGameItem1UI = MoreGameItem1UI;
                REG("ui.view.item.MoreGameItem1UI", MoreGameItem1UI);
                var OverGameItemUI = (function (_super) {
                    __extends(OverGameItemUI, _super);
                    function OverGameItemUI() {
                        return _super.call(this) || this;
                    }
                    OverGameItemUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/item/OverGameItem");
                    };
                    return OverGameItemUI;
                }(Laya.View));
                item.OverGameItemUI = OverGameItemUI;
                REG("ui.view.item.OverGameItemUI", OverGameItemUI);
                var SideBotItemUI = (function (_super) {
                    __extends(SideBotItemUI, _super);
                    function SideBotItemUI() {
                        return _super.call(this) || this;
                    }
                    SideBotItemUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/item/SideBotItem");
                    };
                    return SideBotItemUI;
                }(Laya.View));
                item.SideBotItemUI = SideBotItemUI;
                REG("ui.view.item.SideBotItemUI", SideBotItemUI);
                var SideBoxItemUI = (function (_super) {
                    __extends(SideBoxItemUI, _super);
                    function SideBoxItemUI() {
                        return _super.call(this) || this;
                    }
                    SideBoxItemUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/item/SideBoxItem");
                    };
                    return SideBoxItemUI;
                }(Laya.View));
                item.SideBoxItemUI = SideBoxItemUI;
                REG("ui.view.item.SideBoxItemUI", SideBoxItemUI);
                var SideBoxItem0UI = (function (_super) {
                    __extends(SideBoxItem0UI, _super);
                    function SideBoxItem0UI() {
                        return _super.call(this) || this;
                    }
                    SideBoxItem0UI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/item/SideBoxItem0");
                    };
                    return SideBoxItem0UI;
                }(Laya.View));
                item.SideBoxItem0UI = SideBoxItem0UI;
                REG("ui.view.item.SideBoxItem0UI", SideBoxItem0UI);
                var SideBoxItem1UI = (function (_super) {
                    __extends(SideBoxItem1UI, _super);
                    function SideBoxItem1UI() {
                        return _super.call(this) || this;
                    }
                    SideBoxItem1UI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/item/SideBoxItem1");
                    };
                    return SideBoxItem1UI;
                }(Laya.View));
                item.SideBoxItem1UI = SideBoxItem1UI;
                REG("ui.view.item.SideBoxItem1UI", SideBoxItem1UI);
                var SideGridItemUI = (function (_super) {
                    __extends(SideGridItemUI, _super);
                    function SideGridItemUI() {
                        return _super.call(this) || this;
                    }
                    SideGridItemUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/item/SideGridItem");
                    };
                    return SideGridItemUI;
                }(Laya.View));
                item.SideGridItemUI = SideGridItemUI;
                REG("ui.view.item.SideGridItemUI", SideGridItemUI);
                var SideListItemUI = (function (_super) {
                    __extends(SideListItemUI, _super);
                    function SideListItemUI() {
                        return _super.call(this) || this;
                    }
                    SideListItemUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/item/SideListItem");
                    };
                    return SideListItemUI;
                }(Laya.View));
                item.SideListItemUI = SideListItemUI;
                REG("ui.view.item.SideListItemUI", SideListItemUI);
                var SideListItem4UI = (function (_super) {
                    __extends(SideListItem4UI, _super);
                    function SideListItem4UI() {
                        return _super.call(this) || this;
                    }
                    SideListItem4UI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/item/SideListItem4");
                    };
                    return SideListItem4UI;
                }(Laya.View));
                item.SideListItem4UI = SideListItem4UI;
                REG("ui.view.item.SideListItem4UI", SideListItem4UI);
                var SideNewItemUI = (function (_super) {
                    __extends(SideNewItemUI, _super);
                    function SideNewItemUI() {
                        return _super.call(this) || this;
                    }
                    SideNewItemUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/item/SideNewItem");
                    };
                    return SideNewItemUI;
                }(Laya.View));
                item.SideNewItemUI = SideNewItemUI;
                REG("ui.view.item.SideNewItemUI", SideNewItemUI);
                var WXModelItemUI = (function (_super) {
                    __extends(WXModelItemUI, _super);
                    function WXModelItemUI() {
                        return _super.call(this) || this;
                    }
                    WXModelItemUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/item/WXModelItem");
                    };
                    return WXModelItemUI;
                }(Laya.View));
                item.WXModelItemUI = WXModelItemUI;
                REG("ui.view.item.WXModelItemUI", WXModelItemUI);
            })(item = view.item || (view.item = {}));
        })(view = ui.view || (ui.view = {}));
    })(ui || (ui = {}));
    (function (ui) {
        var view;
        (function (view) {
            var side;
            (function (side) {
                var BigBoxViewUI = (function (_super) {
                    __extends(BigBoxViewUI, _super);
                    function BigBoxViewUI() {
                        return _super.call(this) || this;
                    }
                    BigBoxViewUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/side/BigBoxView");
                    };
                    return BigBoxViewUI;
                }(Laya.SideView));
                side.BigBoxViewUI = BigBoxViewUI;
                REG("ui.view.side.BigBoxViewUI", BigBoxViewUI);
                var GoldenEggViewUI = (function (_super) {
                    __extends(GoldenEggViewUI, _super);
                    function GoldenEggViewUI() {
                        return _super.call(this) || this;
                    }
                    GoldenEggViewUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/side/GoldenEggView");
                    };
                    return GoldenEggViewUI;
                }(Laya.UIBaseView));
                side.GoldenEggViewUI = GoldenEggViewUI;
                REG("ui.view.side.GoldenEggViewUI", GoldenEggViewUI);
                var MorePeopleViewUI = (function (_super) {
                    __extends(MorePeopleViewUI, _super);
                    function MorePeopleViewUI() {
                        return _super.call(this) || this;
                    }
                    MorePeopleViewUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/side/MorePeopleView");
                    };
                    return MorePeopleViewUI;
                }(Laya.SideView));
                side.MorePeopleViewUI = MorePeopleViewUI;
                REG("ui.view.side.MorePeopleViewUI", MorePeopleViewUI);
                var SideBotListUI = (function (_super) {
                    __extends(SideBotListUI, _super);
                    function SideBotListUI() {
                        return _super.call(this) || this;
                    }
                    SideBotListUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/side/SideBotList");
                    };
                    return SideBotListUI;
                }(Laya.SideView));
                side.SideBotListUI = SideBotListUI;
                REG("ui.view.side.SideBotListUI", SideBotListUI);
                var SideBoxViewUI = (function (_super) {
                    __extends(SideBoxViewUI, _super);
                    function SideBoxViewUI() {
                        return _super.call(this) || this;
                    }
                    SideBoxViewUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/side/SideBoxView");
                    };
                    return SideBoxViewUI;
                }(Laya.SideView));
                side.SideBoxViewUI = SideBoxViewUI;
                REG("ui.view.side.SideBoxViewUI", SideBoxViewUI);
                var SideDoubleListUI = (function (_super) {
                    __extends(SideDoubleListUI, _super);
                    function SideDoubleListUI() {
                        return _super.call(this) || this;
                    }
                    SideDoubleListUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/side/SideDoubleList");
                    };
                    return SideDoubleListUI;
                }(Laya.SideView));
                side.SideDoubleListUI = SideDoubleListUI;
                REG("ui.view.side.SideDoubleListUI", SideDoubleListUI);
                var SideGridUI = (function (_super) {
                    __extends(SideGridUI, _super);
                    function SideGridUI() {
                        return _super.call(this) || this;
                    }
                    SideGridUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/side/SideGrid");
                    };
                    return SideGridUI;
                }(Laya.SideView));
                side.SideGridUI = SideGridUI;
                REG("ui.view.side.SideGridUI", SideGridUI);
                var SideIconRTUI = (function (_super) {
                    __extends(SideIconRTUI, _super);
                    function SideIconRTUI() {
                        return _super.call(this) || this;
                    }
                    SideIconRTUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/side/SideIconRT");
                    };
                    return SideIconRTUI;
                }(Laya.SideView));
                side.SideIconRTUI = SideIconRTUI;
                REG("ui.view.side.SideIconRTUI", SideIconRTUI);
                var SideLeftListUI = (function (_super) {
                    __extends(SideLeftListUI, _super);
                    function SideLeftListUI() {
                        return _super.call(this) || this;
                    }
                    SideLeftListUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/side/SideLeftList");
                    };
                    return SideLeftListUI;
                }(Laya.SideView));
                side.SideLeftListUI = SideLeftListUI;
                REG("ui.view.side.SideLeftListUI", SideLeftListUI);
                var SideMoreGameViewUI = (function (_super) {
                    __extends(SideMoreGameViewUI, _super);
                    function SideMoreGameViewUI() {
                        return _super.call(this) || this;
                    }
                    SideMoreGameViewUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/side/SideMoreGameView");
                    };
                    return SideMoreGameViewUI;
                }(Laya.SideView));
                side.SideMoreGameViewUI = SideMoreGameViewUI;
                REG("ui.view.side.SideMoreGameViewUI", SideMoreGameViewUI);
                var SideOverListUI = (function (_super) {
                    __extends(SideOverListUI, _super);
                    function SideOverListUI() {
                        return _super.call(this) || this;
                    }
                    SideOverListUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/side/SideOverList");
                    };
                    return SideOverListUI;
                }(Laya.SideView));
                side.SideOverListUI = SideOverListUI;
                REG("ui.view.side.SideOverListUI", SideOverListUI);
                var WXModelViewUI = (function (_super) {
                    __extends(WXModelViewUI, _super);
                    function WXModelViewUI() {
                        return _super.call(this) || this;
                    }
                    WXModelViewUI.prototype.createChildren = function () {
                        _super.prototype.createChildren.call(this);
                        this.loadScene("view/side/WXModelView");
                    };
                    return WXModelViewUI;
                }(Laya.SideView));
                side.WXModelViewUI = WXModelViewUI;
                REG("ui.view.side.WXModelViewUI", WXModelViewUI);
            })(side = view.side || (view.side = {}));
        })(view = ui.view || (ui.view = {}));
    })(ui || (ui = {}));

    var SvModule = {};
    var scoreCache = '积分策略模块列表';
    var StrategyMgr = (function () {
        function StrategyMgr() {
        }
        StrategyMgr.setStrategy = function (array) {
            if (array) {
                var modules = StrategyMgr.$modules;
                for (var i = 0, len = array.length; i < len; i++) {
                    var item = array[i];
                    modules[item.module] = item;
                }
            }
        };
        StrategyMgr.getStrategy = function (module) {
            return StrategyMgr.$modules[module];
        };
        StrategyMgr.getStrategyByModule = function (module, noLimit) {
            var value = 0;
            var strategy = StrategyMgr.getStrategy(module);
            if (strategy) {
            }
            if (value == 2 && !noLimit && !platform.hasVideo) {
                value = 1;
            }
            return value;
        };
        StrategyMgr.init = function (cache) {
            var obj;
            try {
                obj = JSON.parse(cache);
                for (var i in obj) {
                    if (typeof obj[i] !== 'object')
                        obj[i] = {};
                }
            }
            catch (e) {
                obj = {};
            }
            StrategyMgr.$cache = obj;
        };
        StrategyMgr.clear = function () {
            StrategyMgr.$cache = {};
        };
        StrategyMgr.getCacheName = function (strategy) {
            return StrategyMgr.isSpecial(strategy) ? scoreCache : strategy.module;
        };
        StrategyMgr.getTimesByModule = function (module) {
            var strategy = StrategyMgr.$modules[module];
            if (strategy) {
                var data = StrategyMgr.$cache[StrategyMgr.getCacheName(strategy)];
                if (data)
                    return data[strategy.policyType] || 0;
            }
            return 0;
        };
        StrategyMgr.setTimesByModule = function (module) {
            var strategy = StrategyMgr.getStrategy(module);
            if (strategy) {
                var type = strategy.policyType;
                var cache = StrategyMgr.$cache;
                var name_1 = StrategyMgr.getCacheName(strategy);
                var data = cache[name_1] || (cache[name_1] = {});
                var count = data[type];
                if (isNaN(count))
                    count = 1;
                else
                    count++;
                data[type] = count;
                StrategyMgr.saveCache();
                if (StrategyMgr.isSpecial(strategy)) {
                    EventMgr.event(EventType.RefreshScoreSV);
                }
            }
        };
        StrategyMgr.setRefresh = function (module, caller, call) {
            var setFunc = function (attr) {
                EventMgr[attr](EventType.RefreshScoreSV, caller, call);
            };
            setFunc('off');
            if (StrategyMgr.isSpecial(StrategyMgr.getStrategy(module))) {
                setFunc('on');
            }
        };
        StrategyMgr.isSpecial = function (strategy) {
            return true;
        };
        StrategyMgr.saveCache = function () {
            if (!StrategyMgr.$timeout) {
                StrategyMgr.$timeout = TimeUtils.setTimeout(function () {
                    StrategyMgr.$timeout = null;
                    UserData.instance.setStrategyCountCache(JSON.stringify(StrategyMgr.$cache));
                }, null, 40);
            }
        };
        StrategyMgr.$modules = {};
        return StrategyMgr;
    }());

    var maxGrade = 5;
    var ShareTimeMgr = (function () {
        function ShareTimeMgr() {
        }
        ShareTimeMgr.init = function (cache) {
            var obj;
            try {
                obj = JSON.parse(cache);
            }
            catch (_a) {
                obj = {};
            }
            ShareTimeMgr.$cache = obj;
            if (isNaN(obj.lastIndex)) {
                ShareTimeMgr.clear();
            }
        };
        ShareTimeMgr.clear = function () {
            var cache = ShareTimeMgr.$cache;
            cache.failCount = cache.sucCount = 0;
            cache.lastIndex = -1;
        };
        ShareTimeMgr.addShare = function (bool) {
            var self = ShareTimeMgr;
            var cache = self.$cache;
            if (bool) {
                cache.sucCount++;
                cache.failCount = 0;
            }
            else {
                cache.failCount++;
            }
            self.saveCache();
            var config = self.$curConfig;
            if (config) {
            }
        };
        ShareTimeMgr.getShareTime = function () {
            var self = ShareTimeMgr;
            var hour = new Date().getHours(), retT;
            var curConfig = self.$curConfig = self.getCurStrategy();
            var shareTimes = curConfig && curConfig.shareTimes, time;
            for (var i in shareTimes) {
                var times = shareTimes[i];
                if (self.hourInTime(hour, times)) {
                    retT = times;
                    break;
                }
            }
            if (retT) {
                var newId = retT.id;
                if (self.lastIndex !== newId) {
                    self.clear();
                    self.lastIndex = newId;
                    ShareTimeMgr.saveCache();
                }
            }
            else {
                self.lastIndex = -1;
            }
            return self.getTime(shareTimes);
        };
        ShareTimeMgr.getCurStrategy = function () {
            var configs = ShareTimeMgr.$configs, score = ShareTimeMgr.score;
            for (var i = 0, len = configs.length; i < len; i++) {
                var config = configs[i];
                if (score <= config.endScore) {
                    return config;
                }
            }
        };
        ShareTimeMgr.getShareToVideoCount = function () {
            var config = ShareTimeMgr.getCurStrategy();
            return config ? config.shareToVideo : 0;
        };
        ShareTimeMgr.hourInTime = function (hour, time) {
            var start = time.start, end = time.end;
            return hour >= start ? hour < end : (end > 24 && hour < end % 24);
        };
        ShareTimeMgr.getTime = function (times) {
            var time;
            if (times) {
                var self_1 = ShareTimeMgr;
                var share = times[self_1.lastIndex];
                if (share) {
                    var times_1 = share.times;
                    time = times_1[self_1.failCount] || times_1[times_1.length - 1];
                }
            }
            return time || { times: [3], rands: [0, 100] };
        };
        Object.defineProperty(ShareTimeMgr, "lastIndex", {
            get: function () {
                return ShareTimeMgr.$cache.lastIndex;
            },
            set: function (value) {
                ShareTimeMgr.$cache.lastIndex = value;
                ShareTimeMgr.saveCache();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShareTimeMgr, "sucCount", {
            get: function () {
                return ShareTimeMgr.$cache.sucCount;
            },
            set: function (value) {
                ShareTimeMgr.$cache.sucCount = value;
                ShareTimeMgr.saveCache();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ShareTimeMgr, "failCount", {
            get: function () {
                return ShareTimeMgr.$cache.failCount;
            },
            set: function (value) {
                ShareTimeMgr.$cache.failCount = value;
                ShareTimeMgr.saveCache();
            },
            enumerable: true,
            configurable: true
        });
        ShareTimeMgr.saveCache = function () {
            Laya.timer.once(100, ShareTimeMgr, ShareTimeMgr.onSave);
        };
        ShareTimeMgr.onSave = function () {
            UserData.instance.setShareTimeCache(JSON.stringify(ShareTimeMgr.$cache));
        };
        ShareTimeMgr.initShareTime = function (starInfo, index) {
            var share = {};
            var array = starInfo.split(';');
            if (array.length >= 2) {
                var seHour = array[0].split('-');
                var times = share.times = [];
                var remain = array[1];
                share.id = index;
                share.start = Number(seHour[0]);
                share.end = Number(seHour[1]);
                while (remain) {
                    remain = ShareTimeMgr.parseJson(times, remain);
                }
            }
            return share;
        };
        ShareTimeMgr.parseJson = function (times, str) {
            var index = str.indexOf('{'), remain1 = '';
            var time = {};
            if (index > -1) {
                var count = 1, endi = index + 1, len = str.length;
                for (; endi < len; endi++) {
                    if (str[endi] == '{')
                        count++;
                    else if (str[endi] == '}') {
                        if (--count == 0) {
                            endi++;
                            break;
                        }
                    }
                }
                var data = str.substring(index, endi);
                try {
                    time.tips = JSON.parse(data);
                }
                catch (_a) {
                    console.warn('error json:' + data);
                }
                while (str[endi] == ',') {
                    endi++;
                }
                remain1 = str.substr(endi);
                str = str.substr(0, index);
            }
            var strs = [];
            var remain0 = ShareTimeMgr.splitChar(strs, str, ',', 5);
            var nums = strs.map(function (v) { return Number(v); });
            time.times = nums.splice(0, 2);
            time.rands = nums.splice(0, 3).map(function (v) { return v / 100; });
            times.push(time);
            return remain0 + remain1;
        };
        ShareTimeMgr.splitChar = function (array, str, char, count) {
            var index = -1;
            while (count--) {
                index = str.indexOf(char);
                if (index == -1) {
                    if (str) {
                        array.push(str);
                        str = '';
                    }
                    break;
                }
                array.push(str.substr(0, index));
                str = str.substr(index + 1);
            }
            return str;
        };
        ShareTimeMgr.$configs = [];
        return ShareTimeMgr;
    }());

    var $loader;
    var getLoader = function () {
        return $loader || ($loader = new Laya.LoaderManager, $loader.retryNum = 1, $loader);
    };
    var SideUtils = (function () {
        function SideUtils() {
        }
        SideUtils.getRes = function (url, type) {
            return new Promise(function (resolve) {
                var loader = getLoader();
                var res = loader.getRes(url);
                if (res)
                    resolve(res);
                else
                    loader.load(url, Laya.Handler.create(null, resolve), null, type);
            });
        };
        SideUtils.drawRoundRect = function (graphics, width, height, round) {
            var paths = [
                ['moveTo', round, 0],
                ['lineTo', width - round, 0],
                ['arcTo', width, 0, width, round, round],
                ['lineTo', width, height - round],
                ['arcTo', width, height, width - round, height, round],
                ['lineTo', round, height],
                ['arcTo', 0, height, 0, height - round, round],
                ['lineTo', 0, round],
                ['arcTo', 0, 0, round, 0, round]
            ];
            graphics.drawPath(0, 0, paths, { fillStyle: "#0" });
        };
        SideUtils.randomSort = function (array) {
            return array.sort(function (a, b) {
                return Math.random() - 0.5;
            });
        };
        SideUtils.randomInArray = function (array, item) {
            var length = array.length, splice = length;
            if (length > 1 && item != void 0) {
                var index = array.indexOf(item);
                if (index > -1) {
                    length--;
                    splice = index;
                }
            }
            var rndIdx = Math.random() * length | 0;
            if (rndIdx >= splice)
                rndIdx++;
            return array[rndIdx];
        };
        return SideUtils;
    }());

    var SideData = (function () {
        function SideData(data) {
            this.sideboxId = 0;
            this.type = 0;
            this.title = '';
            this.icon = '';
            this.status = 0;
            this.innerStatus = 0;
            this.showTime = 0;
            this.jumpAppid = '';
            this.path = '';
            this.shieldIos = 0;
            for (var i in data) {
                this[i] = data[i];
            }
        }
        return SideData;
    }());
    var config = {
        local: 'wxlocal/adConfig.json',
        cache: '$adConfig$',
        timeout: 5000,
        switch: true,
        checkUrl: 'https://ydhwslb.szvi-bo.com/jslb/getUrl'
    };
    var SideMgr = (function () {
        function SideMgr() {
        }
        SideMgr.init = function (platform, enabled, localCfg) {
            var self = SideMgr;
            self.platform = platform;
            self.$useSvr = !enabled;
            for (var i in localCfg) {
                config[i] = localCfg[i];
            }
            var register = SideMsg.register;
            register(ESMessage.C2S_SWITCH, self.onSwitch, self, true);
            register(ESMessage.C2S_RM_SIDES, self.onRmSides, self);
            register(ESMessage.C2S_RM_BOARDS, self.onRmBoards, self);
            register(ESMessage.C2S_REMOVE, self.onRemove, self);
            register(ESMessage.C2S_RESET, self.onReset, self);
            if (enabled) {
                var obj = void 0;
                try {
                    obj = JSON.parse(Laya.LocalStorage.getItem(config.cache));
                }
                catch (_a) { }
                if (obj !== null && typeof obj === 'object') {
                    self.onCompleteL(obj);
                }
                else {
                    SideUtils.getRes(config.local).then(self.onCompleteL);
                }
            }
        };
        SideMgr.checkObj = function (obj) {
            var result = false;
            if (obj) {
                var timestamp = obj.timestamp;
                if (!isNaN(timestamp)) {
                    var boxes = obj.boxes;
                    var length_1 = boxes instanceof Array && boxes.length;
                    if (length_1 > 0) {
                        while (length_1--) {
                        }
                        result = true;
                    }
                }
            }
            return result;
        };
        SideMgr.onCompleteL = function (data) {
            console.log('data', data);
            var self = SideMgr;
            if (data) {
                self.$cache = self.checkObj(data) && data;
                self.checkCache();
            }
            else {
                self.onErrorL();
            }
        };
        SideMgr.onErrorL = function () {
            var self = SideMgr;
            var config = self.$svrConfig;
            self.$useSvr = true;
            if (config) {
                self.onComplete(config);
            }
            else {
                self.checkCache();
            }
            console.error('请先设置好本地卖量配置');
        };
        SideMgr.checkCache = function () {
            var self = SideMgr;
            var cache = self.$cache;
            var timestamp = cache ? cache.timestamp : 0;
            var platform = self.platform;
            var data = {
                appid: platform.appId,
                version: platform.version,
                timestamp: timestamp
            };
            Http.get(config.checkUrl, data, config.timeout).then(self.onCompleteC).catch(self.onError);
        };
        SideMgr.onCompleteC = function (data) {
            var self = SideMgr;
            if (!data.newCofig) {
                var url = data.url;
                if (url) {
                    SideUtils.getRes(url + '?m=' + Date.now()).then(self.onComplete);
                    return;
                }
            }
            self.onError();
        };
        SideMgr.onError = function () {
            var self = SideMgr;
            self.onComplete(self.$cache);
        };
        SideMgr.onComplete = function (data) {
            var self = SideMgr;
            if (!self.$complete && data) {
                console.log('最终卖量数据', data);
                self.$cache = data;
                self.initSides();
                self.$complete = true;
                self.$useSvr || Laya.LocalStorage.setJSON(config.cache, data);
                SideMsg.noticeLater(ESMessage.S2S_COMPLETE, data);
            }
        };
        SideMgr.initSides = function () {
            var self = SideMgr;
            var datas = self.$cache.boxes;
            if (datas) {
                var array = [], arrayZ = [];
                var rmSides_1 = self.$rmSides;
                var rmFirst = rmSides_1 && rmSides_1[0];
                var rmFunc = rmFirst ? (typeof rmFirst === 'string' ? function (d) {
                    return rmSides_1.indexOf(d.jumpAppid) == -1;
                } : function (d) {
                    return rmSides_1.indexOf(d.sideboxId) == -1;
                }) : function (d) { return true; };
                var noIPhone = !Laya.Browser.onIOS;
                for (var i = 0, len = datas.length; i < len; i++) {
                    var data = datas[i];
                    if (data.status == 1 && (noIPhone || data.shieldIos != 1)) {
                        arrayZ.push(data);
                    }
                }
                self.$boxes = array;
                self.$boxesZ = arrayZ;
            }
        };
        SideMgr.initBoards = function () {
            var self = SideMgr;
            var datas = self.$boards;
            if (datas) {
                var rmBoards_1 = self.$rmBoards;
                var rmFirst = rmBoards_1 && rmBoards_1[0];
                var rmFunc = rmFirst ? (typeof rmFirst === 'string' ? function (d) {
                    return rmBoards_1.indexOf(d.jumpAppid) == -1;
                } : function (d) {
                    return rmBoards_1.indexOf(d.sideboxId) == -1;
                }) : function (d) { return true; };
                var noIPhone = !Laya.Browser.onIOS;
                for (var i = 0, len = datas.length; i < len; i++) {
                    var data = datas[i];
                    data.isAwarded = !rmFunc(data);
                }
            }
        };
        SideMgr.onSwitch = function (bool) {
            config.switch = !!bool;
        };
        SideMgr.onRmSides = function (ids) {
            var self = SideMgr;
            if (ids) {
                self.$rmSides = ids;
                if (self.$complete) {
                    self.initSides();
                }
            }
        };
        SideMgr.onRmBoards = function (ids) {
            var self = SideMgr;
            if (ids) {
                self.$rmBoards = ids;
                self.initBoards();
            }
        };
        SideMgr.onRemove = function (data) {
            SideMgr.removeSide(data);
        };
        SideMgr.onReset = function () {
            SideMgr.resetSide();
        };
        SideMgr.showMore = function () {
            SideMsg.notice(ESMessage.S2C_CANCEL);
        };
        SideMgr.loadSides = function (call, thisObj) {
            var self = SideMgr;
            var endc = function () {
                call.call(thisObj, self.getSides());
            };
            if (self.$complete) {
                endc();
            }
            else {
                SideMsg.register(ESMessage.S2S_COMPLETE, endc, self, true);
            }
        };
        SideMgr.getSides = function () {
            return config.switch ? SideMgr.$boxes : null;
        };
        SideMgr.hasSide = function () {
            var boxes = SideMgr.getSides();
            return boxes && boxes.length > 0;
        };
        SideMgr.checkShow = function (view) {
            if (platform.isOppo) {
                view.visible = false;
            }
            else {
                view.visible = false;
                SideMgr.loadSides(function (datas) {
                    view.visible = datas && datas.length > 0;
                });
            }
        };
        SideMgr.removeSide = function (data) {
            var boxes = SideMgr.$boxes;
            var index = boxes && boxes.indexOf(data);
            if (index > -1) {
                boxes.splice(index, 1);
                SideMsg.notice(ESMessage.S2S_REMOVE, data);
            }
        };
        SideMgr.resetSide = function () {
            var self = SideMgr;
            var boxesZ = self.$boxesZ;
            boxesZ && (self.$boxes = boxesZ.concat());
        };
        SideMgr.setSvrSide = function (datas) {
            var self = SideMgr;
            var config = self.$svrConfig = {
                timestamp: 0,
                version: '1.0.0',
                boxes: datas
            };
            SideMgr.onComplete(config);
        };
        SideMgr.setSvrSBoard = function (datas) {
            if (!SideMgr.$boards && datas) {
                var array = SideMgr.$boards = [];
                for (var i = 0, len = datas.length; i < len; i++) {
                    var data = datas[i];
                    if (data.isOpen) {
                        data.sideboxId = data.id;
                        data.path = data.jumpPath;
                        array.push(data);
                    }
                }
                SideMsg.notice(ESMessage.S2S_COMPLETE1, array);
            }
        };
        SideMgr.reqYLSideboxAndBoard = function () {
            if (!SideMgr.$complete) {
                var sideboxArr = [];
                if (Laya.Browser.onPC) {
                    sideboxArr.push({
                        icon: "https://ydhwimg.szvi-bo.com/wx94a280837610e390/sidebox/528b9fe9085146e7908123bc0dd077f9.jpg",
                        innerStatus: 0,
                        jumpAppid: "wxb2e8e6a45ee0f0dc",
                        path: "",
                        shieldIos: 0,
                        showTime: 30,
                        sideboxId: 5381,
                        status: 1,
                        title: "天天涂鸦",
                        type: 0
                    }, {
                        icon: "https://ydhwimg.szvi-bo.com/wx94a280837610e390/sidebox/f679c18745004196b3f9fd63106925ae.png",
                        innerStatus: 0,
                        jumpAppid: "wxdfd16d128b23abd4",
                        path: "",
                        shieldIos: 0,
                        showTime: 30,
                        sideboxId: 5382,
                        status: 1,
                        title: "我吃糖贼6",
                        type: 0
                    }, {
                        icon: "https://ydhwimg.szvi-bo.com/wx94a280837610e390/sidebox/f45857909999465cbc965f74e0d0c949.png",
                        innerStatus: 0,
                        jumpAppid: "wx994fa8e21a539e13",
                        path: "",
                        shieldIos: 0,
                        showTime: 30,
                        sideboxId: 5383,
                        status: 1,
                        title: "水上乐园",
                        type: 0
                    });
                }
                else {
                }
            }
            if (!SideMgr.$boards) {
                var boardArr = [];
                if (Laya.Browser.onPC) {
                    boardArr.push({
                        award: "[{'type':'gold','value':'0'}]",
                        icon: "https://ydhwimg.szvi-bo.com/wx94a280837610e390/scoreboard/00fd6134a02548c490f80368f82d75cc.jpg",
                        id: 393,
                        isOpen: true,
                        jumpAppid: "wxb2e8e6a45ee0f0dc",
                        path: "",
                        sideboxId: 393,
                        title: "天天涂鸦"
                    }, {
                        award: "[{'type':'gold','value':'0'}]",
                        icon: "https://ydhwimg.szvi-bo.com/wx38483cec31344b79/scoreboard/598c1db65dbc45738de7ebac2c404792.png",
                        id: 409,
                        isOpen: true,
                        jumpAppid: "wx994fa8e21a539e13",
                        path: "",
                        sideboxId: 393,
                        title: "水上乐园"
                    });
                    SideMgr.setSvrSBoard(boardArr);
                }
                else {
                }
            }
        };
        SideMgr.loadBoards = function (call, thisObj) {
            var self = SideMgr;
            var endc = function () {
                call.call(thisObj, self.getBoards());
            };
            if (self.$boards) {
                endc();
            }
            else {
                SideMsg.register(ESMessage.S2S_COMPLETE, endc, self, true);
            }
        };
        SideMgr.getBoards = function () {
            return config.switch ? SideMgr.$boards : null;
        };
        SideMgr.hasBoards = function () {
            var boxes = SideMgr.getBoards();
            return boxes && boxes.length > 0;
        };
        SideMgr.removeBoard = function (boardId) {
            var boards = SideMgr.$boards;
            if (boards) {
                for (var i = 0, len = boards.length; i < len; i++) {
                    var data = boards[i];
                    if (data.id === boardId) {
                        data.isAwarded = true;
                        SideMsg.notice(ESMessage.S2S_REMOVE1, data);
                        break;
                    }
                }
            }
        };
        return SideMgr;
    }());
    var Http = (function (_super) {
        __extends(Http, _super);
        function Http() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Http.prototype.addCall = function (call, error, thisObj, timeout) {
            var self = this;
            var lEvent = Laya.Event;
            self.$comCall = call;
            self.$errorCall = error;
            self.$thisObj = thisObj;
            self.once(lEvent.COMPLETE, self, self.onComplete);
            self.once(lEvent.ERROR, self, self.onError);
            Laya.timer.once(timeout > 0 ? timeout : 5000, self, self.onError);
        };
        Http.prototype.onComplete = function (data) {
            var self = this;
            var call = self.$comCall;
            call && call.call(self.$thisObj, data);
            self.onClear();
        };
        Http.prototype.onError = function (data) {
            var self = this;
            var call = self.$errorCall;
            call && call.call(self.$thisObj, data);
            self.onClear();
        };
        Http.prototype.onClear = function () {
            var self = this;
            self.offAll();
            self.$comCall = self.$errorCall = self.$thisObj = null;
            Laya.timer.clear(self, self.onError);
        };
        Http.get = function (url, data, timeout) {
            return new Promise(function (resolve, reject) {
                var http = new Http;
                if (data !== null && data !== undefined) {
                    if (typeof data === 'object') {
                        var attr = [];
                        for (var i in data) {
                            attr.push(i + '=' + data[i]);
                        }
                        url += '?' + attr.join('&');
                    }
                    else {
                        url += data;
                    }
                }
                http.send(url, null, 'get', 'json');
                http.addCall(resolve, reject, null, timeout);
            });
        };
        return Http;
    }(Laya.HttpRequest));

    var CfgDataMgr = (function () {
        function CfgDataMgr() {
        }
        CfgDataMgr.prototype.initConfigs = function () {
            var configs = Laya.loader.getRes(EJson.Configs);
            function loadFunc(name) {
                return configs[name];
            }
            this.globalCfg = loadFunc(ECfg.GlobalCfg);
            this.playerCfg = loadFunc(ECfg.Player);
            this.levelCfg = loadFunc(ECfg.LevelCfg);
            this.shopCfg = loadFunc(ECfg.ShopCfg);
            this.initData();
        };
        CfgDataMgr.prototype.initData = function () {
        };
        CfgDataMgr.prototype.getGlobalCfg = function (key, defValue) {
            if (defValue === void 0) { defValue = 0; }
            var cfg = CfgDataMgr.instance.globalCfg[key];
            return cfg ? cfg.value : defValue;
        };
        CfgDataMgr.instance = new CfgDataMgr();
        return CfgDataMgr;
    }());

    var TrySkinMgr = (function () {
        function TrySkinMgr() {
        }
        TrySkinMgr.init = function (cache) {
            var obj;
            try {
                obj = JSON.parse(cache);
            }
            catch (e) {
                obj = {};
            }
            TrySkinMgr.$cache = obj;
        };
        TrySkinMgr.getSkins = function () {
            var skins = TrySkinMgr.$skins;
            if (!skins) {
                var configs = CfgDataMgr.instance.shopCfg, hasShop = ShopMgr.hasShop;
                skins = TrySkinMgr.$skins = [];
                for (var i in configs) {
                    var config = configs[i];
                    if (config.IsExperience > 0 && !hasShop(config.id))
                        skins.push(config);
                }
            }
            return skins;
        };
        TrySkinMgr.inSkins = function (skinId) {
            var skins = TrySkinMgr.getSkins();
            for (var i = 0, len = skins.length; i < len; i++)
                if (skins[i].id === skinId)
                    return true;
            return false;
        };
        TrySkinMgr.remove = function (skinId) {
            var skins = TrySkinMgr.getSkins();
            for (var i = 0, len = skins.length; i < len; i++)
                if (skins[i].id == skinId) {
                    skins.splice(i, 1);
                    break;
                }
        };
        TrySkinMgr.canTry = function () {
            var uInc = UserData.instance;
            return GameConst.ShareSwitch && uInc.level >= 3;
        };
        TrySkinMgr.getRandomSkinId = function () {
            var skinId = 0;
            var skins = TrySkinMgr.getSkins();
            var length = skins.length;
            if (length > 0)
                skinId = Utils.randomInArray(skins).id;
            return skinId;
        };
        TrySkinMgr.getRemain = function (skinId) {
            var count = TrySkinMgr.$cache[skinId] || 0;
            var config = CfgDataMgr.instance.shopCfg[skinId];
            return config ? config.ExperienceNumber - count : 0;
        };
        TrySkinMgr.addTryCount = function (skinId) {
            var cache = TrySkinMgr.$cache;
            var config = CfgDataMgr.instance.shopCfg[skinId];
            var count = cache[skinId] = (cache[skinId] || 0) + 1;
            var bool = count === config.ExperienceNumber;
            if (bool) {
                delete cache[skinId];
                ShopMgr.unlockShop(skinId);
            }
            return bool;
        };
        TrySkinMgr.closeWin = 0;
        return TrySkinMgr;
    }());

    var ShopMgr = (function () {
        function ShopMgr() {
        }
        ShopMgr.init = function (cache) {
            var obj;
            try {
                obj = JSON.parse(cache);
            }
            catch (e) {
                obj = {};
            }
            if (isNaN(obj.curSkinId))
                obj.curSkinId = 1000;
            var unlocks = obj.unlocks;
            if (!unlocks || !(unlocks instanceof Array) || unlocks.length == 0)
                obj.unlocks = [1000];
            ShopMgr.$cache = obj;
            ShopMgr.$unlocks = obj.unlocks;
        };
        ShopMgr.hasShop = function (shopId) {
            return ShopMgr.$unlocks.indexOf(shopId) > -1;
        };
        ShopMgr.getShop = function (shopId) {
            return CfgDataMgr.instance.shopCfg[shopId];
        };
        ShopMgr.unlockShop = function (shopId) {
            var unlocks = ShopMgr.$unlocks, bool;
            if (bool = unlocks.indexOf(shopId) == -1 && !!ShopMgr.getShop(shopId)) {
                unlocks.push(shopId);
                ShopMgr.saveCache();
                TrySkinMgr.remove(shopId);
            }
            return bool;
        };
        Object.defineProperty(ShopMgr, "curSkinId", {
            get: function () {
                return ShopMgr.$cache.curSkinId;
            },
            set: function (skinId) {
                var cache = ShopMgr.$cache;
                if (ShopMgr.hasShop(skinId) && cache.curSkinId != skinId) {
                    cache.curSkinId = skinId;
                    ShopMgr.saveCache();
                    EventMgr.event(EventType.RefreshSkin);
                }
            },
            enumerable: true,
            configurable: true
        });
        ShopMgr.isSpacial = function (shopId) {
            return shopId == 1105 || shopId == 1101;
        };
        ShopMgr.saveCache = function () {
            if (!ShopMgr.$timeout) {
                ShopMgr.$timeout = TimeUtils.setTimeout(function () {
                    ShopMgr.$timeout = null;
                    UserData.instance.setShopCache(JSON.stringify(ShopMgr.$cache));
                }, null, 40);
            }
        };
        return ShopMgr;
    }());

    var UserData = (function () {
        function UserData() {
            this.isNewPlayer = false;
            this.localMap = {};
            this.cacheTime = 0;
            this._lastGameDate = -1;
            this._gold = 0;
            this._level = 1;
            this._version = '';
            this._isSubscribe = false;
            this._strategyCountCache = '';
            this._shareTimeCache = '';
            this._rmSides = [];
            this._shopCache = '';
        }
        UserData.prototype.init = function () {
            var self = this, localMap = self.localMap;
            var getItem = Laya.LocalStorage.getItem;
            for (var key in self) {
                if (key.indexOf("_") == 0) {
                    var val = getItem(key);
                    if (val != null && val.length > 0) {
                        var old = localMap[key] = self[key];
                        if (typeof old === 'object') {
                            val = JSON.parse(val);
                        }
                        else if (typeof old === 'number' && !isNaN(old)) {
                            val = +val || old;
                        }
                        else if (typeof old === 'boolean') {
                            val = val === 'true';
                        }
                        self[key] = val;
                    }
                }
            }
            self.formatAll();
            var cacheTime = Number(getItem("cacheTime"));
            self.cacheTime = isNaN(cacheTime) ? 0 : cacheTime;
            Laya.timer.loop(30000, self, self.onUpdate);
        };
        UserData.prototype.parseDataFromSvr = function (data) {
            var self = this, cacheTime = self.cacheTime;
            console.log('parseDataFromSvr', data, data.cacheTime - cacheTime, data._level, self.level);
            if (data.cacheTime > cacheTime || cacheTime == 0 || data._level > self.level) {
                for (var key in data) {
                    if (key.indexOf("_") == 0) {
                        var newV = data[key];
                        var oldV = self[key];
                        if (oldV !== void 0 && newV != oldV) {
                            self[key] = newV;
                            self.setData(key, data[key]);
                        }
                    }
                }
                self.updateCacheTime();
                self.formatAll();
                EventMgr.event(EventType.RefreshCacheData);
            }
        };
        UserData.prototype.checkNewDay = function () {
            var self = this;
            if (self.accountId) {
                var curDate = Date.now();
                if (!TimeUtils.isSameDay(curDate, self._lastGameDate)) {
                    self.setStrategyCountCache('');
                    StrategyMgr.clear();
                    self._lastGameDate = curDate;
                    self.cacheData("_lastGameDate");
                    self._rmSides = [];
                    self.cacheData('_rmSides');
                    SideMgr.resetSide();
                    EventMgr.event(EventType.CheckNewDay);
                    return true;
                }
            }
        };
        UserData.prototype.uploadToSvr = function () {
            var self = this;
            Laya.timer.once(100, self, self.onUpload);
        };
        UserData.prototype.clearData = function () {
            var self = this;
            if (!self.isClear || !isNaN(self.accountId)) {
                var localMap = self.localMap;
                self.needUpload = true;
                Laya.LocalStorage.clear();
                for (var i in localMap) {
                    self[i] = localMap[i];
                }
                self.updateCacheTime();
                self.onUpload();
                self.isClear = true;
                Laya.timer.once(20000, self, function () {
                    self.isClear = false;
                });
            }
        };
        UserData.prototype.checkSubsMsg = function () {
            var self = this;
            if (!self.isSubscribe) {
                var newVersion = platform.version;
                if (newVersion !== self.version) {
                    self.version = newVersion;
                    platform.requestSubscribeMessage(function (bool) {
                        if (bool) {
                            self.isSubscribe = true;
                        }
                    });
                }
            }
        };
        UserData.prototype.uploadWxData = function () {
            var self = this;
            var kvDataList = [{
                    key: "level",
                    value: "" + self.level
                }, {
                    key: "userId",
                    value: "" + self.accountId
                }];
            platform.setUserCloudStorage(kvDataList);
        };
        UserData.prototype.formatAll = function () {
            var self = this;
            StrategyMgr.init(self._strategyCountCache);
            ShareTimeMgr.init(self._shareTimeCache);
            SideMsg.notice(ESMessage.C2S_RM_SIDES, self._rmSides);
            ShopMgr.init(self._shopCache);
        };
        UserData.prototype.onUpdate = function () {
            var self = this;
            self.checkNewDay();
            self.uploadToSvr();
        };
        UserData.prototype.onUpload = function () {
            var self = this;
        };
        UserData.prototype.cacheData = function (key) {
            var self = this;
            if (!self.isClear) {
                self.updateCacheTime();
                self.setData(key, self[key]);
                self.needUpload = true;
            }
        };
        UserData.prototype.setData = function (key, value) {
            if (typeof value === 'object')
                value = JSON.stringify(value);
            else
                value += '';
            Laya.LocalStorage.setItem(key, value);
        };
        UserData.prototype.updateCacheTime = function () {
            var self = this, time = self.cacheTime = Date.now();
            self.setData('cacheTime', '' + time);
        };
        Object.defineProperty(UserData.prototype, "gold", {
            get: function () {
                return this._gold;
            },
            set: function (value) {
                var self = this;
                self._gold = value;
                self.cacheData('_gold');
                EventMgr.event(EventType.RefreshGold);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserData.prototype, "level", {
            get: function () {
                return this._level;
            },
            set: function (level) {
                var self = this;
                self._level = level;
                self.cacheData("_level");
                self.uploadWxData();
                EventMgr.event(EventType.RefreshLevel);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserData.prototype, "version", {
            get: function () {
                return this._version;
            },
            set: function (v) {
                this._version = v;
                this.cacheData("_version");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserData.prototype, "isSubscribe", {
            get: function () {
                return this._isSubscribe;
            },
            set: function (bool) {
                this._isSubscribe = bool;
                this.cacheData('_isSubscribe');
            },
            enumerable: true,
            configurable: true
        });
        UserData.prototype.removeSide = function (data) {
            var self = this, ret = false;
            var rmSides = self._rmSides;
            var sideBoxId = data._id;
            if (rmSides.indexOf(sideBoxId) == -1) {
                rmSides.push(sideBoxId);
                self.cacheData('_rmSides');
            }
            SideMgr.removeSide(data);
            if (!SideMgr.hasSide()) {
                EventMgr.event(EventType.CloseSide);
            }
        };
        UserData.prototype.setStrategyCountCache = function (str) {
            this._strategyCountCache = str;
            this.cacheData('_strategyCountCache');
        };
        UserData.prototype.setShareTimeCache = function (str) {
            this._shareTimeCache = str;
            this.cacheData('_shareTimeCache');
        };
        UserData.prototype.setShopCache = function (_strData) {
            this._shopCache = _strData;
            this.cacheData("_shopCache");
        };
        UserData.instance = new UserData();
        return UserData;
    }());

    var FSMState;
    (function (FSMState) {
        FSMState[FSMState["None"] = 0] = "None";
        FSMState[FSMState["GrabBallState"] = 1] = "GrabBallState";
        FSMState[FSMState["AttackState"] = 2] = "AttackState";
        FSMState[FSMState["AttackHoldBallState"] = 3] = "AttackHoldBallState";
        FSMState[FSMState["DefenseState"] = 4] = "DefenseState";
    })(FSMState || (FSMState = {}));
    var ActionFSM = (function () {
        function ActionFSM(player) {
            this._stateMap = null;
            this._aiInterval = 1;
            this._nextCheckFrame = 0;
            this._curFrame = 0;
            this._stateMap = {};
            this._player = player;
            this._isRunning = false;
        }
        ;
        ActionFSM.prototype.changeState = function (type) {
            var state = this._stateMap[type];
            if (state == null) {
                switch (type) {
                    default:
                        break;
                }
                this._stateMap[type] = state;
            }
            if (this._curState)
                this._curState.onExit(this._player);
            state.onEnter(this._player);
            this._curState = state;
        };
        ActionFSM.prototype.setRunning = function (value) {
            this._isRunning = value;
        };
        ActionFSM.prototype.isRunning = function () {
            return this._isRunning;
        };
        ActionFSM.prototype.setAIInterval = function (val) {
            this._aiInterval = val;
        };
        ActionFSM.prototype.updateLogic = function () {
            if (!this._isRunning || !this._curState)
                return;
            this._curFrame++;
            if (this._curFrame < this._nextCheckFrame)
                return;
            if (this._player.isDead)
                return;
            this._curState.onRuning(this._player);
            this._nextCheckFrame = this._curFrame + this._aiInterval;
        };
        return ActionFSM;
    }());

    var Vector3$1 = Laya.Vector3;
    var Vector3Ex = (function () {
        function Vector3Ex() {
        }
        Vector3Ex.ZERO = new Vector3$1(0, 0, 0);
        Vector3Ex.One = new Vector3$1(1, 1, 1);
        Vector3Ex.Up = new Vector3$1(0, 1, 0);
        Vector3Ex.ForwardLH = new Vector3$1(0, 0, 1);
        Vector3Ex.ForwardRH = new Vector3$1(0, 0, -1);
        Vector3Ex.UnitX = new Vector3$1(1, 0, 0);
        Vector3Ex.UnitY = new Vector3$1(0, 1, 0);
        Vector3Ex.UnitZ = new Vector3$1(0, 0, 1);
        return Vector3Ex;
    }());

    var SceneConst = (function () {
        function SceneConst() {
        }
        SceneConst.Realtime_Shadow = false;
        SceneConst.Enable_Fog = false;
        SceneConst.Enable_Skybox = false;
        return SceneConst;
    }());

    var Sprite3D = Laya.Sprite3D;
    var Texture2D = Laya.Texture2D;
    var MeshSprite3D = Laya.MeshSprite3D;
    var SkinnedMeshSprite3D = Laya.SkinnedMeshSprite3D;
    var Handler = Laya.Handler;
    var BaseMaterial = Laya.BaseMaterial;
    var Vector3$2 = Laya.Vector3;
    var ExUtils = (function () {
        function ExUtils() {
        }
        ExUtils.setPathSkin = function (model, skinUrl) {
            if (!skinUrl)
                return;
            Laya.loader.create(skinUrl, Laya.Handler.create(this, function (texture) {
                ExUtils.setModelSkin(model, texture, null, "materials");
                model.active = true;
            }), null, Laya.Loader.TEXTURE2D, [256, 256, 0, false]);
        };
        ExUtils.setModelSkinByUrl = function (model, skinUrl) {
            if (!skinUrl)
                return;
            Texture2D.load(skinUrl, Handler.create(this, function (texture) {
                ExUtils.setModelSkin(model, texture, null, "materials");
                model.active = true;
            }));
        };
        ExUtils.setModelSkin = function (model, texture, color, matName) {
            if (color === void 0) { color = null; }
            if (matName === void 0) { matName = "sharedMaterials"; }
            if (model == null || texture == null)
                return;
            if (model instanceof MeshSprite3D) {
                var meshSprite3D = model;
                for (var i = 0; i < meshSprite3D.meshRenderer[matName].length; i++) {
                    var material = meshSprite3D.meshRenderer[matName][i];
                    material.albedoTexture = texture;
                    if (color)
                        material.albedoColor = color;
                }
                meshSprite3D.meshRenderer.castShadow = SceneConst.Realtime_Shadow;
            }
            if (model instanceof SkinnedMeshSprite3D) {
                var skinnedMeshSprite3D = model;
                for (var i = 0; i < skinnedMeshSprite3D.skinnedMeshRenderer[matName].length; i++) {
                    var material = skinnedMeshSprite3D.skinnedMeshRenderer[matName][i];
                    material.albedoTexture = texture;
                    if (color)
                        material.albedoColor = color;
                }
                skinnedMeshSprite3D.skinnedMeshRenderer.castShadow = SceneConst.Realtime_Shadow;
            }
            for (var i = 0, n = model.numChildren; i < n; i++) {
                this.setModelSkin(model.getChildAt(i), texture, color, matName);
            }
        };
        ExUtils.setMatetial = function (node, path, handler) {
            if (handler === void 0) { handler = null; }
            BaseMaterial.load(path, Handler.create(this, function (mat) {
                var mesh = this.getMesh(node);
                if (mesh) {
                    mesh.meshRenderer.material = mat;
                    mesh.meshRenderer.castShadow = SceneConst.Realtime_Shadow;
                    mesh.meshRenderer.receiveShadow = SceneConst.Realtime_Shadow;
                    if (handler)
                        handler.run();
                }
            }));
        };
        ExUtils.setSkinMeshMaterail = function (node, mat) {
            var mesh = this.getSkinMesh(node);
            if (mesh) {
                mesh.skinnedMeshRenderer.material = mat;
            }
        };
        ExUtils.getMaterial = function (node) {
            if (node == null)
                return null;
            var mesh = this.getMesh(node);
            if (mesh) {
                var material = mesh.meshRenderer.sharedMaterials[0];
                return material;
            }
            var mat;
            for (var i = 0; i < node.numChildren; i++) {
                mat = this.getMaterial(node.getChildAt(i));
                if (mat) {
                    return mat;
                }
            }
            return null;
        };
        ExUtils.setRecieveShadow = function (model, val) {
            if (model instanceof MeshSprite3D) {
                var meshSprite3D = model;
                meshSprite3D.meshRenderer.receiveShadow = val;
            }
            if (model instanceof SkinnedMeshSprite3D) {
                var skinnedMeshSprite3D = model;
                skinnedMeshSprite3D.skinnedMeshRenderer.receiveShadow = val;
            }
            for (var i = 0; i < model.numChildren; i++) {
                this.setRecieveShadow(model.getChildAt(i), val);
            }
        };
        ExUtils.setCastShadow = function (model, val) {
            if (model instanceof MeshSprite3D) {
                var meshSprite3D = model;
                meshSprite3D.meshRenderer.castShadow = val;
            }
            if (model instanceof SkinnedMeshSprite3D) {
                var skinnedMeshSprite3D = model;
                skinnedMeshSprite3D.skinnedMeshRenderer.castShadow = val;
            }
            for (var i = 0; i < model.numChildren; i++) {
                this.setCastShadow(model.getChildAt(i), val);
            }
        };
        ExUtils.getMesh = function (obj) {
            if (obj == null)
                return null;
            var mesh;
            if (obj instanceof MeshSprite3D) {
                return obj;
            }
            for (var i = 0; i < obj.numChildren; i++) {
                mesh = this.getMesh(obj.getChildAt(i));
                if (mesh) {
                    return mesh;
                }
            }
            return null;
        };
        ExUtils.getSkinMesh = function (obj) {
            if (obj == null)
                return null;
            var mesh;
            if (obj instanceof SkinnedMeshSprite3D) {
                return obj;
            }
            for (var i = 0; i < obj.numChildren; i++) {
                mesh = this.getSkinMesh(obj.getChildAt(i));
                if (mesh) {
                    return mesh;
                }
            }
            return null;
        };
        ExUtils.instanceSprite3D = function (path, parent, handler) {
            if (handler === void 0) { handler = null; }
            var callback = Handler.create(this, function (obj) {
                if (obj == null || obj == null) {
                    console.error("instanceSprite3D null", path);
                    return;
                }
                var instance = Sprite3D.instantiate(obj, parent, false);
                if (handler)
                    handler.runWith(instance);
            });
            var obj = Laya.loader.getRes(path);
            if (obj) {
                callback.runWith(obj);
                return;
            }
            Sprite3D.load(path, callback);
        };
        ExUtils.getComponentInChild = function (obj, cls) {
            var component = obj.getComponent(cls);
            if (component instanceof cls) {
                return component;
            }
            for (var i = 0; i < obj.numChildren; i++) {
                component = this.getComponentInChild(obj.getChildAt(i), cls);
                if (component instanceof cls) {
                    return component;
                }
            }
            return null;
        };
        ExUtils.addSingleComponent = function (obj, cls) {
            if (obj == null) {
                console.trace("addSingleComponent obj null", cls);
                return null;
            }
            var component = obj.getComponent(cls);
            if (component == null) {
                component = obj.addComponent(cls);
            }
            return component;
        };
        ExUtils.getChild = function (obj, path) {
            var nodeNames = path.split("/");
            for (var i = 0, size = nodeNames.length; i < size; i++) {
                obj = obj.getChildByName(nodeNames[i]);
            }
            return obj;
        };
        ExUtils.findChild = function (obj, name) {
            if (obj.name == name) {
                return obj;
            }
            var result = null;
            for (var i = 0, size = obj.numChildren; i < size; i++) {
                result = this.findChild(obj.getChildAt(i), name);
                if (result) {
                    return result;
                }
            }
            return null;
        };
        ExUtils.LayaLookAt = function (tf, targetPos, ignoreY) {
            if (ignoreY === void 0) { ignoreY = false; }
            Vector3$2.subtract(tf.position, targetPos, this._vec);
            Vector3$2.add(tf.position, this._vec, this._vec);
            if (ignoreY) {
                this._vec.y = tf.position.y;
            }
            tf.lookAt(this._vec, Vector3Ex.Up, false);
        };
        ExUtils.clearTrailPositions = function (trailSp) {
            var trail = trailSp['trailFilter'];
            if (!trail)
                return;
            trail['_lastPosition'].setValue(0, 0, 0);
            trail['_curtime'] = 0;
            trail['_totalLength'] = 0;
            var geometry = trail['_trialGeometry'];
            if (!geometry)
                return;
            geometry['_activeIndex'] = 0;
            geometry['_endIndex'] = 0;
            geometry['_disappearBoundsMode'] = false;
            var subBirth = geometry['_subBirthTime'];
            subBirth && subBirth.fill(0);
            var subDistance = geometry['_subDistance'];
            subDistance && subDistance.fill(0);
            geometry['_segementCount'] = 0;
            geometry['_isTempEndVertex'] = false;
            geometry['_needAddFirstVertex'] = false;
            geometry['_lastFixedVertexPosition'].setValue(0, 0, 0);
        };
        ExUtils._vec = new Vector3$2();
        return ExUtils;
    }());

    var EntityType;
    (function (EntityType) {
        EntityType[EntityType["Player"] = 0] = "Player";
        EntityType[EntityType["Obstacle"] = 1] = "Obstacle";
        EntityType[EntityType["SpeedupBuff"] = 2] = "SpeedupBuff";
        EntityType[EntityType["Glod"] = 3] = "Glod";
        EntityType[EntityType["Box"] = 4] = "Box";
    })(EntityType || (EntityType = {}));
    var BaseEntity = (function (_super) {
        __extends(BaseEntity, _super);
        function BaseEntity() {
            var _this = _super.call(this) || this;
            _this._animatorSpeed = 0;
            _this._animatorName = "";
            return _this;
        }
        BaseEntity.prototype.onAwake = function () {
            this.gameObject = this.owner;
            this.transform = this.gameObject.transform;
            if (this.entityType == EntityType.Player) {
                this.animator = ExUtils.getComponentInChild(this.gameObject, Laya.Animator);
            }
        };
        BaseEntity.prototype.updateLogic = function (now) {
        };
        BaseEntity.prototype.getModelId = function () {
            return this.modelId;
        };
        BaseEntity.prototype.crossFade = function (name, time) {
            if (!this.animator)
                return;
            this.animator.crossFade(name, time);
        };
        BaseEntity.prototype.playAnimation = function (_animatorName, _isPlay) {
            if (_isPlay === void 0) { _isPlay = true; }
            if (this.animator) {
                if (_isPlay) {
                    if (this._animatorSpeed > 0) {
                        this.animator.speed = this._animatorSpeed;
                    }
                    this._animatorSpeed = 0;
                    if (_animatorName.length > 0 && (_animatorName != this._animatorName)) {
                        this._animatorName = _animatorName;
                        this.crossFade(_animatorName, 0.1);
                    }
                }
                else {
                    if (this.animator.speed > 0) {
                        this._animatorSpeed = this.animator.speed;
                    }
                    this.animator.speed = 0;
                }
            }
        };
        BaseEntity.prototype.setData = function (data) {
            this.cfgData = data;
        };
        return BaseEntity;
    }(Laya.Script));

    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            var _this = _super.call(this) || this;
            _this.isRole = false;
            _this.skinId = 0;
            _this.isDead = false;
            _this._useOneLvSkin = false;
            return _this;
        }
        Player.prototype.onAwake = function () {
            _super.prototype.onAwake.call(this);
            this.entityType = EntityType.Player;
            if (!this.isRole)
                this.fsm = new ActionFSM(this);
        };
        Player.prototype.setData = function (data) {
            _super.prototype.setData.call(this, data);
        };
        Player.prototype.isRolePlayer = function () {
            return this.isRole;
        };
        Player.prototype.setPlayerId = function (id) {
            this.playerId = id;
        };
        Player.prototype.getPlayerId = function () {
            return this.playerId;
        };
        Object.defineProperty(Player.prototype, "playerName", {
            get: function () {
                return this._playerName;
            },
            set: function (val) {
                this._playerName = val;
            },
            enumerable: true,
            configurable: true
        });
        Player.prototype.updateLogic = function (now) {
            _super.prototype.updateLogic.call(this, now);
            this.fsm && this.fsm.updateLogic();
        };
        Player.prototype.startAI = function () {
            if (this.fsm) {
                this.fsm.changeState(FSMState.AttackState);
                this.fsm.setRunning(true);
            }
        };
        Player.prototype.stopAI = function () {
            if (this.fsm) {
                this.fsm.setRunning(false);
                this.fsm.changeState(FSMState.None);
            }
        };
        Player.prototype.onCollisionEnter = function (collision) {
        };
        Player.prototype.onTriggerEnter = function (other) {
        };
        Player.prototype.doDead = function () {
            this.isDead = true;
            this.stopAI();
        };
        Player.prototype.revive = function () {
            this.isDead = false;
            this.startAI();
        };
        Player.prototype.changeModel = function (skinId, useOneLv, callback) {
            var _this = this;
            if (useOneLv === void 0) { useOneLv = false; }
            if (callback === void 0) { callback = null; }
            this._useOneLvSkin = useOneLv;
            var config = ShopMgr.getShop(skinId);
            if (skinId != this.skinId && config) {
                var modelName = config.url;
                this.setData(config);
                this.skinId = skinId;
            }
            if (name == this._modelName)
                return;
            this._modelName = name;
            var path = SceneRoot + name + ".lh";
            ExUtils.instanceSprite3D(path, null, Laya.Handler.create(this, function (newModel) {
                var oldModel = _this.gameObject.getChildAt(0);
                if (oldModel)
                    oldModel.destroy();
                _this.gameObject.addChildAt(newModel, 0);
                _this.animator = ExUtils.getComponentInChild(newModel, Laya.Animator);
                _this.crossFade("run", 0);
                _this._mesh = ExUtils.getSkinMesh(newModel);
                if (callback) {
                    callback.run();
                }
            }));
        };
        return Player;
    }(BaseEntity));

    var RolePlayer = (function (_super) {
        __extends(RolePlayer, _super);
        function RolePlayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RolePlayer.prototype.onAwake = function () {
            this.isRole = true;
            _super.prototype.onAwake.call(this);
            this.playerName = "你";
        };
        RolePlayer.prototype.updateLogic = function (now) {
            _super.prototype.updateLogic.call(this, now);
        };
        return RolePlayer;
    }(Player));

    var EUI = {
        BigBoxView: {
            class: "side/view/BigBoxView.ts",
        },
        GoldenEggView: {
            class: "side/view/GoldenEggView.ts",
            mask: true,
            banner: true
        },
        MorePeopleView: {
            class: "side/view/MorePeopleView.ts",
            mask: true,
            banner: true
        },
        SideMoreGameView: {
            class: "side/view/SideMoreGameView.ts",
            banner: true,
            misTouch: "imgKeep",
        },
        SideBoxView: {
            class: "side/view/SideBoxView.ts",
            mask: true,
        },
        WXModelView: {
            class: "model/side/WXModelView.ts"
        },
        DebugView: {
            class: "script/DebugView.ts"
        },
        LoadingView: {
            class: "script/LoadingView.ts"
        },
        HomeView: {
            class: "script/HomeView.ts"
        },
        GameView: {
            class: "script/GameView.ts",
        },
        RankingView: {
            class: "script/RankingView.ts",
            mask: true
        },
        TrySkinView: {
            class: "script/TrySkinView.ts",
            mask: true
        },
        SettingView: {
            class: "script/SettingView.ts",
            mask: true,
            banner: true,
        },
        FailView: {
            class: "script/FailView.ts",
            mask: true,
            banner: true,
            misTouch: 'imgRestart'
        },
        ReviveView: {
            class: "script/ReviveView.ts",
            mask: true,
            banner: true
        },
        ResultView: {
            class: "script/ResultView.ts",
            mask: true,
            banner: true
        }
    };

    var support = typeof wx !== 'undefined' || typeof qq !== 'undefined';
    var AldSDK = (function () {
        function AldSDK() {
        }
        AldSDK.aldSendEvent = function (eventName, defaultData, params) {
            if (support) {
                var aldSendEvent = wx.aldSendEvent;
                if (aldSendEvent) {
                    params || (params = {});
                    if (defaultData !== false) {
                        var uInc = UserData.instance;
                        params["玩家ID"] = uInc.accountId;
                        params["关卡ID"] = uInc.level;
                    }
                    params.timeId = AldSDK.timeId;
                    aldSendEvent(eventName.replace(/%u/i, AldSDK.getNewName()), params);
                }
            }
            console.log('打点：' + eventName.replace(/%u/i, AldSDK.getNewName()));
        };
        AldSDK.aldStageStart = function (level) {
            if (support) {
                var aldStage = wx.aldStage;
                if (aldStage) {
                    var id = level + '';
                    aldStage.onStart({
                        stageId: id,
                        stageName: id,
                        userId: UserData.instance.accountId + ''
                    });
                }
            }
        };
        AldSDK.aldStageEnd = function (level, clear) {
            if (support) {
                var aldStage = wx.aldStage;
                if (aldStage) {
                    var id = level + '';
                    aldStage.onEnd({
                        stageId: id,
                        stageName: id,
                        event: clear ? 'complete' : 'fail',
                        userId: UserData.instance.accountId + '',
                        params: {
                            desc: '游戏通关：' + (clear ? '成功' : '失败')
                        }
                    });
                }
            }
        };
        AldSDK.getNewName = function () {
            return AldSDK.$newName || (AldSDK.$newName = (UserData.instance.isNewPlayer ? '新' : '老') + '用户');
        };
        AldSDK.getLoadTime = function () {
            return AldSDK.homeTime - AldSDK.loadingTime;
        };
        AldSDK.resetUser = function () {
            AldSDK.$newName = null;
        };
        return AldSDK;
    }());

    var Vector3$3 = Laya.Vector3;
    var Quaternion = Laya.Quaternion;
    var CameraDebug = (function (_super) {
        __extends(CameraDebug, _super);
        function CameraDebug() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lastMouseX = NaN;
            _this.lastMouseY = NaN;
            _this.yawPitchRoll = new Vector3$3();
            _this.tempRotationZ = new Quaternion();
            _this.isMouseDown = false;
            _this.rotaionSpeed = 0.00006;
            _this.moveVec = new Vector3$3();
            _this.tmpVec = new Vector3$3();
            _this.isActive = false;
            return _this;
        }
        CameraDebug.prototype.onAwake = function () {
            this.camera = this.owner;
        };
        CameraDebug.prototype.setActive = function (active) {
            if (active == this.isActive) {
                return;
            }
            this.isActive = active;
            if (active) {
                Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
                Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
                Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);
            }
            else {
                Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
                Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseUp);
                Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.mouseOut);
            }
        };
        CameraDebug.prototype.onUpdate = function () {
            if (this.isActive) {
                this.updateCamera(Laya.timer.delta);
            }
        };
        CameraDebug.prototype.mouseDown = function (e) {
            this.camera.transform.localRotation.getYawPitchRoll(this.yawPitchRoll);
            this.lastMouseX = Laya.stage.mouseX;
            this.lastMouseY = Laya.stage.mouseY;
            this.isMouseDown = true;
        };
        CameraDebug.prototype.mouseUp = function (e) {
            this.isMouseDown = false;
        };
        CameraDebug.prototype.mouseOut = function (e) {
            this.isMouseDown = false;
        };
        CameraDebug.prototype.updateRotation = function () {
            var yprElem = this.yawPitchRoll;
            if (Math.abs(yprElem.y) < 1.50) {
                Quaternion.createFromYawPitchRoll(yprElem.x, yprElem.y, yprElem.z, this.tempRotationZ);
                this.camera.transform.localRotation = this.tempRotationZ;
            }
        };
        CameraDebug.prototype.updateCamera = function (elapsedTime) {
            if (!isNaN(this.lastMouseX) && !isNaN(this.lastMouseY)) {
                var scene = this.owner.scene;
                Laya.KeyBoardManager.hasKeyDown(87) && this.moveForward(-0.01 * elapsedTime);
                Laya.KeyBoardManager.hasKeyDown(83) && this.moveForward(0.01 * elapsedTime);
                Laya.KeyBoardManager.hasKeyDown(65) && this.moveRight(-0.01 * elapsedTime);
                Laya.KeyBoardManager.hasKeyDown(68) && this.moveRight(0.01 * elapsedTime);
                Laya.KeyBoardManager.hasKeyDown(81) && this.moveVertical(0.01 * elapsedTime);
                Laya.KeyBoardManager.hasKeyDown(69) && this.moveVertical(-0.01 * elapsedTime);
                if (this.isMouseDown) {
                    var offsetX = Laya.stage.mouseX - this.lastMouseX;
                    var offsetY = Laya.stage.mouseY - this.lastMouseY;
                    var yprElem = this.yawPitchRoll;
                    yprElem.x -= offsetX * this.rotaionSpeed * elapsedTime;
                    yprElem.y -= offsetY * this.rotaionSpeed * elapsedTime;
                    this.updateRotation();
                }
            }
            this.lastMouseX = Laya.stage.mouseX;
            this.lastMouseY = Laya.stage.mouseY;
        };
        CameraDebug.prototype.moveForward = function (distance) {
            this.tmpVec.x = 0;
            this.tmpVec.y = 0;
            this.tmpVec.z = distance;
            this.camera.transform.translate(this.tmpVec);
        };
        CameraDebug.prototype.moveRight = function (distance) {
            this.tmpVec.y = 0;
            this.tmpVec.z = 0;
            this.tmpVec.x = distance;
            this.camera.transform.translate(this.tmpVec);
        };
        CameraDebug.prototype.moveVertical = function (distance) {
            this.tmpVec.x = this.tmpVec.z = 0;
            this.tmpVec.y = distance;
            this.camera.transform.translate(this.tmpVec, false);
        };
        return CameraDebug;
    }(Laya.Script));

    var DebugCtrl = (function () {
        function DebugCtrl() {
        }
        DebugCtrl.setEnable = function (active) {
            if (active) {
                Laya.stage.on(Laya.Event.KEY_UP, this, this.showDebugView);
                Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            }
            else {
                Laya.stage.off(Laya.Event.KEY_UP, this, this.showDebugView);
                Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            }
            this._clickCnt = 0;
            this._lastClickTime = 0;
        };
        DebugCtrl.showDebugView = function (event) {
            switch (event.keyCode) {
                case Laya.Keyboard.F4:
                    if (UIMgr.findUI(EUI.DebugView)) {
                        UIMgr.closeUI(EUI.DebugView);
                    }
                    else {
                        UIMgr.openUI(EUI.DebugView);
                    }
                    break;
                case Laya.Keyboard.F2:
                    var camera = SceneMgr.instance.cameraCtrl.camera;
                    SceneMgr.instance.cameraCtrl.destroy();
                    var debug = camera.addComponent(CameraDebug);
                    debug.setActive(true);
                    break;
            }
        };
        DebugCtrl.onMouseDown = function (e) {
            var x = Laya.stage.mouseX;
            var y = Laya.stage.mouseY;
            if (x > Laya.stage.width / 4 || y > Laya.stage.height / 4) {
                return;
            }
            if (this._lastClickTime == 0)
                this._lastClickTime = GameMgr.nowTime;
            var deltaTime = GameMgr.nowTime - this._lastClickTime;
            if (deltaTime > 2000) {
                this._clickCnt = 0;
                this._lastClickTime = 0;
                return;
            }
            this._clickCnt++;
            this._lastClickTime = GameMgr.nowTime;
            if (this._clickCnt > 5) {
                UIMgr.updateUI(EUI.DebugView);
            }
        };
        DebugCtrl._clickCnt = 0;
        DebugCtrl._lastClickTime = 0;
        return DebugCtrl;
    }());

    var EGamePhase;
    (function (EGamePhase) {
        EGamePhase[EGamePhase["None"] = 0] = "None";
        EGamePhase[EGamePhase["Prepare"] = 1] = "Prepare";
        EGamePhase[EGamePhase["InGame"] = 2] = "InGame";
        EGamePhase[EGamePhase["Over"] = 3] = "Over";
        EGamePhase[EGamePhase["Pause"] = 4] = "Pause";
    })(EGamePhase || (EGamePhase = {}));
    var GameMgr = (function () {
        function GameMgr() {
            this._playerCnt = 1;
            this._curPhase = EGamePhase.None;
            this._frameCnt = 0;
            this._lastTimer = 0;
        }
        GameMgr.prototype.launchGame = function () {
            AldSDK.aldSendEvent('loading完成', false, { time: Date.now() });
            DebugCtrl.setEnable(true);
            SoundMgr.playBGM();
            if (platform.isOppo) {
                platform.reportMonitor('game_scene', 0);
            }
            this.initEntities();
            this.changePhase(EGamePhase.Prepare);
            Laya.timer.frameLoop(4, this, this.updateLogic);
            Laya.timer.frameLoop(1, this, this.updateRender);
            this.addEvents();
        };
        GameMgr.prototype.addEvents = function () {
            EventMgr.on(EventType.RefreshSkin, this, this.onRefreshSkin);
        };
        GameMgr.prototype.changePhase = function (phase, result) {
            if (result === void 0) { result = null; }
            if (this._curPhase == phase)
                return;
            switch (phase) {
                case EGamePhase.Prepare:
                    this.onPreStartGame();
                    break;
                case EGamePhase.InGame:
                    this.onStartGame();
                    break;
                case EGamePhase.Over:
                    Laya.timer.once(500, this, this.onGameOver, [result]);
                    break;
            }
            this._curPhase = phase;
        };
        GameMgr.prototype.isCurPhase = function (phase) {
            return this._curPhase == phase;
        };
        GameMgr.prototype.isGamming = function () {
            return this._curPhase == EGamePhase.InGame;
        };
        GameMgr.prototype.updateLogic = function () {
            if (!this.isGamming())
                return;
            if (this.role) {
                this.role.updateLogic(GameMgr.nowTime);
            }
        };
        GameMgr.prototype.updateRender = function () {
            GameMgr.nowTime = Laya.timer.currTimer;
            GameMgr.deltaTime = Laya.timer.delta * 0.001;
            if (GameMgr.deltaTime > 1) {
                GameMgr.deltaTime = 0;
            }
            this._frameCnt++;
            if (GameMgr.nowTime - this._lastTimer >= 1000) {
                GameMgr.FPS = Math.round((this._frameCnt * 1000) / (GameMgr.nowTime - this._lastTimer));
                this._lastTimer = GameMgr.nowTime;
                this._frameCnt = 0;
            }
        };
        GameMgr.prototype.initEntities = function () {
            this._players = new Array();
            var player;
            for (var i = 0; i < this._playerCnt; i++) {
                var playerObj = new Laya.Sprite3D("Player" + i, false);
                SceneMgr.instance.scene.addChild(playerObj);
                if (i == 0) {
                    player = playerObj.addComponent(RolePlayer);
                    this.role = player;
                }
                else {
                    player = playerObj.addComponent(Player);
                }
                player.setPlayerId(i);
                this._players[i] = player;
            }
        };
        GameMgr.prototype.onPreStartGame = function () {
            UIMgr.openUI(EUI.HomeView);
        };
        GameMgr.prototype.refreshCacheStageLevel = function () {
            EventMgr.event(EventType.RefreshLevel);
            this.onPreStartGame();
        };
        GameMgr.prototype.onRefreshSkin = function () {
            var self = this, role = self.role;
            var skinId = self._skinId || ShopMgr.curSkinId;
            role && role.changeModel(skinId);
        };
        GameMgr.prototype.onStartGame = function () {
            AldSDK.aldSendEvent('%u-进入关卡');
        };
        GameMgr.prototype.onGameOver = function (_result) {
        };
        GameMgr.prototype.startGame = function () {
            this.changePhase(EGamePhase.InGame);
        };
        GameMgr.prototype.pauseGame = function () {
            this.changePhase(EGamePhase.Pause);
        };
        GameMgr.prototype.restart = function (revive) {
            this.changePhase(EGamePhase.Prepare);
            Laya.timer.frameOnce(2, this, this.changePhase, [EGamePhase.InGame]);
        };
        GameMgr.prototype.setTrySkin = function (skinId) {
            var self = this;
            self._skinId = skinId;
            self.role.changeModel(skinId);
        };
        GameMgr.instance = new GameMgr();
        GameMgr.deltaTime = 0;
        GameMgr.nowTime = 0;
        GameMgr.FPS = 60;
        GameMgr.FixedDeltaTime = 1 / GameMgr.FPS;
        return GameMgr;
    }());

    var Vector3$4 = Laya.Vector3;
    var ShakeType;
    (function (ShakeType) {
        ShakeType[ShakeType["Light"] = 0] = "Light";
        ShakeType[ShakeType["Medium"] = 1] = "Medium";
        ShakeType[ShakeType["Heavy"] = 2] = "Heavy";
    })(ShakeType || (ShakeType = {}));
    var CameraCtrl = (function (_super) {
        __extends(CameraCtrl, _super);
        function CameraCtrl() {
            var _this = _super.call(this) || this;
            _this.chaseTime = 0.3;
            _this.lookAroundRadius = 1.5;
            _this.curChaseTime = 0;
            _this.isPrePare = false;
            _this._velocity = new Vector3$4();
            _this._movePos = new Vector3$4();
            _this._rotation = new Laya.Quaternion();
            _this._deltaVec = new Vector3$4();
            _this._lookAtPos = new Vector3$4();
            _this._lookAtRot = new Laya.Quaternion();
            _this._lookAtDeltaVec = new Vector3$4();
            _this._startFlyPos = new Vector3$4();
            _this._startFlyRot = new Laya.Quaternion();
            _this._rotElements = new Float32Array(4);
            return _this;
        }
        CameraCtrl.prototype.onAwake = function () {
            this.camera = this.owner;
            this.transform = this.camera.transform;
            this._initPos = this.camera.transform.position.clone();
            this._initRot = this.camera.transform.rotation.clone();
        };
        CameraCtrl.prototype.onLateUpdate = function () {
            if (GameMgr.instance.isCurPhase(EGamePhase.Prepare) && !this.isPrePare)
                return;
            if (this._aroundTf) {
                this._rotation.rotateY(0.001, this._rotation);
                this._rotation.forNativeElement(this._rotElements);
                Laya.Utils3D.transformQuat(this._deltaVec, this._rotElements, this._movePos);
                Vector3$4.add(this._aroundTf.position, this._movePos, this._movePos);
                Utils.SmoothDamp(this.transform.position, this._movePos, this._velocity, this.chaseTime, -1, GameMgr.FixedDeltaTime, this._movePos);
                this.transform.position = this._movePos;
                this._lookAtDeltaVec.x = Laya.MathUtil.lerp(this._lookAtDeltaVec.x, this.lookAroundRadius, GameMgr.FixedDeltaTime * 0.5);
                this._lookAtDeltaVec.z = this._lookAtDeltaVec.x;
                this._rotation.cloneTo(this._lookAtRot);
                this._lookAtRot.rotateY(Utils.DegToRad(90), this._lookAtRot);
                this._lookAtRot.forNativeElement(this._rotElements);
                Laya.Utils3D.transformQuat(this._lookAtDeltaVec, this._rotElements, this._lookAtPos);
                Vector3$4.add(this._aroundTf.position, this._lookAtPos, this._lookAtPos);
                this.transform.lookAt(this._lookAtPos, Vector3Ex.Up, false);
            }
            else {
                if (this._moveToTf) {
                    Utils.SmoothDamp(this.transform.position, this._moveToTf.position, this._velocity, this.chaseTime, -1, GameMgr.FixedDeltaTime, this._movePos);
                    this.transform.position = this._movePos;
                }
                if (this._lookAtTf) {
                    this.transform.lookAt(this._lookAtTf.position, Vector3Ex.Up, false);
                }
            }
        };
        CameraCtrl.prototype.setLookAt = function (transform) {
            this._lookAtTf = transform;
        };
        CameraCtrl.prototype.setMoveTo = function (transform) {
            this._moveToTf = transform;
        };
        CameraCtrl.prototype.rotateAround = function (tf) {
            this._aroundTf = tf;
            this.transform.position.cloneTo(this._deltaVec);
            Vector3$4.subtract(this._deltaVec, tf.position, this._deltaVec);
            Laya.Quaternion.createFromYawPitchRoll(0, tf.rotationEuler.y, 0, this._rotation);
            this._lookAtDeltaVec.setValue(0, 0, 0);
        };
        CameraCtrl.prototype.recordStartFlyState = function () {
            this.transform.position.cloneTo(this._startFlyPos);
            this.transform.rotation.cloneTo(this._startFlyRot);
        };
        CameraCtrl.prototype.revertStartFlyState = function () {
            this.transform.position = this._startFlyPos;
            this.transform.rotation = this._startFlyRot;
        };
        CameraCtrl.prototype.setRoleMoveSpeedPercent = function (scale) {
            this.chaseTime = CameraCtrl.INIT_CHASE_TIME / scale;
        };
        CameraCtrl.prototype.reset = function () {
            this.camera.transform.position = this._initPos;
            this.camera.transform.rotation = this._initRot;
            this._aroundTf = null;
            this.isPrePare = false;
        };
        CameraCtrl.INIT_CHASE_TIME = 0.3;
        return CameraCtrl;
    }(Laya.Script));

    var Vector3$5 = Laya.Vector3;
    var BaseProp = (function (_super) {
        __extends(BaseProp, _super);
        function BaseProp() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._pos = new Vector3$5();
            _this._localPos = new Vector3$5();
            _this._forward = new Vector3$5();
            _this._normal = new Vector3$5();
            _this._degree = 0;
            _this.CollideDistSqr = 1.2 * 1.2;
            return _this;
        }
        BaseProp.prototype.onAwake = function () {
            _super.prototype.onAwake.call(this);
            this.gameObject = this.owner;
            this.transform = this.gameObject.transform;
            this.subGo = this.gameObject.getChildAt(0);
            this.subTF = this.subGo.transform;
        };
        BaseProp.prototype.onDisable = function () {
            _super.prototype.onDisable.call(this);
            this.resetData();
        };
        BaseProp.prototype.resetData = function () {
        };
        BaseProp.prototype.setData = function (pos, forward, normal, degree) {
            pos.cloneTo(this._pos);
            forward.cloneTo(this._forward);
            normal.cloneTo(this._normal);
            this._degree = degree;
            this.resetPos();
        };
        BaseProp.prototype.checkCollider = function (player) {
            if (!this.subTF)
                return false;
            var distSqr = Vector3$5.distanceSquared(this.subTF.position, player.transform.position);
            if (distSqr <= this.CollideDistSqr) {
                this.onCollide(player);
                return true;
            }
            return false;
        };
        BaseProp.prototype.onCollide = function (player) {
        };
        BaseProp.prototype.resetPos = function () {
            if (!this.subTF || Utils.equalVec(this._pos, Vector3Ex.ZERO))
                return false;
            this.transform.position = this._pos;
            Vector3$5.add(this._pos, this._forward, this._pos);
            this.transform.lookAt(this._pos, this._normal, false);
            return true;
        };
        return BaseProp;
    }(Laya.Script));

    var Obstacle = (function (_super) {
        __extends(Obstacle, _super);
        function Obstacle() {
            var _this = _super.call(this) || this;
            _this._speedPercent = 0;
            _this._speedTime = 0;
            return _this;
        }
        Obstacle.prototype.onAwake = function () {
            _super.prototype.onAwake.call(this);
            this._speedPercent = CfgDataMgr.instance.getGlobalCfg("Obstacle_Bump_Speed");
            this._speedTime = CfgDataMgr.instance.getGlobalCfg("Obstacle_Bump_Time");
            this.resetPos();
        };
        Obstacle.prototype.onEnable = function () {
            _super.prototype.onEnable.call(this);
        };
        Obstacle.prototype.onDisable = function () {
            _super.prototype.onDisable.call(this);
        };
        Obstacle.prototype.setData = function (pos, forward, normal, degree) {
            pos.cloneTo(this._pos);
            forward.cloneTo(this._forward);
            normal.cloneTo(this._normal);
            this._degree = degree;
            this.resetPos();
        };
        Obstacle.prototype.onCollide = function (player) {
            if (player.isRolePlayer()) {
                platform.vibrateShort();
            }
        };
        return Obstacle;
    }(BaseProp));

    var Sprite3D$1 = Laya.Sprite3D;
    var Scene3D = Laya.Scene3D;
    var Vector3$6 = Laya.Vector3;
    var Quaternion$1 = Laya.Quaternion;
    var SceneMgr = (function () {
        function SceneMgr() {
        }
        SceneMgr.prototype.init = function () {
            this.scene = new Scene3D();
            this.scene.ambientColor = new Vector3$6(0.6, 0.6, 0.6);
            Laya.stage.addChild(this.scene);
            var camera = Laya.loader.getRes(ESprite3D.MainCamera);
            this.scene.addChild(camera);
            this.cameraCtrl = camera.addComponent(CameraCtrl);
            this.light = Laya.loader.getRes(ESprite3D.DirectionalLight);
            this.scene.addChild(this.light);
            this.initLight();
            this.initFog();
            this.initSkybox();
            this.initPrefab();
        };
        SceneMgr.prototype.initLight = function () {
            var light = this.light;
            if (SceneConst.Realtime_Shadow) {
                light.shadow = true;
                light.shadowDistance = 3;
                light.shadowResolution = 1024;
                light.shadowPSSMCount = 1;
                light.shadowPCFType = 1;
            }
            return light;
        };
        SceneMgr.prototype.initFog = function () {
            if (!SceneConst.Enable_Fog)
                return;
            this.scene.enableFog = true;
            this.scene.fogColor = new Vector3$6(0, 0, 0.6);
            this.scene.fogStart = 10;
            this.scene.fogRange = 40;
        };
        SceneMgr.prototype.initSkybox = function () {
            if (!SceneConst.Enable_Skybox)
                return;
            Laya.BaseMaterial.load("nativescene/Conventional/Assets/Resources/Mat/Sky.lmat", Laya.Handler.create(this, this.loadSkyMaterial));
        };
        SceneMgr.prototype.loadSkyMaterial = function (mat) {
            this.cameraCtrl.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
            var skyRenderer = this.scene.skyRenderer;
            skyRenderer.mesh = Laya.SkyBox.instance;
            skyRenderer.material = mat;
        };
        SceneMgr.prototype.initPrefab = function () {
            this._prefabDic = {};
            this._mapNode = new Sprite3D$1("Map", true);
            this.scene.addChild(this._mapNode);
            this.effects = Laya.loader.getRes(ESprite3D.Effect);
            this._propParent = new Sprite3D$1("Props", false);
            this.scene.addChild(this._propParent);
        };
        SceneMgr.prototype.initSubPrefab = function (path) {
            var node = Laya.loader.getRes(path);
            var obj;
            for (var i = 0, num = node.numChildren; i < num; i++) {
                obj = node.getChildAt(i);
                this._prefabDic[obj.name] = obj;
            }
        };
        SceneMgr.prototype.loadSceneData = function (lv, handler) {
            var _this = this;
            if (handler === void 0) { handler = null; }
            this._levelId = lv;
            var mapPath = MapRoot + ("level" + lv + ".json");
            console.log("mapPath---", mapPath);
            Laya.loader.load(mapPath, Laya.Handler.create(this, function () {
                var json = Laya.loader.getRes(mapPath);
                if (json == null) {
                    console.error("兼容错误，找不到地图配置,Level", lv);
                    _this.loadSceneData(lv - 1, handler);
                }
                else {
                    _this._levelCfg = json;
                    _this.revertMapFromCfg();
                    if (Laya.Browser.onPC) {
                        Laya.timer.once(100, _this, function () {
                            handler && handler.run();
                        });
                    }
                    else {
                        handler && handler.run();
                    }
                }
            }));
        };
        SceneMgr.prototype.revertMapFromCfg = function () {
            this.revertPrefabToPool();
            var data;
            for (var key in this._levelCfg) {
                data = this._levelCfg[key];
                this.instancePrefab(data);
            }
        };
        SceneMgr.prototype.revertPrefabToPool = function () {
            for (var i = this._mapNode.numChildren - 1; i >= 0; i--) {
                var node = this._mapNode.getChildAt(i).removeSelf();
                node.active = false;
                Laya.Pool.recover(node.name, node);
            }
        };
        SceneMgr.prototype.instancePrefab = function (data) {
            var pos = new Vector3$6();
            pos.fromArray(data.position);
            var rot = new Quaternion$1();
            rot.fromArray(data.rotation);
            var scaleValue = new Vector3$6();
            scaleValue.fromArray(data.scale);
            var nodeName = data.name;
            var nodePos = nodeName.indexOf('_stage');
            if (nodePos > 0) {
                nodeName = nodeName.substr(0, nodePos);
            }
            var obj = Laya.Pool.getItem(nodeName);
            if (!obj) {
                var prefab = this._prefabDic[nodeName];
                if (prefab) {
                    obj = Sprite3D$1.instantiate(prefab, this._mapNode, false, pos, rot);
                }
                else {
                    obj = this._mapNode.addChild(new Sprite3D$1(nodeName));
                    obj.transform.position = pos;
                    obj.transform.rotation = rot;
                    obj.transform.setWorldLossyScale(scaleValue);
                }
            }
            else {
                this._mapNode.addChild(obj);
                obj.transform.position = pos;
                obj.transform.rotation = rot;
                obj.transform.setWorldLossyScale(scaleValue);
                obj.active = true;
            }
            obj.name = data.name;
        };
        SceneMgr.prototype.createEffect = function (effectName, parent) {
            var effect = Sprite3D$1.instantiate(this.effects.getChildByName(effectName), parent, false);
            return effect;
        };
        SceneMgr.prototype.showSceneEffect = function (pos, name, rot, parent, autoRecover) {
            var _this = this;
            if (rot === void 0) { rot = null; }
            if (parent === void 0) { parent = null; }
            if (autoRecover === void 0) { autoRecover = true; }
            var effect = Laya.Pool.getItem(name);
            if (parent == null)
                parent = this._propParent;
            if (effect == null) {
                effect = this.createEffect(name, parent);
            }
            parent.addChild(effect);
            effect.transform.position = pos;
            if (rot) {
                effect.transform.rotationEuler = rot;
            }
            effect.active = true;
            if (autoRecover) {
                Laya.timer.once(1000, this, function () {
                    _this.recoverEffect(effect);
                });
            }
            return effect;
        };
        SceneMgr.prototype.recoverEffect = function (effect) {
            effect.active = false;
            effect.removeSelf();
            Laya.Pool.recover(effect.name, effect);
        };
        SceneMgr.prototype.getProp = function (entityType) {
            var name = EntityType[entityType];
            var prop = Laya.Pool.getItem(name);
            if (prop == null) {
                var obj = void 0;
                if (entityType == EntityType.Obstacle) {
                    obj = Sprite3D$1.instantiate(this.obstacle, this._propParent, false);
                    prop = obj.addComponent(Obstacle);
                }
                obj.name = name;
            }
            this._propParent.addChild(prop.owner);
            prop.owner.active = true;
            return prop;
        };
        SceneMgr.prototype.recoverProp = function (prop) {
            prop.owner.removeSelf();
            prop.owner.active = false;
            Laya.Pool.recover(prop.gameObject.name, prop);
        };
        SceneMgr.instance = new SceneMgr();
        return SceneMgr;
    }());

    var DebugView = (function (_super) {
        __extends(DebugView, _super);
        function DebugView() {
            return _super.call(this) || this;
        }
        DebugView.prototype.onAwake = function () {
            this.regClick(this.btnClear, this.onClear);
            this.regClick(this.btnClose, this.onClose);
            this.regClick(this.btn_makeSure, this.onMakeSure);
            this.refreshView();
        };
        DebugView.prototype.refreshView = function () {
            var datas = [];
            this.list.array = datas;
            this.list.height = 51 * datas.length;
            this.list.renderHandler = new Laya.Handler(this, this.renderItem);
            this.btnBox.y = this.list.y + this.list.height + 20;
        };
        DebugView.prototype.renderItem = function (item) {
            var slide = item.getChildByName("slide");
            var lblName = item.getChildByName("name");
            var lblVal = item.getChildByName("val");
            slide.value = parseFloat(lblVal.text);
            slide.on(Laya.Event.CHANGED, this, this.onSlideChange, [lblName, lblVal, slide]);
        };
        DebugView.prototype.onSlideChange = function (lblName, lblVal, slide) {
            var val = slide.value;
            lblVal.text = val + "";
        };
        DebugView.prototype.onClear = function () {
            UserData.instance.clearData();
        };
        DebugView.prototype.onClose = function () {
            UIMgr.closeUI(EUI.DebugView);
        };
        DebugView.prototype.onMakeSure = function () {
            var level = parseInt(this.imput_Num.text);
            if (!isNaN(level)) {
                SceneMgr.instance.loadSceneData(level);
            }
            var gold = parseInt(this.input_money.text);
            if (!isNaN(gold)) {
                UserData.instance.gold += gold;
            }
        };
        return DebugView;
    }(ui.view.DebugViewUI));

    var FailView = (function (_super) {
        __extends(FailView, _super);
        function FailView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FailView.prototype.onEnable = function () {
            _super.prototype.onEnable.call(this);
            var self = this, imgRestart = self.imgRestart;
            var prob = 0;
            self.lblProb.text = '完成' + prob + '%';
            self.regClick(imgRestart, self.onRestart);
            self.sideGrid.setAldEvent('重新开始页-卖量');
        };
        FailView.prototype.onRestart = function () {
            if (SideNewMgr.ins.hasSide()) {
                UIMgr.closeUI(EUI.FailView);
                UIMgr.openUI(EUI.SideMoreGameView, function () {
                    UIMgr.openUI(EUI.MorePeopleView, function () {
                        AldSDK.aldSendEvent('重新开始页' + (UserData.instance.isNewPlayer ? '新' : '老') + '用户-重新开始');
                        GameMgr.instance.restart();
                    });
                });
            }
            else {
                UIMgr.closeUI(EUI.FailView);
                AldSDK.aldSendEvent('重新开始页' + (UserData.instance.isNewPlayer ? '新' : '老') + '用户-重新开始');
                GameMgr.instance.restart();
            }
        };
        return FailView;
    }(ui.view.FailViewUI));

    var SideGrid = (function (_super) {
        __extends(SideGrid, _super);
        function SideGrid() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SideGrid.prototype.initView = function (caches) {
            var self = this, ltCont = self.ltCont;
            self.$datas = caches.concat();
            self.refresh();
            ltCont.selectEnable = true;
            ltCont.selectHandler = new Laya.Handler(self, self.onSelect);
            Laya.timer.loop(10000, self, self.refresh);
        };
        SideGrid.prototype.onClear = function () {
            var self = this;
            _super.prototype.onClear.call(this);
            self.$datas = null;
            self.ltCont.selectHandler.recover();
            Laya.timer.clear(self, self.refresh);
        };
        SideGrid.prototype.onCancel = function () {
            SideNewMgr.ins.showMore();
        };
        SideGrid.prototype.onRemoved = function (data) {
            var self = this;
            if (SideNewMgr.ins.hasSide()) {
                var array = self.ltCont.array;
                for (var i = 0, len = array.length; i < len; i++) {
                    if (array[i] == data) {
                        self.changeItem(i, data);
                    }
                }
                var datas = self.$datas;
                var index = datas.indexOf(data);
                index > -1 && datas.splice(index, 1);
            }
            else {
                self.onClose();
            }
        };
        SideGrid.prototype.changeItem = function (index, data) {
            var rand = SideUtils.randomInArray(SideNewMgr.ins.getBoxDatas(), data);
            this.ltCont.setItem(index, rand);
        };
        SideGrid.prototype.onSelect = function (index) {
            var self = this;
            var ltCont = self.ltCont;
            var data = ltCont.selectedItem;
            if (data) {
                ltCont.selectedIndex = -1;
                self.changeItem(index, data);
                _super.prototype.onClick.call(this, data);
            }
        };
        SideGrid.prototype.refresh = function () {
            var self = this, caches = SideNewMgr.ins.getBoxDatas(), chLen = caches.length;
            if (chLen == 0) {
                self.onClose();
            }
            else {
                var len = 6, datas = self.$datas, ltCont = self.ltCont, oldData = ltCont.array;
                if (datas.length < len) {
                    var disL = len - chLen;
                    self.$datas = datas = caches.concat();
                    while (disL-- > 0)
                        datas.push(caches[disL % chLen]);
                }
                SideUtils.randomSort(datas);
                self.ltCont.array = datas.splice(0, len);
                oldData && datas.push.apply(datas, oldData);
            }
        };
        return SideGrid;
    }(ui.view.side.SideGridUI));

    var HomeSellView = (function (_super) {
        __extends(HomeSellView, _super);
        function HomeSellView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HomeSellView.prototype.onAwake = function () {
            this.regEvent(EventType.CloseUI, this.onCloseMoreGameView);
            this.regEvent(EventType.AddDesktopSuccess, this.refreshAddDesktop);
            this.regClick(this.btnMoreGame, this.onMoreGame);
            this.btnMoreGame.visible = GameConst.SideSwitch;
            this.regClick(this.addDesktop, this.onAddDesktop);
            this.regClick(this.nativeIcon, this.onNativeIcon);
            this.refresh();
            this.timer.loop(30000, this, this.refreshNative);
            this.refreshNative();
        };
        HomeSellView.prototype.refresh = function () {
            var startView = UIMgr.findUI(EUI.HomeView);
            var needShowNative = this.needShowNative();
            if (startView) {
                this.nativeBg.visible = needShowNative;
                this.addDesktop.visible = true;
            }
            else {
                this.nativeBg.visible = false;
                this.addDesktop.visible = false;
            }
            this.refreshAddDesktop();
        };
        HomeSellView.prototype.onMoreGame = function () {
            UIMgr.openUI(EUI.SideBoxView, null, true);
            this.btnMoreGame.visible = false;
            this.sell.visible = false;
        };
        HomeSellView.prototype.onCloseMoreGameView = function (uiCfg) {
            if (uiCfg == EUI.SideBoxView)
                this.btnMoreGame.visible = true;
            this.sell.visible = true;
        };
        HomeSellView.prototype.onAddDesktop = function () {
            var self = this;
            YLSDK.shortcuttime = Date.now();
            platform.installShortcut(function (isAdded) {
                Laya.timer.once(500, self, self.refreshAddDesktop);
            });
        };
        HomeSellView.prototype.refreshAddDesktop = function () {
            var _this = this;
            var self = this;
            platform.hasShortcut(function (isAdded) {
                self.addDesktopIcon.visible = !isAdded;
                if (self.addDesktopIcon.visible) {
                    _this.addIconAni.play(0, true);
                }
                else {
                    _this.addIconAni.stop();
                    _this.handImg.visible = false;
                }
            });
        };
        HomeSellView.prototype.onNativeIcon = function () {
            YLSDK.clickNativeAd(0);
        };
        HomeSellView.prototype.needShowNative = function () {
            if (!YLSDK.getInsertScreenData().switch || !YLSDK.isNativeAdShow)
                return false;
            var arr = [
                EUI.SideBoxView,
                EUI.SettingView,
                EUI.GameView,
                EUI.TrySkinView,
            ];
            for (var i = 0; i < arr.length; i++) {
                if (UIMgr.findUI(arr[i]) != null) {
                    return false;
                }
            }
            return true;
        };
        HomeSellView.prototype.refreshNative = function () {
            var _this = this;
            if (this.needShowNative() == false)
                return;
            this.nativeBg.visible = false;
            YLSDK.createNative(0, function (data) {
                _this.nativeIcon.skin = data.iconUrlList[0];
                _this.nativeBg.visible = true;
            });
        };
        return HomeSellView;
    }(ui.view.HomeSellViewUI));

    var TweenModel = (function () {
        function TweenModel() {
        }
        TweenModel.swingTween = function (sprite, wait, time) {
            if (wait === void 0) { wait = 2000; }
            if (time === void 0) { time = 100; }
            Tween.get(sprite, { loop: true }).wait(wait).to({
                rotation: 14
            }, time).to({
                rotation: -14
            }, time * 1.6).to({
                rotation: 7
            }, time * 1.2).to({
                rotation: -7
            }, time * .8).to({
                rotation: 0
            }, time * .6);
        };
        TweenModel.breatheTween = function (sprite, wait, time) {
            if (wait === void 0) { wait = 2000; }
            if (time === void 0) { time = 200; }
            var size = Math.max(sprite.width, sprite.height);
            var base = sprite.scaleX;
            var next0 = base + 20 / size;
            return Tween.get(sprite, { loop: true }).to({
                scaleX: next0,
                scaleY: next0
            }, time).to({
                scaleX: base,
                scaleY: base
            }, time).repeat(1, 2).wait(wait);
        };
        TweenModel.dazzleTween = function (view, dazW, wait) {
            if (dazW === void 0) { dazW = 30; }
            if (wait === void 0) { wait = 2000; }
            var sprite = new Laya.Sprite, dist = -10;
            var width = view.width, height = view.height;
            sprite.alpha = .3;
            sprite.graphics.drawPoly(0, 0, [dist, dist, dazW + dist, dist, height - dist,
                height - dist, height - dazW - dist, height - dist], '#ffffff');
            sprite.x = -width;
            view.addChild(sprite);
            if (!view.mask) {
                var mask = view.mask = new Laya.Sprite;
                mask.graphics.drawRect(0, 0, width, height, '#0');
            }
            Tween.get(sprite, { loop: true }).wait(wait).to({ x: width }, width * 4);
            return sprite;
        };
        return TweenModel;
    }());

    var SideIconRT = (function (_super) {
        __extends(SideIconRT, _super);
        function SideIconRT() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SideIconRT.prototype.onEnable = function () {
            _super.prototype.onEnable.call(this);
            var self = this;
            self.$isRT = self.x == 0 && self.y == 0;
            self.callLater(self.updatePoint);
        };
        SideIconRT.prototype.updatePoint = function () {
            var self = this;
            if (self.$isRT) {
                var parent_1 = self.parent;
                if (parent_1) {
                    self.anchorX = self.anchorY = 0.5;
                    var temp = Laya.Point.TEMP;
                    var platform_1 = SideMgr.platform;
                    var info = platform_1.getSystemInfoSync();
                    var point = platform_1.getMenuButtonBoundingClientRect();
                    temp.x = 666;
                    if (point) {
                        var scale = Laya.stage.height / info.screenHeight;
                        temp.y = point.bottom * scale + self.height / 2 + 6;
                    }
                    else {
                        temp.y = 92 + (info.windowHeight / info.windowWidth > 2.1 ? 82 : 0);
                    }
                    parent_1.globalToLocal(temp);
                    self.pos(temp.x, temp.y);
                }
            }
        };
        SideIconRT.prototype.initView = function (datas) {
            var self = this;
            if (self.$isRT) {
                TweenModel.swingTween(self, 500);
            }
            else {
                TweenModel.breatheTween(self);
            }
            self.bind(self.imgIcon, SideUtils.randomInArray(datas));
            self.restart();
        };
        SideIconRT.prototype.onClear = function () {
            _super.prototype.onClear.call(this);
            var self = this;
            Tween.clear(self);
            Laya.timer.clear(self, self.refresh);
        };
        SideIconRT.prototype.onClick = function (data) {
            var self = this;
            _super.prototype.onClick.call(this, data);
            self.restart();
            self.refresh();
        };
        SideIconRT.prototype.onCancel = function () {
            SideMgr.showMore();
        };
        SideIconRT.prototype.onRemoved = function (data) {
            var self = this;
            var curd = self.imgIcon.dataSource;
            if (curd == data)
                self.refresh();
        };
        SideIconRT.prototype.restart = function () {
            var self = this;
            Laya.timer.once(4000, self, self.refresh);
        };
        SideIconRT.prototype.refresh = function () {
            var self = this;
            var datas = SideMgr.getSides();
            if (datas.length == 0) {
                self.onClose();
            }
            else {
                var old = self.imgIcon.dataSource;
                self.bind(self.imgIcon, SideUtils.randomInArray(datas, old));
            }
        };
        return SideIconRT;
    }(ui.view.side.SideIconRTUI));

    var HomeView = (function (_super) {
        __extends(HomeView, _super);
        function HomeView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HomeView.prototype.onAwake = function () {
            _super.prototype.onAwake.call(this);
            UIMgr.closeUI(EUI.LoadingView);
            this.regClick(this.btnStart, this.onStart);
        };
        HomeView.prototype.onStart = function () {
            if (SideNewMgr.ins.hasSide()) {
                UIMgr.openUI(EUI.SideBoxView, function () {
                    if (window.ydhw_wx && window.ydhw_wx.SwitchTouch) {
                        UIMgr.openUI(EUI.GoldenEggView, function () {
                            UIMgr.openUI(EUI.FailView);
                        });
                    }
                    else {
                        UIMgr.openUI(EUI.FailView);
                    }
                });
            }
            else {
                UIMgr.openUI(EUI.FailView);
            }
        };
        return HomeView;
    }(ui.view.HomeViewUI));

    var AutoScroll = (function (_super) {
        __extends(AutoScroll, _super);
        function AutoScroll() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AutoScroll.prototype.onEnable = function () {
            var self = this, owner = self.owner;
            if (owner instanceof Laya.List) {
                var scroll_1 = self.scrollBar = owner.scrollBar;
                if (scroll_1) {
                    var min = scroll_1.min, max = scroll_1.max;
                    if (max > min) {
                        var event_1 = Laya.Event;
                        self.$distance = 1;
                        self.start();
                        owner.on(event_1.MOUSE_DOWN, self, self.stop);
                        owner.on(event_1.MOUSE_OUT, self, self.toStart);
                        owner.on(event_1.MOUSE_OVER, self, self.toStart);
                    }
                }
            }
        };
        AutoScroll.prototype.onDisable = function () {
            var self = this;
            self.owner.offAllCaller(self);
            Laya.timer.clearAll(self);
        };
        AutoScroll.prototype.onTimer = function () {
            var self = this;
            var scrollBar = self.scrollBar, dist = self.$distance, oDist = dist, value = scrollBar.value + dist * self.speed, max = scrollBar.max, min = scrollBar.min;
            if (value >= max) {
                dist = -1;
                value = max;
            }
            else if (value <= min) {
                dist = 1;
                value = min;
            }
            scrollBar.value = value;
            if (dist !== oDist) {
                self.$distance = dist;
                self.stop();
                Laya.timer.once(self.wait, self, self.start);
            }
        };
        AutoScroll.prototype.toStart = function () {
            var self = this;
            Laya.timer.once(3000, self, self.start);
        };
        Object.defineProperty(AutoScroll.prototype, "speed", {
            get: function () {
                return this.$speed || 1.5;
            },
            set: function (value) {
                this.$speed = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoScroll.prototype, "wait", {
            get: function () {
                return this.$wait || 200;
            },
            set: function (value) {
                this.$wait = value;
            },
            enumerable: true,
            configurable: true
        });
        AutoScroll.prototype.stop = function () {
            Laya.timer.clearAll(this);
        };
        AutoScroll.prototype.start = function () {
            var self = this;
            self.$distance && Laya.timer.frameLoop(1, self, self.onTimer);
        };
        return AutoScroll;
    }(Laya.Script));

    var FirstFlag = true;
    var SideLeftList = (function (_super) {
        __extends(SideLeftList, _super);
        function SideLeftList() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.platType = 4001;
            return _this;
        }
        SideLeftList.prototype.onEnable = function () {
            _super.prototype.onEnable.call(this);
            console.log('SideLeftList onEnable ');
        };
        SideLeftList.prototype.onDisable = function () {
            this.$scroll = null;
        };
        SideLeftList.prototype.initView = function (datas) {
            var self = this, addc = UIUtils.addClick2, list = self.list, scrollBar = list.scrollBar;
            list.dataSource = Utils.randomSort(datas);
            self.imgBg.visible = false;
            self.zOrder = 10000;
            this.mouseThrough = true;
            addc(self.imgSlide, self.onSlide, self);
            addc(self, self.onSelf, self);
            list.selectEnable = true;
            list.selectHandler = Laya.Handler.create(self, self.onSelect, void 0, false);
            (self.$scroll = list.addComponent(AutoScroll)).stop();
            if (FirstFlag) {
                self.onSlide();
                FirstFlag = false;
            }
        };
        SideLeftList.prototype.onSelect = function (index) {
            var ltCont = this.list;
            var data = ltCont.selectedItem;
            if (data) {
                var rand = Utils.randomInArray(SideNewMgr.ins.getBoxDatas(), data);
                _super.prototype.onClick.call(this, ltCont.selectedItem);
                ltCont.selectedIndex = -1;
                ltCont.setItem(index, rand);
            }
        };
        SideLeftList.prototype.onSlide = function (isShowAd) {
            if (isShowAd === void 0) { isShowAd = true; }
            console.log('onSlide  1111111111111111111111111111111');
            var self = this;
            var imgBg = self.imgBg;
            var isShow = self.$isShow, next = !isShow, time = 160;
            Laya.timer.clear(self, self.showInsert);
            self.mouseEnabled = self.mouseThrough = false;
            imgBg.visible = true;
            Tween.get(imgBg).to({ x: next ? -2 : -752 }, time);
            Tween.get(self.boxMain).to({ x: next ? 0 : -615 }, time).call(function () {
                var scroll = self.$scroll;
                self.mouseEnabled = true;
                imgBg.visible = self.$isShow = next;
                self.mouseThrough = isShow;
                self.changeState();
                next ? scroll.start() : scroll.stop();
            });
        };
        SideLeftList.prototype.onSelf = function (e) {
            var self = this;
            if (self.$isShow) {
                var target = e.target;
                if (target == self || target == self.boxMain)
                    self.onSlide(false);
            }
        };
        SideLeftList.prototype.changeState = function () {
            var self = this;
        };
        SideLeftList.prototype.showInsert = function () {
        };
        SideLeftList.prototype.onCancel = function (data) {
            UIMgr.openUI(EUI.MorePeopleView);
        };
        return SideLeftList;
    }(ui.view.side.SideLeftListUI));

    var BigBoxItem0 = (function (_super) {
        __extends(BigBoxItem0, _super);
        function BigBoxItem0() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(BigBoxItem0.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                var self = this;
                self._dataSource = data;
                if (data) {
                    self.imgIcon.skin = data.icon;
                    self.labelname.text = data.title;
                }
            },
            enumerable: true,
            configurable: true
        });
        return BigBoxItem0;
    }(ui.view.item.BigBoxItem0UI));

    var BigBoxItem1 = (function (_super) {
        __extends(BigBoxItem1, _super);
        function BigBoxItem1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BigBoxItem1.prototype.onAwake = function () {
            var self = this;
        };
        Object.defineProperty(BigBoxItem1.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                var self = this;
                self._dataSource = data;
                self.refresh();
            },
            enumerable: true,
            configurable: true
        });
        BigBoxItem1.prototype.refresh = function () {
            var self = this;
            var data = self.dataSource;
            if (data) {
                self.imgIcon.skin = data.icon;
                self.lblName.text = data.title;
            }
        };
        return BigBoxItem1;
    }(ui.view.item.BigBoxItem1UI));

    var MoreGameItem1 = (function (_super) {
        __extends(MoreGameItem1, _super);
        function MoreGameItem1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(MoreGameItem1.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                var self = this;
                self._dataSource = data;
                self.refresh();
            },
            enumerable: true,
            configurable: true
        });
        MoreGameItem1.prototype.refresh = function () {
            var self = this;
            var data = self.dataSource;
            if (data) {
                self.imgIcon.skin = data.icon;
                self.lblName.text = data.title;
            }
        };
        return MoreGameItem1;
    }(ui.view.item.MoreGameItem1UI));

    var OverGameItem = (function (_super) {
        __extends(OverGameItem, _super);
        function OverGameItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(OverGameItem.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                var self = this;
                self._dataSource = data;
                self.refresh();
            },
            enumerable: true,
            configurable: true
        });
        OverGameItem.prototype.refresh = function () {
            var self = this;
            var data = self.dataSource;
            if (data) {
                self.imgIcon.skin = data.icon;
            }
        };
        return OverGameItem;
    }(ui.view.item.OverGameItemUI));

    var SideBotItem = (function (_super) {
        __extends(SideBotItem, _super);
        function SideBotItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SideBotItem.prototype.onEnable = function () {
            TweenModel.swingTween(this.imgNew);
        };
        SideBotItem.prototype.onDisable = function () {
            Tween.clear(this.imgNew);
        };
        Object.defineProperty(SideBotItem.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                var self = this;
                self._dataSource = data;
                self.refresh();
            },
            enumerable: true,
            configurable: true
        });
        SideBotItem.prototype.refresh = function () {
            var self = this;
            var data = self.dataSource;
            if (data) {
                var bool = self.imgNew.visible = Math.random() < 0.5, ani1 = self.ani1;
                self.imgIcon.skin = data.icon;
                if (bool) {
                    ani1.gotoAndStop(0);
                }
                else {
                    ani1.play(0, true);
                }
            }
        };
        return SideBotItem;
    }(ui.view.item.SideBotItemUI));

    var SideBoxItem = (function (_super) {
        __extends(SideBoxItem, _super);
        function SideBoxItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SideBoxItem.prototype.onAwake = function () {
            this.on(Laya.Event.CLICK, this, this.JumpOtherGame);
        };
        Object.defineProperty(SideBoxItem.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (val) {
                this._dataSource = val;
                this.refresh();
            },
            enumerable: true,
            configurable: true
        });
        SideBoxItem.prototype.refresh = function () {
            if (this.icon && this._dataSource) {
                this.icon.skin = this._dataSource.icon;
            }
        };
        SideBoxItem.prototype.JumpOtherGame = function () {
        };
        return SideBoxItem;
    }(ui.view.item.SideBoxItemUI));

    var SideBoxItem0 = (function (_super) {
        __extends(SideBoxItem0, _super);
        function SideBoxItem0() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SideBoxItem0.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                var self = this;
                self._dataSource = data;
                if (data) {
                    self.imgIcon.skin = data.icon;
                    self.labelname.text = data.title;
                }
            },
            enumerable: true,
            configurable: true
        });
        return SideBoxItem0;
    }(ui.view.item.SideBoxItem0UI));

    var SideBoxItem1 = (function (_super) {
        __extends(SideBoxItem1, _super);
        function SideBoxItem1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SideBoxItem1.prototype.onAwake = function () {
            var self = this;
        };
        Object.defineProperty(SideBoxItem1.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                var self = this;
                self._dataSource = data;
                self.refresh();
            },
            enumerable: true,
            configurable: true
        });
        SideBoxItem1.prototype.refresh = function () {
            var self = this;
            var data = self.dataSource;
            if (data) {
                self.imgIcon.skin = data.icon;
                self.lblName.text = data.title;
            }
        };
        return SideBoxItem1;
    }(ui.view.item.SideBoxItem1UI));

    var SideGridItem = (function (_super) {
        __extends(SideGridItem, _super);
        function SideGridItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SideGridItem.prototype.onEnable = function () {
            var self = this, imgIcon = self.imgIcon;
            var mask = imgIcon.mask = new Laya.Sprite;
            SideUtils.drawRoundRect(mask.graphics, imgIcon.width, imgIcon.height, 25);
            TweenModel.swingTween(self.imgNew);
        };
        SideGridItem.prototype.onDisable = function () {
            Tween.clear(this.imgNew);
        };
        Object.defineProperty(SideGridItem.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                var self = this;
                self._dataSource = data;
                self.refresh();
            },
            enumerable: true,
            configurable: true
        });
        SideGridItem.prototype.refresh = function () {
            var self = this;
            var data = self.dataSource;
            if (data) {
                var bool = self.imgNew.visible = Math.random() < 0.5, ani1 = self.ani1;
                self.imgIcon.skin = data.icon;
                self.lblName.text = data.title;
                if (bool) {
                    ani1.gotoAndStop(0);
                }
                else {
                    ani1.play(0, true);
                }
            }
        };
        return SideGridItem;
    }(ui.view.item.SideGridItemUI));

    var SideListItem = (function (_super) {
        __extends(SideListItem, _super);
        function SideListItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SideListItem.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                var self = this;
                self._dataSource = data;
                self.refresh();
            },
            enumerable: true,
            configurable: true
        });
        SideListItem.prototype.refresh = function () {
            var self = this;
            var data = self.dataSource;
            if (data) {
                self.imgIcon.skin = data.icon;
                self.lblName.text = data.title;
            }
        };
        return SideListItem;
    }(ui.view.item.SideListItemUI));

    var SideListItem4 = (function (_super) {
        __extends(SideListItem4, _super);
        function SideListItem4() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(SideListItem4.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                var self = this;
                self._dataSource = data;
                self.refresh();
            },
            enumerable: true,
            configurable: true
        });
        SideListItem4.prototype.refresh = function () {
            var self = this;
            var data = self.dataSource;
            if (data) {
                var rand = Math.floor(Math.random() * 2);
                self.imgRed.visible = rand == 0;
                self.imgIcon.skin = data.icon;
                self.lblName.text = data.title;
            }
        };
        return SideListItem4;
    }(ui.view.item.SideListItem4UI));

    var ScaleAni = (function (_super) {
        __extends(ScaleAni, _super);
        function ScaleAni() {
            var _this = _super.call(this) || this;
            _this._isStop = true;
            return _this;
        }
        ScaleAni.prototype.onAwake = function () {
            this._target = this.owner;
        };
        ScaleAni.prototype.onEnable = function () {
            this.start();
        };
        ScaleAni.prototype.onDisable = function () {
            this.destroy();
        };
        ScaleAni.prototype.onChange = function (istop) {
            if (istop) {
                this.destroy();
            }
            else {
                if (this._isStop) {
                    this.start();
                }
            }
        };
        ScaleAni.prototype.start = function () {
            if (this._target) {
                this._isStop = false;
                this.tweenSmall();
            }
        };
        ScaleAni.prototype.tweenBig = function () {
        };
        ScaleAni.prototype.tweenSmall = function () {
            var _this = this;
            Tween.get(this._target).to({ scaleX: 1.2, scaleY: 1.2 }, 300).wait(1200).to({ scaleX: 1.0, scaleY: 1.0 }, 300).call(function () {
                _this.tweenSmall();
            }, this);
        };
        ScaleAni.prototype.destroy = function () {
            this._isStop = true;
            if (this._target) {
                Tween.clear(this._target);
            }
        };
        return ScaleAni;
    }(Laya.Script));

    var SideNewItem = (function (_super) {
        __extends(SideNewItem, _super);
        function SideNewItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SideNewItem.prototype.onEnable = function () {
            var self = this;
            var imgIcon = self.imgIcon;
            var mask = imgIcon.mask = new Laya.Sprite;
            SideUtils.drawRoundRect(mask.graphics, imgIcon.width, imgIcon.height, 25);
            TweenModel.swingTween(self.imgNew);
        };
        SideNewItem.prototype.onDisable = function () {
            Tween.clear(this.imgNew);
        };
        Object.defineProperty(SideNewItem.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                var self = this;
                self._dataSource = data;
                self.refresh();
            },
            enumerable: true,
            configurable: true
        });
        SideNewItem.prototype.refresh = function () {
            var self = this;
            var data = self.dataSource;
            if (data) {
                var bool = self.imgNew.visible = Math.random() < 0.5, ani1 = self.ani1;
                self.imgIcon.skin = data.icon;
                self.lblName.text = data.title;
                if (bool) {
                    ani1.gotoAndStop(0);
                }
                else {
                    ani1.play(0, true);
                }
            }
        };
        return SideNewItem;
    }(ui.view.item.SideNewItemUI));

    var WXModelItem = (function (_super) {
        __extends(WXModelItem, _super);
        function WXModelItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(WXModelItem.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            set: function (data) {
                var self = this;
                self._dataSource = data;
                self.refresh();
            },
            enumerable: true,
            configurable: true
        });
        WXModelItem.prototype.refresh = function () {
            var self = this;
            var data = self.dataSource;
            if (data) {
                self.imgIcon.skin = data.icon;
                self.lblName.text = data.title;
                self.imgStar.visible = data.star;
            }
        };
        return WXModelItem;
    }(ui.view.item.WXModelItemUI));

    var Handler$1 = Laya.Handler;
    var Loader = Laya.Loader;
    var ResMgr = (function () {
        function ResMgr() {
        }
        ResMgr.preLoadCfg = function () {
            for (var key in EJson) {
                var data = { url: EJson[key], type: Loader.JSON };
                ResMgr.PreloadCfg.push(data);
            }
            Laya.loader.create(ResMgr.PreloadCfg, Handler$1.create(ResMgr, ResMgr.onComplete0), Handler$1.create(ResMgr, ResMgr.onProgress0));
        };
        ResMgr.onProgress0 = function (value) {
            EventMgr.event(EventType.ResProgress, value * ResMgr._preWeight);
        };
        ResMgr.onProgress1 = function (value) {
            var preWeight = ResMgr._preWeight;
            EventMgr.event(EventType.ResProgress, value * (1 - preWeight) + preWeight);
        };
        ResMgr.onComplete0 = function () {
            var reload = ResMgr.PreloadRes;
            for (var key in ESprite3D) {
                var data = { url: ESprite3D[key], type: Laya.Loader.HIERARCHY };
                reload.push(data);
            }
            CfgDataMgr.instance.initConfigs();
            Laya.loader.create(reload, Handler$1.create(ResMgr, ResMgr.onComplete1), Handler$1.create(ResMgr, ResMgr.onProgress1));
            EventMgr.once(EventType.LoadingSuc, ResMgr, ResMgr.launchGame);
        };
        ResMgr.onComplete1 = function () {
            var loader = Laya.loader;
            ResMgr.launchGame();
        };
        ResMgr.launchGame = function () {
            if (++ResMgr._sucCount == 2) {
                SceneMgr.instance.init();
                GameMgr.instance.launchGame();
            }
        };
        ResMgr.PreloadCfg = [];
        ResMgr.PreloadRes = [
            { url: EAtlas.Game, type: Laya.Loader.ATLAS }
        ];
        ResMgr._sucCount = 0;
        ResMgr._preWeight = 0.4;
        return ResMgr;
    }());

    var LoadUtils = (function () {
        function LoadUtils(keys, ratios) {
            this.keys = keys;
            this.ratios = ratios;
            this.values = Utils.memset(keys.length, 0);
        }
        LoadUtils.prototype.setValue = function (key, value) {
            var self = this;
            var index = self.keys.indexOf(key);
            if (index > -1) {
                self.values[index] = value;
            }
        };
        LoadUtils.prototype.getValue = function (key) {
            var self = this;
            return self.values[self.keys.indexOf(key)];
        };
        Object.defineProperty(LoadUtils.prototype, "value", {
            get: function () {
                var self = this, sum = 0, values = self.values, ratios = self.ratios;
                for (var i in values) {
                    sum += values[i] * ratios[i];
                }
                return Math.floor(sum * 100 + 0.5) / 100;
            },
            enumerable: true,
            configurable: true
        });
        LoadUtils.prototype.clear = function () {
            var self = this;
            self.keys = self.values = self.ratios = null;
        };
        LoadUtils.create = function (keys, ratios) {
            var len = keys.length;
            if (len > 0 && len == ratios.length) {
                var sum = 0;
                for (var i = 0; i < len; i++)
                    sum += ratios[i];
                if (sum !== 1) {
                    var sum1 = 0;
                    len -= 1;
                    for (var i = 0; i < len; i++) {
                        sum1 += ratios[i] /= sum;
                    }
                    ratios[len] = 1 - sum1;
                }
                return new LoadUtils(keys, ratios);
            }
        };
        return LoadUtils;
    }());

    var ResType;
    (function (ResType) {
        ResType[ResType["Nativescene"] = 0] = "Nativescene";
        ResType[ResType["PreloadRes"] = 1] = "PreloadRes";
        ResType[ResType["ZipPack"] = 2] = "ZipPack";
    })(ResType || (ResType = {}));
    var LoadingView = (function (_super) {
        __extends(LoadingView, _super);
        function LoadingView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LoadingView.prototype.onAwake = function () {
            var self = this;
            var loadingTime = AldSDK.loadingTime = Date.now();
            self.regEvent(EventType.ResProgress, self.onPreloadResProgress);
            self.regEvent(EventType.SubpkgProgress, self.onSubPackageProgress);
            Laya.loader.on(Laya.Event.ERROR, self, self.onLoadError);
            AldSDK.aldSendEvent('进入加载页', false, { time: loadingTime });
            EventMgr.event(EventType.EnterLoading);
            var keys = [ResType.Nativescene, ResType.PreloadRes];
            var ratios = [0.5, 0.5];
            self.util = LoadUtils.create(keys, ratios);
            platform.loadSubpackage('nativescene', function (prog) {
                self.setValue(0, prog / 100);
            }).then(function () {
                self.setValue(0, 1);
                ResMgr.preLoadCfg();
            });
        };
        LoadingView.prototype.onDisable = function () {
            var self = this;
            self.util.clear();
            self.util = null;
            Laya.loader.off(Laya.Event.ERROR, self, self.onLoadError);
        };
        LoadingView.prototype.onPreloadResProgress = function (value) {
            var self = this;
            self.setValue(ResType.PreloadRes, value);
        };
        LoadingView.prototype.onSubPackageProgress = function (data) {
            var self = this;
            self.setValue(data[0], data[1]);
        };
        LoadingView.prototype.setValue = function (key, value) {
            var self = this;
            self.util.setValue(key, value);
            self.updateBar();
        };
        LoadingView.prototype.updateBar = function () {
            var self = this, value = self.util.value;
            self.bar.value = value;
            self.txt.changeText("加载中，请稍等..." + (value * 100).toFixed(0) + "%");
            if (value >= 1) {
                EventMgr.event(EventType.LoadingSuc);
            }
        };
        LoadingView.prototype.onLoadError = function () {
            this.txt.color = "#FF0000";
            this.txt.text = "加载失败，请确保网络正常，退出游戏重试";
        };
        return LoadingView;
    }(ui.view.LoadingViewUI));

    var RankingView = (function (_super) {
        __extends(RankingView, _super);
        function RankingView() {
            return _super.call(this) || this;
        }
        RankingView.prototype.onAwake = function () {
            this.btnRanking.on(Laya.Event.CLICK, this, this.onShare);
            this.wxOpenDataSp.on(Laya.Event.MOUSE_DOWN, this, this.onTouchDown);
            this.wxOpenDataSp.on(Laya.Event.MOUSE_UP, this, this.onTouchUp);
            this.wxOpenDataSp.on(Laya.Event.MOUSE_MOVE, this, this.onTouchMove);
            platform.postMessage({
                key: "reqRankListData",
                message: { keyList: 'user_id,ladder,score,ladderName,ladderUrl', sortList: 'ladder,score' }
            });
        };
        RankingView.prototype.onClickBg = function () {
            UIMgr.closeUI(EUI.RankingView);
        };
        RankingView.prototype.onShare = function () {
        };
        RankingView.prototype.onTouchMove = function (e) {
            if (this._lastY == null)
                return;
            var y = Laya.stage.mouseY;
            var deltaY = this._lastY - y;
            this._lastY = y;
            platform.postMessage({
                key: "wxRankListMove",
                message: deltaY
            });
        };
        RankingView.prototype.onTouchUp = function () {
            this._lastY = null;
        };
        RankingView.prototype.onTouchDown = function () {
            this._lastY = Laya.stage.mouseY;
        };
        return RankingView;
    }(ui.view.RankingViewUI));

    var ResultView = (function (_super) {
        __extends(ResultView, _super);
        function ResultView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResultView.prototype.onAwake = function () {
        };
        return ResultView;
    }(ui.view.ResultViewUI));

    var sign$1 = '$LFlyGold';
    var FlyGold = (function (_super) {
        __extends(FlyGold, _super);
        function FlyGold(skin) {
            var _this = _super.call(this) || this;
            _this.mouseEnabled = _this.visible = false;
            _this.$skin = skin || 'game/img_gold.png';
            return _this;
        }
        FlyGold.prototype.onDestroy = function () {
            var clear = Tween.clear, recover = Laya.Pool.recover;
            for (var i = 0, len = this.numChildren; i < len; i++) {
                var gold = this.getChildAt(i);
                clear(gold);
                recover(sign$1, gold);
            }
        };
        FlyGold.prototype.create = function () {
            return new Laya.Image(this.$skin);
        };
        Object.defineProperty(FlyGold.prototype, "number", {
            set: function (v) {
                var self = this, curL = self.numChildren;
                if (curL != v) {
                    var create = Laya.Pool.getItemByCreateFun;
                    for (var i = v; i < curL; i++)
                        self.removeChildAt(v);
                    for (var i = curL; i < v; i++) {
                        var gold = create(sign$1, self.create.bind(self));
                        self.addChild(gold);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FlyGold.prototype, "minR", {
            get: function () {
                var r = this.$minR;
                return r < 0 ? 0 : r;
            },
            set: function (v) {
                if (v >= 0)
                    this.$minR = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FlyGold.prototype, "maxR", {
            get: function () {
                var r = this.$maxR;
                return r < 1 ? 1 : r;
            },
            set: function (v) {
                if (v >= 1)
                    this.$maxR = v;
            },
            enumerable: true,
            configurable: true
        });
        FlyGold.prototype.reset = function () {
            for (var i = 0, len = this.numChildren; i < len; i++) {
                var ci = this.getChildAt(i);
                ci.pos(0, 0);
                ci.visible = true;
            }
        };
        FlyGold.prototype.init = function (number, minR, maxR) {
            var self = this;
            self.number = number;
            self.minR = minR;
            self.maxR = maxR;
        };
        FlyGold.prototype.play = function (point, speed0, speed1) {
            if (speed0 === void 0) { speed0 = 1.5; }
            if (speed1 === void 0) { speed1 = 1; }
            var self = this;
            return new Promise(function (resolve) {
                var cs = self['_children'], len = 0;
                if (cs) {
                    len = cs.length;
                    if (len == 0) {
                        self.init(len = 22, 80, 220);
                        cs = self['_children'];
                    }
                }
                if (len == 0) {
                    resolve();
                    return;
                }
                var minR = self.minR, maxR = self.maxR, mgr = Laya.MouseManager;
                var range = function () {
                    return Math.random() * (maxR - minR) + minR;
                };
                var sin = Utils.sin, cos = Utils.cos;
                var count = 0, ex, ey, time = 0, end = function () {
                    if (++count == len) {
                        self.visible = false;
                        mgr.enabled = true;
                        resolve();
                    }
                }, hide = function () {
                };
                point = Laya.Point.TEMP.setTo(point.x, point.y);
                self.reset();
                self.visible = true;
                mgr.enabled = false;
                self.globalToLocal(point);
                ex = point.x;
                ey = point.y;
                for (var i = 0; i < len; i++) {
                    var img = cs[i];
                    var dist = range();
                    var angle = Math.random() * 360;
                    var timei = speed0 * dist;
                    var tween = Tween.get(img).to({
                        x: dist * cos(angle),
                        y: dist * sin(angle)
                    }, timei);
                    if (timei > time)
                        time = timei;
                    var dx = ex - img.x, dy = ey - img.y;
                    var dist1 = Math.sqrt(dx * dx + dy * dy);
                    tween.wait(timei * 1.5).to({
                        x: ex,
                        y: ey
                    }, dist1 * speed1).call(hide).set({ visible: false }).wait(100).call(end);
                }
            });
        };
        return FlyGold;
    }(Laya.Sprite));

    var SideBoxView = (function (_super) {
        __extends(SideBoxView, _super);
        function SideBoxView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._firstClick = 0;
            return _this;
        }
        SideBoxView.prototype.onAwake = function () {
            this.showWcbanner();
        };
        SideBoxView.prototype.showWcbanner = function () {
            var self = this;
            var isWc = GameConst.MisTouchSwitch;
            if (isWc) {
            }
        };
        SideBoxView.prototype.initView = function (datas) {
            var self = this, addClick = UIUtils.addClick, imgBack = self.imgBack;
            self.initList(0, datas);
            self.initList(1, datas);
            var point = platform.getMenuButtonBoundingClientRect();
            if (point) {
                self.boxTop.y = Utils.screenToStage(point.top);
            }
            addClick(imgBack, self.onClose, self);
            addClick(self.imgKeep, self.onKeep, self);
            self.setAldEvent('积分墙卖量');
            imgBack.visible = false;
            Laya.timer.once(2000, self, function () {
                imgBack.visible = true;
            });
        };
        SideBoxView.prototype.onClose = function () {
            (this.dataSource && typeof this.dataSource === "function") && (this.dataSource());
            UIMgr.closeUI(EUI.SideBoxView);
        };
        SideBoxView.prototype.onKeep = function () {
            var list = this.list0;
            {
                if (this._firstClick <= 0) {
                    list.selectedIndex = Math.random() * list.array.length | 0;
                    this._firstClick++;
                }
                else {
                    this.onClose();
                }
            }
        };
        SideBoxView.prototype.onRemoved = function (data) {
            var self = this;
            var check = function (type) {
                var list = self['list' + type];
                var array = list.array;
                for (var i = 0, len = array.length; i < len; i++) {
                    if (array[i] == data) {
                        self.changeItem(list, i, data);
                        array.splice(i, 1);
                        break;
                    }
                }
                list.array = array;
            };
            check(0);
            check(1);
        };
        SideBoxView.prototype.initList = function (type, datas) {
            var self = this;
            var list = self['list' + type];
            var scrollBar = list.scrollBar;
            console.log("big box", datas);
            list.array = datas.concat();
            list.selectEnable = true;
            list.selectHandler = Laya.Handler.create(self, self.onSelect, [list], false);
            list.addComponent(AutoScroll);
            list.getComponent(AutoScroll).speed = 0.5;
        };
        SideBoxView.prototype.onSelect = function (list, index) {
            var data = list.selectedItem;
            if (data) {
                list.selectedIndex = -1;
                _super.prototype.onClick.call(this, data);
            }
        };
        SideBoxView.prototype.changeItem = function (list, index, data) {
            list.setItem(index, data);
        };
        return SideBoxView;
    }(ui.view.side.SideBoxViewUI));

    var TimeLineUtils = (function () {
        function TimeLineUtils() {
        }
        TimeLineUtils.tweenScale = function (node, to, durationIn, keepTime, durationOut, endCallback) {
            if (endCallback === void 0) { endCallback = null; }
            var timeLine = new Laya.TimeLine();
            timeLine.addLabel("tl1", 0).to(node, { scaleX: to, scaleY: to, alpha: 1 }, durationIn, Laya.Ease.linearNone)
                .addLabel("tl2", 0).to(node, {}, keepTime)
                .addLabel("tl2", 0).to(node, { scaleX: 0, scaleY: 0, alpha: 0 }, durationOut, Laya.Ease.linearNone);
            timeLine.on(Laya.Event.COMPLETE, node, function () {
                if (endCallback) {
                    endCallback.run();
                }
            });
            timeLine.play(0, false);
            return timeLine;
        };
        TimeLineUtils.tweenScaleCircle = function (node, scale, time) {
            var timeLine = new Laya.TimeLine();
            var initScale = node.scaleX;
            timeLine.addLabel("tl1", 0).to(node, { scaleX: scale, scaleY: scale }, time, Laya.Ease.linearNone)
                .addLabel("tl2", 0).to(node, { scaleX: initScale, scaleY: initScale }, time, Laya.Ease.linearNone);
            return timeLine;
        };
        TimeLineUtils.tweenUpdown = function (node, offX, offY, time) {
            var timeLine = new Laya.TimeLine();
            var initX = node.x, initY = node.y;
            timeLine.addLabel("tl1", 0).to(node, { x: offX + initX, y: offY + initY }, time, Laya.Ease.linearNone)
                .addLabel("tl2", 0).to(node, { x: initX, y: initY }, time, Laya.Ease.linearNone);
            return timeLine;
        };
        return TimeLineUtils;
    }());

    var GoldenEggView = (function (_super) {
        __extends(GoldenEggView, _super);
        function GoldenEggView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.$addProb = 0.1;
            _this.$subProb = 0.01;
            _this.$curProb = 0;
            _this.$total = 9000;
            _this.isBanner = false;
            _this.time_ = 0;
            return _this;
        }
        GoldenEggView.prototype.onEnable = function () {
            var self = this, timer = self.timer, imgBtn = self.imgBtn;
            self.regClick(imgBtn, self.onClick);
            self.$startTime = Date.now();
            self.showBanner(false);
            self.isBanner = false;
            this.time_ = Math.random() * 1000 + 2000;
            timer.frameLoop(4, self, self.onSubProb);
            this._handAni = TimeLineUtils.tweenUpdown(this.imgHand, 20, 30, 300);
            this._handAni.play(0, true);
        };
        GoldenEggView.prototype.showBanner = function (visible) {
            if (visible) {
                window.ydhw_wx && ydhw.ShowBannerAd();
            }
            else {
                window.ydhw_wx && ydhw.HideBannerAd();
            }
        };
        GoldenEggView.prototype.onClose = function () {
            var diamond = Math.floor(Math.random() * 40 + 10);
            UserData.instance.gold += diamond;
            this.clear();
            UIMgr.closeUI(EUI.GoldenEggView);
            (this.dataSource && typeof this.dataSource === "function") && (this.dataSource());
            UIMgr.showTips("获得金币奖励" + diamond);
        };
        GoldenEggView.prototype.clear = function () {
            var self = this;
            var tween = self.$tween;
            if (tween) {
                tween.clear();
                self.$tween = null;
            }
            self.timer.clearAll(self);
            if (this._handAni) {
                this._handAni.destroy();
                this._handAni = null;
            }
        };
        GoldenEggView.prototype.setMask = function (value) {
            var graphics = this.spMask.graphics;
            graphics.clear();
            graphics.drawRect(0, 0, value * 417, 50, '#0');
        };
        GoldenEggView.prototype.onClick = function () {
            var self = this;
            this.ani1.play(0, false);
            self.onAddProb();
        };
        GoldenEggView.prototype.onSubProb = function () {
            var self = this;
            var value = self.$curProb = Math.max(0, self.$curProb - self.$subProb);
            var remain = self.$total - Date.now() + self.$startTime;
            self.setMask(value);
            if (remain > 0) {
                self.lblRem.text = (remain / 1000 | 0) + '秒';
                if (!self.isBanner && remain < this.time_) {
                    self.isBanner = true;
                    self.showBanner(true);
                }
            }
            else {
                self.onClose();
            }
        };
        GoldenEggView.prototype.onAddProb = function () {
            var self = this;
            var curProb = self.$curProb += self.$addProb;
            self.setMask(curProb);
            if (curProb >= 0.5) {
                var imgEgg = self.imgEgg;
                self.closeParam = true;
                self.clear();
                imgEgg.skin = imgEgg.skin.replace('0', '1');
                self.mouseEnabled = false;
                self.showBanner(true);
                self.timer.once(2000, self, self.onClose);
            }
        };
        return GoldenEggView;
    }(ui.view.side.GoldenEggViewUI));

    var MorePeopleView = (function (_super) {
        __extends(MorePeopleView, _super);
        function MorePeopleView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MorePeopleView.prototype.initView = function (caches) {
            var self = this, ltCont = self.list;
            self.$datas = caches.concat();
            self.refresh();
            ltCont.selectEnable = true;
            ltCont.selectHandler = new Laya.Handler(self, self.onSelect);
            Laya.timer.loop(10000, self, self.refresh);
            this.btn_close.visible = false;
            UIUtils.addClick(self.btn_close, self.onClose);
            Laya.timer.once(2000, this, function () {
                self.btn_close.visible = true;
            });
        };
        MorePeopleView.prototype.onSelect = function (index) {
            var self = this;
            var ltCont = self.list;
            var data = ltCont.selectedItem;
            if (data) {
                ltCont.selectedIndex = -1;
                self.changeItem(index, data);
                _super.prototype.onClick.call(this, data);
            }
        };
        MorePeopleView.prototype.changeItem = function (index, data) {
            var rand = SideUtils.randomInArray(SideNewMgr.ins.getBoxDatas(), data);
            this.list.setItem(index, rand);
        };
        MorePeopleView.prototype.refresh = function () {
            var self = this, caches = SideNewMgr.ins.getBoxDatas(), chLen = caches.length;
            if (chLen == 0) {
                self.onClose();
            }
            else {
                var len = 50, datas = self.$datas, ltCont = self.list, oldData = ltCont.array;
                if (datas.length < len) {
                    var disL = len - chLen;
                    self.$datas = datas = caches.concat();
                    while (disL-- > 0)
                        datas.push(caches[disL % chLen]);
                }
                SideUtils.randomSort(datas);
                self.list.array = datas.splice(0, len);
                oldData && datas.push.apply(datas, oldData);
            }
        };
        MorePeopleView.prototype.onRemoved = function (data) {
            var self = this;
            if (SideNewMgr.ins.hasSide()) {
                var array = self.list.array;
                for (var i = 0, len = array.length; i < len; i++) {
                    if (array[i] == data) {
                        self.changeItem(i, data);
                    }
                }
                var datas = self.$datas;
                var index = datas.indexOf(data);
                index > -1 && datas.splice(index, 1);
            }
            else {
                self.onClose();
            }
        };
        MorePeopleView.prototype.onClear = function () {
            var _this = this;
            var self = this;
            _super.prototype.onClear.call(this);
            self.$datas = null;
            self.list.selectHandler.recover();
            Laya.timer.clear(self, self.refresh);
            UIMgr.openUI(EUI.SideBoxView, function () {
                (_this.dataSource && typeof _this.dataSource === "function") && (_this.dataSource());
            });
        };
        MorePeopleView.prototype.onCancel = function () {
            SideNewMgr.ins.showMore();
        };
        MorePeopleView.prototype.onClose = function () {
            UIMgr.closeUI(EUI.MorePeopleView);
        };
        return MorePeopleView;
    }(ui.view.side.MorePeopleViewUI));

    var SideBotList = (function (_super) {
        __extends(SideBotList, _super);
        function SideBotList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SideBotList.prototype.initView = function (datas) {
            var self = this, ltCont = self.ltCont;
            self.refresh();
            ltCont.addComponent(AutoScroll);
            ltCont.selectEnable = true;
            ltCont.selectHandler = Laya.Handler.create(self, self.onSelect, void 0, false);
            self.timer.loop(10000, self, self.refresh);
        };
        SideBotList.prototype.onClear = function () {
            _super.prototype.onClear.call(this);
            var self = this;
            self.timer.clearAll(self);
            self.ltCont.selectHandler.recover();
        };
        SideBotList.prototype.onCancel = function () {
            SideNewMgr.ins.showMore();
        };
        SideBotList.prototype.onRemoved = function (data) {
            var self = this;
            if (SideNewMgr.ins.hasSide()) {
                var array = self.ltCont.array;
                for (var i = 0, len = array.length; i < len; i++) {
                    if (array[i] == data) {
                        self.changeItem(i, data);
                    }
                }
            }
            else {
                self.onClose();
            }
        };
        SideBotList.prototype.onSelect = function (index) {
            var self = this;
            var ltCont = self.ltCont;
            var data = ltCont.selectedItem;
            if (data) {
                self.changeItem(index, data);
                ltCont.selectedIndex = -1;
                _super.prototype.onClick.call(this, data);
            }
        };
        SideBotList.prototype.changeItem = function (index, data) {
            var rand = SideUtils.randomInArray(SideNewMgr.ins.getBoxDatas(), data);
            this.ltCont.setItem(index, rand);
        };
        SideBotList.prototype.refresh = function () {
            var self = this, caches = SideNewMgr.ins.getBoxDatas();
            if (caches.length == 0) {
                self.onClose();
            }
            else {
                self.ltCont.array = SideUtils.randomSort(caches);
            }
        };
        return SideBotList;
    }(ui.view.side.SideBotListUI));

    var SideDoubleList = (function (_super) {
        __extends(SideDoubleList, _super);
        function SideDoubleList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SideDoubleList.prototype.initView = function (datas) {
            var self = this;
            self.refresh();
            this.rightList.selectEnable = true;
            this.rightList.selectHandler = Laya.Handler.create(self, self.onRightSelect, void 0, false);
            this.leftList.selectEnable = true;
            this.leftList.selectHandler = Laya.Handler.create(self, self.onLeftSelect, void 0, false);
            self.timer.loop(5000, self, self.refresh);
        };
        SideDoubleList.prototype.onClear = function () {
            _super.prototype.onClear.call(this);
            var self = this;
            self.timer.clearAll(self);
            self.leftList.selectHandler.recover();
            self.rightList.selectHandler.recover();
        };
        SideDoubleList.prototype.onCancel = function () {
            SideNewMgr.ins.showMore();
        };
        SideDoubleList.prototype.onRemoved = function (data) {
            var self = this;
            if (SideNewMgr.ins.hasSide()) {
                var array = self.rightList.array;
                for (var i = 0, len = array.length; i < len; i++) {
                    if (array[i] == data) {
                        self.changeItem(self.rightList, i, data);
                    }
                }
                array = self.leftList.array;
                for (var i = 0, len = array.length; i < len; i++) {
                    if (array[i] == data) {
                        self.changeItem(self.leftList, i, data);
                    }
                }
            }
            else {
                self.onClose();
            }
        };
        SideDoubleList.prototype.onLeftSelect = function (index) {
            var self = this;
            var ltCont = self.leftList;
            var data = ltCont.selectedItem;
            if (data) {
                self.changeItem(ltCont, index, data);
                ltCont.selectedIndex = -1;
                _super.prototype.onClick.call(this, data);
            }
        };
        SideDoubleList.prototype.onRightSelect = function (index) {
            var self = this;
            var ltCont = self.rightList;
            var data = ltCont.selectedItem;
            if (data) {
                self.changeItem(ltCont, index, data);
                ltCont.selectedIndex = -1;
                _super.prototype.onClick.call(this, data);
            }
        };
        SideDoubleList.prototype.changeItem = function (list, index, data) {
            var rand = SideUtils.randomInArray(SideNewMgr.ins.getBoxDatas(), data);
            list.setItem(index, rand);
        };
        SideDoubleList.prototype.refresh = function () {
            var self = this, caches = SideNewMgr.ins.getBoxDatas();
            if (caches.length == 0) {
                self.onClose();
            }
            else {
                var array = SideUtils.randomSort(caches);
                var lefts = [];
                var rights = [];
                for (var i = 0; i < 4; i++) {
                    lefts.push(array[i]);
                }
                for (var i = 4; i < 8; i++) {
                    rights.push(array[i]);
                }
                self.leftList.array = lefts;
                self.rightList.array = rights;
            }
        };
        return SideDoubleList;
    }(ui.view.side.SideDoubleListUI));

    var SideMoreGameView = (function (_super) {
        __extends(SideMoreGameView, _super);
        function SideMoreGameView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._firstClick = 0;
            return _this;
        }
        SideMoreGameView.prototype.onAwake = function () {
        };
        SideMoreGameView.prototype.initView = function (datas) {
            var self = this, addClick = UIUtils.addClick, imgBack = self.imgBack;
            self.initList(0, datas);
            self.initList(1, datas);
            var point = platform.getMenuButtonBoundingClientRect();
            if (point) {
                self.boxTop.y = Utils.screenToStage(point.top);
            }
            addClick(imgBack, self.onBack, self);
            addClick(self.imgKeep, self.onKeep, self);
            self.setAldEvent('积分墙卖量');
            imgBack.visible = false;
            Laya.timer.once(2000, self, function () {
                imgBack.visible = true;
            });
        };
        SideMoreGameView.prototype.onBack = function () {
            var _this = this;
            UIMgr.openUI(EUI.SideBoxView, function () {
                (_this.dataSource && typeof _this.dataSource === "function") && (_this.dataSource());
            });
            UIMgr.closeUI(EUI.SideMoreGameView);
        };
        SideMoreGameView.prototype.onClose = function () {
            (this.dataSource && typeof this.dataSource === "function") && (this.dataSource());
            UIMgr.closeUI(EUI.SideMoreGameView);
        };
        SideMoreGameView.prototype.onKeep = function () {
            var list = this.list0;
            if (this._firstClick <= 0) {
                list.selectedIndex = Math.random() * list.array.length | 0;
                this._firstClick++;
            }
            else {
                this.onClose();
            }
        };
        SideMoreGameView.prototype.onRemoved = function (data) {
            var self = this;
            var check = function (type) {
                var list = self['list' + type];
                var array = list.array;
                for (var i = 0, len = array.length; i < len; i++) {
                    if (array[i] == data) {
                        self.changeItem(list, i, data);
                        array.splice(i, 1);
                        break;
                    }
                }
                list.array = array;
            };
            check(0);
            check(1);
        };
        SideMoreGameView.prototype.initList = function (type, datas) {
            var self = this;
            var list = self['list' + type];
            var scrollBar = list.scrollBar;
            console.log("big box", datas);
            list.array = datas.concat();
            list.selectEnable = true;
            list.selectHandler = Laya.Handler.create(self, self.onSelect, [list], false);
            list.addComponent(AutoScroll);
            list.getComponent(AutoScroll).speed = 0.5;
        };
        SideMoreGameView.prototype.onSelect = function (list, index) {
            var data = list.selectedItem;
            if (data) {
                list.selectedIndex = -1;
                _super.prototype.onClick.call(this, data);
            }
        };
        SideMoreGameView.prototype.changeItem = function (list, index, data) {
            list.setItem(index, data);
        };
        return SideMoreGameView;
    }(ui.view.side.SideMoreGameViewUI));

    var SideOverList = (function (_super) {
        __extends(SideOverList, _super);
        function SideOverList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SideOverList.prototype.initView = function (datas) {
            var self = this, ltCont = self.list;
            self.refreshList();
            this.timer.loop(5000, this, this.refreshList);
            ltCont.selectEnable = true;
            ltCont.selectHandler = new Laya.Handler(self, self.onSelect);
        };
        SideOverList.prototype.onSelect = function (index) {
            var ltCont = this.list;
            var data = ltCont.selectedItem;
            if (data) {
                var rand = Utils.randomInArray(SideMgr.getSides(), data);
                _super.prototype.onClick.call(this, ltCont.selectedItem);
                ltCont.selectedIndex = -1;
                ltCont.setItem(index, rand);
            }
        };
        SideOverList.prototype.refreshList = function () {
            var datas = SideMgr.getSides();
            if (!datas)
                return;
            var allData = datas.slice();
            Utils.shuffle(allData);
            var array = allData.slice(0, 8);
            this.list.array = array;
        };
        return SideOverList;
    }(ui.view.side.SideOverListUI));

    var WXModelView = (function (_super) {
        __extends(WXModelView, _super);
        function WXModelView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WXModelView.prototype.initView = function (datas) {
            var self = this, ltCont = self.ltCont, height = 120;
            self.refresh();
            ltCont.selectEnable = true;
            ltCont.selectHandler = Laya.Handler.create(self, self.onSelect, void 0, false);
            UIUtils.addClick(self.boxBack, self.onClose, self);
            self.setAldEvent('仿微信界面卖量');
            var point = platform.getMenuButtonBoundingClientRect();
            if (point) {
                var newt = self.boxTop.top = Utils.screenToStage(point.top);
                height += (newt - 34);
            }
            self.spGray.graphics.drawRect(0, 0, 760, height, '#ededed');
            window.ydhw_wx && window.ydhw.HideBannerAd();
        };
        WXModelView.prototype.onCancel = function () {
            SideMgr.showMore();
        };
        WXModelView.prototype.onClear = function () {
            var self = this;
            _super.prototype.onClear.call(this);
            self.timer.clearAll(self);
            self.ltCont.selectHandler.recover();
        };
        WXModelView.prototype.onClose = function () {
            UIMgr.closeUI(EUI.WXModelView);
        };
        WXModelView.prototype.onRemoved = function (data) {
            var self = this;
            if (SideMgr.hasSide()) {
                var array = self.ltCont.array;
                for (var i = 0, len = array.length; i < len; i++) {
                    if (array[i] == data) {
                        self.changeItem(i, data);
                    }
                }
            }
            else {
                self.onClose();
            }
        };
        WXModelView.prototype.onSelect = function (index) {
            var self = this;
            var ltCont = self.ltCont;
            var data = ltCont.selectedItem;
            if (data) {
                ltCont.selectedIndex = -1;
                self.changeItem(index, data);
                _super.prototype.onClick.call(this, data);
            }
        };
        WXModelView.prototype.changeItem = function (index, data) {
        };
        WXModelView.prototype.refresh = function () {
            var self = this, caches = SideMgr.getSides(), cLen = caches.length;
            if (cLen == 0) {
                self.onClose();
            }
            else {
                var datas = [], randomSort = Utils.randomSort;
                randomSort(caches = caches.concat());
                for (var i = 0; i < cLen; i++) {
                }
                self.ltCont.array = randomSort(datas);
            }
        };
        return WXModelView;
    }(ui.view.side.WXModelViewUI));

    var GameConfig = (function () {
        function GameConfig() {
        }
        GameConfig.init = function () {
            var reg = Laya.ClassUtils.regClass;
            reg("script/DebugView.ts", DebugView);
            reg("script/FailView.ts", FailView);
            reg("side/item/SideGrid.ts", SideGrid);
            reg("script/HomeSellView.ts", HomeSellView);
            reg("side/item/SideIconRT.ts", SideIconRT);
            reg("script/HomeView.ts", HomeView);
            reg("side/view/SideLeftList.ts", SideLeftList);
            reg("side/item/BigBoxItem0.ts", BigBoxItem0);
            reg("side/item/BigBoxItem1.ts", BigBoxItem1);
            reg("side/item/MoreGameItem1.ts", MoreGameItem1);
            reg("side/item/OverGameItem.ts", OverGameItem);
            reg("side/item/SideBotItem.ts", SideBotItem);
            reg("side/item/SideBoxItem.ts", SideBoxItem);
            reg("side/item/SideBoxItem0.ts", SideBoxItem0);
            reg("side/item/SideBoxItem1.ts", SideBoxItem1);
            reg("side/item/SideGridItem.ts", SideGridItem);
            reg("side/item/SideListItem.ts", SideListItem);
            reg("side/item/SideListItem4.ts", SideListItem4);
            reg("util/ScaleAni.ts", ScaleAni);
            reg("side/item/SideNewItem.ts", SideNewItem);
            reg("side/item/WXModelItem.ts", WXModelItem);
            reg("script/LoadingView.ts", LoadingView);
            reg("script/RankingView.ts", RankingView);
            reg("script/ResultView.ts", ResultView);
            reg("core/ui/FlyGold.ts", FlyGold);
            reg("side/view/SideBoxView.ts", SideBoxView);
            reg("side/view/GoldenEggView.ts", GoldenEggView);
            reg("side/view/MorePeopleView.ts", MorePeopleView);
            reg("side/item/SideBotList.ts", SideBotList);
            reg("side/item/SideDoubleList.ts", SideDoubleList);
            reg("side/view/SideMoreGameView.ts", SideMoreGameView);
            reg("side/view/SideOverList.ts", SideOverList);
            reg("side/view/WXModelView.ts", WXModelView);
        };
        GameConfig.width = 750;
        GameConfig.height = 1334;
        GameConfig.scaleMode = "fixedwidth";
        GameConfig.screenMode = "none";
        GameConfig.alignV = "top";
        GameConfig.alignH = "left";
        GameConfig.startScene = "view/DebugView.scene";
        GameConfig.sceneRoot = "";
        GameConfig.debug = false;
        GameConfig.stat = true;
        GameConfig.physicsDebug = false;
        GameConfig.exportSceneToJson = false;
        return GameConfig;
    }());
    GameConfig.init();

    var DataStatisticsJs = {
        dataTemp: [],
        init: function () {
            this.maxPostLength = 50;
            this.commitDelayTime = 20;
            this.cacheMaxLength = 10000;
            this.database = [];
            this.commit();
            this.setCurrentTime();
            this.startSchedule();
            this._scheduleId = 0;
        },
        setCurrentTime: function () {
            var timestamp = this.getTime();
            this.intervalTime = timestamp;
        },
        isFixIntervalTime: function () {
            var timestamp = this.getTime();
            var diffTime = Math.floor(timestamp - this.intervalTime);
            if (diffTime > this.commitDelayTime) {
                return true;
            }
            return false;
        },
        checkTemp: function () {
            var datas = this.dataTemp.shift();
            if (datas) {
                this.database.concat(datas);
            }
        },
        commit: function () {
            var commitData = this.database;
            if (commitData.length > 0) {
                var send = commitData.splice(0, this.maxPostLength);
                this.dataTemp.push(send);
                this.commitReq(send);
                Laya.timer.once((this.commitDelayTime - 1) * 1000, this, this.checkTemp);
            }
        },
        commitReq: function (cData) {
        },
        getTime: Date.now,
        startSchedule: function () {
            this.stopSchedule();
            this._scheduleId = setInterval(this.commit.bind(this), this.commitDelayTime * 1000);
        },
        stopSchedule: function () {
            if (this._scheduleId > 0) {
                clearInterval(this._scheduleId);
                this._scheduleId = 0;
            }
        },
        logEvent: function (eventID, param, defParam) {
            var data = Object.create(null);
            var extra = param.extradata || '';
            if (defParam) {
                var ince = UserData.instance;
                extra && (extra = ',' + extra);
                extra = 'accountId:' + ince.accountId + ',level:' + ince.level + extra;
            }
            var paramID = param.paramID || '';
            if (paramID) {
                paramID = paramID.replace(/%u/i, this.getNewName());
            }
            data.eventID = eventID;
            data.time = this.getTime();
            data.paramID = paramID;
            data.valueID = param.valueID || '';
            data.extradata = extra;
            this.database.push(data);
        },
        getNewName: function () {
            return UserData.instance.isNewPlayer ? 'new' : 'old';
        }
    };
    var DataStatistics = (function () {
        function DataStatistics() {
        }
        DataStatistics.init = function () {
            DataStatisticsJs.init();
        };
        DataStatistics.logEvent = function (eventID, param, defParam) {
            DataStatisticsJs.logEvent(eventID, param, defParam !== false);
        };
        DataStatistics.clearSaveCommit = function () {
            DataStatisticsJs.dataTemp.shift();
        };
        return DataStatistics;
    }());

    var platformType = {
        None: 1001,
        Wechat: 2001,
        QQ: 3001,
        Oppo: 4001,
        Vivo: 5001,
        Toutiao: 6001,
        Xiaomi: 7001
    };
    var getKeys = function (obj) {
        var keys = [];
        if (obj && obj !== Object.prototype) {
            keys = keys.concat(Object.getOwnPropertyNames(obj));
            keys = keys.concat(getKeys(obj.__proto__));
        }
        return keys;
    };
    var WebPlatform = (function () {
        function WebPlatform() {
            this.platType = 1001;
            this.appId = 'wx638732461656d042';
            this.version = '1.0.1';
            this.hasVideo = true;
            this.bannerY = 1112;
        }
        WebPlatform.init = function () {
            if (!WebPlatform.$init) {
                WebPlatform.$init = true;
                var webp = new WebPlatform;
                var curp = window.platform;
                if (curp) {
                    var keys = getKeys(webp);
                    for (var i in keys) {
                        var key = keys[i];
                        var data = curp[key];
                        if (data === void 0) {
                            curp[key] = webp[key];
                        }
                    }
                }
                else
                    curp = window.platform = webp;
                var curT = curp.platType;
                for (var i in platformType) {
                    curp['is' + i] = curT === platformType[i];
                }
            }
        };
        WebPlatform.prototype.login = function (cb) {
            var wxcode = Laya.LocalStorage.getItem("wxcode");
            if (wxcode == null) {
                wxcode = Math.ceil(Math.random() * 100000).toString();
                Laya.LocalStorage.setItem("wxcode", wxcode);
            }
            cb && cb({ code: 0, wxcode: wxcode });
        };
        WebPlatform.prototype.launchInfo = function () {
            return {};
        };
        WebPlatform.prototype.getSystemInfoSync = function () {
            return { brand: "PC", model: "web", benchmarkLevel: 100, system: "web" };
        };
        WebPlatform.prototype.onShow = function (_callback) { };
        WebPlatform.prototype.onHide = function (_callback) { };
        WebPlatform.prototype.createFeedbackButton = function (_btnVect, hide) { };
        ;
        WebPlatform.prototype.showFeedbackButton = function (visible) { };
        WebPlatform.prototype.exitMiniProgram = function () { };
        WebPlatform.prototype.onShare = function (_data) {
            _data.success(true);
        };
        WebPlatform.prototype.navigateToMiniProgram = function (_data) {
            if (_data) {
                var suc = _data.success;
                if (suc instanceof Function)
                    suc();
            }
        };
        WebPlatform.prototype.createBannerAd = function (_adUnitId, func) { };
        WebPlatform.prototype.refreshBanner = function () { };
        WebPlatform.prototype.closeBannerAd = function () { };
        WebPlatform.prototype.setBannerVisible = function (val) { };
        WebPlatform.prototype.createRewardedVideoAd = function (type, func, load, preload) {
            func && func(true);
        };
        WebPlatform.prototype.vibrateShort = function () { };
        WebPlatform.prototype.vibrateLong = function () { };
        WebPlatform.prototype.setUserCloudStorage = function (_kvDataList) { };
        WebPlatform.prototype.postMessage = function (_data) { };
        WebPlatform.prototype.getMenuButtonBoundingClientRect = function () {
            return null;
        };
        WebPlatform.prototype.checkUpdate = function () { };
        WebPlatform.prototype.getNetworkType = function (call) {
            call && call('wifi');
        };
        WebPlatform.prototype.createVideo = function (data) {
            return null;
        };
        WebPlatform.prototype.createInsertAd = function (call) { };
        WebPlatform.prototype.loadSubpackage = function (name) {
            return Promise.resolve();
        };
        WebPlatform.prototype.showLoading = function () {
        };
        WebPlatform.prototype.hideLoading = function () {
        };
        WebPlatform.prototype.showShare = function (data) { };
        WebPlatform.prototype.showModal = function (modal) { };
        WebPlatform.prototype.requestSubscribeMessage = function (call) {
            call(true);
        };
        WebPlatform.prototype.hasShortcut = function (call) {
            call && call(true);
        };
        WebPlatform.prototype.installShortcut = function (call) {
            call && call(true);
        };
        WebPlatform.prototype.createNativeAd = function (call) { };
        WebPlatform.prototype.setFeedbackButtonVisible = function (visible) { };
        WebPlatform.prototype.destroyFeedBackBtn = function () { };
        WebPlatform.prototype.reportMonitor = function (name, value) { };
        return WebPlatform;
    }());

    var SideReceiver = (function () {
        function SideReceiver() {
        }
        SideReceiver.init = function () {
            var self = SideReceiver;
            var register = SideMsg.register;
            register(ESMessage.S2C_REMOVE, self.onRemove, self);
            register(ESMessage.S2C_CLICK_BTN, self.onClickBtn, self);
            register(ESMessage.S2C_CANCEL, self.onCancel, self);
            register(ESMessage.S2C_DOT_SERVER, self.onDotServer, self);
            register(ESMessage.S2C_DOT_ALD, self.onDotAld, self);
            register(ESMessage.S2C_DOT_EVENT, self.onDotEvent, self);
        };
        SideReceiver.onRemove = function (data) {
            UserData.instance.removeSide(data);
        };
        SideReceiver.onClickBtn = function () {
            SoundMgr.playBtnClick();
        };
        SideReceiver.onCancel = function () {
        };
        SideReceiver.onDotServer = function (event, side, enable) {
        };
        SideReceiver.onDotAld = function (event, data) {
            AldSDK.aldSendEvent(event, true, data);
        };
        SideReceiver.onDotEvent = function (event, paramId) {
            DataStatistics.logEvent(event, { paramID: paramId });
        };
        return SideReceiver;
    }());

    var Main = (function () {
        function Main() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat && Laya.Browser.onPC)
                Laya.Stat.show();
            Laya.alertGlobalError = true;
            Laya.MouseManager.multiTouchEnabled = false;
            var userButton = window['userButton'];
            if (!userButton) {
                var stage = Laya.stage, dir = 'loading/';
                var height = stage.height;
                var logingBg = new Laya.Image(dir + 'loading_bg.jpg');
                logingBg.y = (height - 1650) / 2;
                stage.addChild(logingBg);
            }
            EventMgr.once(EventType.EnterLoading, null, function () {
                if (userButton) {
                    userButton.hide();
                }
                else {
                    logingBg && logingBg.removeSelf();
                }
            });
            if (Laya.Browser.onPC) {
                this.onVersionLoaded();
                return;
            }
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        Main.prototype.onVersionLoaded = function () {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        };
        Main.prototype.onConfigLoaded = function () {
            AldSDK.timeId = Date.now();
            AldSDK.aldSendEvent("开始游戏", false);
            this.setupPlatform();
            YLSDK.init();
            SideReceiver.init();
            SoundMgr.init();
            DataStatistics.init();
            UserData.instance.init();
            UIMgr.openUI(EUI.LoadingView);
        };
        Main.prototype.initCDNConfig = function () {
            var path = GameConst.CDN + platform.appId + "/cdn/";
            Utils.initCDNFiles(path, ['scene']);
        };
        Main.prototype.setupPlatform = function () {
            var self = this;
            platform.onShow(function (options) {
                console.info("options:", options);
                Laya.timer.scale = 1;
                SoundMgr.playBGM();
                if (window.ydhw_wx) {
                    GameConst.Scene = options.scene;
                    if (options.scene == 1089 || options.scene == 1104) {
                    }
                }
                else if (window.ydhw_oppo) {
                    self.judgeTime();
                }
            });
            platform.onHide(function () {
                if (window.ydhw_wx) {
                    Laya.timer.scale = 0;
                }
                else if (window.ydhw_oppo) {
                    YLSDK.shortcut();
                    self._hideTime = Date.now();
                }
            });
        };
        Main.prototype.judgeTime = function () {
            if (this._hideTime == 0)
                return;
            if ((Date.now() - this._hideTime) / 1000 > 30) {
                platform.createInsertAd();
                this._hideTime = 0;
            }
        };
        return Main;
    }());
    WebPlatform.init();
    new Main();

}());
//# sourceMappingURL=bundle.js.map
