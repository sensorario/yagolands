const Clock = require('./../clock/clock')
let clock = new Clock();

class Messenger {

    constructor(tree) {
        this.clients = [];
        this.sessionCliens = [];
        this.numberOfVillages = 0;
        this.numberOfFields = 0;
        this.seconds = 0;
        this.tree = tree;
        this.wall = null;
    }

    messenger (data) {
        let message = JSON.parse(data);
        if (message.to === '') { message.to = 'all' }

        let send = false;
        let newClients = []

        // clean session from not yet connected clients
        for(let yid in this.sessionCliens) {
            if(this.sessionCliens[yid].ws.readyState === 3) {
                delete this.sessionCliens[yid];
            }
        }

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
        console.log(this.sessionCliens);


        // @todo use this.wall.actions instead
        // @todo use this.wall.actions instead
        // @todo use this.wall.actions instead
        // @todo use this.wall.actions instead
        let mappa = [];
        mappa['build_castle'] = 0;
        mappa['build_windmill'] = 1;
        mappa['build_warehouse'] = 2;
        mappa['build_barracks'] = 3;

        let action = JSON.parse(data).text;
        let secondsToBuild = this.extractSeconds(action);

        for(let i = 0; i < this.clients.length; i++) {
            console.log(' >>> secondsToBuild:', secondsToBuild);

            let adesso = Date.now();
            let now = new Date(adesso);
            let rawFinish = adesso + secondsToBuild * 1000;
            let finish = new Date(rawFinish);

            console.log(' >>> now:', now);
            console.log(' >>> finish:', finish);

            let queue = {
                now: now,
                rawNon: adesso,
                finish: finish,
                rawFinish: rawFinish, 
            };

            // @todo use this.wall.actions() instead
            // @todo use this.wall.actions() instead
            // @todo use this.wall.actions() instead
            // @todo use this.wall.actions() instead
            let available = [];
            available.push('build_castle');
            available.push('build_windmill');
            available.push('build_warehouse');
            available.push('build_barracks');

            console.log('wall queue', this.wall.showQueue());
            if (this.wall === null) {
                throw 'wall is not yet defined'
            }

            // @todo che brutto XD
            let yid = message.yid;
            let buildingName = JSON.parse(data).text.replace('build_', '');
            if (buildingName != 'bottone') {
                let nextLevelOf = this.wall.extractNextLevelOf({
                    buildingName: buildingName,
                    yid: yid,
                });
                console.log('queue:', this.wall.showQueue());
                console.log('wanted:',buildingName,'level:',nextLevelOf);
                if (this.wall.canBuild(buildingName, nextLevelOf, yid) === true) {
                    if (this.wall.actions().includes(JSON.parse(data).text)) {
                        console.log('add',buildingName,'at level',nextLevelOf,'in the queue');

                        // @todo whenever a building were added to the queue
                        // there should be also end of construction
                        // and also the user

                        if (typeof yid === 'undefined') { throw 'yid is missing' }
                        this.wall.addToQueue({
                            name: JSON.parse(data).text.replace('build_', ''),
                            level: nextLevelOf,
                            yid,
                        })

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
                    } else {
                        console.log(available, 'does not contains', JSON.parse(data).text)
                    }
                } else {
                    console.error('cant build', JSON.parse(data).text.replace('build_', ''), 'of level', nextLevelOf);
                }
            } else {
                // @todo non dovremmo mai capitare qui, ...
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
        if (typeof this.sessionCliens[client.id] === 'undefined') {
            this.sessionCliens[client.id] = new Array();
        }
        this.sessionCliens[client.id] = client;
    }

    updateSeconds(seconds) {
        this.seconds = seconds;
    }

    setWall(wall) {
        this.wall = wall
    }

    // @todo move into an external collaborator
    extractSeconds(action) {
        let mappa = [];
        mappa['build_castle'] = 0;
        mappa['build_windmill'] = 1;
        mappa['build_warehouse'] = 2;
        mappa['build_barracks'] = 3;
        let secs = 0;
        if (typeof mappa[action] !== 'undefined') {
            let index = mappa[action];
            for(let i = 0; i < this.tree.buildings[index].building.res.length; i++) {
                secs += this.tree.buildings[index].building.res[i].amount;
            }
        }
        return secs;
    }

}

module.exports = Messenger;
