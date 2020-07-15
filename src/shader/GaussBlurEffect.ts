// 高斯模糊后期处理
export class GaussBlurEffect extends Laya.PostProcessEffect {

    public static TexelSize = Laya.Shader3D.propertyNameToID("u_TexelSize");
    public static BlurRadius = Laya.Shader3D.propertyNameToID("u_BlurRadius");

    private _shader: Laya.Shader3D;
    private _shaderData: Laya.ShaderData = new Laya.ShaderData();
    private _textureTexelSize: Laya.Vector4 = new Laya.Vector4();

    constructor() {
        super();
        this.init();
    }

    public get shader(): Laya.Shader3D {
        return this._shader;
    }

    public get shaderData(): Laya.ShaderData {
        return this._shaderData;
    }

    // 降采样次数
    public downSample: number = 1;
    // 迭代次数
    public iteration: number = 1;
    // 模糊半径
    public set blurRadius(v: number) {
        this._shaderData.setNumber(GaussBlurEffect.BlurRadius, v);
    }

    public setTextureTexelSize(x, y, z, w) {
        this._textureTexelSize.setValue(x, y, z, w);
        this._shaderData.setVector(GaussBlurEffect.TexelSize, this._textureTexelSize);
    }

    public init(): void {
        //所有的attributeMap属性
        var attributeMap: Object = {
            'a_PositionTexcoord': Laya.VertexMesh.MESH_POSITION0,
            'a_Normal': Laya.VertexMesh.MESH_NORMAL0,
            'a_Texcoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0
        };
        //所有的uniform属性
        var uniformMap: Object = {
            'u_MainTex': Laya.Shader3D.PERIOD_MATERIAL,
            'u_AutoExposureTex': Laya.Shader3D.PERIOD_MATERIAL,
            'u_TexelSize': Laya.Shader3D.PERIOD_MATERIAL,
            'u_BlurRadius': Laya.Shader3D.PERIOD_MATERIAL,
        };
        // 创建shader
        this._shader = Laya.Shader3D.add("GaussBlurShader");
        var subShader = new Laya.SubShader(attributeMap, uniformMap);
        this._shader.addSubShader(subShader);
        // 顶点和片元着色器
        let vs = `
            #include "Lighting.glsl";

            attribute vec4 a_PositionTexcoord;
            varying vec2 v_Texcoord0;
            //
            varying vec4 v_uv0;
            varying vec4 v_uv1;
            varying vec4 v_uv2;
            varying vec4 v_uv3;

            uniform float u_BlurRadius;
            uniform vec4 u_TexelSize;

            void main() {
            gl_Position = vec4(a_PositionTexcoord.xy, 0.0, 1.0);
            v_Texcoord0 = a_PositionTexcoord.zw;
            gl_Position = remapGLPositionZ(gl_Position);

            //计算周围的8个uv坐标
            v_uv0.xy = v_Texcoord0.xy + u_TexelSize.xy * vec2(1., 0.) * u_BlurRadius;
            v_uv0.zw = v_Texcoord0.xy + u_TexelSize.xy * vec2(-1., 0.) * u_BlurRadius;

            v_uv1.xy = v_Texcoord0.xy + u_TexelSize.xy * vec2(0., 1.) * u_BlurRadius;
            v_uv1.zw = v_Texcoord0.xy + u_TexelSize.xy * vec2(0., -1.) * u_BlurRadius;

            v_uv2.xy = v_Texcoord0.xy + u_TexelSize.xy * vec2(1., 1.) * u_BlurRadius;
            v_uv2.zw = v_Texcoord0.xy + u_TexelSize.xy * vec2(-1., 1.) * u_BlurRadius;

            v_uv3.xy = v_Texcoord0.xy + u_TexelSize.xy * vec2(1., -1.) * u_BlurRadius;
            v_uv3.zw = v_Texcoord0.xy + u_TexelSize.xy * vec2(-1., -1.) * u_BlurRadius;
            }
        `;
        let fs = `
            #ifdef GL_FRAGMENT_PRECISION_HIGH
            precision highp float;
            #else
            precision mediump float;
            #endif
            
            #include "Colors.glsl";
            #include "Sampling.glsl";
            
            uniform sampler2D u_MainTex;
            uniform sampler2D u_AutoExposureTex;
            uniform vec4 u_TestColor;
            
            varying vec2 v_Texcoord0;
            
            varying vec4 v_uv0;
            varying vec4 v_uv1;
            varying vec4 v_uv2;
            varying vec4 v_uv3;
            
            void main() {
            // 高斯模糊
            vec4 blurColor = vec4(0., 0., 0., 0.);
            blurColor += texture2D(u_MainTex, v_Texcoord0.xy) * 0.1477;
            blurColor += texture2D(u_MainTex, v_uv0.xy) * 0.1183;
            blurColor += texture2D(u_MainTex, v_uv0.zw) * 0.1183;
            blurColor += texture2D(u_MainTex, v_uv1.xy) * 0.1183;
            blurColor += texture2D(u_MainTex, v_uv1.zw) * 0.1183;
            blurColor += texture2D(u_MainTex, v_uv2.xy) * 0.0947;
            blurColor += texture2D(u_MainTex, v_uv2.zw) * 0.0947;
            blurColor += texture2D(u_MainTex, v_uv3.xy) * 0.0947;
            blurColor += texture2D(u_MainTex, v_uv3.zw) * 0.0947;
            //
            gl_FragColor = blurColor;
            }
        `;
        //添加着色器pass
        subShader.addShaderPass(vs, fs);
    }

    render(context:Laya.PostProcessRenderContext) {
        let command = context.command;
        let source = context.source;
        let destination = context.destination;
        // 降低采样次数
        var rt1 = Laya.RenderTexture.createFromPool(source.width >> this.downSample, source.height >> this.downSample, 0, 3);
        this.setTextureTexelSize(1.0 / source.width, 1.0 / source.height, source.width, source.height);

        // //进行迭代高斯模糊
        for (let i = 0; i < this.iteration; i++) {
            command.blitScreenTriangle(source, rt1,null,this._shader, this._shaderData);
            command.blitScreenTriangle(rt1, source,null,this._shader, this._shaderData);
        }
        command.blitScreenTriangle(source, destination,null,this._shader, this._shaderData);
        // 释放
        Laya.RenderTexture.recoverToPool(rt1);
    }
}