class Tree {

    constructor() {
        this.buildings = [];
    }

    isEmpty() {
        return this.buildings.length === 0;
    }

    addBuilding(name, building) {
        this.buildings.push({
            name: name,
            building: building,
        });
    }

}

module.exports = Tree
