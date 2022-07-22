const Clock = require('./../clock/clock')
let clock = new Clock();

class Messenger {

    constructor(tree, gameStatus) {
        this.clients = [];
        this.numberOfVillages = 0;
        this.numberOfFields = 0;
        this.seconds = 0;
        this.tree = tree;
        this.gameStatus = gameStatus;
        this.wall = null;
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

        // @todo use this.wall.actions instead
        let mappa = [];
        mappa['build_castle'] = 0;
        mappa['build_windmill'] = 1;
        mappa['build_warehouse'] = 2;

        for(let i = 0; i < this.clients.length; i++) {

            // @todo recueprare la coda da un layer di persistenza
            if (typeof this.gameStatus['user_' + this.clients[i].id] === 'undefined') {
                this.gameStatus['user_' + this.clients[i].id] = {
                    queue: [],
                };
            }

            // @todo ensure first building must be built
            //let firstBuilding = this.tree.firstBuilding();
            let secondsToBuild = 0;
            if (typeof mappa[JSON.parse(data).text] !== 'undefined') {
                let indice = mappa[JSON.parse(data).text];
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

            // @todo use this.wall.actions() instead
            let available = [];
            available.push('build_castle');
            available.push('build_windmill');
            available.push('build_warehouse');

            // @todo ma siamo sicuri ci serva ancora gameStatus??
            // console.log('come vanno le cose', this.gameStatus['user_' + this.clients[i].id]);
            console.log('wall queue', this.wall.showQueue());
            if (this.wall === null) {
                throw 'wall is not yet defined'
            }

            // @todo che brutto XD
            let buildingName = JSON.parse(data).text.replace('build_', '');
            if (buildingName != 'bottone') {
                let nextLevelOf = this.wall.extractNextLevelOf(buildingName);
                console.log('queue', this.wall.showQueue());
                console.log('try to build',buildingName,'of level',nextLevelOf);
                if (this.wall.canBuild(buildingName, nextLevelOf) === true) {
                    if (this.wall.actions().includes(JSON.parse(data).text)) {
                        console.log('add',buildingName,'at level',nextLevelOf,'in the queue');

                        // @todo whenever a building were added to the queue
                        // there should be also end of construction
                        // and also the user
                        this.wall.addToQueue({ name: JSON.parse(data).text.replace('build_', ''), level: nextLevelOf })

                        console.log('now the queue is',this.wall.showQueue());
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

                        let now = Date.now();
                        this.gameStatus['user_' + this.clients[i].id].queue.push({
                            user: 'user_' + this.clients[i].id,
                            action: JSON.parse(data).text,
                            start: now,
                            end: now + (secondsToBuild * 1000),
                            level: nextLevelOf,
                        });
                    } else {
                        console.log(available, 'does not contains', JSON.parse(data).text)
                    }
                } else {
                    console.error('cant build', JSON.parse(data).text.replace('build_', ''), 'of level', nextLevelOf);
                }
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
