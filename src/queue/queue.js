// @todo extract validator for a message
// @todo order items per scheduling time
// @todo if queue is totally empty retrieve data from a provider

class Queue {

    constructor() {
        this.items = [];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    send(message) {
        if (typeof message.type === 'undefined') {
            throw 'message type is missing';
        }

        if (message.type != 'building_instructions') {
            throw 'message type is invalid';
        }

        this.items.push(message);
    }

}

module.exports = Queue
