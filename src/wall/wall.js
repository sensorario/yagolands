const generator = require('./../../generator');

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

    canBuild(buildingName, level, yid) {
        let outcome = {};
        outcome.buildingName = buildingName;
        outcome.level = level;

        // @todo move into another service
        let inQueue = false;
        let queue = this.queue[yid];
        for (let q in queue) {
            if (queue[q].name == buildingName && queue[q].level == level) {
                inQueue = true;
            }
        }

        if (inQueue === true) {
            return false;
        }

        outcome.inQueue = inQueue;

        if (typeof level == 'undefined') {
            throw 'level is missing in canBuild(buildingName, level, yid)';
        }

        if (typeof yid == 'undefined') {
            throw 'yid is missing in canBuild(buildingName, level, yid)';
        }

        // if item is already in the queue, ... return false
        for (let q = 0; q < this.queue.length; q++) {
            if (this.queue[q].name == buildingName && this.queue[q].level == level) {
                return false;
            }
        }

        outcome.isInTree = false;
        for (let t in this.tree) {
            if (this.tree[t].name === buildingName) {
                outcome.isInTree = true;
            }
        }

        if (outcome.isInTree === false) {
        }

        let availability = false;
        let required = null;
        
        for (let t = 0; t < this.tree.length; t++) {
            if (this.tree[t].name == buildingName && this.tree[t].level == level) {
                availability = this.tree[t];
                if (typeof this.tree[t].required === 'undefined') {
                    if (outcome.inQueue === false) {
                        return true;
                    }
                } else {
                    required = this.tree[t].required;
                }
            }
        }

        outcome.requirement = this.getRequirementsOf(buildingName, level);
        outcome.requirementSatisfied = false;
        if (outcome.requirement != false) {
            for(let q in this.queue[yid]) {
                if (
                    this.queue[yid][q].name == outcome.requirement.name
                    && this.queue[yid][q].level == outcome.requirement.level
                ) {
                    outcome.requirementSatisfied = true;
                }
            }
        }

        if (required !== null) {
            if (outcome.inQueue) {
                for (let q = 0; q < this.queue[yid].length; q++) {
                    if (this.queue[yid][q].name == buildingName && this.queue[yid][q].level == level) {
                        return false;
                    }
                }
                return true;
            }
        }

        outcome.queue = this.queue[yid];

        if (
            outcome.isInTree === true
            && outcome.required === null
            && outcome.inQueue === true
        ) {
            return false;
        }

        if (outcome.isInTree === true && outcome.required === null) {
            return true;
        }

        if (
            outcome.isInTree === false
        ) {
            return false;
        }

        if (
            outcome.isInTree == true
            && outcome.inQueue == false
            && outcome.requirementSatisfied === true
        ) {
            return true;
        }


        if (outcome.requirement !== false && outcome.requirementSatisfied === false) {
            return false;
        }

        console.log('outcome', outcome);
        throw 'Oops!'
    }

    requirementOf(buildingName) {
        for (let t = 0; t < this.tree.length; t++) {
            if (this.tree[t].name == buildingName) {
                return this.tree[t].required;
            }
        }
    }

    addToQueue(dto) {
        if (typeof dto.position === 'undefined') {
            throw 'position is mandatory whenever buiding were added to queue';
        }

        if (typeof dto.yid === 'undefined') {
            throw 'yid is missing';
        }

        if (typeof this.queue[dto.yid] === 'undefined') {
            this.queue[dto.yid] = new Array();
        }

        // @todo ensure this is the only building in same position

        this.queue[dto.yid].push({
            name: dto.name,
            level: dto.level,
            position: dto.position,
            visible: true,
        });
    }

    showQueue() {
        return this.queue;
    }

    updateQueue(yid, vecchiaCoda) {
        this.queue[yid] = vecchiaCoda;
    }

    removeQueue(yid) {
        delete this.queue[yid];
    }

    getQueueOf(dto) {
        return this.queue[dto.yid];
    }

    getRequirementsOf(buildingName, level) {
        for (let t = 0; t < this.tree.length; t++) {
            if (this.tree[t].name == buildingName && this.tree[t].level == level) {
                if (typeof this.tree[t].required != 'undefined') {
                    return this.tree[t].required;
                }
            }
        }

        return { name: buildingName, level: level - 1 };
    }

    // dto: { buildingName: ?, yid: ? }
    extractNextLevelOf(dto) {
        if (typeof dto.yid === 'undefined') {
            throw 'yid is missing in extractNextLevelOf(dto)'
        }
        if (typeof this.queue[dto.yid] === 'undefined') { return 1; }
        let levelFound = 0;
        let queue = this.queue[dto.yid];
        for (let t = 0; t < queue.length; t++) {
            if (queue[t].name == dto.buildingName) {
                levelFound = queue[t].level;
            }
        }
        return levelFound + 1;
    }

    buildingStatus(dto) {
        let statuses = [];
        for (let t in this.tree) {
            if (!statuses.includes(this.tree[t].name)) {
                statuses.push(this.tree[t].name);
            }
        }
        let leveled = [];
        for (let s in statuses) {
            let maxLevelOf = 0;
            for (let q in this.queue[dto.yid]) {
                if (this.queue[dto.yid][q].name == statuses[s]) {
                    maxLevelOf = this.queue[dto.yid][q].level;
                }
            }
            let visibility = this.canBuild(statuses[s], maxLevelOf + 1, dto.yid);
            leveled.push({ name: statuses[s], level: maxLevelOf, visible: visibility });
        }
        return leveled;
    }
}

module.exports = Wall;
