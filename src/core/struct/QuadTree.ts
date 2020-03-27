
import Point = Laya.Point;
import Rectangle = Laya.Rectangle;
import Vector3 = Laya.Vector3;

/**
 * 四叉树
 */
class QuadTree {

    private _objects:Array<any>;
    private _nodes:Array<QuadTree>;
    private _level:number;//层级
    private _boundCorners:Array<any>;
    private _rects:Array<any>;
    private _bounds:Rectangle;

    static readonly MAX_OBJECTS:number = 25;
    static readonly MAX_LEVELS:number = 6;

    constructor(bounds:Rectangle, level:number) {
        this._objects = [];
        this._nodes = [];
        this._boundCorners = [];
        for(let i=0; i<8; i++) {
            this._boundCorners.push(new Vector3());
        }
        this._rects = [];
        this._bounds = bounds;
        this._level = level;
    }

    public clear() {
        this._level = 0;
        for(let i=0;i<this._nodes.length;i++) {
            if(this._nodes.length != 0) {
                this._nodes[i].clear();
            }
        }
        this._nodes.length = 0;
        this._objects.length = 0;
    }

    public getIndex(rect:Rectangle):number {
        let bound = this._bounds;
        let i = rect.y <= bound.y - bound.height / 2;
        let n = rect.y - rect.height >= bound.y - bound.height / 2;
        let a = rect.x + rect.width <= bound.x + bound.width / 2;
        let r = rect.x >= bound.x + bound.width / 2;
        if(n) {
            if(r) return 0;
            if(a) return 1;
        }
        else if(i) {
            if(a) return 2;
            if(r) return 3;
        }
        return -1;
    }

    public split() {
        let x = this._bounds.x;
        let y = this._bounds.y;
        let halfW = this._bounds.width / 2;
        let halfH = this._bounds.height / 2;
        let nextLevel = this._level + 1;
        let node1 = new QuadTree(new Rectangle(x+halfW,y,halfW,halfH),nextLevel);
        let node2 = new QuadTree(new Rectangle(x,y,halfW,halfH),nextLevel);
        let node3 = new QuadTree(new Rectangle(x,y+halfH,halfW,halfH),nextLevel);
        let node4 = new QuadTree(new Rectangle(x+halfW,y+halfH,halfW,halfH),nextLevel);
        this._nodes.push(node1);
        this._nodes.push(node2);
        this._nodes.push(node3);
        this._nodes.push(node4);
    }

    public insert(rect:Rectangle) {
        let i = 0,index=0;
        if(this._nodes.length > 0) {
            index = this.getIndex(rect);
            if(index != -1) {
                this._nodes[index].insert(rect);
                return;
            }
        }
        this._objects.push(rect);
        if(this._objects.length > QuadTree.MAX_OBJECTS && this._level < QuadTree.MAX_LEVELS) {
            if(this._nodes.length == 0) {
                this.split();
            }

            while(i<this._objects.length) {
                index = this.getIndex(this._objects[i]);
                if(index != -1) {
                    this._nodes[index].insert(this._objects.splice(i,1)[0]);
                }
                else {
                    i = i + 1;
                }
            }
        }
    }

    public retrieve(rect:Rectangle) {
        let index = this.getIndex(rect);
        let result = this._objects;
        if(this._nodes.length > 0) {
            if(index != -1) {
                result = result.concat(this._nodes[index].retrieve(rect));
            }
            else {
                for(let i=0;i<this._nodes.length;i++) {
                    result = result.concat(this._nodes[i].retrieve(rect));
                }
            }
        }
        return result;
    }
}