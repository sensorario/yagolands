const Clock = require('./../clock/clock')
let clock = new Clock();

class Messenger {

    constructor(tree) {
        this.clients = [];
        this.numberOfVillages = 0;
        this.numberOfFields = 0;
        this.seconds = 0;
        this.tree = tree;
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

            // @todo ensure first building must be built
            //let firstBuilding = this.tree.firstBuilding();
            let secondsToBuild = 0;
            let mappa = [];
            mappa['build_castle'] = 0;
            mappa['build_windmill'] = 1;
            mappa['build_warehouse'] = 2;
            if (typeof mappa[JSON.parse(data).text] !== 'undefined') {
                let indice = mappa[JSON.parse(data).text];
                console.log('indice', indice);
                for(let i = 0; i < this.tree.buildings[indice].building.res.length; i++) {
                    secondsToBuild += this.tree.buildings[indice].building.res[i].amount;
                }
            }

            let adesso = Date.now();
            let now = new Date(adesso);
            let rawFinish = adesso + secondsToBuild * 1000;
            let finish = new Date(rawFinish);
            let queue = {
                now: now,
                rawNon: adesso,
                finish: finish,
                rawFinish: rawFinish, 
            };

            console.log('JSON.parse(data).text', JSON.parse(data).text)

            let available = [];
            available.push('build_castle');
            available.push('build_windmill');
            available.push('build_warehouse');
            if (available.includes(JSON.parse(data).text)) {
                console.log('calcolo')
                // @todo contare i secondi
                this.clients[i].ws.send(JSON.stringify({
                    buildings: this.tree.listBuildings(),
                    id: this.clients[i].id,
                    numberOfClients: this.clients.length,
                    numberOfFields: this.numberOfFields,
                    numberOfVillages: this.numberOfVillages,
                    queue: queue,
                    rawseconds: this.seconds,
                    rawFinish: rawFinish,
                    secondiAllaFine: secondsToBuild,
                    seconds: clock.time(this.seconds),
                    tree: this.tree,
                    type: JSON.parse(data).text,
                }));
            } else {
                console.log(available, 'does not contains', JSON.parse(data).text)
            }

            this.clients[i].ws.send(JSON.stringify({
                buildings: this.tree.listBuildings(),
                id: this.clients[i].id,
                message: JSON.parse(data),
                numberOfClients: this.clients.length,
                numberOfFields: this.numberOfFields,
                numberOfVillages: this.numberOfVillages,
                queue: queue,
                rawseconds: this.seconds,
                secondiAllaFine: secondsToBuild, // @todo cercare ... 
                seconds: clock.time(this.seconds),
                tree: this.tree,
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
