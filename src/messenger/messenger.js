const Clock = require('./../clock/clock');
const timing = require('./../timing/timing');

const clock = new Clock();

class Messenger {

    constructor(tree) {
        this.clients = [];
        this.numberOfVillages = 0;
        this.numberOfFields = 0;
        this.seconds = 0;
        this.tree = tree;
        this.wall = null;
    }

    messenger (data) {
        console.log(this.queue);

        let message = JSON.parse(data);
        if (message.to === '') { message.to = 'all' }

        let newClients = []
        for(let c in this.clients) {
            if (this.clients[c].ws.readyState === 3) { console.log(`${c} is no more connected`) }
            if (this.clients[c].ws.readyState != 3) { newClients.push(this.clients[c]) }
        }

        this.clients = newClients

        for(let i = 0; i < this.clients.length; i++) {
            console.log(`a global message will be sent to client ${this.clients[i].id} with positions`);
            this.clients[i].ws.send(JSON.stringify({
                visibilities: this.wall.buildingStatus({ yid: this.clients[i].id}),
                buildings: this.tree.listBuildings(),
                id: this.clients[i].id,
                message: JSON.parse(data),
                numberOfClients: this.clients.length,
                numberOfFields: this.numberOfFields,
                numberOfVillages: this.numberOfVillages,
                rawseconds: this.seconds,
                seconds: clock.time(this.seconds),
                tree: this.tree,
                queue: this.wall.showQueue()[this.clients[i].id],
            }))
        }

        for(let i = 0; i < this.clients.length; i++) {
            if (message.yid != this.clients[i].id) continue;
            console.log(`a message will be sent to client ${this.clients[i].id}`);
            let yid = message.yid;
            console.log('data', data);
            let buildingName = JSON.parse(data).text.replace('build_', '');
            let nextLevelOf = this.wall.extractNextLevelOf({ buildingName: buildingName, yid: this.clients[i].id });
            let action = JSON.parse(data).text;
            let secondsToBuild = timing.getTimeToBuild(action, nextLevelOf, this.tree);
            let adesso = Date.now();
            let now = new Date(adesso);
            let rawFinish = adesso + secondsToBuild * 1000;
            let finish = new Date(rawFinish);
            let queue = { now: now, rawNon: adesso, finish: finish, rawFinish: rawFinish };
            let available = [];
            available.push('build_castle');
            available.push('build_windmill');
            available.push('build_warehouse');
            available.push('build_barracks');
            if (this.wall === null) { throw 'wall is not yet defined' }
            if (buildingName != 'connection-call') {
                console.log('queue:', this.wall.showQueue());
                console.log('wanted:',buildingName,'level:',nextLevelOf);
                if (this.wall.canBuild(buildingName, nextLevelOf, yid) === true) {
                    if (this.wall.actions().includes(JSON.parse(data).text)) {
                        console.log('add',buildingName,'at level',nextLevelOf,'in the queue');
                        if (typeof yid === 'undefined') { throw 'yid is missing' }

                        this.wall.addToQueue({
                            name: JSON.parse(data).text.replace('build_', ''),
                            level: nextLevelOf,
                            yid: yid,
                            position: message.position,
                        })

                        console.log('now the queue is',this.wall.showQueue());
                        console.log(`a message will be sent to client ${this.clients[i].id} and yid is ${yid}`);
                        if (yid == this.clients[i].id)
                        this.clients[i].ws.send(JSON.stringify({
                            visibilities: 123, // this.wall.buildingStatus({ yid: this.clients[i].id}),
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
                    }
                }
            }
        }
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

    setWall(wall) {
        this.wall = wall
    }

}

module.exports = Messenger;
