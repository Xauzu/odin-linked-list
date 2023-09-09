module.exports = class ListNode {
    constructor(value, nextNode) {
        this._value = value || null;
        this._nextNode = nextNode || null;
    }

    get nextNode() { return this._nextNode };
    get value() { return this._value };

    set nextNode(node) { this._nextNode = node };
    set value(val) { this._value = val};
}