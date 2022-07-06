class Game {

    constructor() {
        this.startable = false;
        this.tree = [];
        this.demoUser = null;
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

}

module.exports = Game
