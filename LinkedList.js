const ListNode = require("./ListNode");

module.exports = class LinkedList {
    constructor() {
        this._head = null;
        this._size = 0;
    }

    #updateSize() {
        let newSize = 0;
        let current = this._head;

        if (current !== null) newSize++;

        while (current.nextNode !== null) {
            newSize++;
            current = current.nextNode;
        }
        this._size = newSize;
    }
    get head() { return this._head };
    get size() { return this._size };
    get tail() {
        if (this._size > 0) {
            let current = this._head;
            while (current.nextNode !== null) {
                current = current.nextNode;
            }

            return current;
        }
        return null;
    }
    set head(newHead) { 
        this._head = newHead;
        this.#updateSize();
    }
    append(val) {
        const tail = this.tail;
        // Appending potentially multiple linked nodes
        if (val instanceof ListNode) {

            tail.nextNode = val;
            this.#updateSize();
        }
        // Appending a single value
        else {
            const newNode = new ListNode(val);
            tail.nextNode = newNode;
            this._size++;
        }
    }
    prepend(val) {
        // Prepending potentially multiple linked nodes
        if (val instanceof ListNode) {

            let current = val;
            while (current.nextNode !== null) {
                current = current.nextNode;
            }
            current.nextNode = this._head;

            this._head = val;
            this.#updateSize();
        }
        // Prepending a single value
        else {
            const newNode = new ListNode(val, this._head);
            this._head = newNode;
            this._size++;
        }
    }
    at(index) {
        if (this._size > 0) {
            let i = 0;
            let current = this._head;
            while (current.nextNode !== null && i < index) {
                i++;
                current = current.nextNode;
            }

            if (index === i)
                return current;
            else
                return null;
        }
        return null;
    }
}