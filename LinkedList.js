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
    pop() {
        if (this._size > 0) {
            let current = this._head;
            let next = current.nextNode;

            // Single element in linkedlist
            if (next === null) {
                this._head = null;
                this._size = 0;
                return current;
            }

            // 2 or more elements in linkedlist
            while (next.nextNode !== null) {
                current = next;
                next = next.nextNode;
            }

            current.nextNode = null;
            this._size--;
            return next;
        }
        return null;
    }
    find(val) {
        let index = 0;
        let current = this._head;
        while (current !== null) {
            if (current.value === val) return index;
            index++;
            current = current.nextNode;
        }
        return null;
    }
    contains(val) {
        if (this.find(val) !== null) return true;
        return false;
    }
    toString() {
        if (this._size < 1) {
            return null
        }

        let results = `( ${this._head.value} )`;
        let current = this._head.nextNode;

        while (current !== null) {
            results += ` -> ( ${current.value} )`
            current = current.nextNode;
        }

        return results += ' -> null';
    }
    #iterateBefore(index) {
        // Iterate up to index - 1 as current
        let i = 1;
        let current = this._head;
        let next = current.nextNode;
        while (next.nextNode !== null && i < index) {
            i++;
            current = next;
            next = next.nextNode;
        }
        return {current, next};
    }
    insertAt(val, index) {
        if (index < this._size) {
            if (index === 0) this.prepend(val);
            else if (index === this._size - 1) this.append(val);
            else {
                let {current, next} = this.#iterateBefore(index);

                // Inserting potentially multiple linked nodes
                if (val instanceof ListNode) {
                    current.nextNode = val;
                    while (current.nextNode !== null) {
                        current = current.nextNode;
                    }
                    current.nextNode = next;

                    this.#updateSize();
                }
                // Prepending a single value
                else {
                    const newNode = new ListNode(val, next);
                    current.nextNode = newNode;
                    this._size++;
                }
            }
        }
        else
            throw new Error('Index out of bounds.');
    }
    removeAt(index) {
        if (index < this._size) {
            if (index === 0) {
                const next = this._head.nextNode;
                this._head.nextNode = null;
                this._head = next;
            }
            else if (index === this._size - 1) this.pop();
            else {
                let {current, next} = this.#iterateBefore(index);

                const afterNext = next.nextNode;

                // current -> next -> afterNext
                next.nextNode = null;
                current.nextNode = afterNext;
            }
        }
        else
            throw new Error('Index out of bounds.');
    }
}