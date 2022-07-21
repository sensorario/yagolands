class Wall {

    constructor() {
        this.tree = [];
        this.buildingActions = [];
        this.queue = [];
    }

    treeBuilding(tree) {
        this.tree = tree;
    }

    actions() {
        for (let t = 0; t < this.tree.length; t++) {
            let buildingAction = 'build_' + this.tree[t].name;
            if (!this.buildingActions.includes(buildingAction)) {
                this.buildingActions.push(buildingAction);
            }
        }
        return this.buildingActions;
    }

    canBuild(buildingName) {
        let availability = false;
        let required = null;

        for (let t = 0; t < this.tree.length; t++) {
            if (this.tree[t].name == buildingName && this.tree[t].level == 1) {
                availability = this.tree[t];
                if (typeof this.tree[t].required === 'undefined') {
                    if (this.queue.length === 0) {
                        return true;
                    }
                }
                required = this.tree[t].required;
            }
        }

        if (required !== null) {
            if (this.queue.length === 0) {
                return false;
            }
        }
    
        return false;
    }

    requirementOf(buildingName) {
        for (let t = 0; t < this.tree.length; t++) {
            if (this.tree[t].name == buildingName) {
                return this.tree[t].required;
            }
        }
    }

    addToQueue(b) {
        this.queue.push(b);
    }

    showQueue() { return this.queue }

}

module.exports = Wall;
