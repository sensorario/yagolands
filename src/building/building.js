class Building {

    constructor() {
        this.name = 'unknown';
        this.res = [];
        this.ingrombro = 1;
    }

    define(name, res, ingrombro) {
        // @todo name must be a string
        // @todo resources an array of resources

        if (!ingrombro) {
            throw 'missing ingrombro';
        }

        this.ingrombro = ingrombro;
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
