class Tree {

    constructor() {
        this.buildings = [];
        this.table = [];
    }

    isEmpty() {
        return this.buildings.length === 0;
    }

    addBuilding(name, building, level, requiredBuilding, requestedLevel) {
        let requires = requiredBuilding && requestedLevel
            ? {
                requiredBuilding: requiredBuilding,
                requiredLevel: requestedLevel,
            }
            : null;

        if (this.isEmpty() === false && requires === null) {
            throw 'ma porc'
        }

        this.buildings.push({
            name: name,
            building: building,
        });


        let ultimateLevel = requestedLevel || 1;

        if (typeof level === 'undefined') {
            level = 0;
        }

        this.table.push({
            identifier: name + '.' + level,
            building: name,
            level: ultimateLevel,
            requires: requires,
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
        return this.table;
    }

    needsRequirements(requested) {
        if (this.buildings.length === 1) return false;
        let requirements = [];
        for(let i = 0; i < this.table.length; i++) {
            if (
                this.table[i].building == requested.requiredBuilding
            ) {
                if (this.table[i].identifier === requested.requiredBuilding + '.' + requested.requiredLevel) {
                    requirements.push(this.table[i].requires)
                }
            }
        }
    
        return requirements;
    }

    numbweOfBuildings() {
        return this.buildings.length;
    }

    buildingAt(index) {
        return this.table[index].building;
    }

}

module.exports = Tree
