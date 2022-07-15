const Clock = require('./../clock/clock')
let clock = new Clock();

class Messenger {

    constructor() {
        this.clients = [];
        this.numberOfVillages = 0;
        this.numberOfFields = 0;
        this.seconds = 0;
    }

    displayClients() {
        console.log('clients:', this.clients.length)
    }

    messenger (data) {
        let message = JSON.parse(data);
        if (message.to === '') { message.to = 'all' }

        let send = false;
        let newClients = []

        for(let i = 0; i < this.clients.length; i++) {
            if (
                message.to === 'all'
                || this.clients[i].id === message.to
            ) { send = true }

            if (this.clients[i].ws.readyState === 3) { send = false }

            if (send === true) {
                console.log('message sent to the client', this.clients[i].id);
                newClients.push(this.clients[i])
            } else {
                console.log('client', this.clients[i].id, 'lost');
                console.log('message not sent to the client', this.clients[i].id);
            }
        }

        this.clients = newClients

        console.log('clients:', this.clients.length)

        for(let i = 0; i < this.clients.length; i++) {
            console.log('send');
            this.clients[i].ws.send(JSON.stringify({
                id: this.clients[i].id,
                message: JSON.parse(data),
                numberOfClients: this.clients.length,
                numberOfVillages: this.numberOfVillages,
                numberOfFields: this.numberOfFields,
                seconds: clock.time(this.seconds),
                rawseconds: this.seconds,
            }))
        }

        this.displayClients();
    }

    // @todo rename it asap
    setState(state) {
        this.numberOfVillages = state.numberOfVillages;
        this.numberOfFields = state.numberOfFields;
    }

    addClient(client) {
        this.clients.push(client);
    }

    updateSeconds(seconds) {
        this.seconds = seconds;
    }

}

module.exports = Messenger;
