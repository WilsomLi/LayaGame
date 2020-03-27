/**
 * TER1116-CommonFun
 */
export default class CommonFun {
    static waitEffectName: string = "waitEffect";
    static viewZOrder: number = 10001;

    static bannerAd: any; //bannerAd
    static isForbidBannerAd: boolean; //是否禁止播放bannerAd
    static videoAd: any; //videoAd

    constructor(parameters) { }

    static playCoinEffect(_parentNode: any, _imgUrl: string, _offset: any = { x: 0, y: 0 }, _callback: any = null): void {
        //飘金币
        for (var index = 0; index < 12; index++) {
            // var coinSp = new Laya.Image(_imgUrl);
            var randX = Math.random() - 0.5;
            var randY = Math.random() - 0.5;
            var cicleX = 10 * Math.cos(index * Math.PI / 7) + 10 * randX;
            var cicleY = 10 * Math.sin(index * Math.PI / 7) + 10 * randY;

            //运动节点
            let effectNode = _parentNode.addChild(new Laya.View) as Laya.View;
            effectNode.pos(_parentNode.width / 2 + cicleX + _offset.x, _parentNode.height / 2 + cicleY + _offset.y);

            //图片
            let coinSp: Laya.Image = Laya.Pool.getItemByClass("p_coin", Laya.Image);
            coinSp.graphics.clear();
            coinSp.loadImage(_imgUrl);
            coinSp.scale(1, 1);
            coinSp.alpha = 1;
            coinSp.size(52, 48);
            coinSp.pivot(coinSp.width / 2, coinSp.height / 2);
            effectNode.addChild(coinSp);

            //运行动画
            var coinPos = { x: (effectNode.x + cicleX * 5), y: (effectNode.y + cicleY * 5) };
            let timeLine = new Laya.TimeLine();
            timeLine.addLabel("tl1", 0).to(effectNode, { x: coinPos.x, y: coinPos.y }, 600, Laya.Ease.expoOut);
            timeLine.on(Laya.Event.COMPLETE, effectNode, (_effectNode: Laya.Node) => {
                _effectNode.removeSelf();
                _callback && _callback();
            }, [effectNode, coinPos]);
            timeLine.play(0, false);

            //缩放动画
            let timeLine2 = new Laya.TimeLine();
            timeLine2.addLabel("tl1", 0).to(coinSp, { scaleX: 0.9, scaleY: 0.9 }, 100, Laya.Ease.linearNone)
                .addLabel("tl2", 0).to(coinSp, { scaleX: 0.5, scaleY: 0.5, rotation: (randX + randY) * 360, alpha: 0 }, 400, Laya.Ease.linearNone);
            timeLine2.on(Laya.Event.COMPLETE, coinSp, (_coinSp: Laya.Node) => {
                Laya.Pool.recover("p_coin", _coinSp);
            }, [coinSp, coinPos]);
            timeLine2.play(0, false);
        }
    }
    static playTextEffect(_parentNode: any, _content: string, _pos: Laya.Point = null, _isStroke: boolean = false): void {
        //飘文字
        var coinLabel = new Laya.Label();
        coinLabel.text = _content;
        coinLabel.fontSize = 30;
        coinLabel.color = "#ffffff";
        if (_isStroke) {
            coinLabel.stroke = 4;
            coinLabel.strokeColor = "#000000";
            coinLabel.fontSize = 36;
            coinLabel.color = "#ffffff";
        }
        coinLabel.anchorX = 0.5;
        coinLabel.anchorY = 0.5;
        _parentNode.addChild(coinLabel);
        if (_pos) {
            coinLabel.pos(_pos.x, _pos.y);
        } else {
            coinLabel.pos(_parentNode.width / 2, -_parentNode.height / 2);
        }
        //动画
        let timeLine = new Laya.TimeLine();
        timeLine.addLabel("tl1", 0).to(coinLabel, { x: coinLabel.x, y: (coinLabel.y - 50), alpha: 0 }, 1200, Laya.Ease.cubicInOut);
        timeLine.on(Laya.Event.COMPLETE, coinLabel, (_coinLabel: Laya.Node) => {
            _coinLabel.removeSelf();
        }, [coinLabel]);
        timeLine.play(0, false);
    }
    static playImageTextEffect(_parentNode: any, _imgUrl: string, _content: string, _pos: Laya.Point = null, _isStroke: boolean = false, _zOrder: number = 0): void {
        //图片
        let coinImg = new Laya.Image(_imgUrl);
        coinImg.anchorX = 0.8;
        coinImg.anchorY = 0.5;
        _parentNode.addChild(coinImg);
        if (_pos) {
            coinImg.pos(_pos.x, _pos.y);
        } else {
            coinImg.pos(_parentNode.width / 2, -_parentNode.height / 2);
        }
        if (_zOrder > 0) {
            coinImg.zOrder = _zOrder;
        }
        //飘文字
        var coinLabel = new Laya.Label();
        coinLabel.text = _content;
        coinLabel.fontSize = 30;
        coinLabel.color = "#000000";
        coinLabel.font = "Arial";
        if (_isStroke) {
            coinLabel.stroke = 2;
            coinLabel.strokeColor = "#000000";
            coinLabel.color = "#ffffff";
            coinLabel.bold = true;
        } else {
            coinLabel.stroke = 0;
            coinLabel.color = "#000000";
        }
        coinLabel.anchorY = 0.5;
        coinImg.addChild(coinLabel);
        coinLabel.pos(coinImg.width, coinImg.height * 0.5);
        //动画
        let timeLine = new Laya.TimeLine();
        timeLine.addLabel("tl1", 0).from(coinImg, { scaleX: 0, scaleY: 0, y: (coinImg.y + 30) }, 300, Laya.Ease.linearNone)
            .addLabel("tl2", 500).to(coinImg, { x: coinImg.x, y: (coinImg.y - 50), alpha: 0 }, 1200, Laya.Ease.cubicInOut);
        timeLine.on(Laya.Event.COMPLETE, coinImg, () => {
            coinImg.removeSelf();
        });
        timeLine.play(0, false);
    }


    //金币雨
    static playCoinRainEffect(_parentNode: any, _imgUrl: string): void {
        let coinCount = 8;
        for (var index = 0; index < coinCount; index++) {
            // var coinSp = new Laya.Image(_imgUrl);
            let coinSp: Laya.Image = Laya.Pool.getItemByClass("p_coin_rain", Laya.Image);
            coinSp.graphics.clear();
            coinSp.loadImage(_imgUrl);
            coinSp.pivot(coinSp.width / 2, coinSp.height / 2);
            _parentNode.addChild(coinSp);
            coinSp.pos(index * (Laya.stage.width / coinCount) + Math.random() * 100, Math.random() * 500 - 300);
            Laya.Tween.to(coinSp, { x: coinSp.x, y: Laya.stage.height + 300 }, 3000,
                Laya.Ease.linearNone, Laya.Handler.create(this, (_coinSp: Laya.Node) => {
                    _coinSp.removeSelf();
                    Laya.Pool.recover("p_coin_rain", _coinSp);
                }, [coinSp]));
        }
    }

    //宝箱掉落动效
    static playBoxDropEffect(_effectNode: any, _callback: any = null): void {
        let boxAnimation = (target, onEvtFinish) => {
            let timeLine = new Laya.TimeLine();
            let nodePos = { x: _effectNode.x, y: _effectNode.y };
            timeLine.addLabel("tl1", 0).from(target, { y: nodePos.y - 1000 }, 1000, Laya.Ease.cubicIn)
                .addLabel("tl2", 1100).to(target, { y: nodePos.y - 80 }, 100, Laya.Ease.circOut)
                .addLabel("tl3", 2100).to(target, { y: nodePos.y }, 500, Laya.Ease.bounceOut)
            if (onEvtFinish != null) {
                timeLine.on(Laya.Event.COMPLETE, target, onEvtFinish);
            }
            timeLine.play(0, false);
        };
        boxAnimation(_effectNode, _callback);
    }
    //宝箱缩放效果
    static playBoxScaleEffect(_effectNode: any, _callback: any = null): void {
        let boxAnimation = (target, onEvtFinish) => {
            let timeLine = new Laya.TimeLine();
            let dtime: number = 80;
            timeLine.addLabel("tl1", 0).to(target, { scaleX: 1.5, scaleY: 0.9 }, dtime, Laya.Ease.backInOut)
                .addLabel("tl2", 100).to(target, { scaleX: 1.1, scaleY: 1.0 }, dtime, Laya.Ease.backInOut)
                .addLabel("tl3", 200).to(target, { scaleX: 1.3, scaleY: 0.95 }, dtime, Laya.Ease.backInOut)
                .addLabel("tl4", 300).to(target, { scaleX: 1.0, scaleY: 1.0 }, dtime, Laya.Ease.backInOut)
            if (onEvtFinish != null) {
                timeLine.on(Laya.Event.COMPLETE, target, onEvtFinish);
            }
            timeLine.play(0, false);
        };
        boxAnimation(_effectNode, _callback);
    }
    //宝箱抖动效果
    static playBoxShakeEffect(_effectNode: any, _callback: any = null): void {
        let boxAnimation = (target, onEvtFinish) => {
            let timeLine = new Laya.TimeLine();
            let nodePos = { x: _effectNode.x, y: _effectNode.y };
            let dtime: number = 50;
            timeLine.addLabel("tl1", 0).to(target, { x: nodePos.x + 8, y: nodePos.y + 2 }, dtime, Laya.Ease.bounceInOut)
                .addLabel("tl2", dtime).to(target, { x: nodePos.x - 8, y: nodePos.y - 1 }, dtime, Laya.Ease.bounceInOut)
                .addLabel("tl3", 2 * dtime).to(target, { x: nodePos.x + 8, y: nodePos.y + 1 }, dtime, Laya.Ease.bounceInOut)
                .addLabel("tl4", 3 * dtime).to(target, { x: nodePos.x, y: nodePos.y }, dtime, Laya.Ease.bounceInOut)
                .addLabel("tl5", 4 * dtime).to(target, { x: nodePos.x, y: nodePos.y }, dtime, Laya.Ease.bounceInOut)
                .addLabel("hide1", 5 * dtime).to(target, { alpha: 0 }, dtime)
                .addLabel("show1", 6 * dtime).to(target, { alpha: 100 }, dtime)
            if (onEvtFinish != null) {
                timeLine.on(Laya.Event.COMPLETE, target, onEvtFinish);
            }
            timeLine.play(0, false);
        };
        boxAnimation(_effectNode, _callback);
    }


    //单位转换(k、m、b、t、aa、bb、cc、dd、ee)
    static bytesToSize(bytes: number): string {
        if (bytes < 1000) {
            return Math.floor(bytes).toString();
        }
        if (bytes === 0) return '0';
        var k = 1000, // or 1024
            sizes = ['', 'k', 'm', 'b', 't', 'aa', 'bb', 'cc', 'dd', 'ee'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        var unit = '';
        if (i < sizes.length) {
            unit = sizes[i];
        } else {
            var numLenght = i - sizes.length;
            unit = String.fromCharCode(97 + numLenght % 26);
            for (var index = 0; index < 1 + Math.floor(numLenght / 65); index++) {
                unit = unit + unit;
            }
        }
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + unit;
    }

    //字符串转数字
    static parseStringNum(_strNum: string): number {
        let intNum = parseFloat(_strNum);
        if (intNum) {
            return intNum;
        }
        return 0;
    }
    //字符串转整形
    static parseInt(_strNum: string): number {
        let intNum = parseFloat(_strNum);
        if (intNum) {
            return Math.floor(intNum);
        }
        return 0;
    }

    //00:00:00格式时间
    static timeFormatStr(_time: number, _isHour: boolean = false): string {
        let hour = Math.floor(_time / 3600);
        let minute = Math.floor(_time / 60) % 60;
        let sec = _time % 60;
        if (_isHour) {
            return (hour < 10 ? ('0' + hour) : hour) + ':' + (minute < 10 ? ('0' + minute) : minute) + ':' + (sec < 10 ? ('0' + sec) : sec);
        } else {
            return (minute < 10 ? ('0' + minute) : minute) + ':' + (sec < 10 ? ('0' + sec) : sec);
        }
    }

    static isNumber(val): boolean {
        var regPos = /^\d+(\.\d+)?$/; //非负浮点数
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        if (regPos.test(val) || regNeg.test(val)) {
            return true;
        } else {
            return false;
        }
    }

    //数值随机取一个数
    static pickRandomOne(arr: Array<any>): any {
        var index = Math.floor(Math.random() * arr.length);
        return arr[index];
    }

    //filter
    static createColorFilter(_kind: number = 0): Array<Laya.ColorFilter> {
        if (_kind == 1) {
            //变暗
            var colorV = 0.6;
            var colorMat =
                [
                    colorV, 0, 0, 0, 0, //R
                    0, colorV, 0, 0, 0, //G
                    0, 0, colorV, 0, 0, //B
                    0, 0, 0, 1, 0, //A
                ];
            //创建一个颜色滤镜对象
            var colorFilter = new Laya.ColorFilter(colorMat);
            return [colorFilter];
        } else if (_kind == 2) {
            //变黑
            var colorV = 0;
            var colorMat =
                [
                    colorV, 0, 0, 0, 0, //R
                    0, colorV, 0, 0, 0, //G
                    0, 0, colorV, 0, 0, //B
                    0, 0, 0, 1, 0, //A
                ];
            //创建一个颜色滤镜对象
            var colorFilter = new Laya.ColorFilter(colorMat);
            return [colorFilter];
        }
        return [];
    }

    //锁定按钮n帧
    static lockBtnStage(_btn: Laya.Button, _delay: number = 10) {
        _btn.mouseEnabled = false;
        _btn.frameOnce(_delay, _btn, () => {
            _btn.mouseEnabled = true;
        })
    }

    //加载效果
    static showWaitEffect(_content: string, _kind: number = 0) {
        // if (Laya.stage.getChildByName(CommonFun.waitEffectName)) {
        //     return
        // }
        CommonFun.stopWaitEffect();

        let waitNode = new Laya.View();
        Laya.stage.addChild(waitNode);
        waitNode.name = CommonFun.waitEffectName;
        waitNode.zOrder = CommonFun.viewZOrder;

        //定时自动移除
        waitNode.timerOnce(12000, CommonFun, CommonFun.stopWaitEffect);

        let waitEffectView = new Laya.View();
        waitNode.addChild(waitEffectView);
        waitEffectView.size(Laya.stage.width, Laya.stage.height);
        waitEffectView.on(Laya.Event.CLICK, waitEffectView, () => { });
        waitEffectView.graphics.drawRect(0, 0, waitEffectView.width, waitEffectView.height, "#000");
        waitEffectView.alpha = 0.7;

        //圈
        let waittingSp = new Laya.Image("loading/loading01.png");
        waitNode.addChild(waittingSp);
        waittingSp.pos(Laya.stage.width * 0.5, Laya.stage.height * 0.45);
        waittingSp.anchorX = 0.5;
        waittingSp.anchorY = 0.5;
        let timeLine = new Laya.TimeLine();
        timeLine.addLabel("tl1", 0).to(waittingSp, { rotation: 360 }, 800);
        timeLine.play(0, true);
        //车
        let waittingBgSp = new Laya.Image("loading/loading02.png");
        waitNode.addChild(waittingBgSp);
        waittingBgSp.pos(waittingSp.x, waittingSp.y);
        waittingBgSp.anchorX = 0.5;
        waittingBgSp.anchorY = 0.5;
        // CommonFun.playTwinkleEffect(waittingBgSp, null, true);
        //字
        let txtLabel = new Laya.Label(_content);
        waitNode.addChild(txtLabel);
        txtLabel.fontSize = 32;
        txtLabel.color = "#FFFFFF";
        txtLabel.width = 320;
        txtLabel.height = 80;
        // txtLabel.bgColor = "#000"
        txtLabel.wordWrap = true;
        txtLabel.pos(waittingSp.x - txtLabel.width * 0.5, waittingSp.y + waittingSp.height * 0.5);
        txtLabel.align = "center";
        txtLabel.valign = "middle";
    }
    static stopWaitEffect() {
        let waittingSp = Laya.stage.getChildByName(CommonFun.waitEffectName);
        if (waittingSp) {
            waittingSp.clearTimer(CommonFun, CommonFun.stopWaitEffect);
            waittingSp.removeSelf();
        }
    }

    //文本提示
    static showTip(_content: string): void {
        let tipKey: string = "tip_key";
        if (Laya.stage.getChildByName(tipKey)) {
            Laya.stage.removeChildByName(tipKey); //只展示最新
        }
        var tipBarSp = new Laya.Image("game/com_img_hint.png");
        Laya.stage.addChild(tipBarSp);
        tipBarSp.name = tipKey;
        tipBarSp.zOrder = CommonFun.viewZOrder;
        tipBarSp.pos(Laya.stage.width / 2, Laya.stage.height * 0.4);
        tipBarSp.width = 500;
        tipBarSp.height = 100;
        tipBarSp.pivot(tipBarSp.width / 2, tipBarSp.height / 2);
        tipBarSp.sizeGrid = "36,54,51,48";

        var coinLabel = new Laya.Label();
        coinLabel.text = _content;
        coinLabel.fontSize = 32;
        coinLabel.color = "#ffffff";
        // coinLabel.strokeColor = "#000000";
        // coinLabel.stroke = 2;
        coinLabel.bold = true;

        coinLabel.width = tipBarSp.width * 0.98;
        //设置文本水平居中
        coinLabel.align = "center";
        //设置文本垂直居中
        coinLabel.valign = "middle";
        //设置自动换行
        coinLabel.wordWrap = true;
        //重置背景高度
        // tipBarSp.height = coinLabel.height +20;

        tipBarSp.addChild(coinLabel);
        coinLabel.pos(tipBarSp.width / 2, tipBarSp.height / 2);
        coinLabel.pivot(coinLabel.width / 2, coinLabel.height / 2);

        Laya.Tween.to(tipBarSp, { x: tipBarSp.x, y: (tipBarSp.y - 100), alpha: 0 }, 3000,
            Laya.Ease.cubicInOut, Laya.Handler.create(this, (tipBarSp: Laya.Node) => {
                tipBarSp.removeSelf();
            }, [coinLabel]));
    }

    //文本提示
    static showNodeTip(_parentNode: any, _content: string, _offset: Laya.Point): void {
        let tipKey: string = "tip_key";
        if (_parentNode.getChildByName(tipKey)) {
            _parentNode.removeChildByName(tipKey); //只展示最新
        }
        var tipBarSp = new Laya.Image("images/commond_img_hint.png");
        _parentNode.addChild(tipBarSp);
        tipBarSp.name = tipKey;
        tipBarSp.zOrder = CommonFun.viewZOrder;
        tipBarSp.pos(_parentNode.width / 2 + _offset.x, _parentNode.height / 2 + _offset.y);
        tipBarSp.width = 403;
        tipBarSp.height = 200;
        tipBarSp.pivot(tipBarSp.width / 2, tipBarSp.height / 2);
        tipBarSp.sizeGrid = "10,10,10,10";

        var coinLabel = new Laya.Label();
        coinLabel.text = _content;
        coinLabel.fontSize = 32;
        coinLabel.color = "#4b96f3";
        // coinLabel.strokeColor = "#ffffff";
        // coinLabel.stroke = 2;
        coinLabel.bold = true;

        coinLabel.width = tipBarSp.width * 0.98;
        //设置文本水平居中
        coinLabel.align = "center";
        //设置文本垂直居中
        coinLabel.valign = "middle";
        //设置自动换行
        coinLabel.wordWrap = true;
        //重置背景高度
        // tipBarSp.height = coinLabel.height +20;

        tipBarSp.addChild(coinLabel);
        coinLabel.pos(tipBarSp.width / 2, tipBarSp.height / 2);
        coinLabel.pivot(coinLabel.width / 2, coinLabel.height / 2);

        Laya.Tween.to(tipBarSp, { x: tipBarSp.x, y: (tipBarSp.y - 10), alpha: 0 }, 2500,
            Laya.Ease.cubicInOut, Laya.Handler.create(this, (tipBarSp: Laya.Node) => {
                tipBarSp.removeSelf();
            }, [coinLabel]));
    }

    //是否被点击
    static isHit(_checkSprite: Laya.Sprite, _extW: number = 0, _extH: number = 0) {
        if (_checkSprite) {
            let touchPos: Laya.Point = _checkSprite.getMousePoint();
            let touchArea: Laya.Rectangle = new Laya.Rectangle(0 - _extW / 2, 0 - _extH / 2,
                _checkSprite.width + _extW, _checkSprite.height + _extH);
            return touchArea.contains(touchPos.x, touchPos.y);
        }
        return false;
    }

    static addRedPoint(btn: any, isRed, top: number = -8, right: number = 92): void {
        let _redPoint: Laya.Image = btn.getChildByName("redPoint") as Laya.Image;
        if (_redPoint) {
            _redPoint.visible = isRed;
        } else if (isRed) {
            _redPoint = new Laya.Image("common/img_red_point.png");
            _redPoint.name = "redPoint";
            btn.addChild(_redPoint);
            _redPoint.top = top;
            _redPoint.right = right;
        }
    }
}