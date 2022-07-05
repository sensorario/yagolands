class Game {

    constructor() {
        this.startable = false;
        this.tree = [];
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
        throw 'mannaggia'
    }

    grandUnitBuildiner(options) {
        for (let i = 0; i < this.tree.numbweOfBuildings(); i++) {
            const currentBuilding = this.tree.buildingAt(i);
            if (currentBuilding === options.building) {
            this.startable = true;
            }
        }
    }

}

module.exports = Game
