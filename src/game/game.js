class Game {

    constructor() {
        this.startable = false;
        this.tree = [];
    }

    canStart() {
        return this.startable;
    }

    addBuildingTreeAndUnits(tree, units) {
        this.startable = true;
        this.tree = tree;
        this.units = units;
    }

    numbweOfBuildings() {
        return this.tree.numbweOfBuildings();
    }

    numbweOfUnits() {
        return this.units.length;
    }

}

module.exports = Game
