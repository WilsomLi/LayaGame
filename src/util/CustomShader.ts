
export default class CustomShader {

    public static initShadowShader(): void {
        let attributeMap: Object = {
            'a_Position': Laya.VertexMesh.MESH_POSITION0,
            'a_BoneWeights':/*laya.d3.graphics.Vertex.VertexMesh.MESH_BLENDWEIGHT0*/7,
            'a_BoneIndices':/*laya.d3.graphics.Vertex.VertexMesh.MESH_BLENDINDICES0*/6,
            //'a_Color':/*laya.d3.graphics.Vertex.VertexMesh.MESH_COLOR0*/1
        };
        let uniformMap: Object = {
            'u_Bones':/*laya.d3.shader.Shader3D.PERIOD_CUSTOM*/0,
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
            'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE,
            'u_Projection': Laya.Shader3D.PERIOD_CAMERA,
            'u_View': Laya.Shader3D.PERIOD_CAMERA,
            'v_PositionWorld': Laya.Shader3D.PERIOD_SPRITE,
            'u_DiffuseColor':/*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/1,
            'u_Color':/*laya.d3.shader.Shader3D.PERIOD_MATERIAL*/1,
            //'u_FogColor':/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4,
            'u_DirectionLight.Color':/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4,
            'u_DirectionLight.Direction':/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4,
            'u_PointLight.Position':/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4,
            'u_PointLight.Range':/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4,
            'u_PointLight.Color':/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4,
            'u_AmbientColor':/*laya.d3.shader.Shader3D.PERIOD_SCENE*/4,
        };

        let vs: string = `
            precision lowp float;
            #include "Lighting.glsl";\n
            uniform DirectionLight u_DirectionLight;\n
            attribute vec4 a_Position;\n
            attribute vec4 a_Color;\n
            //uniform mat4 u_FogColor;\n
            uniform mat4 u_MvpMatrix;\n
            uniform mat4 u_WorldMat;\n
            uniform mat4 u_View;\n
            uniform mat4 u_Projection;\n
            varying vec4 v_Color;\n
            
            #ifdef BONE\n
              const int c_MaxBoneCount = 24;\n
              attribute vec4 a_BoneIndices;\n
              attribute vec4 a_BoneWeights;\n
              uniform mat4 u_Bones[c_MaxBoneCount];\n
            #endif\n
            void main()\n
            {\n
                #ifdef BONE\n
                  mat4 skinTransform = u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n
                  skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n
                  skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n
                  skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n
                  vec4 position = u_WorldMat * skinTransform * a_Position;\n
                  vec3 vPosWorld = position.xyz;\n
                  vec3 direction = -normalize(u_DirectionLight.Direction);\n
                  float opposite = vPosWorld.y ;\n
                  float cosTheta = -direction.y;\n
                  float hypotenuse = opposite / cosTheta;\n
                  vec3 vPos = vPosWorld.xyz + (direction * hypotenuse);\n
                  gl_Position = u_Projection * u_View * vec4(vPos.x, 0.1, vPos.z, 1.0);\n
                  //gl_Position = u_MvpMatrix * a_Position;\n
                #else\n
                  gl_Position = u_MvpMatrix * a_Position;\n
                #endif\n
                
                //暂时保留
                // gl_Position = u_MvpMatrix * a_Position;\n
                // vec3 vPosWorld = (u_WorldMat * a_Position).xyz;\n
                // vec3 direction = -normalize(u_DirectionLight.Direction);\n
                // float opposite = vPosWorld.y ;\n
                // float cosTheta = -direction.y;\n
                // float hypotenuse = opposite / cosTheta;\n
                // vec3 vPos = vPosWorld.xyz + (direction * hypotenuse);\n
                // gl_Position = u_Projection * u_View * vec4(vPos.x, 0.1, vPos.z, 1.0);\n
            }`;
        let ps: string = `
            // #ifdef FSHIGHPRECISION
            // precision highp float;\n
            // #else
            // precision mediump float;\n
            // #endif
            
            precision lowp float;
            void main()\n
            {\n
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.6);\n
            }`;


        let customShader: Laya.Shader3D = Laya.Shader3D.add("CustomShadowShader");
        let subShader: Laya.SubShader = new Laya.SubShader(attributeMap, uniformMap);
        customShader.addSubShader(subShader);
        subShader.addShaderPass(vs, ps);

    }
}