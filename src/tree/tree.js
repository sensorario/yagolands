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
            throw 'building ' + name + ' must have requirements'
        }

        this.buildings.push({
            name: name,
            building: building,
        });


        if (typeof level === 'undefined') {
            throw 'undefined level'
        }

        this.table.push({
            identifier: name + '.' + level,
            building: name,
            level: level,
            requires: requires,
            ingombro: building.ingombro,
        });
    }

    get(building) {
        for(let i = 0; i < this.buildings.length; i++) {
            if (this.buildings[i].name === building) {
                return {
                    resources: this.buildings[i].building.name
                };
            }
        }
    }

    listBuildings() {
        let list = [];

        for(let i = 0; i < this.buildings.length; i++) {
            if (!list.includes(this.buildings[i].name)) {
                list.push(this.buildings[i].name);
            }
        }

        let ultimate = [];

        for(let i = 0; i < list.length; i++) {
            ultimate.push({ name: list[i] });
        }

        return ultimate;
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
        return this.listBuildings().length;
    }

    buildingAt(index) {
        return this.table[index].building;
    }

    firstBuilding() {
        return {[this.buildingAt(0)]: 1}
    }

    createMap() {
        let map = [];
        for(let t = 0; t < this.table.length; t++) {
            let item = { name: this.table[t].building, level: this.table[t].level };
            if (this.table[t].requires != null) {
                item.required = {
                    name: this.table[t].requires.requiredBuilding,
                    level: this.table[t].requires.requiredLevel,
                };
            }
            map.push(item);
        }
        return map;
    }

    actions() {
        let listActions = new Array();
        for (let t in this.table) {
            listActions.push('build_' + this.table[t].building);
        }
        return listActions;
    }

}

module.exports = Tree
