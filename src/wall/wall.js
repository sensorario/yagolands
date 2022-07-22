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

    canBuild(buildingName, level) {
        if (typeof level == 'undefined') {
            level = 1;
        }

        // if item is already in the queue, ... return false
        for (let q = 0; q < this.queue.length; q++) {
            if (this.queue[q].name == buildingName && this.queue[q].level == level) {
                return false;
            }
        }

        let availability = false;
        let required = null;

        for (let t = 0; t < this.tree.length; t++) {
            if (this.tree[t].name == buildingName && this.tree[t].level == level) {
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

            let requirement = this.getRequirementsOf(buildingName, level);
            if (this.isRequirementPresent(requirement)) {
                return true;
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

    getRequirementsOf(buildingName, level) {
        for (let t = 0; t < this.tree.length; t++) {
            if (this.tree[t].name == buildingName && this.tree[t].level == level) {
                if (typeof this.tree[t].required != 'undefined') {
                    return this.tree[t].required;
                }
            }
        }
    }

    isRequirementPresent(req) {
        for (let t = 0; t < this.queue.length; t++) {
            if (
                this.queue[t].name == req.name
                && this.queue[t].level == req.level
            ) {
                return true;
            }
        }
    }

    extractNextLevelOf(buildingName) {
        let levelFound = 0;
        for (let t = 0; t < this.queue.length; t++) {
            if (this.queue[t].name == buildingName) {
                levelFound = this.queue[t].level;
            }
        }
        return levelFound + 1;
    }
}

module.exports = Wall;
