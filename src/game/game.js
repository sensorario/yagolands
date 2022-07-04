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
    }

    numbweOfBuildings() {
        return this.tree.numbweOfBuildings();
    }

}

module.exports = Game
