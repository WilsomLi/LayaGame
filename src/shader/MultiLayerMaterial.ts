import Shader3D = Laya.Shader3D;
import Texture2D = Laya.Texture2D;
import BaseTexture = Laya.BaseTexture;
import Tween = Laya.Tween;

/**
 * 多图层材质
 */
export class MultiLayerMaterial extends Laya.BlinnPhongMaterial {
    public static BASE_TEXTURE = Shader3D.propertyNameToID("u_BaseTexture");
    public static TEXTURE1 = Shader3D.propertyNameToID("u_texture1");
    public static TEXTURE2 = Shader3D.propertyNameToID("u_texture2");
    public static MASK1 = Shader3D.propertyNameToID("u_mask1");
    public static MASK2 = Shader3D.propertyNameToID("u_mask2");
    public static ALPHA = Shader3D.propertyNameToID("u_alpha");
    public static ALPHAINDEX = Shader3D.propertyNameToID("u_alphaIndex");

    constructor() {
        super();
        this.setShaderName('MultiLayerShader');
        this.alphaAni = 0;
        // this.twinkle();
        this.alphaIndex = 1;

    }

    /**
     * 基础纹理
     */
    public set baseTexture(value) {
        if (value)
            this._shaderValues.addDefine(MultiLayerMaterial.SHADERDEFINE_DIFFUSEMAP);
        else
            this._shaderValues.removeDefine(MultiLayerMaterial.SHADERDEFINE_DIFFUSEMAP);
        this._shaderValues.setTexture(MultiLayerMaterial.BASE_TEXTURE, value);
    }

    public set alphaAni(value) {
        this._shaderValues.setNumber(MultiLayerMaterial.ALPHA, value);
    }
    public get alphaAni(): number {
        return this._shaderValues.getNumber(MultiLayerMaterial.ALPHA);
    }
    public set alphaIndex(value) {
        this._shaderValues.setInt(MultiLayerMaterial.ALPHAINDEX, value);
    }
    public get alphaIndex(): number {
        return this._shaderValues.getInt(MultiLayerMaterial.ALPHAINDEX);
    }
    // public twinkle() {
    //     // this._shaderValues["_data"][""+MultiLayerMaterial.ALPHA] = 0.5
    //     // this.alphaAni = 0.4

    //     this.alphaAni = 0;
    //     let tw: Tween = Tween.to(this._shaderValues["_data"], {
    //         ["" + MultiLayerMaterial.ALPHA]: 1.0
    //     }, 3000, null, Laya.Handler.create(this, this.twinkle))
    //     // tw.
    //     // tw.on(Laya.Event.PROGRESS,this,)
    // }

    /**
     * 清除指定蒙层的遮罩
     */
    public clearMask(maskIndex: number = -1) {
        if (maskIndex == -1) {
            this.mask1 && this.mask1.setPixels(new Uint8Array(this.mask1.width * this.mask1.height * 4));
            this.mask2 && this.mask2.setPixels(new Uint8Array(this.mask1.width * this.mask1.height * 4));
        } else {
            switch (maskIndex) {
                case 1:
                    this.mask1 && this.mask1.setPixels(new Uint8Array(this.mask1.width * this.mask1.height * 4));
                    break;
                case 2:
                    this.mask2 && this.mask2.setPixels(new Uint8Array(this.mask1.width * this.mask1.height * 4));
                    break;
            }
        }
    }
    public get baseTexture() {
        return this._shaderValues.getTexture(MultiLayerMaterial.BASE_TEXTURE);
    }
    public set mask1(value) {
        this._shaderValues.setTexture(MultiLayerMaterial.MASK1, value);
    }
    public get mask1(): Texture2D {
        return (this._shaderValues.getTexture(MultiLayerMaterial.MASK1) as Texture2D);
    }
    public set mask2(value) {
        this._shaderValues.setTexture(MultiLayerMaterial.MASK2, value);
    }
    public get mask2(): Texture2D {
        return this._shaderValues.getTexture(MultiLayerMaterial.MASK2) as Texture2D;
    }
    public set texture1(value) {
        this._shaderValues.setTexture(MultiLayerMaterial.TEXTURE1, value);
        let mask: Texture2D;
        let pixels: Uint8Array;
        let width = 512;
        let height = 512;
        let flag = true; //true 为重新创建纹理，false 为清除mask纹理；
        if (!this.mask1) {
            if (value) {
                width = value.width;
                height = value.width;
            }
            this.mask1 = mask;
        } else {
            if (this.mask1.width != value.width || this.mask1.height != value.height) {
                width = value.width;
                height = value.width;
                flag = false
            }
        }
        pixels = new Uint8Array(width * height * 4);

        if (flag) {
            mask = new Texture2D(width, height, 1, false, true);//遮罩不能开启mipmap
            mask.setPixels(pixels);
            this.mask1 = mask;
        } else {
            this.mask1.setPixels(pixels);
        }

    }
    public get texture1() {
        return this._shaderValues.getTexture(MultiLayerMaterial.TEXTURE1);
    }

    public getTilingTexture(originTexture: Laya.Texture2D): Laya.Texture2D {
        if(!originTexture) {
            return null;
        }
        //TODO 平铺贴图4*4
        let w = originTexture.width, h = originTexture.height;
        let width = 512;
        let height = 512;
        let tillingTexture = new Texture2D(width, height, 1, false, false);
        let tileX = width / w;
        let tileY = height / h;
        let originPixels = originTexture.getPixels();
        for (let i = 0; i < tileX; i++) {
            for (let j = 0; j < tileY; j++) {
                tillingTexture.setSubPixels(i*w,j*h,w,h,originPixels);
            }
        }
        return tillingTexture;
    }

    public set texture2(value) {
        //TODO 美术给的图片是128*128要做tiling

        let tilingTexture = this.getTilingTexture(value as Laya.Texture2D);
        this._shaderValues.setTexture(MultiLayerMaterial.TEXTURE2, tilingTexture);

        // this._shaderValues.setTexture(MultiLayerMaterial.TEXTURE2, value);

        let width = 512;
        let height = 512;
        let mask: Texture2D;
        let pixels: Uint8Array;
        let flag = true; //true 为重新创建纹理，false 为清除mask纹理；
        if (!this.mask2) {
            // if (value) {
            //     width = value.width;
            //     height = value.width;
            // }
            this.mask2 = mask;
        }
        // else {
        //     if (value && (this.mask2.width != value.width || this.mask2.height != value.height)) {
        //         width = value.width;
        //         height = value.width;
        //         flag = false
        //     }
        // }
        pixels = new Uint8Array(width * height * 4);

        if (flag) {
            mask = new Texture2D(width, height, 1, false, true);
            mask.setPixels(pixels);
            this.mask2 = mask;
        } else {
            this.mask2.setPixels(pixels)
        }

    }
    public get texture2() {
        return this._shaderValues.getTexture(MultiLayerMaterial.TEXTURE2);
    }
}