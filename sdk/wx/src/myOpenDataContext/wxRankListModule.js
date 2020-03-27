const Utils = require("wxUtils")

class wxRankListModule {
    constructor() {
        this.init();
    }
    // 初始化;
    init() {
        this.gameDatas = null;
        this.config = null;
        this.scrollMoveY = null;
        this.moveSpeed = 20;
        this.scrollOffsetY = 0;

        // 公共画布;
        this.sharedCanvas = wx.getSharedCanvas();
        this.sharedCtx = this.sharedCanvas.getContext('2d');

        // 排行榜画布数组;
        this.rankListCanvasArr = [];
        // 排行榜画布计数;
        this.drawRankListArr = [];
        // 自己的排行画布;
        this.ownerRankCanvas = wx.createCanvas();
        this.ownerRankCtx = this.ownerRankCanvas.getContext('2d');

        // Utils.loadImage('wxlocal/rank5.jpg', (_img)=>{
        // 	this.ownerRankCtx.drawImage(_img, 0, 560, 635, 106);
        // });
    }

    // 重置排行榜画布大小;
    resetCanvasSize(canvas, width, height) {
        canvas.width = width;
        canvas.height = height;
    }

    // 重置自己的画布大小;
    resetOwnerRankCavasSize(width, height) {
        this.ownerRankCanvas.width = width;
        this.ownerRankCanvas.height = height;
    }

    // 设置配置;
    setConfigData(data) {
        this.config = data;
    }

    // 设置游戏数据;
    setGameData(data) {
        this.gameDatas = data;
    }

    /**
     * 创建排行榜画布;
     * @param {画布张数} index
     */
    createRankListCanvasArr(index) {
        if (!this.rankListCanvasArr[index]) {
            var canvas = wx.createCanvas();
            this.rankListCanvasArr[index] = canvas;
        }
        return this.rankListCanvasArr[index];
    }

    // 展示排行榜;
    showLayer(configData, listData, updateAllLayerFunc) {
        // test
        // for(let i=1;i<10;i++)
        //   listData[i] = listData[0];
        // test end
        this._updateAllLayerFunc = updateAllLayerFunc;

        this.clearRankCanvas();
        this.clearShareCanvas();

        // 排行榜画布计数;
        this.drawRankListArr = [];

        this.scrollOffsetY = 0;

        this.setConfigData(configData);
        this.setGameData(listData);

        // 列表最大数量;
        const rankList_MaxCnt = 100;

        // 子控件高度;
        this.item_height = 100;

        // 排行榜框架宽高,子控件宽度和排行榜框架宽度相同;
        this.frame_width = 580;
        this.frame_height = 545;

        // 列表画布高度;
        this.rankCanvasHeight = this.gameDatas.length > rankList_MaxCnt ? rankList_MaxCnt * this.item_height : this.gameDatas.length * this.item_height

        // 如果画布超过2048,(最大长度是4096)则定制长度, 分画布加载;
        const maxCanvasHeight = 800;
        // 一页的长度;
        this.oneRankItemCnt = 6;// Math.ceil(maxCanvasHeight / this.item_height);
        this.oneRankCanvasHeight = this.oneRankItemCnt * this.item_height;
        const rankCanvasCnt = Math.ceil(this.rankCanvasHeight / this.oneRankCanvasHeight);
        for (var i = 0; i < rankCanvasCnt; i++) {
            const onRankCanvas = this.createRankListCanvasArr(i);
            // 重置一页画布的大小;
            this.resetCanvasSize(onRankCanvas, this.sharedCanvas.width, this.oneRankCanvasHeight);
        }

        this.resetOwnerRankCavasSize(this.sharedCanvas.width, maxCanvasHeight);

        // 设计分辨率宽度;
        this.designCanvasW = 750;
        this.designCanvasH = 1334;

        // 滚动最长高度;
        this.scrollMax = this.rankCanvasHeight - this.frame_height;

        // 框架偏移;
        this.frame_x = this.sharedCanvas.width / 2 - this.frame_width / 2;
        this.frame_y = 0;// this.sharedCanvas.height / 2 - (this.frame_height + 150) / 2;

        this.drawRankList(0);
    }

    // 显示排行榜;
    _updateDrawCanvas() {
        if (this._updateAllLayerFunc == null) return;
        //裁切;
        this.sharedCtx.save()
        this.sharedCtx.beginPath()
        this.sharedCtx.rect(
            this.frame_x,
            this.frame_y,
            this.frame_width,
            this.frame_height
        )
        this.sharedCtx.clip()

        this.redrawRankCanvas(-this.frame_x, -this.frame_y + this.scrollOffsetY, this.sharedCtx)

        this.sharedCtx.restore()

        //绘制;
        this.sharedCtx.drawImage(
            this.ownerRankCanvas,
            0,
            0,
            this.sharedCanvas.width,
            this.sharedCanvas.height,
            0,
            0,
            this.sharedCanvas.width,
            this.sharedCanvas.height
        );
    }

    // 重新绘制排行榜里面画布的列表;
    redrawRankCanvas(x, y, ctx) {
        const shareWidth = this.sharedCanvas.width
        const shareHeight = this.sharedCanvas.height
        for (var i = 0; i < this.rankListCanvasArr.length; i++) {
            const canvas = this.rankListCanvasArr[i];
            ctx.drawImage(canvas, x, y - canvas.height * i, shareWidth, shareHeight, 0, 0, shareWidth, shareHeight);
        }
    }

    // 绘制排行榜;
    drawRankList(index) {
        if (!this.drawRankListArr[index]) {
            this.drawRankListArr[index] = true;

            const startIndex = index * this.oneRankItemCnt;
            const endIndex = (index + 1) * this.oneRankItemCnt;
            var isShowSelf = false;

            for (var i = startIndex; i < this.gameDatas.length; i++) {
                if (!this.gameDatas[i]) {
                    break;
                }
                const rank = i + 1;
                const data = this.gameDatas[i];
                //好友排行
                if (i < endIndex) {
                    const itemPy = (i % this.oneRankItemCnt) * (this.item_height) + 1;//注意: 此处不能为0顶在最上面，要往下略便宜
                    const canvas = this.rankListCanvasArr[index];
                    if (canvas) {
                        const ctx = canvas.getContext('2d')
                        this.drawRankItem(ctx, rank, data, itemPy);
                    }
                } else if (isShowSelf) {
                    break;
                }
                //我的排行
                const owner = Utils.getOwnerData();
                const isself = owner.nickName == data.nickname;
                if (isself && this.ownerRankCtx) {
                    isShowSelf = true;
                    this.drawOwnRank(this.ownerRankCtx, rank, data, this.frame_height + 25);
                }
            }
        }
    }

    /**
     * 绘制一个排行子控件;
     * @param {排名} rank
     * @param {排名数据} data
     * @param {排行子控件所在坐标y} itemPy
     */
    drawRankItem(ctx, rank, data, itemPy) {
        //console.log("itemPy = ",itemPy)
        const _ctx = ctx;
        var _avatarUrl = data.avatarUrl || "wxlocal/ranking_img_headBg.png";

        const item_width = this.frame_width;
        const item_height = this.item_height;

        const starPx = 17;//(this.frame_width - item_width)/2 + 20;
        const starPy = itemPy;

        const itemBgWidth = 545;//item_width - 2;
        const itemBgHeight = 87;//item_height - 2;

        const owner = Utils.getOwnerData();
        const isself = false;//owner.nickName == data.nickname;
        // 绘制子控件背景;
        const drawRankBg = function () {

            // 资源路径;
            let _bgSrc = null;
            if (rank % 2 != 0) {
                _bgSrc = "wxlocal/ranking_img_cellBg2.png";
            }
            else {
                _bgSrc = 'wxlocal/ranking_img_cellBg2.png';
            }
            if (_bgSrc) {
                Utils.loadImage(_bgSrc, (_img) => {
                    _ctx.drawImage(_img, starPx, starPy, itemBgWidth, itemBgHeight);
                    // console.log("line", starPx, starPy+95, itemBgWidth, itemBgHeight);
                    // 向下绘制;
                    drawRankNum();
                })
            }
            else {
                drawRankNum();
            }
        }.bind(this);

        // 绘制排名-名次;
        const rankPx = starPx + 20;
        const rankPy = starPy - 10;
        const drawRankNum = function () {
            const centerPy = item_height / 2;
            var rankIcon = '';
            if (rank == 1) {
                rankIcon = 'wxlocal/ranking_img_no1.png';
            } else if (rank == 2) {
                rankIcon = 'wxlocal/ranking_img_no2.png';
            } else if (rank == 3) {
                rankIcon = 'wxlocal/ranking_img_no3.png';
            }
            if (rankIcon.length > 0) {
                Utils.loadImage(rankIcon, (_img) => {
                    _ctx.drawImage(_img, rankPx + 10, rankPy + 24, 43, 62);
                    // 向下绘制;
                    drawRankPhoto();
                });
            } else {
              Utils.drawLabel(_ctx, rank, rankPx + 30, rankPy + centerPy, 30, isself ? "#e8a625" : "#e8a625", "center");
                // 向下绘制;
                drawRankPhoto();
            }
        }.bind(this);

        // 绘制头像;
        const photoBgWidth = 67;
        const photoBgHeight = 67;
        const photoBgPx = rankPx + 110;
        const photoBgPy = rankPy + (item_height - photoBgHeight) / 2 + 5;
        const drawRankPhoto = function () {
            if (_avatarUrl) {
                Utils.loadImage("wxlocal/ranking_img_headBg.png", function (_img) {
                    const photoWidth = photoBgWidth + 12;
                    const photoHeight = photoBgHeight + 12;
                    const photoPx = photoBgPx - 6;
                    const photoPy = photoBgPy - 6;
                    _ctx.drawImage(_img, photoPx, photoPy, photoWidth, photoHeight);

                    // 向下绘制;
                    drawRankPhotoIcon();
                }.bind(this));
            }
        }.bind(this);
        const drawRankPhotoIcon = function () {
            if (_avatarUrl) {
                Utils.loadImage(_avatarUrl, function (_img) {
                    const photoWidth = photoBgWidth;
                    const photoHeight = photoBgHeight;
                    const photoPx = photoBgPx;
                    const photoPy = photoBgPy;
                    // _ctx.drawImage(_img, photoPx, photoPy, photoWidth, photoHeight);
                    _ctx.save(); //保存上下文
                    _ctx.beginPath(); //开始绘制
                    _ctx.arc(photoPx + photoWidth / 2, photoPy + photoHeight / 2, photoWidth / 2 + 10, 0, 2 * Math.PI, false); //画一个圆
                    _ctx.clip(); //裁剪这个圆
                    _ctx.drawImage(_img, photoPx, photoPy, photoWidth, photoHeight); //将图片绘制进圆
                    _ctx.restore(); //恢复上下文  接下来可以进行其他绘制操作

                    // 向下绘制;
                    drawNickname();
                }.bind(this));
            }
        }.bind(this);

        // 绘制昵称;
        const nicknamePx = photoBgPx + photoBgWidth + 105;
        const nicknamePy = rankPy + item_height / 2;
        const drawNickname = function () {
            var nameValue = Utils.getValueByKey(data, 'nickname', '');
            if(nameValue.length > 5){
                nameValue = nameValue.slice(0,5);
            }
            Utils.drawLabel(_ctx, nameValue, nicknamePx, nicknamePy, 28, isself ? "#ffa646" : '#818181', "center");
            // 向下绘制;
            drawstage();
        }.bind(this);

        // 绘制关卡
        const stagePx = nicknamePx + 180;
        const stagePy = nicknamePy;
        const drawstage = function () {
            var _value = "1";
            if (data && data.KVDataList && data.KVDataList.length > 1) {
              _value = data.KVDataList[1].value;
            }
            Utils.drawLabel(_ctx, _value, stagePx, stagePy, 28, isself ? "#ffa646" : "#818181", "center");
            // 向下绘制;
            this.clearShareCanvas();
        }.bind(this)

        drawRankBg();
    }
    /**
     * 绘制一个排行子控件;
     * @param {排名} rank
     * @param {排名数据} data
     * @param {排行子控件所在坐标y} itemPy
     */
    drawOwnRank(ctx, rank, data, itemPy) {
        // console.log("drawOwnRank itemPy = ",itemPy);
        const _ctx = ctx;
        var _avatarUrl = data.avatarUrl || "wxlocal/ranking_img_headBg.png";

        const item_width = this.frame_width;
        const item_height = this.item_height;

        const starPx = 17;//(this.frame_width - item_width)/2 + 20;
        const starPy = 574;//itemPy;

        const itemBgWidth = 545;//item_width - 2;
        const itemBgHeight = 87;//item_height - 2;

        // 绘制子控件背景;
        const drawRankBg = function () {
            // 资源路径;
            Utils.loadImage("wxlocal/ranking_img_selfBg.png", (_img) => {
                _ctx.drawImage(_img, starPx, starPy, itemBgWidth, itemBgHeight);
                // 向下绘制;
                drawRankNum();
            });
        }.bind(this);

        // 绘制排名-名次;
        const rankPx = starPx + 20;
        const rankPy = starPy - 10;
        const drawRankNum = function () {
            const centerPy = item_height / 2;
            var rankIcon = '';
            if (rank == 1) {
                rankIcon = 'wxlocal/ranking_img_no1.png';
            } else if (rank == 2) {
                rankIcon = 'wxlocal/ranking_img_no2.png';
            } else if (rank == 3) {
                rankIcon = 'wxlocal/ranking_img_no3.png';
            }
            if (rankIcon.length > 0) {
                Utils.loadImage(rankIcon, (_img) => {
                    _ctx.drawImage(_img, rankPx + 10, rankPy + 24, 43, 62);
                    // 向下绘制;
                    drawRankPhoto();
                });
            } else {
                Utils.drawLabel(_ctx, rank, rankPx + 30, rankPy + centerPy, 30, "#ffffff", "center");
                // 向下绘制;
                drawRankPhoto();
            }
        }.bind(this);

        // 绘制头像;
        const photoBgWidth = 67;
        const photoBgHeight = 67;
        const photoBgPx = rankPx + 110;
        const photoBgPy = rankPy + (item_height - photoBgHeight) / 2 + 5;
        const drawRankPhoto = function () {
            if (_avatarUrl) {
                Utils.loadImage("wxlocal/ranking_img_headBg.png", function (_img) {
                    const photoWidth = photoBgWidth + 12;
                    const photoHeight = photoBgHeight + 12;
                    const photoPx = photoBgPx - 6;
                    const photoPy = photoBgPy - 6;
                    _ctx.drawImage(_img, photoPx, photoPy, photoWidth, photoHeight);

                    // 向下绘制;
                    drawRankPhotoIcon();
                }.bind(this));
            }
        }.bind(this);
        const drawRankPhotoIcon = function () {
            if (_avatarUrl) {
                Utils.loadImage(_avatarUrl, function (_img) {
                    const photoWidth = photoBgWidth;
                    const photoHeight = photoBgHeight;
                    const photoPx = photoBgPx;
                    const photoPy = photoBgPy;
                    // _ctx.drawImage(_img, photoPx, photoPy, photoWidth, photoHeight);
                    _ctx.save(); //保存上下文
                    _ctx.beginPath(); //开始绘制
                    _ctx.arc(photoPx + photoWidth / 2, photoPy + photoHeight / 2, photoWidth / 2 + 10, 0, 2 * Math.PI, false); //画一个圆
                    _ctx.clip(); //裁剪这个圆
                    _ctx.drawImage(_img, photoPx, photoPy, photoWidth, photoHeight); //将图片绘制进圆
                    _ctx.restore(); //恢复上下文  接下来可以进行其他绘制操作

                    // 向下绘制;
                    drawNickname();
                }.bind(this));
            }
        }.bind(this);

        // 绘制昵称;
        const nicknamePx = photoBgPx + photoBgWidth + 105;
        const nicknamePy = rankPy + item_height / 2;
        const drawNickname = function () {
            var nameValue = Utils.getValueByKey(data, 'nickname', '');
            if(nameValue.length > 5){
                nameValue = nameValue.slice(0,5);
            }
            Utils.drawLabel(_ctx, nameValue, nicknamePx, nicknamePy, 22, '#ffffff', "center");
            // 向下绘制;
            drawstage();
        }.bind(this);

        // 绘制关卡
        const stagePx = nicknamePx + 180;
        const stagePy = nicknamePy;
        const drawstage = function () {
            var _value = "1";
            if (data && data.KVDataList && data.KVDataList.length > 1) {
              _value = data.KVDataList[1].value;
            }
            Utils.drawLabel(_ctx, _value, stagePx, stagePy, 22, "#ffffff", "center");
            // 向下绘制;
            this.clearShareCanvas();
        }.bind(this)

        drawRankBg();
    }

    moveScrollView(speed) {
        if (this.scrollMax <= 0) {
            return;
        }

        this.clearShareCanvas();

        this.scrollOffsetY += speed
        if (this.isTop()) {
            this.scrollOffsetY = 0;
        }

        if (this.isBottom()) {
            this.scrollOffsetY = this.scrollMax;
        }

        const _pageIndex = Math.floor(this.scrollOffsetY / this.oneRankCanvasHeight);
        this.drawRankList(_pageIndex + 1);
    }

    isTop() {
        if (this.scrollOffsetY <= 0) {
            return true;
        }
        return false;
    }

    isBottom() {
        if (this.scrollOffsetY >= this.scrollMax) {
            return this.scrollMax;
        }
        return false;
    }

    // 清除排行榜;
    clear() {
        if (this._updateAllLayerFunc == null) return;
        this.setConfigData(null);
        this.setGameData(null);
        this.clearRankCanvas();

        this.ownerRankCtx.clearRect(0, 0, this.ownerRankCanvas.width, this.ownerRankCanvas.height);
        this.clearShareCanvas();
        this._updateAllLayerFunc = null;

        // console.log("清除排行榜 222222222")
    }

    clearRankCanvas() {
        for (var i = 0; i < this.rankListCanvasArr.length; i++) {
            this.clearRankCanvasByIndex(i);
        }
    }

    clearRankCanvasByIndex(index) {
        const canvas = this.rankListCanvasArr[index]
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    clearShareCanvas() {
        this.sharedCtx.clearRect(0, 0, this.sharedCanvas.width, this.sharedCanvas.height);
        this._updateAllLayerFunc && this._updateAllLayerFunc();
    }
}

module.exports = new wxRankListModule();