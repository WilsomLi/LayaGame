/**截屏功能
 * 说明:修改了Laya.core.js 中drawToCanvas方法,有注释;
 * 使用的时候,需要将bin/下Laya.core.js 压缩 替换至对应平台的SDK文件夹中
*/
export default class ScreenCapture {
    /**
     * 截屏
     * @param Scene3D 当前3D创景 
     */
    public static ImageCapture(Scene3D: Laya.Scene3D) {
        let self = this;
        Config.preserveDrawingBuffer = true;
        Laya.timer.frameOnce(100, self, function () {
            var spr = new Laya.Sprite();
            spr.graphics.drawTexture(ScreenCapture.outTexture(Scene3D));
            Laya.timer.frameOnce(10, self, function () {
                var kk = spr.drawToCanvas(512, 512, 0, 0);
                var s = kk.toBase64("image/png", 0.9);
                Config.preserveDrawingBuffer = false;
                //需要用的地方进行传递
            })
        })
    }

    /**
     * 输出纹理信息 
     * @param Scene3D
     * 渲染的信息为新增相机的视角范围,可自定义调整 贴图大小也可自定义调整 
     */
    public static outTexture(Scene3D: Laya.Scene3D) {
        var renderTargetCamera: Laya.Camera = <Laya.Camera>Scene3D.addChild(new Laya.Camera(0, 0.3, 1000));
        renderTargetCamera.transform.position = new Vector3(0, 3.76, 0);
        renderTargetCamera.transform.rotate(new Vector3(-90, 180, 0), true, false);
        //选择渲染目标为纹理
        renderTargetCamera.renderTarget = new Laya.RenderTexture(512, 512);
        //渲染顺序
        renderTargetCamera.renderingOrder = -1;
        //清除标记
        renderTargetCamera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        var rtex = new Laya.Texture(((<Laya.Texture2D>(renderTargetCamera.renderTarget as any))), Laya.Texture.DEF_UV);
        return rtex;
    }

}