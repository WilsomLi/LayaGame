
/**
 * 双向链表节点
 */
class DoubleLinkNode<T> {
    public data: T;
    public param1: any;
    public param2: any;
    public pre: DoubleLinkNode<T>;
    public next: DoubleLinkNode<T>;

    constructor(data?: T) {
        if(data) {
            this.data = data;
        }
        else {
            this.data = null;
        }
    }

    isAttach():boolean {
        return this.pre != null;
    }

    detach() {
        if (this.pre != null) {
            this.pre.next = this.next;
            this.next.pre = this.pre;
            this.pre = null;
            this.next = null;
        }
    }
}

/**
 * 双向链表
 */
class DoubleLink<T> {
    private readonly _root = new DoubleLinkNode<T>();

    constructor() {
        this._init();
    }

    next(node: DoubleLinkNode<T>): DoubleLinkNode<T>  {
        return node.next;
    }

    pre(node: DoubleLinkNode<T>): DoubleLinkNode<T>  {
        return node.pre;
    }

    pushAfter(before: DoubleLinkNode<T>, node: DoubleLinkNode<T>)  {
        node.detach();
        this._pushAfter(before, node);
    }

    pushBefore(after: DoubleLinkNode<T>, node: DoubleLinkNode<T>)  {
        node.detach();
        this._pushBefore(after, node);
    }

    pushListAfter(before: DoubleLinkNode<T>, list: DoubleLink<T>)  {
        if (before.isAttach() == false) {
            return;
        }
        if (list.isEmpty()) {
            return;
        }
        this._pushListAfter(before, list);
    }

    pushListBefore(after: DoubleLinkNode<T>, list: DoubleLink<T>)  {
        if (after.isAttach() == false) {
            return;
        }
        if (list.isEmpty()) {
            return;
        }
        this._pushListBefore(after, list);
    }

    pushBack(node: DoubleLinkNode<T>)  {
        node.detach();
        this.pushBefore(this._root, node);
    }

    pushFront(node: DoubleLinkNode<T>)  {
        node.detach();
        this.pushAfter(this._root, node);
    }

    pushListBack(list: DoubleLink<T>)  {
        this.pushListBefore(this._root, list);
    }

    pushListFront(list: DoubleLink<T>)  {
        this.pushListAfter(this._root, list);
    }

    isEmpty(): boolean {
        return this._root.next == this._root;
    }

    isNotEmpty(): boolean {
        return this._root.next != this._root;
    }

    getCount(): number {
        let count: number = 0;
        let next = this._root.next;
        while (next != this._root) {
            ++count;
            next = next.next;
        }
        return count;
    }

    isEnd(node:DoubleLinkNode<T>): boolean {
        return node == this._root;
    }

    getHead(): DoubleLinkNode<T>  {
        return this._root.next;
    }

    getTail(): DoubleLinkNode<T>  {
        return this._root.pre;
    }

    contain(node: DoubleLinkNode<T>): boolean  {
        if (!node.isAttach()) {
            return false;
        }
        let next = this._root.next;
        while (next != this._root) {
            if (next == node) {
                return true;
            }
            next = next.next;
        }
        return false;
    }

    setValue(value: T)  {
        let next = this._root.next;
        while (next != this._root) {
            next.data = value;
            next = next.next;
        }
    }

    clear()  {
        let next = this._root.next;
        while (next != this._root) {
            let nextCopy = next.next;
            next.pre = null;
            next.next = null;
            next = nextCopy;
        }
        this._init();
    }

    private _init() {
        this._link(this._root, this._root);
    }

    private _link(pre: DoubleLinkNode<T>, next: DoubleLinkNode<T>)  {
        pre.next = next;
        next.pre = pre;
    }

    private _pushAfter(before: DoubleLinkNode<T>, node: DoubleLinkNode<T>)  {
        let next = before.next;
        this._link(before, node);
        this._link(node, next);
    }

    private _pushBefore(after: DoubleLinkNode<T>, node: DoubleLinkNode<T>)  {
        let pre = after.pre;
        this._link(pre, node);
        this._link(node, after);
    }

    private _pushListAfter(before: DoubleLinkNode<T>, list: DoubleLink<T>)  {
        if (list.isEmpty()) return;
        let first = list._root.next;
        let back = list._root.pre;
        let next = before.next;
        this._link(before, first);
        this._link(back, next);
        list._init();
    }

    private _pushListBefore(after: DoubleLinkNode<T>, list: DoubleLink<T>)  {
        if (list.isEmpty()) return;
        let first = list._root.next;
        let back = list._root.pre;
        let pre = after.pre;
        this._link(pre, first);
        this._link(back, after);
        this._init();
    }
}

export { DoubleLinkNode, DoubleLink };

// // DEMO
// //利用对象池和链表优化性能
// let node: DoubleLinkNode<Laya.Sprite3D> = Laya.Pool.getItem(name);
// let obj: Laya.Sprite3D;
// let quat = null;
// if (node == null) {
//     obj = Laya.Sprite3D.instantiate(this._snowBlockTemplate[name], this._pathBlocks, false, pos, quat);
//     node = new DoubleLinkNode<Laya.Sprite3D>(obj);
//     this._blocksLink.pushBack(node);
// }
// //对象池回收不可见的
// for (let iter = this._blocksLink.getHead(); !this._blocksLink.isEnd(iter);)  {
//     let obj = iter.data;
//     if (!obj.getChildAt(0)["_render"]._visible) {
//         obj.active = false;
//         Laya.Pool.recover(obj.name, iter);
//     }
//     else {
//         break;
//     }

//     iter = this._blocksLink.next(iter);
// }