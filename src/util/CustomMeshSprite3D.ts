import Utils from "./Utils";
import SceneMgr from "../mgr/SceneMgr";

/**
 * 物体移动，动态生成网格
 */
export default class CustomMeshSprite3D extends Laya.MeshSprite3D {

    private _mesh: Laya.Mesh;

    private _vertices: ArrayBuffer;
    private _indices: Uint16Array;
    private _verticeIndex:number = 0;
    private _indiceIndex:number = 0;
    private _firstTwoPoint:boolean = false;    

    private _verticeStart:number = 0;
    private _indiceStart:number = 0;
    private _triFaces:number = 0;

    private _frameCnt:number = 0;
    private _isDebug: boolean = true;
    private _lineObj: Laya.PixelLineSprite3D;

    static readonly BUFF_SIZE:number = 1500;

    constructor() {
        super();

        this.name = "CustomMeshSprite3D";

        let mat = new Laya.BlinnPhongMaterial();
        this.meshRenderer.material = mat;
        mat.albedoColor = new Laya.Vector4(0.207, 0.199, 0.383, 0);    
        // mat._Cutoff = 0;
    };
    
    createMesh(color:Laya.Vector4) {
        this._vertices = new ArrayBuffer(CustomMeshSprite3D.BUFF_SIZE);
        this._indices = new Uint16Array(CustomMeshSprite3D.BUFF_SIZE);
        var vertexDeclaration: Laya.VertexDeclaration = Laya.VertexMesh.getVertexDeclaration("POSITION");//,NORMAL,UV
        vertexDeclaration.vertexElementCount
        
        // Laya.PrimitiveMesh._createMesh(vertexDeclaration, this._vertices, this._indices);

        this._mesh = new Laya.Mesh(); 
        this._mesh.setVertices(this._vertices);
        this._mesh.setIndices(this._indices);
        
        this.meshFilter.sharedMesh = this._mesh;
        this.clearData();
        let mat = this.meshRenderer.material as Laya.BlinnPhongMaterial;
        mat.albedoColor = color;
    }

    clearData() {
        this._verticeIndex = 0;
        this._indiceIndex = 0;
        this._verticeStart = 0;
        this._indiceStart = 0;
        this._triFaces = 0;
        this._firstTwoPoint = true;
        this._frameCnt = 0;
    }

    updatePath(center:Laya.Vector3,vec1:Laya.Vector3,vec2:Laya.Vector3):void { 
        // this._frameCnt++;
        if(this._vertices==null || this._indices==null) return;// || this._frameCnt%2==0

        // if(!SceneMgr.PathBlock) {
        //     //随机
        //     let random:number = Utils.Range(-0.2,0.2);
        //     vec1.x += random;
        //     vec2.x += random;
        // }

        if(this._verticeIndex >= CustomMeshSprite3D.BUFF_SIZE) {
            this._verticeIndex = 0;
        }
        if(this._indiceIndex >= CustomMeshSprite3D.BUFF_SIZE) {
            this._indiceIndex = 0
        }
        
        if(this._triFaces >= 200) {
            this._verticeStart = this._verticeIndex - 606;
            this._indiceStart = this._indiceIndex - 600;
            // console.log("_verticeIndex",this._verticeIndex,"_indiceIndex",this._indiceIndex);
            // console.log("_verticeStart",this._verticeStart,"_indiceStart",this._indiceStart);
            this._triFaces = 0;
        }

        //顶点填充
        this._vertices[this._verticeIndex++] = vec1.x;
        this._vertices[this._verticeIndex++] = 0;
        this._vertices[this._verticeIndex++] = vec1.z;

        this._vertices[this._verticeIndex++] = vec2.x;
        this._vertices[this._verticeIndex++] = 0;
        this._vertices[this._verticeIndex++] = vec2.z;

        if(this._firstTwoPoint && this._verticeIndex <= 6) {
            this._firstTwoPoint = false;
            return;
        }

        //索引填充
        let startIndex:number = (this._verticeIndex - this._indiceStart) / 3 - 1;
        if(startIndex < 0) {
            startIndex = (this._verticeIndex + CustomMeshSprite3D.BUFF_SIZE-this._indiceStart)/3 - 1;
        }
        this._indices[this._indiceIndex++] = startIndex - 2;
        this._indices[this._indiceIndex++] = startIndex - 1;
        this._indices[this._indiceIndex++] = startIndex;
        this._indices[this._indiceIndex++] = startIndex - 3;
        this._indices[this._indiceIndex++] = startIndex - 1;
        this._indices[this._indiceIndex++] = startIndex - 2;        
        
        let vert = this.getArrayData(Float32Array,this._vertices,this._verticeStart,this._verticeIndex);        
        // this._mesh._vertexBuffers[0].setData(vert);
        
        let indec = this.getArrayData(Uint16Array,this._indices,this._indiceStart,this._indiceIndex);
        // this._mesh._indexBuffer.setData(indec);

        // console.log("_verticeIndex",this._verticeIndex,"_indiceIndex",this._indiceIndex);
        // console.log("_verticeStart",this._verticeStart,"_indiceStart",this._indiceStart);
        
        //更新包围盒，避免视锥剔除渲染
        // //2.0.2是包围盒
        // this._render.boundingBox.max.z = vec2.z;
        // this._render.boundingBox.min.z = vec2.z - 5;
        let bound = this.meshRenderer.bounds._boundBox;
        bound.max.z = vec2.z;
        bound.min.z = vec2.z - 5;

        //2.0.0 是包围球        
        // this._render.boundingSphere.center.setValue(center.x,center.y,center.z);
        // if(this._render._visible==false) {
        //     console.log("1111111111111111")
        // }

        this._triFaces += 2;

        // console.log("vertexCount",this._mesh.vertexCount);

        // if (this._isDebug && this._lineObj==null) {
        //     this._lineObj = this.parent.addChild(new Laya.PixelLineSprite3D(100000)) as Laya.PixelLineSprite3D;
        //     window["Tool"].linearModel(this, this._lineObj, Laya.Color.GREEN);
        // }
    }    

    private getArrayData(T:any,buffer:any,start:number,end:number):void {
        let count:number = end - start;
        if(start > end) {
            count = CustomMeshSprite3D.BUFF_SIZE - start + end;
        }
        let array:any = new T(count);
        let index:number = 0;
        for(let i:number=0; i<count; i++) {
            index = start+i;
            if(index >= CustomMeshSprite3D.BUFF_SIZE) {
                index = index - CustomMeshSprite3D.BUFF_SIZE;
            }
            else if(index < 0) {
                index = index + CustomMeshSprite3D.BUFF_SIZE;
            }
            array[i] = buffer[index];
        }
        return array;
    }
}