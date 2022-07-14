class Village {

    constructor(owner, name) {
        if (typeof owner === 'undefined') {
            throw 'missing owner';
        }

        if (typeof name === 'undefined') {
            throw 'missing village name';
        }

        this.name = name;
        this.owner = owner;
    }

}

module.exports = Village
