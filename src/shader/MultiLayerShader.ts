
import Shader3D = Laya.Shader3D;
import SubShader = Laya.SubShader;
import VertexMesh = Laya.VertexMesh;
// import { MultiLayer_vs1 } from "./MultiLayer_vs1";
// import { MultiLayer_ps1 } from "./MultiLayer_ps1";

import multiLayerFS from "./multiLayerFS.fs";
import multiLayerVS from "./multiLayerVS.vs";

/**
 * 多图层混合Shader
 */
export default class MultiLayerShader {

    static init() {
        var attributeMap = {
            'a_Position': VertexMesh.MESH_POSITION0,
            'a_Color': VertexMesh.MESH_COLOR0,
            'a_Normal': VertexMesh.MESH_NORMAL0,
            'a_Texcoord0': VertexMesh.MESH_TEXTURECOORDINATE0,
            'a_Texcoord1': VertexMesh.MESH_TEXTURECOORDINATE1,
            'a_BoneWeights': VertexMesh.MESH_BLENDWEIGHT0,
            'a_BoneIndices': VertexMesh.MESH_BLENDINDICES0,
            'a_Tangent0': VertexMesh.MESH_TANGENT0,
            'a_MvpMatrix': VertexMesh.MESH_MVPMATRIX_ROW0,
            'a_WorldMat': VertexMesh.MESH_WORLDMATRIX_ROW0
        };
        var uniformMap = {
            'u_Bones': Shader3D.PERIOD_CUSTOM,
            'u_DiffuseTexture': Shader3D.PERIOD_MATERIAL,

            "u_BaseTexture": Shader3D.PERIOD_MATERIAL,
            "u_texture1": Shader3D.PERIOD_MATERIAL,
            "u_texture2": Shader3D.PERIOD_MATERIAL,
            "u_mask1": Shader3D.PERIOD_MATERIAL,
            "u_mask2": Shader3D.PERIOD_MATERIAL,
            "u_maskIndex": Shader3D.PERIOD_MATERIAL,
            "u_alphaIndex": Shader3D.PERIOD_MATERIAL,

            'u_SpecularTexture': Shader3D.PERIOD_MATERIAL,
            'u_NormalTexture': Shader3D.PERIOD_MATERIAL,
            'u_AlphaTestValue': Shader3D.PERIOD_MATERIAL,
            'u_DiffuseColor': Shader3D.PERIOD_MATERIAL,
            'u_MaterialSpecular': Shader3D.PERIOD_MATERIAL,
            'u_Shininess': Shader3D.PERIOD_MATERIAL,
            'u_TilingOffset': Shader3D.PERIOD_MATERIAL,
            'u_WorldMat': Shader3D.PERIOD_SPRITE,
            'u_MvpMatrix': Shader3D.PERIOD_SPRITE,
            'u_LightmapScaleOffset': Shader3D.PERIOD_SPRITE,
            'u_LightMap': Shader3D.PERIOD_SPRITE,
            'u_CameraPos': Shader3D.PERIOD_CAMERA,
            'u_Viewport': Shader3D.PERIOD_CAMERA,
            'u_ProjectionParams': Shader3D.PERIOD_CAMERA,
            'u_View': Shader3D.PERIOD_CAMERA,
            'u_ReflectTexture': Shader3D.PERIOD_SCENE,
            'u_ReflectIntensity': Shader3D.PERIOD_SCENE,
            'u_FogStart': Shader3D.PERIOD_SCENE,
            'u_FogRange': Shader3D.PERIOD_SCENE,
            'u_FogColor': Shader3D.PERIOD_SCENE,
            'u_DirationLightCount': Shader3D.PERIOD_SCENE,
            'u_LightBuffer': Shader3D.PERIOD_SCENE,
            'u_LightClusterBuffer': Shader3D.PERIOD_SCENE,
            'u_AmbientColor': Shader3D.PERIOD_SCENE,
            'u_shadowMap1': Shader3D.PERIOD_SCENE,
            'u_shadowMap2': Shader3D.PERIOD_SCENE,
            'u_shadowMap3': Shader3D.PERIOD_SCENE,
            'u_shadowPSSMDistance': Shader3D.PERIOD_SCENE,
            'u_lightShadowVP': Shader3D.PERIOD_SCENE,
            'u_shadowPCFoffset': Shader3D.PERIOD_SCENE,
            'u_AmbientSHAr': Shader3D.PERIOD_SCENE,
            'u_AmbientSHAg': Shader3D.PERIOD_SCENE,
            'u_AmbientSHAb': Shader3D.PERIOD_SCENE,
            'u_AmbientSHBr': Shader3D.PERIOD_SCENE,
            'u_AmbientSHBg': Shader3D.PERIOD_SCENE,
            'u_AmbientSHBb': Shader3D.PERIOD_SCENE,
            'u_AmbientSHC': Shader3D.PERIOD_SCENE,
            'u_DirectionLight.color': Shader3D.PERIOD_SCENE,
            'u_DirectionLight.direction': Shader3D.PERIOD_SCENE,
            'u_PointLight.position': Shader3D.PERIOD_SCENE,
            'u_PointLight.range': Shader3D.PERIOD_SCENE,
            'u_PointLight.color': Shader3D.PERIOD_SCENE,
            'u_SpotLight.position': Shader3D.PERIOD_SCENE,
            'u_SpotLight.direction': Shader3D.PERIOD_SCENE,
            'u_SpotLight.range': Shader3D.PERIOD_SCENE,
            'u_SpotLight.spot': Shader3D.PERIOD_SCENE,
            'u_SpotLight.color': Shader3D.PERIOD_SCENE
        };
        var stateMap = {
            's_Cull': Shader3D.RENDER_STATE_CULL,
            's_Blend': Shader3D.RENDER_STATE_BLEND,
            's_BlendSrc': Shader3D.RENDER_STATE_BLEND_SRC,
            's_BlendDst': Shader3D.RENDER_STATE_BLEND_DST,
            's_DepthTest': Shader3D.RENDER_STATE_DEPTH_TEST,
            's_DepthWrite': Shader3D.RENDER_STATE_DEPTH_WRITE
        };

        let shader: Shader3D = Shader3D.add("MultiLayerShader", null, null, true);
        var subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(multiLayerVS, multiLayerFS, stateMap);
    }
}