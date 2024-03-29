class Building {

    constructor() {
        this.name = 'unknown';
        this.res = [];
        this.ingombro = 1;
    }

    define(name, res, ingombro) {
        // @todo name must be a string
        // @todo resources an array of resources

        if (!ingombro) {
            throw 'missing ingombro';
        }

        this.ingombro = ingombro;
        this.name = name;
        this.res = res;
    }

    time(options) {
        if (!options) {
            throw 'missing level';
        }

        let res = this.res.reduce((n, {amount}) => {
            return n + amount
        }, 0);

        for (let i = 0; i < options.level; i++) {
            res *= 1.3;
        }
        
        return Math.round(res);
    }

    get() {
        return this.res;
    }
}

module.exports = Building
