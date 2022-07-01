class Building {

    constructor() {
        this.name = 'unknown';
        this.res = [];
    }

    define(name, res) {
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
