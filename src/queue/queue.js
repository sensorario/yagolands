// @todo extract validator for a message
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

    list() {
        let ret = [];

        this.items.sort((aa, bb) => {
            return aa.scheduling - bb.scheduling;
        });

        for(let i = 0; i < this.items.length; i++) {
            ret.push({
                message: this.items[i].message,
                type: this.items[i].type,
            });
        }

        return ret;
    }

}

module.exports = Queue
