const generator = require('./../../generator');

class Game {

    constructor() {
        this.startable = false;
        this.tree = [];
        this.demoUser = null;
        this.villages = [];
    }

    canStart() {
        return this.startable;
    }

    addBuildingTreeAndUnits(tree, units) {
        this.tree = tree;
        this.units = units;
    }

    numbweOfBuildings() {
        return this.tree.numbweOfBuildings();
    }

    numbweOfUnits() {
        return this.units.length;
    }

    start() {
        if (this.startable === false) {
            throw 'mannaggia'
        }

        if (this.demoUser === null) {
            throw 'demo user is missing';
        }
    }

    grandUnitBuildiner(options) {
        for (let i = 0; i < this.tree.numbweOfBuildings(); i++) {
            const currentBuilding = this.tree.buildingAt(i);
            if (currentBuilding === options.building) {
                this.startable = true;
            }
        }
    }

    addDemoUser(user) {
        this.demoUser = user;
    }

    addVillage(owner, village) {
        let yid = generator.generateID();
        this.villages.push({ yid: yid, owner: owner, village: village });
    }

    numberOfVillages() {
        return this.villages.length;agme
    }

}

module.exports = Game
