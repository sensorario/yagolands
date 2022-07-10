// @todo order items per scheduling time

class Queue {

    constructor() {
        this.items = [];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    send(message) {
        // @todo extract validator for a message
        if (typeof message.type === 'undefined') {
            throw 'message type is missing';
        }

        this.items.push(message);
    }

}

module.exports = Queue
