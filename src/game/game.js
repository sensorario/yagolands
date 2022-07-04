class Game {

    constructor() {
        this.startable = false;
    }

    canStart() {
        return this.startable;
    }

    addBuildingTree(tree)
    {
        this.startable = true;
    }

}

module.exports = Game
