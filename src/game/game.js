const generator = require('./../../generator');

class Game {

    constructor() {
        this.startable = false;
        this.tree = [];
        this.demoUser = null;
        this.villages = [];
        this.fields = [];
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
        // generate fields
        let resources = this.tree.buildings[0].building.res;
        for (let i = 0; i < resources.length; i++) {
            for (let i = 0; i < 3; i++) {
                let field = {
                    yid: generator.generateID(),
                    village: yid,
                    name: resources[i].name,
                };
                this.fields.push(field);
            }
        }
    }

    numberOfVillages() {
        return this.villages.length;
    }

    numberOfFields() {
        return this.fields.length;
    }

}

module.exports = Game
