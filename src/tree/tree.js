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

    get(building) {
        for(let i = 0; i < this.buildings.length; i++) {
            if (this.buildings[i].name === building) {
                return {
                    name: this.buildings[i].name
                };
            }
        }
    }

    listBuildings() {
        let list = [];
        for(let i = 0; i < this.buildings.length; i++) {
            list.push({
                name: this.buildings[i].name
            });
        }

        return list;
    }

    extractBuilding(buildingName) {
        for(let i = 0; i < this.buildings.length; i++) {
            if (this.buildings[i].name === buildingName) {
                return {
                    name: this.buildings[i].name
                };
            }
        }
    }

    lookupTable() {
        let table = [];
        let newItem = { building: 'castle', level: 1, requires: null };
        table.push(newItem);

        return table;
    }

    needsRequirements() {
        return false
    }

}

module.exports = Tree
